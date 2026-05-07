-- ─────────────────────────────────────────────────────────────────
-- Migration: Add freight shipping & cassette fabric insert fields
-- Date: 2026-05-06
-- Project: World Wide Shades (Supabase: jfpdxwdggvxxgntuasqu)
--
-- Adds support for two new builder features:
--   1. Freight shipping ($475 per oversize shade where width > 108")
--   2. Cassette valance fabric insert toggle (no price impact)
--
-- Run this in Supabase SQL Editor → Project: jfpdxwdggvxxgntuasqu
-- Safe to re-run (uses IF NOT EXISTS).
-- ─────────────────────────────────────────────────────────────────

-- 1. orders.freight_charge — total freight charged on the order
--    Sum of (FREIGHT_CHARGE * quantity) for every line item where freight_shipping=true.
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS freight_charge numeric(10,2) NOT NULL DEFAULT 0;

COMMENT ON COLUMN orders.freight_charge IS
  'Freight surcharge total for oversize shades (>108" width). $475 per oversize shade × quantity.';

-- 2. order_items.freight_shipping — true if this specific shade exceeds 108" and requires freight
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS freight_shipping boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN order_items.freight_shipping IS
  'TRUE when shade width > 108" — triggers $475/qty freight charge.';

-- 3. order_items.cassette_fabric_insert — true if customer chose cassette valance with matching fabric insert
--    No price impact — purely a manufacturing instruction.
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS cassette_fabric_insert boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN order_items.cassette_fabric_insert IS
  'TRUE when valance_type=cassette AND customer opted for fabric-matched insert face. No price change.';

-- ─── Verification queries (run after migration) ──────────────────
-- SELECT column_name, data_type, column_default, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'orders' AND column_name = 'freight_charge';
--
-- SELECT column_name, data_type, column_default, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'order_items' AND column_name IN ('freight_shipping','cassette_fabric_insert');
