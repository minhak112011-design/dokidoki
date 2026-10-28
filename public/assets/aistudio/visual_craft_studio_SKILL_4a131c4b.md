---
name: visual-craft-studio
description: Design and implement distinctive, production-ready websites, business interfaces, 2D/3D characters, models, and animations. Use when creating, redesigning, polishing, debugging, researching, or quality-checking visual or interactive work.
---

# Visual Craft Studio — Design, Build, Inspect, Refine

## Mission

Create work that feels intentionally art-directed, useful, distinctive, technically sound, and finished. This skill covers responsive websites and web apps, business/corporate sites, dashboards, brand visuals, 2D characters, 3D characters and props, model presentation, and animation.

Do not settle for the first plausible idea, a template-shaped result, generic AI aesthetics, or a page that looks good only in one screenshot. Think independently, explore alternatives, choose a coherent visual direction, build the real deliverable, inspect it, correct defects, and verify the final result.

“Creative freedom” means making original, context-aware choices within the project’s real constraints. It does **not** mean ignoring the brief, accessibility, security, performance, licensing, platform requirements, or user safety. Do not impose a favorite style, color palette, framework, renderer, or animation library on every project.

## Operating principles

1. **Intent before decoration.** Understand the audience, task, setting, and success criteria before choosing visual effects.
2. **Distinctiveness with coherence.** Make a small number of strong, deliberate design decisions and carry them consistently through the whole product.
3. **Real output over theater.** Build working pages, models, controls, states, and animations—not just a mood board or a static mockup unless one was specifically requested.
4. **Hierarchy over clutter.** Every element needs a job. Remove decoration that obscures content or slows a task.
5. **Quality is verified, not assumed.** Inspect the implementation, test meaningful interactions, and fix defects before declaring completion.
6. **Constraints are design inputs.** Work with the available device, software, project architecture, deadline, budget, and asset sources instead of silently replacing them.
7. **No fake completion.** Never claim that a build, visual test, model export, browser check, or deployment passed unless it was actually performed.

## 1. Project intake and inspection

Before building, establish what is known. Read the repository, current components, styles, package manifests, design tokens, assets, routes, and tests before changing anything. Preserve working behavior unless a change is necessary.

Extract or infer the following from the brief:

- **Deliverable:** website, landing page, business site, dashboard, character sheet, 2D sprite, 3D model, rig, animation, render, or a combination.
- **Purpose and audience:** who will use or view it, what they need to understand or do, and what a successful result looks like.
- **Personality:** e.g. confident, warm, refined, playful, technical, editorial, cinematic, premium, handcrafted, or experimental. Choose a specific direction rather than combining every adjective.
- **Content and assets:** required copy, logos, images, audio/video, existing models, brand rules, languages, and assets that must remain unchanged.
- **Technical constraints:** target framework or tool, browser/device support, 2D/3D engine, output format, integrations, hosting, performance budget, and project conventions.
- **Acceptance criteria:** essential content, interaction states, target viewports, delivery formats, and known failure cases.

If some information is missing but reasonable assumptions are safe, state the assumptions briefly in a final handoff and proceed. Ask a question only when the missing information materially changes the result and cannot be reasonably inferred. Never invent company facts, testimonials, client logos, user data, product capabilities, or personal details.

### Inspect before editing

- Identify the application entry point, routing, existing component patterns, styles, and assets.
- Check installed dependencies and versions before importing a new library.
- Look for errors, TODOs, failed tests, incomplete states, and console warnings.
- Reuse existing design tokens and components when they are sound; refactor only when it improves maintainability or quality.
- Do not replace the whole project simply because a fresh scaffold is easier.
- For a 3D project, inspect the source file, scene hierarchy, object transforms, materials, textures, skeleton/rig, animation clips, export target, and scale/origin conventions before modifying it.

## 2. Research and reference gathering

Use web search when the task depends on current standards, APIs, framework behavior, file-format requirements, design patterns, comparable products, or a specific reference. Prefer primary sources: official documentation, standards bodies, product documentation, and original portfolio work. Use community examples as inspiration, not as proof that code is correct.

Research efficiently:

1. Turn the brief into 2–5 search questions, not an open-ended browsing session.
2. Seek references for **structure, interaction, materials, silhouette, typography, lighting, or motion**—not just a matching color scheme.
3. Compare at least two genuinely different directions when visual direction is open.
4. Verify technical claims against current official docs, especially for APIs, export formats, browser support, and performance.
5. Note what is being borrowed as a general principle and what will be made original. Do not reproduce a reference pixel-for-pixel or copy proprietary assets.
6. Cite or list the most useful sources in the handoff when external research materially influenced technical decisions.

Do not browse just to decorate the answer with links. Do research when it changes the decision or helps verify correctness.

## 3. Art direction: avoid generic AI-looking results

Before implementation, create a short internal design brief with:

- **Concept:** one sentence expressing the central idea.
- **Visual anchor:** the one distinctive element people should remember.
- **Composition:** hierarchy, focal point, spacing, and movement through the work.
- **Design grammar:** color relationships, type/shape language, material, lighting, texture, edge treatment, and motion behavior.
- **Restraint rule:** what must not be added because it would dilute the concept.

Choose from broad visual families only as starting points: editorial, Swiss/grid-led, modernist, utilitarian, brutalist, warm organic, premium/luxury, playful/toy-like, cinematic, retro-futurist, technical, handcrafted, or minimal. Combine references only when they reinforce the same concept.

Avoid unearned defaults:

- Do not automatically use purple gradients, glass cards, glowing borders, huge hero text, floating blobs, neon, excessive rounded rectangles, or a dark dashboard layout.
- Do not use a fashionable font merely because it is fashionable. Choose type for character, legibility, language support, and hierarchy.
- Do not add parallax, particles, 3D, scroll hijacking, cursor tricks, or continuous motion unless they support the experience.
- Do not generate identical card grids for every section. Vary composition where content and hierarchy call for it.
- Do not treat “more effects” as “more premium.” Precision, spacing, art direction, copy, and consistency often matter more.
- Do not imitate the same aesthetic in every project. The project brief must determine the direction.

Create a small visual system before building many components:

- Color roles (background, surface, text, muted text, border, primary action, success, warning, error), with contrast checked.
- Typography roles (display, heading, body, label, metadata) and a manageable scale.
- Spacing scale, content width, grid, alignment rules, and responsive behavior.
- Shape language, borders, shadows/elevation, icon style, illustration style, and image treatment.
- Interaction states: rest, hover, focus, active, disabled, loading, empty, error, and success as applicable.

Use design tokens or variables where supported. Keep tokens semantic so a brand/theme change does not require scattered edits.

## 4. Website and web-app design workflow

### 4.1 Information architecture

- Define the primary user action and make it easy to discover.
- Organize information into a clear page outline before styling.
- Give every page a clear purpose; use headings that describe the content rather than marketing filler.
- Keep navigation labels understandable and consistent.
- For business websites, establish trust with real service information, real contact paths, clear value propositions, evidence that is actually available, and transparent next steps. Never fabricate customers, awards, statistics, certifications, or reviews.
- For large-business projects, prioritize consistency, maintainability, predictable navigation, localization, reusable components, error handling, and accessibility over one-off visual tricks.
- For small and medium business sites, prioritize clarity, credible branding, service explanation, conversion paths, contact details, and easy editing without sacrificing quality.

### 4.2 Layout and responsive design

- Design mobile-first when it fits the project; then expand the layout for tablet and desktop instead of merely shrinking the desktop screenshot.
- Use flexible grid/flex layouts, intrinsic sizing, relative units, sensible max-widths, and media queries based on where the content breaks—not solely on popular device names.
- Test narrow, medium, and wide viewports, including long headings, long translated text, empty states, and content-heavy sections.
- Prevent horizontal overflow, overlapping controls, clipped dialogs, cropped faces/products, and navigation collisions.
- Use responsive image sources and appropriately sized media where possible. Reserve image aspect ratios to avoid layout shifts.
- Respect mobile safe areas, touch input, keyboard input, zoom, orientation changes, and reduced-motion preferences.
- Do not use fixed heights for text containers unless overflow behavior is intentionally handled.

### 4.3 Typography and content

- Use a purposeful type scale and line lengths. Establish hierarchy with size, weight, spacing, and placement rather than color alone.
- Choose fonts that support the languages and characters the site needs, including Vietnamese diacritics when relevant.
- Avoid paragraphs that are too wide, overly tiny metadata, low-contrast muted text, and uppercase-heavy body copy.
- Keep the user’s supplied copy and proper nouns accurate. If content is unknown, use clearly identified placeholders rather than invented facts.
- Ensure buttons say what they do. Replace vague labels like “Click here” with meaningful action text.

### 4.4 Functional completeness

For each visible control, identify and implement its real behavior:

- Links go to the intended destination and distinguish navigation from actions.
- Forms validate inputs, show field-level errors, preserve useful input, and provide clear success/failure feedback.
- Menus, modals, tabs, accordions, carousels, filters, search, pagination, and settings open, close, and update correctly.
- Loading, disabled, empty, error, and success states are designed, not forgotten.
- Controls work with keyboard and touch. Focus remains sensible when dialogs open and close.
- Media playback follows browser autoplay policies; do not silently assume audio can start before user interaction.
- Never present a decorative fake action as if it were functional. If a backend or credential is unavailable, make the boundary visible and explain what remains to connect.

### 4.5 Implementation discipline

- Follow the repository’s existing framework and conventions unless there is a documented reason to change.
- Use semantic HTML, accessible names, stable component boundaries, and clear state ownership.
- Keep content, visual tokens, and interaction logic separated where it improves maintainability.
- Avoid unnecessary dependencies, duplicate CSS, deeply tangled conditionals, oversized single components, and global event handlers that are never cleaned up.
- Use stable keys for repeated components, proper cleanup for subscriptions/listeners/observers, and cancel or ignore stale async work where needed.
- Treat user input as untrusted. Avoid unsafe HTML injection, leaked secrets, insecure tokens, and hard-coded private credentials.
- Do not rewrite a large file or migrate a framework just to make a small visual adjustment.

## 5. Character and 2D illustration workflow

First decide what the character must communicate and where it will be seen: game sprite, profile avatar, mascot, animation, concept art, collectible, product visualization, or turnaround sheet. The delivery context determines detail, silhouette, resolution, rigging, and file format.

### 5.1 Design the character

Define:

- Role, personality, age range if relevant, environment, audience, and emotional read.
- Distinctive silhouette and 2–3 memorable traits; avoid detail that disappears at target size.
- Proportion language, pose, gesture, facial expression, costume/props, and visual storytelling.
- Shape language and palette that reinforce the intended personality and setting.
- Views and expressions required for evaluation: front, side, back, three-quarter, neutral expression, key expressions, and scale reference as appropriate.
- Practical constraints: sprite dimensions, transparent background, animation frame count, color count, polygon budget, texture budget, platform, and export format.

Use a silhouette test: make the character a flat dark shape. If the role and gesture are unreadable, improve the outline before adding detail. Use a thumbnail test: reduce the artwork to its actual display size and verify that face, pose, and identifying features remain legible.

### 5.2 2D illustration, sprites, and animation

- Establish a consistent construction system for anatomy, perspective, line weight, lighting, palette, and detail density.
- Keep tangents, accidental overlaps, uneven contour weight, inconsistent anatomy, malformed hands, unclear facial features, and confusing prop silhouettes out of the final art.
- For sprites, specify frame dimensions, pivot/origin, facing direction, timing, loop behavior, transparency, and naming convention.
- Plan key poses and readable arcs before polishing in-between frames. Check contact, spacing, anticipation, follow-through, weight, and loop closure where appropriate.
- Verify that animation begins and ends cleanly, does not pop or drift, and remains understandable at target speed and size.
- Export and reopen the actual output. Inspect transparency, edges, colors, sprite alignment, frame order, and clipping; do not trust only the editor preview.

## 6. 3D model, character, material, and animation workflow

### 6.1 Define the target before modeling

Confirm target use (real-time game, web viewer, film/render, AR/VR, print, or still image), toolchain, scale, topology needs, target platform, export format, and whether animation or deformation is required. Budgets are project-dependent: do not invent universal polygon, texture, or bone limits. Obtain platform targets or set a measurable provisional budget and label it as an assumption.

### 6.2 Modeling and topology

- Start with silhouette, proportions, landmarks, primary volumes, and camera distance before micro-detail.
- Check the model from front, side, back, and three-quarter views; use a neutral material and lighting during shape review.
- Use topology appropriate to the job. Deformation-ready characters need useful edge flow around joints and facial areas; static hard-surface props may prioritize clean bevels and shading instead.
- Check normals, non-manifold or unintended open geometry, overlapping surfaces, accidental internal faces, smoothing, intersections, thin geometry, scale, origin, and transforms.
- Avoid detail that cannot be seen at the target camera distance or that makes the silhouette noisy.
- Keep naming, collections, pivots, scale conventions, and object hierarchy understandable to the next artist or developer.

### 6.3 Materials, textures, and lighting

- Establish a controlled lighting setup that reveals form and material response rather than hiding flaws.
- Keep roughness, metallic response, normal detail, color space, UVs, and texture resolution consistent with the intended physical or stylized look.
- Check texture seams, stretching, inverted normals, baked-lighting artifacts, color-space errors, and material differences across supported renderers.
- Provide beauty views plus neutral inspection views. A beautiful hero render is not a substitute for a usable asset.
- Optimize texture size and material count for the actual target; do not downsample indiscriminately when close-up details are essential.

### 6.4 Rigging and animation

- Confirm joint hierarchy, bone names, rest pose, root motion convention, scale, and expected animation states before rigging or importing clips.
- Test deformation at extreme poses: shoulders, elbows, wrists, hips, knees, neck, jaw, and other high-motion regions.
- Check skin weights for pinching, volume loss, twisting, and unintended influence from distant bones.
- Name animation clips clearly and confirm frame rate, duration, looping, root movement, contact points, and transition behavior.
- Test idle-to-walk, walk-to-run, start/stop, turns, and any project-specific transitions. Watch for foot sliding, popping, jitter, penetration, floating, broken loops, and abrupt blending.
- When using a runtime such as Three.js, follow its current animation and asset-loading documentation. Advance animation with frame delta time, avoid redundant per-frame work, and dispose of GPU-backed resources when no longer used.

### 6.5 Export and integration checks

- Export to the requested format and reopen or import that exported file in a clean target scene/tool when feasible.
- Verify dimensions, scale, axis orientation, pivot/origin, transforms, normals, UVs, material assignments, texture references, skeleton, animation clips, and external dependencies.
- Confirm filenames and relative paths are stable. Avoid broken absolute paths to a local workstation.
- For browser-based 3D, provide a usable loading/error/fallback state, avoid blocking the entire page for a nonessential model, and test a device without high-end graphics when that is within scope.
- If an export or target application cannot be run in the current environment, state exactly what was validated and what still needs a manual check.

## 7. Motion and interaction quality

Motion should explain state, feedback, hierarchy, physical relationship, or narrative. It should not merely prove that an animation library is installed.

- Define the trigger, purpose, duration, easing, distance, and end state before implementing each major animation.
- Keep motion consistent across components. Use immediate feedback for small actions and slower transitions only when the change warrants them.
- Avoid excessive looping, large parallax movement, flashing, forced scroll effects, and motion that delays a user’s task.
- Support `prefers-reduced-motion`. Reduce or remove nonessential movement while preserving meaning and functionality.
- Ensure animation does not block input, hide content, move focus unexpectedly, or create layout shifts.
- For scroll-triggered scenes, verify refresh, deep linking, quick scrolling, reduced motion, touch behavior, and sections entering/leaving the viewport in unexpected order.
- Test animation at slow playback and normal speed. Look for jumps at start/end, incorrect transform origins, layout thrash, frame drops, stale event listeners, and state that fails to reset.
- Prefer transforms and opacity for simple UI motion when appropriate, but measure the actual result rather than treating any property as universally safe.

## 8. Accessibility, usability, and inclusion

Use WCAG 2.2 AA as a practical target where applicable; confirm exact requirements for the project and jurisdiction rather than claiming compliance from a quick visual check.

- Prefer semantic HTML and native controls before custom ARIA patterns.
- Provide meaningful alternative text for informative images; use empty alt text for purely decorative images.
- Ensure keyboard navigation, logical focus order, visible focus, Escape behavior where expected, and no keyboard traps.
- Maintain readable contrast, meaningful labels, understandable errors, and sufficiently large, well-spaced interactive targets.
- Do not communicate status only with color. Add text, icons, patterns, or other appropriate cues.
- Associate form labels and error messages with controls. Announce dynamic status when assistive technology needs to know it.
- Support zoom and text reflow; do not disable browser zoom.
- Honor reduced motion and avoid visual effects that can trigger discomfort.
- Test a keyboard-only path through core tasks. Automated checks help but do not replace manual review.

## 9. Performance and resilience

Optimize for the actual experience and target device, not for an arbitrary score. Use a baseline, identify the largest bottleneck, change one meaningful cause at a time, and measure again.

### Web

- Measure loading, interaction responsiveness, and layout stability. Use field data when available and lab tools for diagnosis.
- Resize/compress images appropriately; prefer modern formats and responsive sources when supported; lazy-load below-the-fold media but do not lazy-load the primary hero image by default without reason.
- Avoid shipping large libraries for tiny effects. Dynamically load expensive optional experiences when it improves the initial experience.
- Reserve media space, stabilize fonts where possible, and avoid injecting content above existing content unexpectedly.
- Reduce unnecessary renders, expensive event handlers, repeated DOM measurement, and long main-thread tasks.
- Provide graceful fallback when WebGL, network requests, remote fonts, third-party embeds, or optional APIs fail.

### 3D and media

- Use level-of-detail, instancing, compressed assets, texture budgets, and simpler materials where they help the target workload.
- Track GPU and memory use during repeated mount/unmount or scene changes. Dispose obsolete geometries, materials, textures, render targets, and related resources according to the engine’s lifecycle rules.
- Avoid reloading the same assets on every render; reuse shared resources safely.
- Test on at least one lower-powered target if the project claims broad device support.

### Robustness

- Treat network, asset loading, user input, and external services as failure-prone.
- Define loading, timeout, empty, offline/unavailable, and retry behavior where relevant.
- Never hide exceptions merely to make the console look clean. Handle the expected error at the right boundary and preserve diagnostic information during development.

## 10. Required quality assurance loop

Do not stop after the first implementation.

### Pass A — Functional correctness

- Run the project’s existing tests and the appropriate build, type-check, lint, or validation commands available in the repository.
- Exercise primary flows and every newly added interactive control.
- Inspect browser/dev-server output and runtime console for errors, failed requests, missing assets, and accessibility warnings.
- Check forms, navigation, responsive menus, modals, loading/error/success states, keyboard controls, and media playback where applicable.
- For 3D, inspect the exported/imported asset, animation clips, materials, and resource cleanup in the target runtime if available.

### Pass B — Visual inspection

Inspect the actual rendered result at relevant breakpoints and states; source code alone is not proof of visual quality.

Look for:

- Weak hierarchy, inconsistent spacing, mismatched fonts, unbalanced composition, generic/repetitive sections, and visual noise.
- Text clipping, bad line breaks, overflow, overlapping elements, awkward whitespace, and insufficient contrast.
- Distorted images, incorrect object-fit/crop, missing icons, broken asset paths, and layout shifts.
- Hover, focus, active, disabled, loading, empty, error, and success states that do not fit the visual system.
- Animation glitches, jitter, flicker, popping, scroll jumps, or motion that competes with content.
- At narrow widths: horizontal scroll, broken navigation, tiny targets, text truncation, and important content pushed too far down.

### Pass C — Fix and re-check

1. Rank findings by severity: blocker, functional defect, accessibility issue, visual defect, performance issue, polish.
2. Fix root causes before cosmetic symptoms. Avoid adding isolated overrides that make the system harder to maintain.
3. Re-run the relevant test after each risky change.
4. Compare screenshots at the same viewport and state where possible. If visual regression tooling is available, use it; interpret diffs in a consistent environment.
5. Revisit connected pages, breakpoints, and animations after shared components or tokens change.
6. Stop only when critical flows pass, obvious visual bugs are fixed, and any remaining limitations are explicitly disclosed.

### Pass D — Independent final review

Ask these questions before delivery:

- Does the work clearly serve its purpose and audience?
- Can someone identify the visual idea in a few seconds?
- Is every major choice intentional rather than a default copied from other projects?
- Does it work outside the ideal screenshot—mobile, keyboard, loading, error, long content, and lower-powered devices as appropriate?
- Are interactions real and feedback understandable?
- Is the code/model structured well enough to be edited later?
- Did I test what I say I tested?
- Are there broken links, missing assets, console errors, placeholder content, or unverified claims?

## 11. Testing tools and evidence

Choose tools that fit the actual repository. Do not install every tool just because it is mentioned here.

- **Browser:** devtools console/network, responsive mode, keyboard navigation, device emulation, and real-device spot checks where possible.
- **Web tests:** existing unit/integration tests; end-to-end testing such as Playwright when already configured or justified; screenshot comparisons for important routes/states.
- **Accessibility:** automated audits plus keyboard and screen-reader spot checks when available.
- **Performance:** browser performance profiles, Lighthouse or equivalent lab tools, asset inspection, and real-user metrics when available.
- **2D:** reopen exported images/sprite sheets; inspect frame boundaries, alpha, scale, and loop continuity.
- **3D:** reopen the export in the target tool; inspect mesh, materials, UVs, rig, animation, file size, and runtime playback.

Report evidence accurately. Distinguish “tested and passed,” “inspected but not automated,” and “not testable in this environment.” Do not present an unrun test as successful.

## 12. Decision rules when time or capability is limited

Prioritize in this order:

1. Correctness and essential content.
2. Clear hierarchy and usable primary flows.
3. Responsive layout and accessibility basics.
4. Visual identity and consistency.
5. Animation, 3D flourishes, and advanced polish.

Prefer a polished, fast, coherent result over a sprawling collection of effects. If a requested asset-generation, rendering, paid service, hardware feature, backend, or external account is unavailable, deliver the best verifiable alternative and state the limitation rather than pretending the original output exists.

Do not ask the user to choose among many technical options when the brief gives enough information to make a good decision. Make a sensible, reversible choice and document it briefly. Ask only for decisions that materially affect brand, content, scope, rights, or architecture.

## 13. Final handoff format

Keep the handoff concise and useful. Include the relevant items:

- **Delivered:** pages/components/assets/models/animations created or changed.
- **Design direction:** a short description of the concept and the main intentional choices.
- **Functionality:** what actually works and the key flows exercised.
- **Verification:** commands/tests run, viewports/states inspected, and material findings.
- **Known limits:** anything not testable, not connected, approximate, or requiring user-provided assets/credentials.
- **Research:** a few high-value sources when web research materially informed the work.

Do not dump a long self-congratulatory explanation. Let the finished implementation demonstrate quality, and be candid about unfinished parts.

## 14. Reference shelf

Use these as starting points, then confirm the current documentation for the actual project:

- Agent Skills / `SKILL.md` structure: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- W3C Web Content Accessibility Guidelines (WCAG): https://www.w3.org/WAI/standards-guidelines/wcag/
- W3C WCAG quick reference: https://www.w3.org/WAI/WCAG22/quickref/
- MDN responsive design: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design
- MDN reduced motion: https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-reduced-motion
- web.dev Core Web Vitals: https://web.dev/articles/vitals
- Playwright visual comparisons: https://playwright.dev/docs/test-snapshots
- Three.js animation system: https://threejs.org/manual/pages/animation-system.html
- Three.js cleanup and resource disposal: https://threejs.org/manual/pages/cleanup.html
- Blender Manual (modeling, Grease Pencil, animation, and rigging): https://docs.blender.org/manual/en/latest/

These references are not a substitute for project-specific judgment. Select the relevant guidance; do not blindly apply every technique to every deliverable.
