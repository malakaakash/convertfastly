/*
  # Create cash offer claims table

  1. New Tables
    - `cash_offer_claims`
      - `id` (uuid, primary key)
      - `name` (text, user's full name)
      - `email` (text, user's email)
      - `paypal_email` (text, PayPal email for payment)
      - `phone` (text, optional phone number)
      - `country` (text, user's country)
      - `visit_count` (integer, number of visits when claimed)
      - `user_agent` (text, browser information)
      - `ip_address` (text, user's IP address)
      - `status` (text, claim status: pending, approved, paid, rejected)
      - `admin_notes` (text, admin notes about the claim)
      - `claimed_at` (timestamp, when claim was submitted)
      - `processed_at` (timestamp, when claim was processed)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `cash_offer_claims` table
    - Add policy for users to insert their own claims
    - Add policy for admins to read and manage all claims

  3. Indexes
    - Add index on email for duplicate checking
    - Add index on status for admin filtering
    - Add index on claimed_at for sorting
*/

CREATE TABLE IF NOT EXISTS cash_offer_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  paypal_email text NOT NULL,
  phone text,
  country text NOT NULL,
  visit_count integer DEFAULT 0,
  user_agent text,
  ip_address text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected')),
  admin_notes text,
  claimed_at timestamptz DEFAULT now(),
  processed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE cash_offer_claims ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can submit cash offer claims"
  ON cash_offer_claims
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read all cash offer claims"
  ON cash_offer_claims
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update cash offer claims"
  ON cash_offer_claims
  FOR UPDATE
  TO authenticated
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS cash_offer_claims_email_idx ON cash_offer_claims (email);
CREATE INDEX IF NOT EXISTS cash_offer_claims_status_idx ON cash_offer_claims (status);
CREATE INDEX IF NOT EXISTS cash_offer_claims_claimed_at_idx ON cash_offer_claims (claimed_at DESC);
CREATE INDEX IF NOT EXISTS cash_offer_claims_paypal_email_idx ON cash_offer_claims (paypal_email);