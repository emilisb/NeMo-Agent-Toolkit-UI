import { act, fireEvent, render, screen } from '@testing-library/react';
import { useRef, useState } from 'react';

import { HighlandCow } from '@/components/Chat/HighlandCow';

function Composer() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');
  return (
    <div>
      <HighlandCow textareaRef={textareaRef} value={value} />
      <textarea ref={textareaRef} value={value} onChange={(event) => setValue(event.target.value)} />
    </div>
  );
}

describe('Highland cow caret companion', () => {
  let markerX = 40;
  let resize: ResizeObserverCallback;
  const disconnect = jest.fn();
  const originalObserver = global.ResizeObserver;

  beforeEach(() => {
    jest.useFakeTimers();
    markerX = 40;
    global.ResizeObserver = jest.fn((callback) => {
      resize = callback;
      return { observe: jest.fn(), unobserve: jest.fn(), disconnect };
    }) as unknown as typeof ResizeObserver;
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(600);
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(170);
    jest.spyOn(HTMLElement.prototype, 'offsetLeft', 'get').mockImplementation(function () {
      return this.tagName === 'SPAN' ? markerX : 0;
    });
  });

  afterEach(() => {
    global.ResizeObserver = originalObserver;
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  const frame = () => act(() => { jest.advanceTimersByTime(20); });

  it('follows input and selection changes, then settles without clearing the draft', () => {
    render(<Composer />);
    frame();
    const cow = screen.getByTestId('highland-cow');
    const input = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(cow.style.left).toBe('300px');
    act(() => input.focus());
    markerX = 240;
    fireEvent.change(input, { target: { value: 'Hello Highland cow' } });
    frame();
    expect(cow.style.left).toBe('240px');
    expect(cow).toHaveAttribute('data-moving', 'true');
    act(() => { jest.advanceTimersByTime(600); });
    expect(cow).toHaveAttribute('data-moving', 'false');

    markerX = 40;
    input.setSelectionRange(0, 0);
    fireEvent.select(input);
    frame();
    expect(cow.style.left).toBe('85px');
    expect(input.value).toBe('Hello Highland cow');
    expect(input.selectionStart).toBe(0);
  });

  it('clamps at the edge, remeasures on resize, and tracks clearing', () => {
    render(<Composer />);
    const input = screen.getByRole('textbox') as HTMLTextAreaElement;
    act(() => input.focus());
    markerX = 590;
    fireEvent.change(input, { target: { value: 'Long draft' } });
    frame();
    expect(screen.getByTestId('highland-cow').style.left).toBe('515px');
    markerX = 150;
    act(() => resize([], {} as ResizeObserver));
    frame();
    expect(screen.getByTestId('highland-cow').style.left).toBe('150px');
    markerX = 40;
    fireEvent.change(input, { target: { value: '' } });
    frame();
    expect(screen.getByTestId('highland-cow').style.left).toBe('85px');
  });

  it('removes the measuring element, timer, and observer on unmount', () => {
    const { unmount } = render(<Composer />);
    frame();
    expect(document.querySelector('body > div[aria-hidden="true"]')).not.toBeNull();
    unmount();
    expect(document.querySelector('body > div[aria-hidden="true"]')).toBeNull();
    expect(disconnect).toHaveBeenCalled();
    expect(jest.getTimerCount()).toBe(0);
  });
});
