import { CSSProperties, RefObject, useId, useRef } from 'react';

import { useCaretCompanion } from '@/hooks/useCaretCompanion';

import styles from './HighlandCow.module.css';

interface Props {
  textareaRef: RefObject<HTMLTextAreaElement>;
  value: string;
}

export function HighlandCow({ textareaRef, value }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { x, gaze, tilt, moving } = useCaretCompanion(textareaRef, ref, value);
  const id = useId();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="highland-cow"
      data-moving={moving}
      className={styles.companion}
      style={{ left: x || '50%', '--gaze': `${gaze}px`, '--tilt': `${tilt}deg` } as CSSProperties}
    >
      <svg viewBox="0 0 200 170" fill="none" className={styles.cow}>
        <defs>
          <linearGradient id={`${id}-fur`} x1="75" y1="42" x2="132" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D98B45" />
            <stop offset="1" stopColor="#9A492A" />
          </linearGradient>
          <linearGradient id={`${id}-fringe`} x1="90" y1="33" x2="112" y2="98" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F1B468" />
            <stop offset="1" stopColor="#C77836" />
          </linearGradient>
          <linearGradient id={`${id}-horn`} x1="100" y1="65" x2="100" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#CFB594" />
            <stop offset="1" stopColor="#FFF4D9" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="158" rx="51" ry="6" fill="#653923" opacity=".12" />
        <g className={styles.body}>
          {/* Little tail and shaggy shoulders. */}
          <path className={styles.tail} d="M140 138 Q167 139 161 115 M161 117 Q151 103 160 98 Q174 99 166 116Z" fill="#9A492A" stroke="#7C4029" strokeWidth="4" strokeLinecap="round" />
          <path d="M64 107 Q100 83 137 109 L150 139 144 137 144 150 133 146 126 156 116 150 103 158 91 152 79 157 70 149 56 151 59 139 51 142Z" fill={`url(#${id}-fur)`} />
          <path d="M80 128 77 142 M96 131 96 145 M116 130 121 142" stroke="#E7A15D" strokeWidth="3" strokeLinecap="round" />
          <g className={styles.head}>
            {/* The wide, upturned horns make this a Highland cow. */}
            <path d="M67 64 C33 71 14 44 20 17 C27 40 42 44 65 43Z" fill={`url(#${id}-horn)`} stroke="#B49A78" strokeWidth="1.5" />
            <path d="M133 64 C167 71 186 44 180 17 C173 40 158 44 135 43Z" fill={`url(#${id}-horn)`} stroke="#B49A78" strokeWidth="1.5" />
            <g className={styles.ear}>
              <path d="M59 68 Q30 55 28 76 Q34 97 58 88Z" fill="#A85830" />
              <path d="M50 73 Q35 67 35 77 Q39 87 51 82" fill="#E7A077" />
            </g>
            <g className={styles.otherEar}>
              <path d="M141 68 Q170 55 172 76 Q166 97 142 88Z" fill="#A85830" />
              <path d="M150 73 Q165 67 165 77 Q161 87 149 82" fill="#E7A077" />
            </g>
            <path d="M55 61 Q64 35 100 40 Q141 35 148 67 L151 88 157 97 148 97 153 112 143 109 144 126 133 121 Q100 151 67 122 L58 128 58 112 49 116 53 100 44 99 51 86Z" fill={`url(#${id}-fur)`} />
            <path d="M60 92 56 102 M66 101 61 114 M138 95 143 104 M135 110 140 117" stroke="#EAA462" strokeWidth="2.5" strokeLinecap="round" />
            <g className={styles.eyes}>
              <ellipse cx="77" cy="93" rx="10" ry="12" fill="#FFF7E9" />
              <ellipse cx="123" cy="93" rx="10" ry="12" fill="#FFF7E9" />
              <g className={styles.pupils}>
                <ellipse cx="77" cy="96" rx="5.5" ry="7" fill="#38291F" />
                <ellipse cx="123" cy="96" rx="5.5" ry="7" fill="#38291F" />
                <circle cx="78.5" cy="93" r="2" fill="white" />
                <circle cx="124.5" cy="93" r="2" fill="white" />
              </g>
            </g>
            {/* Tousled fringe with individual locks. */}
            <path className={styles.fringe} d="M54 73 Q55 46 73 40 L70 32 86 37 95 25 102 35 120 29 118 40 Q143 41 147 70 L151 82 136 77 137 89 124 78 118 91 109 77 99 94 94 76 81 89 79 75 65 85 65 73 52 82Z" fill={`url(#${id}-fringe)`} />
            <path d="M77 49 69 66 M92 43 84 69 M106 44 100 74 M118 49 121 69 M130 52 137 69" stroke="#F8CE8A" strokeWidth="2.5" strokeLinecap="round" opacity=".7" />
            <ellipse cx="65" cy="110" rx="9" ry="5" fill="#EBA178" opacity=".65" />
            <ellipse cx="135" cy="110" rx="9" ry="5" fill="#EBA178" opacity=".65" />
            <path d="M73 112 Q78 103 100 105 Q123 103 129 114 Q137 137 100 138 Q65 137 73 112Z" fill="#F1C69A" />
            <ellipse cx="86" cy="117" rx="4" ry="3" fill="#9B6649" transform="rotate(-18 86 117)" />
            <ellipse cx="114" cy="117" rx="4" ry="3" fill="#9B6649" transform="rotate(18 114 117)" />
            <path d="M92 127 Q100 133 108 127" stroke="#9B6649" strokeWidth="2" strokeLinecap="round" />
          </g>
          {/* Hooves peek over the edge of the composer. */}
          <g className={styles.leftHoof}>
            <path d="M64 145 Q76 136 86 145 L88 159 Q75 165 62 159Z" fill="#633B2B" />
            <path d="M74 153 74 162" stroke="#3E291F" strokeWidth="2" strokeLinecap="round" />
            <path d="m62 143 5 8 7-5 7 6 6-8" fill="#B76B37" />
          </g>
          <g className={styles.rightHoof}>
            <path d="M114 145 Q124 136 136 145 L138 159 Q125 165 112 159Z" fill="#633B2B" />
            <path d="M126 153 126 162" stroke="#3E291F" strokeWidth="2" strokeLinecap="round" />
            <path d="m113 144 6 8 7-6 7 5 5-8" fill="#B76B37" />
          </g>
        </g>
      </svg>
    </div>
  );
}
