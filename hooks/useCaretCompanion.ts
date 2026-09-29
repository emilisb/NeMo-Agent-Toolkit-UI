import { RefObject, useEffect, useRef, useState } from 'react';

// Match the textarea's layout rather than estimating character widths: this
// preserves caret tracking across proportional fonts, wrapping and scrolling.
const mirrorProperties = [
  'box-sizing', 'width', 'padding-top', 'padding-right', 'padding-bottom',
  'padding-left', 'border-top-width', 'border-right-width', 'border-bottom-width',
  'border-left-width', 'border-style', 'font-family', 'font-size', 'font-weight',
  'font-style', 'font-variant', 'line-height', 'letter-spacing', 'text-transform',
  'text-indent', 'text-align', 'tab-size', 'word-spacing', 'direction',
];

export function useCaretCompanion(
  textareaRef: RefObject<HTMLTextAreaElement>,
  companionRef: RefObject<HTMLDivElement>,
  value: string,
) {
  const [pose, setPose] = useState({ x: 0, gaze: 0, tilt: 0, moving: false });
  const refreshRef = useRef<() => void>(() => {});

  useEffect(() => {
    const input = textareaRef.current;
    const companion = companionRef.current;
    const container = companion?.parentElement;
    if (!input || !companion || !container) return;

    const mirror = document.createElement('div');
    mirror.setAttribute('aria-hidden', 'true');
    mirror.style.cssText = 'position:fixed;top:0;left:-10000px;visibility:hidden;pointer-events:none;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;';
    const before = document.createTextNode('');
    const marker = document.createElement('span');
    mirror.append(before, marker);
    document.body.appendChild(mirror);

    let frame = 0;
    let settleTimer: ReturnType<typeof setTimeout>;
    let previousX: number | undefined;
    let previousCaret: number | undefined;
    let previousValue = input.value;

    const update = () => {
      const style = getComputedStyle(input);
      mirrorProperties.forEach((property) => {
        mirror.style.setProperty(property, style.getPropertyValue(property));
      });
      // Exclude a vertical scrollbar from the available text layout width.
      mirror.style.width = `${input.clientWidth + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)}px`;
      const caret = input.selectionDirection === 'backward'
        ? input.selectionStart : input.selectionEnd;
      before.textContent = input.value.slice(0, caret);
      marker.textContent = input.value.slice(caret) || '\u200b';
      const inputBox = input.getBoundingClientRect();
      const containerBox = container.getBoundingClientRect();
      const focused = document.activeElement === input;
      const caretX = inputBox.left - containerBox.left + marker.offsetLeft - input.scrollLeft;
      const halfWidth = companion.offsetWidth / 2;
      const target = focused ? caretX : (previousX ?? container.clientWidth / 2);
      const x = Math.max(halfWidth, Math.min(container.clientWidth - halfWidth, target));
      const changed = focused && (caret !== previousCaret || input.value !== previousValue);
      const tilt = previousX === undefined ? 0 : Math.max(-7, Math.min(7, (x - previousX) / 4));

      setPose((current) => ({
        x,
        gaze: focused ? Math.max(-5, Math.min(5, (caretX - x) / 10)) : 0,
        tilt: changed ? tilt : current.tilt,
        moving: changed || current.moving,
      }));
      if (changed || !focused) {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
          setPose((current) => ({ ...current, moving: false, tilt: 0 }));
        }, focused ? 550 : 0);
      }
      previousX = x;
      previousCaret = caret;
      previousValue = input.value;
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    refreshRef.current = schedule;
    const events = ['input', 'select', 'keyup', 'click', 'focus', 'blur', 'scroll'];
    events.forEach((event) => input.addEventListener(event, schedule));
    const onSelectionChange = () => {
      if (document.activeElement === input) schedule();
    };
    document.addEventListener('selectionchange', onSelectionChange);
    const observer = new ResizeObserver(schedule);
    observer.observe(input);
    observer.observe(container);
    observer.observe(companion);
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settleTimer);
      observer.disconnect();
      events.forEach((event) => input.removeEventListener(event, schedule));
      document.removeEventListener('selectionchange', onSelectionChange);
      mirror.remove();
      refreshRef.current = () => {};
    };
  }, [textareaRef, companionRef]);

  // Also track programmatic draft changes (suggestions, dictation, sending).
  useEffect(() => { refreshRef.current(); }, [value]);
  return pose;
}
