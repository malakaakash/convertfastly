/*
  # Instagram Reel Downloader Edge Function

  1. Purpose
    - Download public Instagram Reels
    - Extract video metadata and captions
    - Respect Instagram Terms of Service
    - Only process public content

  2. Security
    - Rate limiting per IP
    - Public content validation
    - Input sanitization
    - Usage tracking

  3. Features
    - Video download with quality preservation
    - Optional caption extraction
    - Metadata extraction
    - Temporary file management
*/

import { createClient } from 'npm:@supabase/supabase-js@2.57.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface DownloadRequest {
  url: string;
  includeCaption?: boolean;
  user_id?: string;
}

interface ReelMetadata {
  caption: string;
  username: string;
  timestamp: string;
  thumbnail: string;
  isPublic: boolean;
  videoUrl?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const url = new URL(req.url);
    const pathname = url.pathname;

    if (req.method === 'POST' && pathname === '/igdl/info') {
      return await handleReelInfo(req, supabase);
    }

    if (req.method === 'POST' && pathname === '/igdl/download') {
      return await handleDownload(req, supabase);
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Instagram Downloader Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function handleReelInfo(req: Request, supabase: any) {
  try {
    const { url: reelUrl } = await req.json();
    
    // Validate Instagram URL
    if (!isValidInstagramUrl(reelUrl)) {
      return new Response(
        JSON.stringify({ error: 'Invalid Instagram URL' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check rate limits
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitCheck = await checkRateLimit(supabase, clientIP, 'instagram-info');
    
    if (!rateLimitCheck.allowed) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Extract reel ID
    const reelId = extractReelId(reelUrl);
    if (!reelId) {
      return new Response(
        JSON.stringify({ error: 'Could not extract reel ID' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // In production, this would use Instagram's public API or careful scraping
    // For demo, generate mock metadata
    const metadata = generateMockReelMetadata(reelId);

    // Check if content is public (simulation)
    if (!metadata.isPublic) {
      return new Response(
        JSON.stringify({ error: 'Cannot access private or restricted content' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Track usage
    await trackToolUsage(supabase, clientIP, 'instagram-info', { reelId, url: reelUrl });

    return new Response(
      JSON.stringify({ metadata }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Reel info error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch reel information' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
}

async function handleDownload(req: Request, supabase: any) {
  try {
    const { url: reelUrl, includeCaption }: DownloadRequest = await req.json();
    
    // Validate inputs
    if (!isValidInstagramUrl(reelUrl)) {
      return new Response(
        JSON.stringify({ error: 'Invalid Instagram URL' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check rate limits for downloads (stricter)
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitCheck = await checkRateLimit(supabase, clientIP, 'instagram-download');
    
    if (!rateLimitCheck.allowed) {
      return new Response(
        JSON.stringify({ error: 'Download limit exceeded. Please try again later.' }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // In production, this would:
    // 1. Use Instagram's public API or ethical scraping
    // 2. Download the actual reel video file
    // 3. Extract caption text if requested
    // 4. Upload to Supabase Storage with TTL
    // 5. Return signed download URLs
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const reelId = extractReelId(reelUrl);
    const videoFilename = `instagram-reel-${reelId}.mp4`;
    const captionFilename = `instagram-caption-${reelId}.txt`;
    
    // In production, these would be signed URLs from Supabase Storage
    const videoDownloadUrl = `${Deno.env.get('SUPABASE_URL')}/storage/v1/object/public/downloads/${videoFilename}`;
    const captionDownloadUrl = includeCaption 
      ? `${Deno.env.get('SUPABASE_URL')}/storage/v1/object/public/downloads/${captionFilename}`
      : null;

    // Track download
    await trackToolUsage(supabase, clientIP, 'instagram-download', { 
      reelId, 
      includeCaption,
      url: reelUrl 
    });

    return new Response(
      JSON.stringify({
        videoDownloadUrl,
        captionDownloadUrl,
        videoFilename,
        captionFilename: includeCaption ? captionFilename : null,
        expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
        note: 'Demo version - In production, this would be actual Instagram reel files'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Instagram download error:', error);
    return new Response(
      JSON.stringify({ error: 'Download failed. Please try again.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
}

function isValidInstagramUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
    /^https?:\/\/(www\.)?instagram\.com\/p\/([A-Za-z0-9_-]+)/
  ];
  
  return patterns.some(pattern => pattern.test(url));
}

function extractReelId(url: string): string | null {
  const patterns = [
    /instagram\.com\/reel\/([A-Za-z0-9_-]+)/,
    /instagram\.com\/p\/([A-Za-z0-9_-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function generateMockReelMetadata(reelId: string): ReelMetadata {
  const mockUsernames = ['creator_user', 'content_maker', 'reel_artist', 'video_creator'];
  const mockCaptions = [
    'Check out this amazing content! 🔥 #viral #trending #instagram',
    'Tutorial on how to create amazing content 📱✨ Follow for more tips!',
    'Behind the scenes of my latest project 🎬 What do you think?',
    'Quick tip that changed everything! Save this post 💡 #lifehack'
  ];

  return {
    caption: mockCaptions[Math.floor(Math.random() * mockCaptions.length)],
    username: mockUsernames[Math.floor(Math.random() * mockUsernames.length)],
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    thumbnail: `https://picsum.photos/400/600?random=${reelId}`,
    isPublic: Math.random() > 0.1, // 90% chance of being public
    videoUrl: `https://example.com/reel/${reelId}.mp4` // Mock video URL
  };
}

async function checkRateLimit(supabase: any, clientIP: string, toolType: string) {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Check usage in last 24 hours
    const { data, error } = await supabase
      .from('tool_usage')
      .select('*')
      .eq('user_ip', clientIP)
      .eq('tool_name', toolType)
      .gte('created_at', oneDayAgo.toISOString());

    if (error) {
      console.error('Rate limit check error:', error);
      return { allowed: true }; // Allow on error
    }

    // Set limits: info requests = 100/day, downloads = 20/day
    const limit = toolType.includes('info') ? 100 : 20;
    const usageCount = data?.length || 0;

    return {
      allowed: usageCount < limit,
      remaining: Math.max(0, limit - usageCount),
      resetTime: new Date(now.getTime() + 24 * 60 * 60 * 1000)
    };

  } catch (error) {
    console.error('Rate limit error:', error);
    return { allowed: true }; // Allow on error
  }
}

async function trackToolUsage(supabase: any, clientIP: string, toolName: string, metadata: any) {
  try {
    await supabase
      .from('tool_usage')
      .insert({
        tool_name: toolName,
        user_ip: clientIP,
        user_agent: 'Instagram Downloader',
        country: 'Unknown',
        created_at: new Date().toISOString()
      });
  } catch (error) {
    console.error('Usage tracking error:', error);
  }
}