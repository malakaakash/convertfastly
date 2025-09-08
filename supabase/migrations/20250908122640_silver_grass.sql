/*
  # Add Media Downloader Tracking

  1. Purpose
    - Track YouTube thumbnail downloads
    - Track Instagram reel downloads
    - Monitor usage patterns and rate limits
    - Admin analytics for media tools

  2. New Tables
    - `media_downloads` - Track all media download requests
      - `id` (uuid, primary key)
      - `tool_type` (text) - 'youtube-thumbnail', 'instagram-reel'
      - `source_url` (text) - Original URL requested
      - `media_id` (text) - Video/Reel ID extracted
      - `download_type` (text) - 'video', 'audio', 'thumbnail', 'caption'
      - `file_size_mb` (numeric) - Downloaded file size
      - `user_ip` (text) - Client IP for rate limiting
      - `user_agent` (text) - Browser info
      - `country` (text) - User location
      - `status` (text) - 'pending', 'completed', 'failed'
      - `error_message` (text) - Error details if failed
      - `created_at` (timestamp)
      - `completed_at` (timestamp)

  3. Security
    - Enable RLS on media_downloads table
    - Add policies for admin access and anonymous usage tracking
    - Add indexes for performance

  4. Admin Features
    - Track popular content being downloaded
    - Monitor for abuse patterns
    - Rate limiting enforcement
*/

-- Create media downloads tracking table
CREATE TABLE IF NOT EXISTS media_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_type text NOT NULL CHECK (tool_type IN ('youtube-thumbnail', 'instagram-reel', 'youtube-video', 'youtube-audio')),
  source_url text NOT NULL,
  media_id text NOT NULL,
  download_type text NOT NULL CHECK (download_type IN ('video', 'audio', 'thumbnail', 'caption')),
  file_size_mb numeric DEFAULT 0,
  user_ip text,
  user_agent text,
  country text DEFAULT 'Unknown',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message text,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Enable RLS
ALTER TABLE media_downloads ENABLE ROW LEVEL SECURITY;

-- Admin can read all media downloads
CREATE POLICY "Admin can read all media downloads"
  ON media_downloads
  FOR SELECT
  TO authenticated
  USING (true);

-- Admin can update media downloads
CREATE POLICY "Admin can update media downloads"
  ON media_downloads
  FOR UPDATE
  TO authenticated
  USING (true);

-- Anyone can track media downloads
CREATE POLICY "Anyone can track media downloads"
  ON media_downloads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS media_downloads_tool_type_idx ON media_downloads (tool_type);
CREATE INDEX IF NOT EXISTS media_downloads_user_ip_idx ON media_downloads (user_ip);
CREATE INDEX IF NOT EXISTS media_downloads_created_at_idx ON media_downloads (created_at DESC);
CREATE INDEX IF NOT EXISTS media_downloads_status_idx ON media_downloads (status);
CREATE INDEX IF NOT EXISTS media_downloads_media_id_idx ON media_downloads (media_id);

-- Add rate limiting function for media downloads
CREATE OR REPLACE FUNCTION check_media_download_rate_limit(
  p_user_ip text,
  p_tool_type text,
  p_limit_per_day integer DEFAULT 50
)
RETURNS boolean
LANGUAGE plpgsql
AS $$
DECLARE
  usage_count integer;
BEGIN
  -- Count usage in last 24 hours
  SELECT COUNT(*)
  INTO usage_count
  FROM media_downloads
  WHERE user_ip = p_user_ip
    AND tool_type = p_tool_type
    AND created_at > now() - interval '24 hours';
  
  -- Return true if under limit
  RETURN usage_count < p_limit_per_day;
END;
$$;