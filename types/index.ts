// ─── Core domain types for Anthos ───────────────────────────────────────────

export type CardStyle =
  | 'for-you'
  | 'just-because'
  | 'little-something'
  | 'wanted-you-to-know'
  | 'blank';

export type TimeOfDay = 'morning' | 'afternoon' | 'sunset' | 'night';

export type Mood =
  | 'soft-and-sweet'
  | 'romantic'
  | 'happy'
  | 'comfort'
  | 'thank-you'
  | 'i-miss-you'
  | 'celebration'
  | 'just-because';

export type FlowerCategory = 'Classic' | 'Wild' | 'Dreamy' | 'Garden';

// ─── Canvas element instances ─────────────────────────────────────────────────

export interface FlowerInstance {
  id: string;
  flowerKey: string;
  x: number;
  y: number;
  rotation: number; // degrees
  scaleX: number;
  scaleY: number;
  petalColor: string; // hex
  stemColor: string; // hex
  zIndex: number;
}

export interface AccessoryInstance {
  id: string;
  accessoryKey: string;
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  color: string;
  zIndex: number;
}

// ─── Data registry entries ────────────────────────────────────────────────────

export interface FlowerData {
  key: string;
  name: string;
  category: FlowerCategory;
  meaning: string;
  tags: string[];
  defaultPetalColor: string;
  defaultStemColor: string;
  alternateColors: string[];
}

export interface AccessoryData {
  key: string;
  name: string;
  defaultColor: string;
  alternateColors: string[];
}

export interface SceneData {
  key: string;
  name: string;
  description: string;
}

// ─── Letter / message ─────────────────────────────────────────────────────────

export interface LetterData {
  text: string; // max 500 chars
  cardStyle: CardStyle;
  font: 'caveat' | 'dancing-script';
}

// ─── Mood suggestion ──────────────────────────────────────────────────────────

export interface MoodSuggestion {
  key: Mood;
  label: string;
  description: string;
  suggestedFlowers: string[];
  palette: string[];
  suggestedAccessories: string[];
  sceneKey: string;
  timeOfDay: TimeOfDay;
}

// ─── Full bouquet ─────────────────────────────────────────────────────────────

export interface BouquetData {
  id: string;
  name: string;
  flowers: FlowerInstance[];
  accessories: AccessoryInstance[];
  sceneKey: string;
  timeOfDay: TimeOfDay;
  mood: Mood | null;
  letter: LetterData;
  whyMessage: string;
  bouquetName: string;
  timeSpentMs: number;
  senderName: string;
  recipientName: string;
  createdAt: string; // ISO string
}

// ─── Garden ───────────────────────────────────────────────────────────────────

export interface GardenFlower {
  id: string;
  flowerKey: string;
  petalColor: string;
  stemColor: string;
  bouquetId: string;
  bouquetName: string;
  plantedAt: string;
  x: number; // position in garden (0–100 percentage)
  y: number;
}

export interface GardenStats {
  flowersPlanted: number;
  bouquetsCreated: number;
  giftsSent: number;
}

// ─── Editor state ─────────────────────────────────────────────────────────────

export type EditorStep = 0 | 1 | 2 | 3 | 4;

export interface EditorState {
  flowers: FlowerInstance[];
  accessories: AccessoryInstance[];
  selectedId: string | null;
  selectedType: 'flower' | 'accessory' | null;
  sceneKey: string;
  timeOfDay: TimeOfDay;
  mood: Mood | null;
  letter: LetterData;
  bouquetName: string;
  whyMessage: string;
  startTime: number | null;
  step: EditorStep;
}

// ─── SVG component props ──────────────────────────────────────────────────────

export interface FlowerSVGProps {
  petalColor?: string;
  stemColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

export interface AccessorySVGProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export interface SceneSVGProps {
  timeOfDay?: TimeOfDay;
  className?: string;
  width?: number | string;
  height?: number | string;
}

// ─── Why composer interface (AI-swappable) ────────────────────────────────────

export interface WhyComposerInput {
  flowers: FlowerInstance[];
  flowerRegistry: Record<string, FlowerData>;
}

export interface WhyComposer {
  compose(input: WhyComposerInput): string;
}
