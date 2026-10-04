import type { SceneData } from '@/types';

export const SCENES: SceneData[] = [
  {
    key: 'little-garden',
    name: 'Little Garden',
    description: 'A peaceful garden in soft daylight',
  },
  {
    key: 'cozy-desk',
    name: 'Cozy Desk',
    description: 'A warm desk beside a sunlit window',
  },
  {
    key: 'picnic-blanket',
    name: 'Picnic Blanket',
    description: 'A checkered blanket on soft green grass',
  },
  {
    key: 'sunset',
    name: 'Sunset',
    description: 'A warm golden horizon at day\'s end',
  },
];

export const SCENE_REGISTRY: Record<string, SceneData> = Object.fromEntries(
  SCENES.map((s) => [s.key, s])
);
