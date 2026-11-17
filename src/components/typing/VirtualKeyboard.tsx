import React from 'react';

interface VirtualKeyboardProps {
  activeChar?: string;
  className?: string;
}

// Finger assignment color helper
// 0: Left Pinky, 1: Left Ring, 2: Left Middle, 3: Left Index, 4: Thumb,
// 5: Right Index, 6: Right Middle, 7: Right Ring, 8: Right Pinky
interface KeyDef {
  key: string;
  display: string;
  finger: number;
  width?: string;
}

const KEYBOARD_ROWS: KeyDef[][] = [
  // Row 1: Numbers
  [
    { key: '`', display: '~', finger: 0 },
    { key: '1', display: '1', finger: 0 },
    { key: '2', display: '2', finger: 1 },
    { key: '3', display: '3', finger: 2 },
    { key: '4', display: '4', finger: 3 },
    { key: '5', display: '5', finger: 3 },
    { key: '6', display: '6', finger: 5 },
    { key: '7', display: '7', finger: 5 },
    { key: '8', display: '8', finger: 6 },
    { key: '9', display: '9', finger: 7 },
    { key: '0', display: '0', finger: 8 },
    { key: '-', display: '-', finger: 8 },
    { key: '=', display: '=', finger: 8 },
    { key: 'Backspace', display: '⌫', finger: 8, width: 'w-14 sm:w-16' },
  ],
  // Row 2: Top / QWERTY
  [
    { key: 'Tab', display: 'Tab', finger: 0, width: 'w-12 sm:w-14' },
    { key: 'q', display: 'Q', finger: 0 },
    { key: 'w', display: 'W', finger: 1 },
    { key: 'e', display: 'E', finger: 2 },
    { key: 'r', display: 'R', finger: 3 },
    { key: 't', display: 'T', finger: 3 },
    { key: 'y', display: 'Y', finger: 5 },
    { key: 'u', display: 'U', finger: 5 },
    { key: 'i', display: 'I', finger: 6 },
    { key: 'o', display: 'O', finger: 7 },
    { key: 'p', display: 'P', finger: 8 },
    { key: '[', display: '[', finger: 8 },
    { key: ']', display: ']', finger: 8 },
    { key: '\\', display: '\\', finger: 8 },
  ],
  // Row 3: Home Row
  [
    { key: 'CapsLock', display: 'Caps', finger: 0, width: 'w-14 sm:w-16' },
    { key: 'a', display: 'A', finger: 0 },
    { key: 's', display: 'S', finger: 1 },
    { key: 'd', display: 'D', finger: 2 },
    { key: 'f', display: 'F', finger: 3 }, // tactile bump
    { key: 'g', display: 'G', finger: 3 },
    { key: 'h', display: 'H', finger: 5 },
    { key: 'j', display: 'J', finger: 5 }, // tactile bump
    { key: 'k', display: 'K', finger: 6 },
    { key: 'l', display: 'L', finger: 7 },
    { key: ';', display: ';', finger: 8 },
    { key: "'", display: "'", finger: 8 },
    { key: 'Enter', display: '↵ Enter', finger: 8, width: 'w-16 sm:w-20' },
  ],
  // Row 4: Bottom Row
  [
    { key: 'Shift', display: '⇧ Shift', finger: 0, width: 'w-16 sm:w-20' },
    { key: 'z', display: 'Z', finger: 0 },
    { key: 'x', display: 'X', finger: 1 },
    { key: 'c', display: 'C', finger: 2 },
    { key: 'v', display: 'V', finger: 3 },
    { key: 'b', display: 'B', finger: 3 },
    { key: 'n', display: 'N', finger: 5 },
    { key: 'm', display: 'M', finger: 5 },
    { key: ',', display: ',', finger: 6 },
    { key: '.', display: '.', finger: 7 },
    { key: '/', display: '/', finger: 8 },
    { key: 'ShiftRight', display: '⇧ Shift', finger: 8, width: 'w-16 sm:w-20' },
  ],
  // Row 5: Space Row
  [
    { key: 'Ctrl', display: 'Ctrl', finger: 0, width: 'w-12 sm:w-14' },
    { key: 'Alt', display: 'Alt', finger: 4, width: 'w-12 sm:w-14' },
    { key: ' ', display: 'Space', finger: 4, width: 'flex-1 max-w-[280px] sm:max-w-[340px]' },
    { key: 'AltRight', display: 'Alt', finger: 4, width: 'w-12 sm:w-14' },
    { key: 'CtrlRight', display: 'Ctrl', finger: 8, width: 'w-12 sm:w-14' },
  ],
];

// Map shifted symbols to their base keys
const SYMBOL_MAP: Record<string, string> = {
  '!': '1',
  '@': '2',
  '#': '3',
  '$': '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  '_': '-',
  '+': '=',
  '{': '[',
  '}': ']',
  '|': '\\',
  ':': ';',
  '"': "'",
  '<': ',',
  '>': '.',
  '?': '/',
  '~': '`',
};

const FINGER_LABELS = [
  'Left Pinky',
  'Left Ring',
  'Left Middle',
  'Left Index',
  'Thumbs',
  'Right Index',
  'Right Middle',
  'Right Ring',
  'Right Pinky',
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ activeChar = '', className = '' }) => {
  const normalizedTarget = activeChar.toLowerCase();
  const baseKey = SYMBOL_MAP[activeChar] || normalizedTarget;

  // Identify active finger
  let activeFinger = -1;
  for (const row of KEYBOARD_ROWS) {
    for (const keyDef of row) {
      if (
        keyDef.key.toLowerCase() === baseKey ||
        (keyDef.key === ' ' && activeChar === ' ')
      ) {
        activeFinger = keyDef.finger;
        break;
      }
    }
    if (activeFinger !== -1) break;
  }

  return (
    <div
      className={`w-full max-w-3xl mx-auto p-3 sm:p-4 rounded-2xl bg-slate-900 text-slate-100 shadow-lg border border-slate-800 transition-all ${className}`}
      aria-label="Virtual touch-typing guide keyboard"
    >
      {/* Keyboard Status Bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive QWERTY Finger Placement Guide</span>
        </div>
        {activeFinger !== -1 && (
          <div className="text-emerald-400 font-semibold">
            Finger: <span className="text-white underline decoration-emerald-500">{FINGER_LABELS[activeFinger]}</span>
          </div>
        )}
      </div>

      {/* Keys Layout */}
      <div className="flex flex-col gap-1 sm:gap-1.5 select-none font-mono">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1 sm:gap-1.5 w-full">
            {row.map((k, kIdx) => {
              const isMatch =
                (k.key === ' ' && activeChar === ' ') ||
                (k.key.length === 1 && k.key.toLowerCase() === baseKey);

              const isShiftNeeded =
                activeChar.length === 1 &&
                activeChar !== ' ' &&
                (activeChar !== activeChar.toLowerCase() || SYMBOL_MAP[activeChar] !== undefined);

              const isShiftKey =
                (k.key === 'Shift' || k.key === 'ShiftRight') && isShiftNeeded;

              const isHomeBump = k.key === 'f' || k.key === 'j';

              return (
                <div
                  key={kIdx}
                  className={`relative flex items-center justify-center rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 h-8 sm:h-10 ${
                    k.width || 'w-7 sm:w-10'
                  } ${
                    isMatch
                      ? 'bg-emerald-500 text-white font-bold ring-2 ring-emerald-300 shadow-md shadow-emerald-500/50 scale-105 z-10'
                      : isShiftKey
                        ? 'bg-amber-500/80 text-white font-bold ring-1 ring-amber-300'
                        : 'bg-slate-800/90 text-slate-300 border border-slate-700/80 hover:bg-slate-700'
                  }`}
                >
                  <span>{k.display}</span>

                  {/* Tactile guide bumps for F and J */}
                  {isHomeBump && (
                    <span
                      className="absolute bottom-1 w-2.5 sm:w-3 h-0.5 rounded-full bg-slate-400/80"
                      title="Home row tactile index bump"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend / Tip */}
      <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
        <span>Keep wrists elevated • Rest index fingers on F and J</span>
        <span className="hidden sm:inline">Spacebar: Alternate thumbs naturally</span>
      </div>
    </div>
  );
};
