-- ============================================================================
-- Migration: Specialty-shape dimensions — full capture in emails + DB
-- Date:      2026-06-03
-- Purpose:   Fixes two gaps for specialty-shape orders (triangle, trapezoid,
--            pentagon, hexagon, etc.):
--
--              1. The fractional parts of every specialty measurement were
--                 never persisted. The builder captures them in `customFracs`,
--                 but checkout only sent `custom_dims` and order_items had no
--                 `custom_fracs` column — so the fractions were dropped before
--                 the DB ever saw them.
--              2. Confirmation/admin emails only printed width x height, which
--                 for specialty shapes shows almost nothing (the per-side
--                 measurements live in custom_dims, and height is usually 0).
--
--            See the matching code changes in:
--              - app/checkout/page.tsx           (sends custom_fracs + dimensions_text)
--              - app/api/orders/init/route.ts    (persists both new columns)
--              - lib/email/send.ts               (renders dimensions_text)
--              - app/order-confirmation/page.tsx (renders dimensions_text)
--
-- SAFETY:
--   Both columns are NULLABLE and additive. Adding them does NOT affect the
--   currently-deployed code (which doesn't reference them) and cannot break
--   existing rows. It is therefore safe to run this migration at any time,
--   including BEFORE the matching code is deployed.
--
--   HOWEVER, the new code in /api/orders/init INSERTs these columns. If that
--   code goes live BEFORE this migration runs, the order_items INSERT will
--   fail (the columns won't exist), and line items will silently not save —
--   the same class of incident as 2026-05-08 with `freight_charge`.
--
--   => Run this migration FIRST, verify it, THEN deploy the code.
-- ============================================================================


-- 1. custom_fracs — mirrors custom_dims (JSONB). Holds the fraction string for
--    each specialty dimension key, e.g. { "leftHeight": "1/2", "width": "3/8" }.
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS custom_fracs JSONB;

-- 2. dimensions_text — a denormalized, human-readable, fully-labeled summary of
--    all measurements for the line item, built at checkout from the shape's own
--    input labels + customDims + customFracs (and width/height for standard).
--    Example (specialty): "Bottom Width: 50 3/8" · Left Height: 42 1/2" · ..."
--    Example (standard):  '50" x 50"'
--    This guarantees emails and the confirmation page can always render the
--    complete measurements without re-deriving labels.
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS dimensions_text TEXT;


-- 3. Verify both columns landed.
DO $$
DECLARE
  has_custom_fracs BOOLEAN;
  has_dimensions_text BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'order_items' AND column_name = 'custom_fracs'
  ) INTO has_custom_fracs;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'order_items' AND column_name = 'dimensions_text'
  ) INTO has_dimensions_text;

  IF NOT has_custom_fracs THEN
    RAISE EXCEPTION 'Migration failed: order_items.custom_fracs column missing';
  END IF;

  IF NOT has_dimensions_text THEN
    RAISE EXCEPTION 'Migration failed: order_items.dimensions_text column missing';
  END IF;

  RAISE NOTICE 'Migration verified: order_items.custom_fracs (JSONB) and order_items.dimensions_text (TEXT) in place';
END $$;
