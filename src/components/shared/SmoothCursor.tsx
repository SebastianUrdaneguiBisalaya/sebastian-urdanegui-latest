'use client';

import * as React from 'react';

interface Position {
  x: number;
  y: number;
}

const DOT_SMOOTHNESS = 0.2;
const BORDER_SMOOTHNESS = 0.1;

export default function SmoothCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const borderRef = React.useRef<HTMLDivElement>(null);

  const mouse = React.useRef<Position>({ x: 0, y: 0 });
  const dot = React.useRef<Position>({ x: 0, y: 0 });
  const border = React.useRef<Position>({ x: 0, y: 0 });

  const isHovering = React.useRef(false);
  const rafId = React.useRef<number | null>(null);

  React.useEffect(() => {
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onEnter = () => {
      isHovering.current = true;
      borderRef.current?.classList.add('cursor--hover');
    };

    const onLeave = () => {
      isHovering.current = false;
      borderRef.current?.classList.remove('cursor--hover');
    };

    const animate = () => {
      dot.current.x = lerp(dot.current.x, mouse.current.x, DOT_SMOOTHNESS);
      dot.current.y = lerp(dot.current.y, mouse.current.y, DOT_SMOOTHNESS);

      border.current.x = lerp(border.current.x, mouse.current.x, BORDER_SMOOTHNESS);
      border.current.y = lerp(border.current.y, mouse.current.y, BORDER_SMOOTHNESS);

      dotRef.current!.style.transform =
        `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`;

      borderRef.current!.style.transform =
        `translate3d(${border.current.x}px, ${border.current.y}px, 0) translate(-50%, -50%)`;

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);

    const targets = document.querySelectorAll(
      'a, button, input, textarea, select, img'
    );

    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-100">
      <div
        className="cursor-dot"
        ref={dotRef}
      />
      <div
        className="cursor-border"
        ref={borderRef}
      />
    </div>
  );
}