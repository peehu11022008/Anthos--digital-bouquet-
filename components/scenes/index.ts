import React from 'react';
import { LittleGarden } from './LittleGarden';
import { CozyDesk } from './CozyDesk';
import { PicnicBlanket } from './PicnicBlanket';
import { SunsetScene } from './SunsetScene';
import type { SceneSVGProps } from '@/types';

export { LittleGarden, CozyDesk, PicnicBlanket, SunsetScene };

export const SCENE_COMPONENT_MAP: Record<string, React.FC<SceneSVGProps>> = {
  'little-garden': LittleGarden,
  'cozy-desk': CozyDesk,
  'picnic-blanket': PicnicBlanket,
  sunset: SunsetScene,
};
