-- ============================================================
-- WWS Behavior Analytics Schema
-- Run this in Supabase SQL Editor (new project: tptisikpbmqvllfhjdch)
-- ============================================================

-- 1. Sessions — one row per visitor session
CREATE TABLE IF NOT EXISTS behavior_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL UNIQUE,
  
  -- Timing
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER DEFAULT 0,
  
  -- Entry context
  landing_page TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  gclid TEXT,
  
  -- Device
  device_type TEXT, -- mobile, tablet, desktop
  browser TEXT,
  screen_width INTEGER,
  
  -- Funnel progress
  furthest_builder_step INTEGER DEFAULT 0,
  steps_completed TEXT[] DEFAULT '{}', -- array of step names reached
  exit_page TEXT,
  exit_step TEXT,
  
  -- Outcomes
  reached_cart BOOLEAN DEFAULT false,
  reached_checkout BOOLEAN DEFAULT false,
  purchased BOOLEAN DEFAULT false,
  purchase_value NUMERIC(10,2) DEFAULT 0,
  
  -- Engagement
  max_scroll_depth INTEGER DEFAULT 0,
  total_events INTEGER DEFAULT 0,
  rage_click_count INTEGER DEFAULT 0,
  pages_viewed INTEGER DEFAULT 0,
  
  -- AI
  ai_analyzed BOOLEAN DEFAULT false,
  ai_insight TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Events — every action within a session
CREATE TABLE IF NOT EXISTS behavior_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES behavior_sessions(session_id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  page TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  step_number INTEGER,
  time_on_step_seconds INTEGER
);

-- 3. Insights — AI analysis results
CREATE TABLE IF NOT EXISTS behavior_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  analysis_type TEXT NOT NULL, -- 'daily', 'manual', 'single_session'
  date_range_start TIMESTAMPTZ,
  date_range_end TIMESTAMPTZ,
  sessions_analyzed INTEGER DEFAULT 0,
  
  -- Analysis results
  insight_text TEXT,
  funnel_data JSONB, -- step-by-step drop-off rates
  drop_off_points JSONB, -- where users leave
  recommendations JSONB, -- AI suggestions array
  traffic_breakdown JSONB, -- source-level analysis
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bh_sessions_visitor ON behavior_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_bh_sessions_started ON behavior_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_bh_sessions_session ON behavior_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_bh_events_session ON behavior_events(session_id);
CREATE INDEX IF NOT EXISTS idx_bh_events_name ON behavior_events(event_name);
CREATE INDEX IF NOT EXISTS idx_bh_events_timestamp ON behavior_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_bh_insights_created ON behavior_insights(created_at DESC);

-- RLS
ALTER TABLE behavior_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE behavior_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE behavior_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on behavior_sessions" ON behavior_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on behavior_events" ON behavior_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on behavior_insights" ON behavior_insights FOR ALL USING (true) WITH CHECK (true);
