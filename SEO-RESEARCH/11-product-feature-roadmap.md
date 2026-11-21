# 11 — Product Feature Roadmap & Engineering Architecture

**Date**: November 2026  
**Auditor**: Principal Product Architect & Senior Full-Stack Engineer  
**Domain**: `https://checktypingspeeds.com`

---

## 1. Feature Architecture Breakdown

### Module 1: Core Typing Engine Extensions
1. **Extended Test Modes**:
   - `time`: 15s, 30s, 60s (1m), 120s (2m), 300s (5m), 600s (10m), 900s (15m).
   - `words`: 10 words, 25 words, 50 words, 100 words. (Test terminates immediately upon typing the final character of the target word count).
   - `quote`: Curated literary and technological quotes across Short (<100 chars), Medium (100–250 chars), and Long (>250 chars) with author attribution.
   - `custom`: Direct text input area allowing users to paste custom interview paragraphs, legal briefs, medical transcriptions, or exam prompts.
2. **Enhanced Metrics**:
   - *Gross WPM*: $\frac{\text{Total Characters Typed} / 5}{\text{Minutes Elapsed}}$
   - *Net WPM*: $\text{Gross WPM} - \frac{\text{Uncorrected Errors}}{\text{Minutes Elapsed}}$
   - *Consistency Percentage*: $100 \times \left(1 - \frac{\sigma_{\text{intervals}}}{\mu_{\text{intervals}}}\right)$
   - *Raw Keystroke Accuracy*: $\frac{\text{Correct Keystrokes}}{\text{Total Keystrokes}} \times 100$

### Module 2: Touch-Typing Academy (`/typing-lessons/`)
1. **Structured 10-Step Curriculum**:
   - Lesson 1: Tactile Home Row Anchors (`F`, `J`, and `Space`)
   - Lesson 2: Left Hand Home Keys (`A`, `S`, `D`, `F`)
   - Lesson 3: Right Hand Home Keys (`J`, `K`, `L`, `;`)
   - Lesson 4: Center Reaches (`G`, `H`) and Enter
   - Lesson 5: Top Row Left (`Q`, `W`, `E`, `R`, `T`)
   - Lesson 6: Top Row Right (`Y`, `U`, `I`, `O`, `P`)
   - Lesson 7: Bottom Row Left (`Z`, `X`, `C`, `V`)
   - Lesson 8: Bottom Row Right (`B`, `N`, `M`, `,`, `.`)
   - Lesson 9: Number Row Drills (`1` through `0`)
   - Lesson 10: Comprehensive Speed Mastery Drill
2. **Interactive Hand & Finger Guidance**:
   - Color-coded finger zones: Left Pinky (Pink), Left Ring (Orange), Left Middle (Yellow), Left Index (Green), Right Index (Blue), Right Middle (Indigo), Right Ring (Purple), Right Pinky (Rose).

### Module 3: Indian Government Exam Simulator (`/ssc-typing-test/`)
1. **Two-Pane Split-Screen Exam Layout**:
   - Master passage pane (top) displaying authentic government exam text (e.g. parliamentary speeches, economic reviews, administrative directives).
   - Candidate input pane (bottom) with word wrapping and full backspace editing support.
2. **Standard SSC Exam Modes**:
   - **SSC CGL DEST**: 15 minutes, 2,000 key depressions (~27 WPM, 8,000 KDPH).
   - **SSC CHSL**: 10 minutes, 1,750 key depressions (35 WPM English, 10,500 KDPH).
3. **Official Staff Selection Commission Evaluation Algorithm**:
   - *Full Mistakes* (Value = 1.0): Word omissions, substitutions, additions, and severe transpositions.
   - *Half Mistakes* (Value = 0.5): Spacing errors, capitalization mismatches, and minor punctuation slips.
   - *Total Error Percentage*: $\frac{\text{Full Mistakes} + (0.5 \times \text{Half Mistakes})}{\text{Total Words in Passage}} \times 100$
   - *Qualification Status*:
     - Unreserved / EWS: $\le 7\%$ error = **QUALIFIED**; $> 7\%$ error = **DISQUALIFIED**.
     - OBC / SC / ST / PwD: $\le 10\%$ error = **QUALIFIED**; $> 10\%$ error = **DISQUALIFIED**.

### Module 4: Enhanced Analytics & Shareable Credentials
1. **Weak Key Diagnostic**: Computes the top 3 most frequently mistyped characters during the session and suggests targeted practice drills.
2. **Printable / Downloadable Completion Certificate**:
   - Client-side SVG certificate displaying user name, Net WPM, accuracy percentage, test duration, verification timestamp, and official CheckTypingSpeeds digital seal.
3. **Local History Persistence**:
   - Stores recent test records in `localStorage` (`cts_test_history_v2`).
   - Calculates all-time personal best WPM and running average accuracy.
