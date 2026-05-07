-- =====================================================================
-- Migration: Add freight shipping + cassette fabric insert support
-- =====================================================================
-- Adds 3 columns to support new builder features:
--   1. orders.freight_charge       — total freight charged on this order
--   2. order_items.freight_shipping — per-item flag for shades >108" wide
--   3. order_items.cassette_fabric_insert — per-item flag for cassette
--      valance with matching fabric insert
--
-- Run this in the Supabase SQL Editor BEFORE deploying the app changes.
-- Safe to re-run: uses IF NOT EXISTS so it won't error if already applied.
-- =====================================================================

-- 1. Order-level freight charge
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS freight_charge numeric(10, 2) NOT NULL DEFAULT 0;

COMMENT ON COLUMN orders.freight_charge IS
  'Total freight charge on the order ($475 per oversize shade with width > 108"). Already included in orders.total.';

-- 2. Per-item flag — which item triggered freight
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS freight_shipping boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN order_items.freight_shipping IS
  'TRUE if this shade requires freight shipping (width > 108"). Each freight-shipped shade adds $475 to orders.freight_charge.';

-- 3. Per-item flag — cassette valance with matching fabric insert
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS cassette_fabric_insert boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN order_items.cassette_fabric_insert IS
  'TRUE if customer chose matching fabric insert on cassette valance (no extra charge). Only applies when valance_type = ''cassette''.';

-- =====================================================================
-- Verify (optional — uncomment to inspect)
-- =====================================================================
-- SELECT column_name, data_type, column_default, is_nullable
-- FROM information_schema.columns
-- WHERE table_name IN ('orders', 'order_items')
--   AND column_name IN ('freight_charge', 'freight_shipping', 'cassette_fabric_insert')
-- ORDER BY table_name, column_name;
