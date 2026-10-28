import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type CameraPreset = 'default' | 'exploded' | 'angled';
export type DisplayTheme = 'web' | 'gift' | 'fix';

interface ThreeStudioCanvasProps {
  activeTheme?: DisplayTheme;
  onThemeChange?: (theme: DisplayTheme) => void;
}

// Pre-allocated scratch helpers outside render loop (Zero GC in tick)
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _currentLookAt = new THREE.Vector3(0, 0.2, 0);
const _dummyMatrix = new THREE.Matrix4();
const _dummyPos = new THREE.Vector3();
const _dummyScale = new THREE.Vector3();
const _dummyQuat = new THREE.Quaternion();
const _dummyColor = new THREE.Color();

function createScreenCanvasTexture(
  theme: DisplayTheme,
  maxAnisotropy: number
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Background
    ctx.fillStyle = '#090B12';
    ctx.fillRect(0, 0, 512, 320);

    // Subtle border & top bar
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, 496, 304);

    ctx.fillStyle = '#121624';
    ctx.fillRect(10, 10, 492, 36);

    // Brand mark bar
    ctx.fillStyle = '#F4F5F8';
    ctx.fillRect(28, 23, 68, 10);

    // Accent CTA pill in screen
    const accent =
      theme === 'web' ? '#A78BFA' : theme === 'gift' ? '#F472B6' : '#38BDF8';
    ctx.fillStyle = accent;
    ctx.fillRect(410, 20, 74, 16);

    // Left hero content lines
    ctx.fillStyle = accent;
    ctx.fillRect(28, 68, 96, 8);

    ctx.fillStyle = '#F4F5F8';
    ctx.fillRect(28, 88, 220, 18);
    ctx.fillRect(28, 114, 180, 18);

    ctx.fillStyle = '#6E748A';
    ctx.fillRect(28, 146, 210, 8);
    ctx.fillRect(28, 162, 190, 8);

    // Primary button block
    ctx.fillStyle = accent;
    ctx.fillRect(28, 192, 104, 26);
    ctx.fillStyle = '#181C2E';
    ctx.fillRect(142, 192, 86, 26);

    // Right preview cards inside screen
    ctx.fillStyle = '#121624';
    ctx.fillRect(276, 66, 208, 152);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.strokeRect(276, 66, 208, 152);

    ctx.fillStyle = accent;
    ctx.fillRect(294, 86, 80, 10);
    ctx.fillStyle = '#232942';
    ctx.fillRect(294, 108, 172, 42);
    ctx.fillRect(294, 160, 82, 40);
    ctx.fillRect(384, 160, 82, 40);

    // Bottom metrics strip
    ctx.fillStyle = '#101420';
    ctx.fillRect(28, 242, 456, 48);
    ctx.fillStyle = accent;
    ctx.fillRect(44, 258, 48, 6);
    ctx.fillRect(196, 258, 48, 6);
    ctx.fillRect(348, 258, 48, 6);
    ctx.fillStyle = '#D4D7E3';
    ctx.fillRect(44, 270, 96, 8);
    ctx.fillRect(196, 270, 96, 8);
    ctx.fillRect(348, 270, 96, 8);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

function createRadialShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 8, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    grad.addColorStop(0.6, 'rgba(0, 0, 0, 0.22)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export const ThreeStudioCanvas: React.FC<ThreeStudioCanvasProps> = ({
  activeTheme = 'web',
  onThemeChange,
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('default');
  const [localTheme, setLocalTheme] = useState<DisplayTheme>(activeTheme);
  const [hudCollapsed, setHudCollapsed] = useState(false);

  // Refs shared with the WebGL loop so React state updates never recreate the scene
  const presetRef = useRef<CameraPreset>('default');
  const themeRef = useRef<DisplayTheme>(activeTheme);
  const userRotRef = useRef<{ yaw: number; pitch: number }>({ yaw: 0, pitch: 0 });
  const requestRenderRef = useRef<(() => void) | null>(null);
  const updateThemeFnRef = useRef<((t: DisplayTheme) => void) | null>(null);

  useEffect(() => {
    setLocalTheme(activeTheme);
    themeRef.current = activeTheme;
    if (updateThemeFnRef.current) {
      updateThemeFnRef.current(activeTheme);
    }
    if (requestRenderRef.current) {
      requestRenderRef.current();
    }
  }, [activeTheme]);

  const handleSelectPreset = (preset: CameraPreset) => {
    setCameraPreset(preset);
    presetRef.current = preset;
    if (preset === 'default') {
      userRotRef.current.yaw = 0;
      userRotRef.current.pitch = 0;
    }
    if (requestRenderRef.current) {
      requestRenderRef.current();
    }
  };

  const handleSelectTheme = (theme: DisplayTheme) => {
    setLocalTheme(theme);
    themeRef.current = theme;
    if (updateThemeFnRef.current) {
      updateThemeFnRef.current(theme);
    }
    if (onThemeChange) {
      onThemeChange(theme);
    }
    if (requestRenderRef.current) {
      requestRenderRef.current();
    }
  };

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Detect software WebGL (SwiftShader / llvmpipe) per threejs skill
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = Math.max(container.clientWidth, 300);
    const height = Math.max(container.clientHeight, 340);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080a10);
    scene.fog = new THREE.FogExp2(0x080a10, 0.065);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 60);
    camera.position.set(0, 1.15, 5.2);
    camera.lookAt(_currentLookAt);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Mandatory Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 3. Balanced 3-Point Studio Lighting Rig (Warm Key + Cool Hemisphere Fill + Rim)
    const hemiLight = new THREE.HemisphereLight(0x88b4ff, 0x121420, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff0dd, 2.2);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 16;
    const d = 4;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa78bfa, 1.4);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // 4. Ground plane + Radial Contact Shadow + InstancedMesh Spatial Grid Nodes
    const floorY = -1.25;
    const shadowTex = createRadialShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(4.4, 2.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = floorY + 0.015;
    scene.add(contactShadow);

    // InstancedMesh of 36 spatial reference nodes on the studio floor (> 20 instances rule)
    const nodeGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.02, 12);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.7,
    });
    const gridCount = 36;
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, gridCount);
    let idx = 0;
    for (let gx = -2.5; gx <= 2.5; gx += 1.0) {
      for (let gz = -2.5; gz <= 2.5; gz += 1.0) {
        if (idx >= gridCount) break;
        const scaleVar = 0.85 + ((idx * 7) % 5) * 0.07;
        _dummyPos.set(gx, floorY + 0.01, gz);
        _dummyScale.set(scaleVar, 1, scaleVar);
        _dummyMatrix.compose(_dummyPos, _dummyQuat, _dummyScale);
        instancedNodes.setMatrixAt(idx, _dummyMatrix);
        _dummyColor.setHex(idx % 2 === 0 ? 0x4c5372 : 0x6b5ca5);
        instancedNodes.setColorAt(idx, _dummyColor);
        idx++;
      }
    }
    instancedNodes.instanceMatrix.needsUpdate = true;
    if (instancedNodes.instanceColor) instancedNodes.instanceColor.needsUpdate = true;
    instancedNodes.computeBoundingSphere();
    scene.add(instancedNodes);

    // 5. Composite 9-Part Procedural 3D Architectural UI Sculpture (THREE.Group)
    const rootGroup = new THREE.Group();
    rootGroup.position.set(0, 0.24, 0);
    scene.add(rootGroup);

    // Materials with varied roughness (>= 0.25 delta between adjacent parts)
    const brushedAluminumMat = new THREE.MeshStandardMaterial({
      color: 0x232838,
      metalness: 0.88,
      roughness: 0.24,
    });
    const matteCarbonMat = new THREE.MeshStandardMaterial({
      color: 0x10131d,
      metalness: 0.35,
      roughness: 0.72,
    });
    const chromeTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd8dce8,
      metalness: 0.94,
      roughness: 0.14,
    });
    const accentGlowMat = new THREE.MeshStandardMaterial({
      color: 0xa78bfa,
      emissive: 0xa78bfa,
      emissiveIntensity: 0.45,
      roughness: 0.3,
      metalness: 0.5,
    });
    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.45,
      roughness: 0.3,
      metalness: 0.5,
    });

    // Helper for rounded rectangle ExtrudeGeometry
    const createRoundedBoxGeo = (w: number, h: number, depth: number, r: number) => {
      const shape = new THREE.Shape();
      const x = -w / 2;
      const y = -h / 2;
      shape.moveTo(x + r, y);
      shape.lineTo(x + w - r, y);
      shape.quadraticCurveTo(x + w, y, x + w, y + r);
      shape.lineTo(x + w, y + h - r);
      shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      shape.lineTo(x + r, y + h);
      shape.quadraticCurveTo(x, y + h, x, y + h - r);
      shape.lineTo(x, y + r);
      shape.quadraticCurveTo(x, y, x + r, y);
      return new THREE.ExtrudeGeometry(shape, {
        depth,
        bevelEnabled: true,
        bevelSegments: 3,
        steps: 1,
        bevelSize: 0.025,
        bevelThickness: 0.025,
      });
    };

    // Part 1: Base Pedestal (Grounded at bottom)
    const pedestalGeo = createRoundedBoxGeo(1.7, 0.9, 0.08, 0.12);
    const pedestalMesh = new THREE.Mesh(pedestalGeo, matteCarbonMat);
    pedestalMesh.rotation.x = Math.PI / 2;
    pedestalMesh.position.set(0, floorY + 0.08, 0);
    pedestalMesh.castShadow = !isSoftwareGl;
    pedestalMesh.receiveShadow = !isSoftwareGl;
    rootGroup.add(pedestalMesh);

    // Part 2: Articulated Support Stand Neck
    const standGeo = new THREE.CylinderGeometry(0.11, 0.15, 1.15, 24);
    const standMesh = new THREE.Mesh(standGeo, brushedAluminumMat);
    standMesh.position.set(0, floorY + 0.65, -0.22);
    rootGroup.add(standMesh);

    // Part 3: Precision Orbital Ring behind main display
    const ringGeo = new THREE.TorusGeometry(1.18, 0.022, 16, 48);
    const ringMesh = new THREE.Mesh(ringGeo, chromeTrimMat);
    ringMesh.position.set(0, 0.22, -0.25);
    rootGroup.add(ringMesh);

    // Part 4: Main Chassis Frame
    const mainChassisGeo = createRoundedBoxGeo(2.85, 1.78, 0.08, 0.14);
    const mainChassisMesh = new THREE.Mesh(mainChassisGeo, brushedAluminumMat);
    mainChassisMesh.position.set(0, 0.22, -0.05);
    mainChassisMesh.castShadow = !isSoftwareGl;
    rootGroup.add(mainChassisMesh);

    // Part 5: Main Display Screen Plane with Procedural CanvasTexture
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    let screenTexture = createScreenCanvasTexture(themeRef.current, maxAniso);
    const screenGeo = new THREE.PlaneGeometry(2.68, 1.62);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: screenTexture,
      roughness: 0.18,
      metalness: 0.12,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.22, 0.08);
    rootGroup.add(screenMesh);

    // Part 6: Floating Left Mobile Responsive Card (Moves in Exploded view)
    const mobileCardGroup = new THREE.Group();
    const mobileCardGeo = createRoundedBoxGeo(0.76, 1.32, 0.04, 0.09);
    const mobileCardMesh = new THREE.Mesh(mobileCardGeo, matteCarbonMat);
    mobileCardGroup.add(mobileCardMesh);

    const mobileAccentGeo = new THREE.BoxGeometry(0.54, 0.06, 0.02);
    const mobileAccentMesh = new THREE.Mesh(mobileAccentGeo, accentGlowMat);
    mobileAccentMesh.position.set(0, 0.42, 0.09);
    mobileCardGroup.add(mobileAccentMesh);

    const mobileBlockGeo = new THREE.BoxGeometry(0.54, 0.42, 0.02);
    const mobileBlockMesh = new THREE.Mesh(mobileBlockGeo, brushedAluminumMat);
    mobileBlockMesh.position.set(0, 0.05, 0.09);
    mobileCardGroup.add(mobileBlockMesh);

    mobileCardGroup.position.set(-1.35, 0.08, 0.32);
    mobileCardGroup.rotation.y = 0.22;
    rootGroup.add(mobileCardGroup);

    // Part 7: Floating Right Architecture Card (Moves in Exploded view)
    const rightCardGroup = new THREE.Group();
    const rightCardGeo = createRoundedBoxGeo(0.95, 0.88, 0.04, 0.09);
    const rightCardMesh = new THREE.Mesh(rightCardGeo, matteCarbonMat);
    rightCardGroup.add(rightCardMesh);

    const rightBarGeo = new THREE.BoxGeometry(0.68, 0.06, 0.02);
    const rightBarMesh = new THREE.Mesh(rightBarGeo, cyanGlowMat);
    rightBarMesh.position.set(0, 0.22, 0.09);
    rightCardGroup.add(rightBarMesh);

    const rightSubGeo = new THREE.BoxGeometry(0.68, 0.24, 0.02);
    const rightSubMesh = new THREE.Mesh(rightSubGeo, brushedAluminumMat);
    rightSubMesh.position.set(0, -0.08, 0.09);
    rightCardGroup.add(rightSubMesh);

    rightCardGroup.position.set(1.38, 0.34, 0.28);
    rightCardGroup.rotation.y = -0.22;
    rootGroup.add(rightCardGroup);

    // Part 8 & 9: Top & Bottom Precision Accent Rails
    const railGeo = new THREE.BoxGeometry(1.6, 0.03, 0.03);
    const topRail = new THREE.Mesh(railGeo, accentGlowMat);
    topRail.position.set(0, 1.18, 0.02);
    rootGroup.add(topRail);

    const bottomRail = new THREE.Mesh(railGeo, cyanGlowMat);
    bottomRail.position.set(0, -0.74, 0.02);
    rootGroup.add(bottomRail);

    // Allow dynamic theme updates on the 3D screen
    updateThemeFnRef.current = (nextTheme: DisplayTheme) => {
      const nextTex = createScreenCanvasTexture(nextTheme, maxAniso);
      screenMat.map = nextTex;
      screenMat.needsUpdate = true;
      screenTexture.dispose();
      screenTexture = nextTex;
      if (nextTheme === 'web') {
        accentGlowMat.color.setHex(0xa78bfa);
        accentGlowMat.emissive.setHex(0xa78bfa);
      } else if (nextTheme === 'gift') {
        accentGlowMat.color.setHex(0xf472b6);
        accentGlowMat.emissive.setHex(0xf472b6);
      } else {
        accentGlowMat.color.setHex(0x38bdf8);
        accentGlowMat.emissive.setHex(0x38bdf8);
      }
    };

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 6. On-demand & Damped Transition Loop with Software-WebGL `afterDraw()` Guard
    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let lastTime = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function stepScene(dt: number): boolean {
      const preset = presetRef.current;

      // Target camera coordinates based on preset
      if (preset === 'exploded') {
        _targetCamPos.set(0, 1.35, 5.85);
        _targetLookAt.set(0, 0.18, 0);
      } else if (preset === 'angled') {
        _targetCamPos.set(2.15, 1.45, 4.85);
        _targetLookAt.set(0, 0.18, 0);
      } else {
        _targetCamPos.set(0, 1.15, 5.25);
        _targetLookAt.set(0, 0.18, 0);
      }

      const lambda = 7.5;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetCamPos.x, lambda, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetCamPos.y, lambda, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetCamPos.z, lambda, dt);

      _currentLookAt.x = THREE.MathUtils.damp(_currentLookAt.x, _targetLookAt.x, lambda, dt);
      _currentLookAt.y = THREE.MathUtils.damp(_currentLookAt.y, _targetLookAt.y, lambda, dt);
      _currentLookAt.z = THREE.MathUtils.damp(_currentLookAt.z, _targetLookAt.z, lambda, dt);
      camera.lookAt(_currentLookAt);

      // Exploded view layer separation
      const isExploded = preset === 'exploded';
      const targetLeftX = isExploded ? -1.85 : -1.35;
      const targetLeftZ = isExploded ? 0.82 : 0.32;
      const targetRightX = isExploded ? 1.88 : 1.38;
      const targetRightZ = isExploded ? 0.78 : 0.28;
      const targetScreenZ = isExploded ? 0.28 : 0.08;
      const targetRingZ = isExploded ? -0.58 : -0.25;

      mobileCardGroup.position.x = THREE.MathUtils.damp(
        mobileCardGroup.position.x,
        targetLeftX,
        lambda,
        dt
      );
      mobileCardGroup.position.z = THREE.MathUtils.damp(
        mobileCardGroup.position.z,
        targetLeftZ,
        lambda,
        dt
      );
      rightCardGroup.position.x = THREE.MathUtils.damp(
        rightCardGroup.position.x,
        targetRightX,
        lambda,
        dt
      );
      rightCardGroup.position.z = THREE.MathUtils.damp(
        rightCardGroup.position.z,
        targetRightZ,
        lambda,
        dt
      );
      screenMesh.position.z = THREE.MathUtils.damp(
        screenMesh.position.z,
        targetScreenZ,
        lambda,
        dt
      );
      ringMesh.position.z = THREE.MathUtils.damp(ringMesh.position.z, targetRingZ, lambda, dt);

      // User drag rotation damping
      rootGroup.rotation.y = THREE.MathUtils.damp(
        rootGroup.rotation.y,
        userRotRef.current.yaw,
        lambda,
        dt
      );
      rootGroup.rotation.x = THREE.MathUtils.damp(
        rootGroup.rotation.x,
        userRotRef.current.pitch,
        lambda,
        dt
      );

      const posDelta =
        Math.abs(camera.position.x - _targetCamPos.x) +
        Math.abs(camera.position.z - _targetCamPos.z) +
        Math.abs(mobileCardGroup.position.x - targetLeftX) +
        Math.abs(rootGroup.rotation.y - userRotRef.current.yaw) +
        Math.abs(rootGroup.rotation.x - userRotRef.current.pitch);

      return posDelta > 0.002;
    }

    function requestRender() {
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame((now) => {
        renderDirty = false;
        const dt = Math.min((now - lastTime) / 1000, 0.1) || 0.016;
        lastTime = now;
        const stillMoving = stepScene(dt);
        renderer.render(scene, camera);
        const done = () => {
          renderBusy = false;
          if (renderDirty || stillMoving) {
            requestRender();
          }
        };
        if (isSoftwareGl) afterDraw(done);
        else done();
      });
    }

    requestRenderRef.current = requestRender;
    requestRender();

    // Pointer drag controls on canvas
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      userRotRef.current.yaw = THREE.MathUtils.clamp(
        userRotRef.current.yaw + dx * 0.007,
        -0.75,
        0.75
      );
      userRotRef.current.pitch = THREE.MathUtils.clamp(
        userRotRef.current.pitch + dy * 0.005,
        -0.35,
        0.35
      );
      requestRender();
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const nextW = Math.max(container.clientWidth, 280);
      const nextH = Math.max(container.clientHeight, 320);
      camera.aspect = nextW / nextH;
      camera.updateProjectionMatrix();
      renderer.setSize(nextW, nextH);
      requestRender();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      screenTexture.dispose();
      shadowTex.dispose();
      envTexture.dispose();
      pedestalGeo.dispose();
      standGeo.dispose();
      ringGeo.dispose();
      mainChassisGeo.dispose();
      screenGeo.dispose();
      mobileCardGeo.dispose();
      mobileAccentGeo.dispose();
      mobileBlockGeo.dispose();
      rightCardGeo.dispose();
      rightBarGeo.dispose();
      rightSubGeo.dispose();
      railGeo.dispose();
      nodeGeo.dispose();
      shadowGeo.dispose();
      brushedAluminumMat.dispose();
      matteCarbonMat.dispose();
      chromeTrimMat.dispose();
      accentGlowMat.dispose();
      cyanGlowMat.dispose();
      screenMat.dispose();
      nodeMat.dispose();
      shadowMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      data-testid="three-studio-viewport"
      className="relative w-full h-[380px] sm:h-[440px] rounded-2xl bg-[#080A10] border border-white/[0.08] overflow-hidden select-none"
    >
      {/* Minimal Top-Left Spec Label (Zero side-panel clutter) */}
      <div className="absolute top-3.5 left-4 z-10 pointer-events-none flex items-center gap-2 text-xs text-[#9499AD]">
        <span className="font-semibold text-[#F4F5F8]">Không gian 3D Tương tác</span>
        <span aria-hidden="true">·</span>
        <span>Kéo để xoay góc nhìn</span>
      </div>

      {/* Dedicated Empty WebGL Mount Container */}
      <div
        ref={canvasMountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        aria-label="Khung mô hình 3D kiến trúc giao diện tương tác"
      />

      {/* Unified Collapsible Bottom Control Dock (Single-line compact dock, no backdrop-filter over WebGL) */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 w-[95%] max-w-[540px] flex flex-col items-center">
        <button
          type="button"
          onClick={() => setHudCollapsed((prev) => !prev)}
          aria-expanded={!hudCollapsed}
          className="mb-1 px-2.5 py-0.5 rounded bg-[#0E111B] border border-white/10 text-[11px] font-medium text-[#9499AD] hover:text-[#F4F5F8] transition-colors cursor-pointer"
        >
          {hudCollapsed ? '▴ Điều khiển 3D' : '▾ Thu gọn'}
        </button>

        {!hudCollapsed && (
          <div className="w-full rounded-xl bg-[#0D101A] border border-white/12 px-2 py-1.5 flex items-center justify-between gap-1.5 overflow-x-auto">
            {/* Camera / Exploded View Presets */}
            <div
              role="group"
              aria-label="Góc máy 3D"
              className="flex items-center gap-1 shrink-0"
            >
              <button
                type="button"
                onClick={() => handleSelectPreset('default')}
                className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  cameraPreset === 'default'
                    ? 'bg-[#F4F5F8] text-[#06070A] font-semibold'
                    : 'text-[#9499AD] hover:text-[#F4F5F8]'
                }`}
              >
                Góc chuẩn
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset('exploded')}
                className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  cameraPreset === 'exploded'
                    ? 'bg-[#F4F5F8] text-[#06070A] font-semibold'
                    : 'text-[#9499AD] hover:text-[#F4F5F8]'
                }`}
              >
                Tách lớp 3D
              </button>
              <button
                type="button"
                onClick={() => handleSelectPreset('angled')}
                className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  cameraPreset === 'angled'
                    ? 'bg-[#F4F5F8] text-[#06070A] font-semibold'
                    : 'text-[#9499AD] hover:text-[#F4F5F8]'
                }`}
              >
                Góc nghiêng
              </button>
            </div>

            {/* Screen Theme Switcher */}
            <div
              role="group"
              aria-label="Giao diện màn hình 3D"
              className="flex items-center gap-1 border-l border-white/10 pl-1.5 shrink-0"
            >
              <button
                type="button"
                onClick={() => handleSelectTheme('web')}
                className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  localTheme === 'web'
                    ? 'bg-[#1D2236] text-[#A78BFA] font-semibold'
                    : 'text-[#9499AD] hover:text-[#F4F5F8]'
                }`}
              >
                Web
              </button>
              <button
                type="button"
                onClick={() => handleSelectTheme('gift')}
                className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  localTheme === 'gift'
                    ? 'bg-[#1D2236] text-[#F472B6] font-semibold'
                    : 'text-[#9499AD] hover:text-[#F4F5F8]'
                }`}
              >
                Quà tặng
              </button>
              <button
                type="button"
                onClick={() => handleSelectTheme('fix')}
                className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  localTheme === 'fix'
                    ? 'bg-[#1D2236] text-[#38BDF8] font-semibold'
                    : 'text-[#9499AD] hover:text-[#F4F5F8]'
                }`}
              >
                Responsive
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
