import type { AccessoryData } from '@/types';

export const ACCESSORIES: AccessoryData[] = [
  {
    key: 'ribbon',
    name: 'Ribbon',
    defaultColor: '#F9C6CC',
    alternateColors: ['#C4B5FD', '#BAE6FD', '#BBF7D0', '#FCD34D', '#FCA5A5', '#FFFFFF'],
  },
  {
    key: 'bow',
    name: 'Bow',
    defaultColor: '#F4A7B9',
    alternateColors: ['#A78BFA', '#7DD3FC', '#6EE7B7', '#FDE68A', '#FDA4AF', '#FFFFFF'],
  },
  {
    key: 'butterfly',
    name: 'Butterfly',
    defaultColor: '#DDD6FE',
    alternateColors: ['#FBCFE8', '#BAE6FD', '#BBF7D0', '#FDE68A', '#FED7AA', '#FECDD3'],
  },
  {
    key: 'sparkle',
    name: 'Sparkle',
    defaultColor: '#FCD34D',
    alternateColors: ['#FFFFFF', '#F9A8D4', '#C4B5FD', '#BAE6FD', '#FCA5A5', '#86EFAC'],
  },
  {
    key: 'heart',
    name: 'Heart',
    defaultColor: '#F9A8D4',
    alternateColors: ['#FB7185', '#FCA5A5', '#C084FC', '#FDE68A', '#BAE6FD', '#FFFFFF'],
  },
  {
    key: 'star',
    name: 'Star',
    defaultColor: '#FCD34D',
    alternateColors: ['#FDE68A', '#FFFFFF', '#F9A8D4', '#C4B5FD', '#7DD3FC', '#86EFAC'],
  },
  {
    key: 'wrap-paper',
    name: 'Wrapping',
    defaultColor: '#FDE68A',
    alternateColors: ['#FBCFE8', '#DDD6FE', '#BAE6FD', '#BBF7D0', '#FED7AA', '#FFFFFF'],
  },
];

export const ACCESSORY_REGISTRY: Record<string, AccessoryData> = Object.fromEntries(
  ACCESSORIES.map((a) => [a.key, a])
);
