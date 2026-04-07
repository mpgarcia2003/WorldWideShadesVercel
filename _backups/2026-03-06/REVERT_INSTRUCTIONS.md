# Revert Instructions — 2026-03-06 Cart Redesign

## What Was Changed
This session made changes to implement the cart visualizer image + spec table redesign.

## Files Modified
1. `types.ts` — Added `visualizerImage?: string` to `CartItem` interface
2. `Visualizer.tsx` — Added `onSnapshotReady?: (dataUrl: string) => void` prop
3. `pages/Builder.tsx` — Added snapshot state + passes `visualizerImage` to cart item
4. `components/CheckoutDrawer.tsx` — Full cart item redesign (room image + spec table + fixed swatches)

## To Revert Any File
Copy the corresponding `.original.tsx` / `.original.ts` backup from this folder
back over the live file in the parent `WWSAI/` directory.

Example — to revert CheckoutDrawer:
  Copy: `_backups/2026-03-06/CheckoutDrawer.original.tsx`
  Over: `components/CheckoutDrawer.tsx`

## Backup Files In This Folder
- `types.original.ts`
- `Visualizer.original.tsx`
- `Builder.original.tsx`
- `CheckoutDrawer.original.tsx`
