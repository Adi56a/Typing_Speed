# 08 — UI/UX Design System Research & Redesign Strategy

**Date**: November 2026  
**Auditor**: Lead Product Designer & Senior Frontend UI/UX Engineer  
**Scope**: Design philosophy, typography, chromatic hierarchy, typing ergonomics, responsive layout

---

## 1. Design System Philosophy

The CheckTypingSpeeds visual design system is engineered around four guiding tenets:

1. **Zero-Cognitive Distraction**: The typing passage must command primary visual focus. Chrome, navigation bars, and supplementary stats must recede when typing begins.
2. **Warm, Ergonomic Chromatic Palette**: Rather than clinical stark white (`#FFFFFF`) or pure eye-straining OLED black (`#000000`), we employ a tailored warm paper theme (`#F8F6F1` background with `#E8E4DA` borders) and deep dark slate (`#131716` with `#1E2422` card surfaces).
3. **Typography for Instant Optical Scanning**:
   - Primary Sans: `Inter` (geometric, legible at small scales).
   - Monospace Engine: `JetBrains Mono` (ligature-free tabular numbers, clear distinction between `0` and `O`, `1` and `l`, and uniform character bounding boxes preventing layout shifts).
4. **Fluid Motion & Caret Affordance**:
   - The active cursor features subtle CSS hardware-accelerated transitions, giving an immediate tactile feel of forward momentum.
   - Distinct inline states: Dimmed upcoming characters (`opacity: 0.4`), crisp active character with cursor line, subtle green for correct entries (`#10B981`), and high-contrast red for errors (`#EF4444`).

---

## 2. Component Design Specifications

### A. The Typing Workspace Shell
- **Zen / Focus Transition**: As soon as the first keystroke is entered (`status === 'running'`), secondary controls, mode selectors, and footer elements gently fade to `opacity: 0.35` so the user's peripheral vision is exclusively locked on the active word.
- **Top Metrics Bar**: Displays remaining seconds in bold tabular numbers, live Net WPM, accuracy percentage, and raw error count.
- **Quick Controls Bar**: Clean segmented controls allowing instantaneous toggling between:
  - *Modes*: `Time` | `Words` | `Quotes` | `Custom`
  - *Durations*: `15s` | `30s` | `60s` | `120s` | `5m`
  - *Word Counts*: `10` | `25` | `50` | `100`
  - *Modifiers*: `Punctuation` | `Numbers`
  - *View*: `Keyboard Guide` toggle

### B. The Results & Analytics Dashboard
- **Hero Performance Metric**: Massive, clear Net WPM score flanked by Accuracy % and Raw WPM.
- **Detailed Character Breakdown Matrix**:
  - Correct keystrokes (`green`)
  - Incorrect keystrokes (`red`)
  - Extra characters
  - Missed characters
- **Consistency Score**: Statistical calculation measuring the variance of keystroke inter-arrival times across the test. High consistency indicates steady touch-typing cadence without hesitation pauses.
- **Action Toolbar**:
  - `Retake Test` (`Tab + Enter` shortcut)
  - `Next Test`
  - `Download Certificate` (Generates verified SVG/PDF credential)
  - `Share Results Card` (One-click clipboard copy of ASCII/SVG achievement summary)

### C. Touch-Typing Academy Interface
- Interactive 10-lesson module:
  - Step 1: Home Row Anchors (`F`, `J`, and `Space`)
  - Step 2: Home Row Left Hand (`A`, `S`, `D`, `F`)
  - Step 3: Home Row Right Hand (`J`, `K`, `L`, `;`)
  - Step 4: Full Home Row with Reaches (`G`, `H`, `'`)
  - Step 5: Top Row Left (`Q`, `W`, `E`, `R`, `T`)
  - Step 6: Top Row Right (`Y`, `U`, `I`, `O`, `P`)
  - Step 7: Bottom Row Left (`Z`, `X`, `C`, `V`)
  - Step 8: Bottom Row Right (`B`, `N`, `M`, `,`, `.`)
  - Step 9: Number Row Drills (`1` through `0`)
  - Step 10: Master Touch-Typing Graduation Test
- **Visual Hand & Finger Overlay**: Displays color-coded fingers matching the target key on the virtual keyboard.

### D. SSC Government Exam Simulator Console
- **Two-Pane Exam Layout**: Split-screen design replicating official Indian Staff Selection Commission software:
  - Top Pane: Fixed source passage containing exactly 2,000 keystrokes (~400 words) for CGL DEST, or 1,750 keystrokes for CHSL.
  - Bottom Pane: Candidate typing input area with full backspace functionality.
- **Official Exam Scoring**:
  - Live Key Depressions Per Hour (KDPH) counter.
  - Live Full Mistakes vs. Half Mistakes breakdown.
  - Final Pass / Fail qualification calculation evaluated against the 7% (General/UR) or 10% (Reserved) category error ceiling.

---

## 3. Mobile & Multi-Device Usability Matrix

1. **iOS Safari Full Compatibility**:
   - `fontSize: '16px'` on hidden typing input strictly prevents iOS Safari viewport auto-zoom.
   - `onBeforeInput` interceptor handles predictive text suggestions, swipe inputs, and smart punctuation (curly quotes `'` and `"` normalized to standard ASCII).
2. **Android Virtual Keyboard Compatibility**:
   - Handles composition events (`compositionstart`, `compositionend`) and `deleteContentBackward` backspace events seamlessly.
3. **Responsive Viewport Breakpoints**:
   - `sm` (640px): Compact header with collapsible hamburger menu.
   - `md` (768px): Full navigation bar, side-by-side metric tiles.
   - `lg` (1024px): Full desktop layout with virtual keyboard guide.
