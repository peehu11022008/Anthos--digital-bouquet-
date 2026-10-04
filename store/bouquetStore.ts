'use client';

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  FlowerInstance,
  AccessoryInstance,
  LetterData,
  Mood,
  TimeOfDay,
  EditorStep,
} from '@/types';
import { generateId, randomOffset } from '@/lib/utils';
import { FLOWER_REGISTRY } from '@/lib/flowers';
import { ACCESSORY_REGISTRY } from '@/lib/accessories';
import { saveInProgress } from '@/lib/storage';

// ─── State shape ──────────────────────────────────────────────────────────────

interface BouquetState {
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

// ─── Actions shape ────────────────────────────────────────────────────────────

interface BouquetActions {
  // Flowers
  addFlower: (key: string, canvasW?: number, canvasH?: number) => void;
  updateFlower: (id: string, patch: Partial<FlowerInstance>) => void;
  removeFlower: (id: string) => void;
  duplicateFlower: (id: string) => void;

  // Accessories
  addAccessory: (key: string, canvasW?: number, canvasH?: number) => void;
  updateAccessory: (id: string, patch: Partial<AccessoryInstance>) => void;
  removeAccessory: (id: string) => void;
  duplicateAccessory: (id: string) => void;

  // Layer ordering
  bringForward: (id: string, type: 'flower' | 'accessory') => void;
  sendBack: (id: string, type: 'flower' | 'accessory') => void;
  bringToFront: (id: string, type: 'flower' | 'accessory') => void;
  sendToBack: (id: string, type: 'flower' | 'accessory') => void;

  // Selection
  setSelectedId: (id: string | null, type?: 'flower' | 'accessory' | null) => void;

  // Scene
  setScene: (key: string, timeOfDay?: TimeOfDay) => void;
  setTimeOfDay: (timeOfDay: TimeOfDay) => void;

  // Mood
  setMood: (mood: Mood | null) => void;

  // Letter
  setLetter: (letter: Partial<LetterData>) => void;

  // Naming
  setBouquetName: (name: string) => void;
  setWhyMessage: (msg: string) => void;

  // Step navigation
  setStep: (step: EditorStep) => void;

  // Timer
  startTimerIfNeeded: () => void;
  getTimeSpentMs: () => number;

  // Reset
  resetBouquet: () => void;
}

// ─── Default state ────────────────────────────────────────────────────────────

const defaultLetter: LetterData = {
  text: '',
  cardStyle: 'for-you',
  font: 'caveat',
};

const initialState: BouquetState = {
  flowers: [],
  accessories: [],
  selectedId: null,
  selectedType: null,
  sceneKey: 'little-garden',
  timeOfDay: 'afternoon',
  mood: null,
  letter: defaultLetter,
  bouquetName: '',
  whyMessage: '',
  startTime: null,
  step: 0,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMaxZIndex(items: Array<{ zIndex: number }>): number {
  return items.length > 0 ? Math.max(...items.map((i) => i.zIndex)) : 0;
}

function reindex<T extends { zIndex: number }>(items: T[]): T[] {
  return items.map((item, i) => ({ ...item, zIndex: i }));
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBouquetStore = create<BouquetState & BouquetActions>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,

    // ── Flowers ────────────────────────────────────────────────────────────

    addFlower(key, canvasW = 600, canvasH = 500) {
      const flowerData = FLOWER_REGISTRY[key];
      if (!flowerData) return;

      const { flowers, accessories } = get();
      const allZIndices = [...flowers.map((f) => f.zIndex), ...accessories.map((a) => a.zIndex)];
      const maxZ = allZIndices.length > 0 ? Math.max(...allZIndices) : -1;

      const newFlower: FlowerInstance = {
        id: generateId(),
        flowerKey: key,
        x: canvasW / 2 + randomOffset(40),
        y: canvasH / 2 + randomOffset(40),
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        petalColor: flowerData.defaultPetalColor,
        stemColor: flowerData.defaultStemColor,
        zIndex: maxZ + 1,
      };

      set((s) => ({ flowers: [...s.flowers, newFlower] }));
      get().startTimerIfNeeded();
      get().setSelectedId(newFlower.id, 'flower');
    },

    updateFlower(id, patch) {
      set((s) => ({
        flowers: s.flowers.map((f) => (f.id === id ? { ...f, ...patch } : f)),
      }));
    },

    removeFlower(id) {
      set((s) => ({
        flowers: s.flowers.filter((f) => f.id !== id),
        selectedId: s.selectedId === id ? null : s.selectedId,
        selectedType: s.selectedId === id ? null : s.selectedType,
      }));
    },

    duplicateFlower(id) {
      const { flowers, accessories } = get();
      const original = flowers.find((f) => f.id === id);
      if (!original) return;

      const allZIndices = [...flowers.map((f) => f.zIndex), ...accessories.map((a) => a.zIndex)];
      const maxZ = allZIndices.length > 0 ? Math.max(...allZIndices) : 0;

      const duplicate: FlowerInstance = {
        ...original,
        id: generateId(),
        x: original.x + 24,
        y: original.y + 24,
        zIndex: maxZ + 1,
      };

      set((s) => ({ flowers: [...s.flowers, duplicate] }));
      get().setSelectedId(duplicate.id, 'flower');
    },

    // ── Accessories ────────────────────────────────────────────────────────

    addAccessory(key, canvasW = 600, canvasH = 500) {
      const accessoryData = ACCESSORY_REGISTRY[key];
      if (!accessoryData) return;

      const { flowers, accessories } = get();
      const allZIndices = [...flowers.map((f) => f.zIndex), ...accessories.map((a) => a.zIndex)];
      const maxZ = allZIndices.length > 0 ? Math.max(...allZIndices) : -1;

      const newAcc: AccessoryInstance = {
        id: generateId(),
        accessoryKey: key,
        x: canvasW / 2 + randomOffset(60),
        y: canvasH / 2 + randomOffset(60),
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        color: accessoryData.defaultColor,
        zIndex: maxZ + 1,
      };

      set((s) => ({ accessories: [...s.accessories, newAcc] }));
      get().setSelectedId(newAcc.id, 'accessory');
    },

    updateAccessory(id, patch) {
      set((s) => ({
        accessories: s.accessories.map((a) => (a.id === id ? { ...a, ...patch } : a)),
      }));
    },

    removeAccessory(id) {
      set((s) => ({
        accessories: s.accessories.filter((a) => a.id !== id),
        selectedId: s.selectedId === id ? null : s.selectedId,
        selectedType: s.selectedId === id ? null : s.selectedType,
      }));
    },

    duplicateAccessory(id) {
      const { flowers, accessories } = get();
      const original = accessories.find((a) => a.id === id);
      if (!original) return;

      const allZIndices = [...flowers.map((f) => f.zIndex), ...accessories.map((a) => a.zIndex)];
      const maxZ = allZIndices.length > 0 ? Math.max(...allZIndices) : 0;

      const duplicate: AccessoryInstance = {
        ...original,
        id: generateId(),
        x: original.x + 20,
        y: original.y + 20,
        zIndex: maxZ + 1,
      };

      set((s) => ({ accessories: [...s.accessories, duplicate] }));
      get().setSelectedId(duplicate.id, 'accessory');
    },

    // ── Layer ordering ─────────────────────────────────────────────────────

    bringForward(id, type) {
      set((s) => {
        if (type === 'flower') {
          const idx = s.flowers.findIndex((f) => f.id === id);
          if (idx < 0) return s;
          const current = s.flowers[idx];
          const next = s.flowers.find((f) => f.zIndex === current.zIndex + 1);
          if (!next) return s;
          const flowers = s.flowers.map((f) => {
            if (f.id === id) return { ...f, zIndex: f.zIndex + 1 };
            if (f.id === next.id) return { ...f, zIndex: f.zIndex - 1 };
            return f;
          });
          return { flowers };
        } else {
          const idx = s.accessories.findIndex((a) => a.id === id);
          if (idx < 0) return s;
          const current = s.accessories[idx];
          const next = s.accessories.find((a) => a.zIndex === current.zIndex + 1);
          if (!next) return s;
          const accessories = s.accessories.map((a) => {
            if (a.id === id) return { ...a, zIndex: a.zIndex + 1 };
            if (a.id === next.id) return { ...a, zIndex: a.zIndex - 1 };
            return a;
          });
          return { accessories };
        }
      });
    },

    sendBack(id, type) {
      set((s) => {
        if (type === 'flower') {
          const current = s.flowers.find((f) => f.id === id);
          if (!current || current.zIndex === 0) return s;
          const prev = s.flowers.find((f) => f.zIndex === current.zIndex - 1);
          if (!prev) return s;
          const flowers = s.flowers.map((f) => {
            if (f.id === id) return { ...f, zIndex: f.zIndex - 1 };
            if (f.id === prev.id) return { ...f, zIndex: f.zIndex + 1 };
            return f;
          });
          return { flowers };
        } else {
          const current = s.accessories.find((a) => a.id === id);
          if (!current || current.zIndex === 0) return s;
          const prev = s.accessories.find((a) => a.zIndex === current.zIndex - 1);
          if (!prev) return s;
          const accessories = s.accessories.map((a) => {
            if (a.id === id) return { ...a, zIndex: a.zIndex - 1 };
            if (a.id === prev.id) return { ...a, zIndex: a.zIndex + 1 };
            return a;
          });
          return { accessories };
        }
      });
    },

    bringToFront(id, type) {
      set((s) => {
        const allItems = [...s.flowers, ...s.accessories];
        const maxZ = Math.max(...allItems.map((i) => i.zIndex), 0);
        if (type === 'flower') {
          return { flowers: s.flowers.map((f) => f.id === id ? { ...f, zIndex: maxZ + 1 } : f) };
        }
        return { accessories: s.accessories.map((a) => a.id === id ? { ...a, zIndex: maxZ + 1 } : a) };
      });
    },

    sendToBack(id, type) {
      set((s) => {
        if (type === 'flower') {
          const minZ = Math.min(...s.flowers.map((f) => f.zIndex), 0);
          return { flowers: s.flowers.map((f) => f.id === id ? { ...f, zIndex: minZ - 1 } : f) };
        }
        const minZ = Math.min(...s.accessories.map((a) => a.zIndex), 0);
        return { accessories: s.accessories.map((a) => a.id === id ? { ...a, zIndex: minZ - 1 } : a) };
      });
    },

    // ── Selection ──────────────────────────────────────────────────────────

    setSelectedId(id, type = null) {
      set({ selectedId: id, selectedType: type });
    },

    // ── Scene ──────────────────────────────────────────────────────────────

    setScene(key, timeOfDay) {
      set((s) => ({
        sceneKey: key,
        timeOfDay: timeOfDay ?? s.timeOfDay,
      }));
    },

    setTimeOfDay(timeOfDay) {
      set({ timeOfDay });
    },

    // ── Mood ───────────────────────────────────────────────────────────────

    setMood(mood) {
      set({ mood });
    },

    // ── Letter ─────────────────────────────────────────────────────────────

    setLetter(letter) {
      set((s) => ({ letter: { ...s.letter, ...letter } }));
    },

    // ── Naming ─────────────────────────────────────────────────────────────

    setBouquetName(name) {
      set({ bouquetName: name });
    },

    setWhyMessage(msg) {
      set({ whyMessage: msg });
    },

    // ── Step navigation ────────────────────────────────────────────────────

    setStep(step) {
      set({ step });
    },

    // ── Timer ──────────────────────────────────────────────────────────────

    startTimerIfNeeded() {
      if (!get().startTime) {
        set({ startTime: Date.now() });
      }
    },

    getTimeSpentMs() {
      const { startTime } = get();
      if (!startTime) return 0;
      return Date.now() - startTime;
    },

    // ── Reset ──────────────────────────────────────────────────────────────

    resetBouquet() {
      set({ ...initialState });
    },
  }))
);

// ─── Auto-save subscription ───────────────────────────────────────────────────
// Saves in-progress bouquet to localStorage on every state change

if (typeof window !== 'undefined') {
  useBouquetStore.subscribe(
    (state) => ({
      flowers: state.flowers,
      accessories: state.accessories,
      sceneKey: state.sceneKey,
      timeOfDay: state.timeOfDay,
      mood: state.mood,
      letter: state.letter,
      bouquetName: state.bouquetName,
    }),
    (partial) => {
      saveInProgress(partial as Parameters<typeof saveInProgress>[0]);
    }
  );
}
