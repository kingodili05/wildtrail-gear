'use client';

import { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/format';

type TiltCardProps = {
  className?: string;
  children: React.ReactNode;
  maxTiltDeg?: number;
  scale?: number;
  glare?: boolean;
};

export default function TiltCard({
  className,
  children,
  maxTiltDeg = 7,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>('perspective(1100px)');
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; o: number }>({
    x: 50,
    y: 50,
    o: 0,
  });

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'touch') return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * (maxTiltDeg * 2);
      const ry = (px - 0.5) * (maxTiltDeg * 2);
      setTransform(
        `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(
          2,
        )}deg) scale(${scale})`,
      );
      setGlarePos({ x: px * 100, y: py * 100, o: 0.6 });
    },
    [maxTiltDeg, scale],
  );

  const handleLeave = useCallback(() => {
    setTransform('perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)');
    setGlarePos((g) => ({ ...g, o: 0 }));
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        transform,
        transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={cn('relative', className)}
    >
      {children}
      {glare && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
          style={{
            opacity: glarePos.o,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 87, 34, 0.18), transparent 50%)`,
            mixBlendMode: 'screen',
          }}
        />
      )}
    </div>
  );
}
