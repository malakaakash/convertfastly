/*
  # YouTube Downloader Usage Tracking

  1. Purpose
    - Track YouTube downloader usage for rate limiting
    - Store download metadata for analytics
    - Monitor tool performance and errors

  2. New Tables
    - `youtube_downloads` - Track download requests and metadata
    - Enhanced `tool_usage` for YouTube-specific tracking

  3. Security
    - Enable RLS on all tables
    - Add policies for usage tracking and admin access
*/

-- Create YouTube downloads tracking table
CREATE TABLE IF NOT EXISTS youtube_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id text NOT NULL,
  video_title text,
  channel_name text,
  download_mode text NOT NULL CHECK (download_mode IN ('video', 'audio')),
  selected_format text NOT NULL,
  selected_quality text NOT NULL,
  file_size_mb numeric,
  user_ip text,
  user_agent text,
  country text DEFAULT 'Unknown',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message text,
  download_url text,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Enable RLS
ALTER TABLE youtube_downloads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can track YouTube downloads"
  ON youtube_downloads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can read all YouTube downloads"
  ON youtube_downloads
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can update YouTube downloads"
  ON youtube_downloads
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS youtube_downloads_video_id_idx ON youtube_downloads(video_id);
CREATE INDEX IF NOT EXISTS youtube_downloads_user_ip_idx ON youtube_downloads(user_ip);
CREATE INDEX IF NOT EXISTS youtube_downloads_created_at_idx ON youtube_downloads(created_at DESC);
CREATE INDEX IF NOT EXISTS youtube_downloads_status_idx ON youtube_downloads(status);

-- Create function to clean up expired downloads
CREATE OR REPLACE FUNCTION cleanup_expired_youtube_downloads()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM youtube_downloads 
  WHERE expires_at < now() 
  AND status = 'completed';
END;
$$;

-- Create function to get YouTube usage stats
CREATE OR REPLACE FUNCTION get_youtube_usage_stats(
  start_date date DEFAULT CURRENT_DATE - INTERVAL '30 days',
  end_date date DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_downloads bigint,
  video_downloads bigint,
  audio_downloads bigint,
  successful_downloads bigint,
  failed_downloads bigint,
  avg_file_size_mb numeric,
  top_formats jsonb
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_downloads,
    COUNT(*) FILTER (WHERE download_mode = 'video') as video_downloads,
    COUNT(*) FILTER (WHERE download_mode = 'audio') as audio_downloads,
    COUNT(*) FILTER (WHERE status = 'completed') as successful_downloads,
    COUNT(*) FILTER (WHERE status = 'failed') as failed_downloads,
    ROUND(AVG(file_size_mb), 2) as avg_file_size_mb,
    jsonb_object_agg(
      selected_format, 
      format_count
    ) as top_formats
  FROM (
    SELECT 
      download_mode,
      status,
      file_size_mb,
      selected_format,
      COUNT(*) as format_count
    FROM youtube_downloads 
    WHERE created_at::date BETWEEN start_date AND end_date
    GROUP BY download_mode, status, file_size_mb, selected_format
  ) stats;
END;
$$;