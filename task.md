# Anthos Phase 1 — Task List

## Step 1 — Project Init
- [x] Initialize Next.js with TypeScript, Tailwind, App Router
- [x] Install all dependencies (react-konva, framer-motion, zustand, supabase, lucide-react)
- [x] Configure tailwind.config.ts with pastel palette
- [x] Set up globals.css with CSS custom properties and fonts
- [x] Configure next.config.js

## Step 2 — Types + Data Libraries
- [x] types/index.ts — all shared interfaces
- [x] lib/flowers.ts — 10 flower data entries
- [x] lib/accessories.ts — 7 accessory data entries
- [x] lib/moods.ts — 8 moods with suggestions
- [x] lib/meanings.ts — flower meanings lookup
- [x] lib/why.ts — WhyComposer interface + template implementation
- [x] lib/scenes.ts — 4 scene definitions

## Step 3 — Zustand Store
- [x] store/bouquetStore.ts — full editor state + actions

## Step 4 — Storage Helpers
- [x] lib/storage.ts — localStorage save/load for garden + archive + in-progress

## Step 5 — Supabase Setup
- [x] lib/supabase.ts — client + saveBouquet + getBouquet helpers
- [x] lib/utils.ts — UUID, time format, SVG helpers

## Step 6 — UI Primitives
- [x] components/ui/Button.tsx
- [x] components/ui/Card.tsx
- [x] components/ui/Modal.tsx
- [x] components/ui/ColorSwatch.tsx

## Step 7 — SVG Flowers (10)
- [x] components/flowers/Rose.tsx
- [x] components/flowers/Tulip.tsx
- [x] components/flowers/Sunflower.tsx
- [x] components/flowers/Daisy.tsx
- [x] components/flowers/Lavender.tsx
- [x] components/flowers/Lily.tsx
- [x] components/flowers/CherryBlossom.tsx
- [x] components/flowers/Hydrangea.tsx
- [x] components/flowers/BabyBreath.tsx
- [x] components/flowers/Peony.tsx
- [x] components/flowers/index.ts — barrel export + registry

## Step 8 — SVG Accessories (7)
- [x] components/accessories/Ribbon.tsx
- [x] components/accessories/Bow.tsx
- [x] components/accessories/Butterfly.tsx
- [x] components/accessories/Sparkle.tsx
- [x] components/accessories/Heart.tsx
- [x] components/accessories/Star.tsx
- [x] components/accessories/WrapPaper.tsx
- [x] components/accessories/index.ts

## Step 9 — SVG Scenes (4)
- [x] components/scenes/LittleGarden.tsx
- [x] components/scenes/CozyDesk.tsx
- [x] components/scenes/PicnicBlanket.tsx
- [x] components/scenes/SunsetScene.tsx
- [x] components/scenes/index.ts

## Step 10 — Ambient Animations
- [x] components/ambient/FallingPetals.tsx
- [x] components/ambient/FloatingButterflies.tsx
- [x] components/ambient/GentleSparkles.tsx
- [x] components/ambient/AmbientLayer.tsx

## Step 11 — Canvas Editor Core
- [x] components/editor/BouquetCanvas.tsx
- [x] components/editor/BouquetCanvasInner.tsx
- [x] components/editor/KonvaFlowerItem.tsx
- [x] components/editor/KonvaAccessoryItem.tsx
- [x] components/editor/SelectionToolbar.tsx
- [x] components/editor/ColorPanel.tsx
- [x] components/editor/MeaningModal.tsx
- [x] hooks/useElementImage.ts — SVG to Konva image hook

## Step 12 — Picker Sidebars
- [x] components/editor/FlowerPicker.tsx
- [x] components/editor/AccessoryPicker.tsx

## Step 13 — Creator Flow
- [x] components/editor/MoodSelector.tsx
- [x] components/editor/SceneSelector.tsx
- [x] components/finish/FinishScreen.tsx
- [x] components/finish/WhyGenerator.tsx
- [x] components/finish/SharePanel.tsx
- [x] app/create/page.tsx — multi-step orchestrator

## Step 14 — Letter Component
- [x] components/letter/CardStylePicker.tsx
- [x] components/letter/LetterCard.tsx

## Step 15 — Share + API
- [x] app/api/bouquet/route.ts — POST save bouquet
- [x] app/api/bouquet/[id]/route.ts — GET retrieve bouquet

## Step 16 — Reveal Page
- [x] components/reveal/SurpriseScreen.tsx
- [x] components/reveal/BouquetReveal.tsx
- [x] components/reveal/LetterReveal.tsx
- [x] components/reveal/WhyMessage.tsx
- [x] components/reveal/MakeOneBack.tsx
- [x] app/bouquet/[id]/page.tsx

## Step 17 — Garden Page
- [x] components/garden/GardenView.tsx
- [x] components/garden/GardenFlower.tsx
- [x] components/garden/GardenStats.tsx
- [x] components/garden/BouquetArchive.tsx
- [x] app/garden/page.tsx

## Step 18 — Landing Page
- [x] app/page.tsx — hero, features, CTA
- [x] app/layout.tsx — root layout, providers
- [x] app/globals.css — finalized

## Step 19 — Polish + Verification
- [x] Responsive layout and touch-friendly controls
- [x] Ambient animation + reduced-motion detection
- [x] 100% No-emoji audit across all code and UI
- [x] Production build passes cleanly with 0 errors
