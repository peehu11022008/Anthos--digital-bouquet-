'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FLOWER_COMPONENT_MAP } from '@/components/flowers';
import { ACCESSORY_COMPONENT_MAP } from '@/components/accessories';

const imageCache = new Map<string, HTMLImageElement>();

export function useFlowerKonvaImage(flowerKey: string, petalColor: string, stemColor: string) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cacheKey = `flower_${flowerKey}_${petalColor}_${stemColor}`;
    if (imageCache.has(cacheKey)) {
      setImage(imageCache.get(cacheKey)!);
      return;
    }

    const FlowerComp = FLOWER_COMPONENT_MAP[flowerKey];
    if (!FlowerComp) return;

    try {
      const svgMarkup = renderToStaticMarkup(
        React.createElement(FlowerComp, { petalColor, stemColor, width: 120, height: 180 })
      );

      const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new window.Image();

      img.onload = () => {
        imageCache.set(cacheKey, img);
        setImage(img);
        URL.revokeObjectURL(url);
      };

      img.onerror = (err) => {
        console.error('Failed to load flower SVG image', err);
        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (e) {
      console.error('Error generating flower SVG image', e);
    }
  }, [flowerKey, petalColor, stemColor]);

  return image;
}

export function useAccessoryKonvaImage(accessoryKey: string, color: string) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cacheKey = `accessory_${accessoryKey}_${color}`;
    if (imageCache.has(cacheKey)) {
      setImage(imageCache.get(cacheKey)!);
      return;
    }

    const AccComp = ACCESSORY_COMPONENT_MAP[accessoryKey];
    if (!AccComp) return;

    try {
      const svgMarkup = renderToStaticMarkup(
        React.createElement(AccComp, { color, width: 80, height: 80 })
      );

      const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new window.Image();

      img.onload = () => {
        imageCache.set(cacheKey, img);
        setImage(img);
        URL.revokeObjectURL(url);
      };

      img.onerror = (err) => {
        console.error('Failed to load accessory SVG image', err);
        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (e) {
      console.error('Error generating accessory SVG image', e);
    }
  }, [accessoryKey, color]);

  return image;
}
