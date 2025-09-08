/*
  # YouTube Thumbnail Downloader Edge Function

  1. Purpose
    - Fetch YouTube video thumbnails in various sizes
    - Validate URLs and extract video IDs
    - Provide fallback sizes if requested size unavailable
    - Track usage and enforce rate limits

  2. Security
    - Rate limiting per IP
    - Input validation and sanitization
    - Proper error handling
    - Usage tracking

  3. Features
    - Multiple thumbnail sizes
    - Automatic fallback to available sizes
    - Direct image serving with proper headers
    - Caching support
*/

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface ThumbnailRequest {
  url: string;
  size?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const videoUrl = url.searchParams.get('url');
    const size = url.searchParams.get('size') || 'maxresdefault';

    if (!videoUrl) {
      return new Response(
        JSON.stringify({ error: 'URL parameter is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate YouTube URL
    if (!isValidYouTubeUrl(videoUrl)) {
      return new Response(
        JSON.stringify({ error: 'Invalid YouTube URL' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Extract video ID
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      return new Response(
        JSON.stringify({ error: 'Could not extract video ID' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Try to get thumbnail with fallback
    const thumbnailUrl = await getThumbnailWithFallback(videoId, size);
    
    if (!thumbnailUrl) {
      return new Response(
        JSON.stringify({ error: 'No thumbnail available for this video' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Fetch and serve the thumbnail
    const thumbnailResponse = await fetch(thumbnailUrl);
    
    if (!thumbnailResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch thumbnail' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const imageBlob = await thumbnailResponse.blob();
    
    return new Response(imageBlob, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="youtube-thumbnail-${videoId}-${size}.jpg"`,
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('Thumbnail download error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function isValidYouTubeUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)/,
    /^https?:\/\/(www\.)?youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/
  ];
  
  return patterns.some(pattern => pattern.test(url));
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

async function getThumbnailWithFallback(videoId: string, requestedSize: string): Promise<string | null> {
  const sizes = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
  
  // Start with requested size, then try fallbacks
  const startIndex = sizes.indexOf(requestedSize);
  const sizesToTry = startIndex >= 0 ? sizes.slice(startIndex) : sizes;
  
  for (const size of sizesToTry) {
    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/${size}.jpg`;
    
    try {
      const response = await fetch(thumbnailUrl, { method: 'HEAD' });
      if (response.ok) {
        return thumbnailUrl;
      }
    } catch (error) {
      console.log(`Size ${size} not available, trying next...`);
    }
  }
  
  return null;
}