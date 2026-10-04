'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const BouquetCanvasInner = dynamic(
  () => import('./BouquetCanvasInner').then((mod) => mod.BouquetCanvasInner),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-cream-dark">
        <span className="text-sm font-medium text-text-soft animate-pulse">
          Opening your peaceful canvas...
        </span>
      </div>
    ),
  }
);

export const BouquetCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 650,
    height: 520,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: clientWidth || 650,
          height: clientHeight || 520,
        });
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <BouquetCanvasInner width={dimensions.width} height={dimensions.height} />
    </div>
  );
};
