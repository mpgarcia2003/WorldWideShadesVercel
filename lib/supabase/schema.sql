-- ============================================================================
-- World Wide Shades — Supabase Schema
-- Run this in Supabase SQL Editor to create all tables
-- Project: jfpdxwdggvxxgntuasqu
-- ============================================================================

-- Customers table (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  phone TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL, -- e.g. WWS-20260408-0001
  customer_id UUID REFERENCES customers(id),
  email TEXT NOT NULL, -- for guest checkout lookup
  status TEXT NOT NULL DEFAULT 'received'
    CHECK (status IN ('received', 'in_production', 'quality_check', 'shipped', 'delivered', 'cancelled')),
  subtotal NUMERIC(10,2) NOT NULL,
  discount NUMERIC(10,2) DEFAULT 0,
  tax NUMERIC(10,2) DEFAULT 0,
  shipping NUMERIC(10,2) DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  promo_code TEXT,
  stripe_payment_intent_id TEXT,
  stripe_charge_id TEXT,
  shipping_first_name TEXT,
  shipping_last_name TEXT,
  shipping_address1 TEXT,
  shipping_address2 TEXT,
  shipping_city TEXT,
  shipping_state TEXT,
  shipping_zip TEXT,
  billing_same_as_shipping BOOLEAN DEFAULT true,
  tracking_number TEXT,
  tracking_url TEXT,
  estimated_delivery TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order line items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  shade_type TEXT NOT NULL, -- 'Blackout', 'Light Filtering'
  shape TEXT NOT NULL DEFAULT 'Standard',
  fabric_name TEXT,
  fabric_id TEXT,
  width NUMERIC(6,2),
  width_fraction TEXT,
  height NUMERIC(6,2),
  height_fraction TEXT,
  custom_dims JSONB, -- for specialty shapes
  mount_type TEXT,
  control_type TEXT,
  motor_power TEXT, -- 'Rechargeable', 'Hardwired'
  roll_type TEXT,
  bottom_bar TEXT,
  valance_type TEXT,
  side_channel_type TEXT,
  motorized_controller BOOLEAN DEFAULT false,
  motorized_hub BOOLEAN DEFAULT false,
  motorized_charger BOOLEAN DEFAULT false,
  sun_sensor BOOLEAN DEFAULT false,
  quantity INTEGER DEFAULT 1,
  unit_price NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  visualizer_image TEXT, -- base64 or Cloudinary URL
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Order status history (for timeline tracking)
CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Purchase dedup table (prevents double purchase events)
CREATE TABLE IF NOT EXISTS purchase_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  transaction_id TEXT UNIQUE NOT NULL,
  event_fired BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order ON order_status_history(order_id);

-- RLS policies
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;

-- Customers can read their own data
CREATE POLICY "Users can view own customer record" ON customers
  FOR SELECT USING (auth.uid() = auth_id);

-- Customers can read their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (customer_id IN (SELECT id FROM customers WHERE auth_id = auth.uid()));

-- Order items visible if parent order is visible
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE auth_id = auth.uid())));

-- Status history visible if parent order is visible  
CREATE POLICY "Users can view own order status history" ON order_status_history
  FOR SELECT USING (order_id IN (SELECT id FROM orders WHERE customer_id IN (SELECT id FROM customers WHERE auth_id = auth.uid())));
