import React from 'react';
import { Rose } from './Rose';
import { Tulip } from './Tulip';
import { Sunflower } from './Sunflower';
import { Daisy } from './Daisy';
import { Lavender } from './Lavender';
import { Lily } from './Lily';
import { CherryBlossom } from './CherryBlossom';
import { Hydrangea } from './Hydrangea';
import { BabyBreath } from './BabyBreath';
import { Peony } from './Peony';
import type { FlowerSVGProps } from '@/types';

export {
  Rose,
  Tulip,
  Sunflower,
  Daisy,
  Lavender,
  Lily,
  CherryBlossom,
  Hydrangea,
  BabyBreath,
  Peony,
};

export const FLOWER_COMPONENT_MAP: Record<string, React.FC<FlowerSVGProps>> = {
  rose: Rose,
  tulip: Tulip,
  sunflower: Sunflower,
  daisy: Daisy,
  lavender: Lavender,
  lily: Lily,
  'cherry-blossom': CherryBlossom,
  hydrangea: Hydrangea,
  'babys-breath': BabyBreath,
  peony: Peony,
};
