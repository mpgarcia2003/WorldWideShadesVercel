-- ============================================================================
-- Migration: contact_submissions table
-- Date:      2026-05-09
-- Purpose:   Persistent storage for contact form submissions. Backs up the
--            email notification path — if Resend is down or the admin email
--            is filtered to spam, the submission is still recoverable from
--            the database via /admin/contact-submissions (TBD) or direct query.
--
--            The /contact form has historically been a UI mock with no
--            backend. This migration + the matching /api/contact route make
--            it a real lead-capture pipeline.
-- ============================================================================
--
-- WHY A DEDICATED TABLE (not abandoned_carts):
--   - abandoned_carts is for users who had a cart but didn't check out.
--     Contact form submitters often have no cart at all — they're asking
--     pre-purchase questions. Different funnel stage, different fields.
--   - Contact submissions need a "subject" and "message" field that don't
--     fit the cart schema.
--   - Keeping these separate means the abandoned cart recovery cron won't
--     accidentally email contact-form submitters with cart-recovery messages.
-- ============================================================================


CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Customer info (matches the form fields)
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,                                -- optional on the form

  -- The actual inquiry
  subject TEXT,                              -- 'consultation', 'quote', 'measurement', 'order', 'other', or null if not selected
  message TEXT NOT NULL,                     -- the body of what they wrote

  -- Operational metadata
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN (
      'new',         -- just submitted, not yet handled
      'in_progress', -- admin is working on it
      'replied',     -- admin sent a response
      'closed',      -- resolved
      'spam'         -- marked as spam
    )),

  -- Anti-spam / debugging
  source_page TEXT,                          -- which URL triggered the form (e.g. /contact, /contact?utm_...)
  user_agent TEXT,                           -- browser UA at time of submission
  ip_address TEXT,                           -- request IP (rate-limit / abuse triage)

  -- Email delivery tracking
  admin_email_sent BOOLEAN DEFAULT false,    -- did the admin alert email succeed?
  customer_email_sent BOOLEAN DEFAULT false, -- did the customer auto-reply succeed?
  email_error TEXT,                          -- if either failed, the error message

  -- Admin workflow
  admin_notes TEXT,                          -- internal notes when reviewing
  replied_at TIMESTAMPTZ,                    -- when admin marked as replied

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);


-- Indexes for the most common queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email      ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status     ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created    ON contact_submissions(created_at DESC);


-- Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Service role full access (the /api/contact route uses SUPABASE_SERVICE_ROLE_KEY)
CREATE POLICY "Service role full access contact_submissions"
  ON contact_submissions FOR ALL
  USING (auth.role() = 'service_role');


-- Verify the table was created
DO $$
DECLARE
  tbl_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'contact_submissions'
  ) INTO tbl_exists;

  IF NOT tbl_exists THEN
    RAISE EXCEPTION 'Migration failed: contact_submissions table not created';
  END IF;

  RAISE NOTICE 'Migration verified: contact_submissions table created with RLS';
END $$;
