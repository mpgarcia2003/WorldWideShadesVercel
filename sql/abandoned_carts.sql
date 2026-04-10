-- Abandoned Cart Recovery System
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS abandoned_carts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  cart_data JSONB,
  page TEXT DEFAULT 'builder',
  source TEXT DEFAULT 'exit_intent',
  total NUMERIC(10,2) DEFAULT 0,
  item_count INTEGER DEFAULT 0,
  recovered BOOLEAN DEFAULT false,
  recovery_order_id UUID REFERENCES orders(id),
  email_sent_at TIMESTAMPTZ,
  emails_sent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_abandoned_carts_email ON abandoned_carts(email);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_recovered ON abandoned_carts(recovered);
CREATE INDEX IF NOT EXISTS idx_abandoned_carts_created ON abandoned_carts(created_at DESC);

ALTER TABLE abandoned_carts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access on abandoned_carts" ON abandoned_carts FOR ALL USING (true) WITH CHECK (true);
