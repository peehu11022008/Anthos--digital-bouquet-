import React from 'react';
import { Ribbon } from './Ribbon';
import { Bow } from './Bow';
import { Butterfly } from './Butterfly';
import { Sparkle } from './Sparkle';
import { Heart } from './Heart';
import { Star } from './Star';
import { WrapPaper } from './WrapPaper';
import type { AccessorySVGProps } from '@/types';

export { Ribbon, Bow, Butterfly, Sparkle, Heart, Star, WrapPaper };

export const ACCESSORY_COMPONENT_MAP: Record<string, React.FC<AccessorySVGProps>> = {
  ribbon: Ribbon,
  bow: Bow,
  butterfly: Butterfly,
  sparkle: Sparkle,
  heart: Heart,
  star: Star,
  'wrap-paper': WrapPaper,
};
