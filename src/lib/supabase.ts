import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface ToolUsage {
  id: string;
  tool_name: string;
  user_ip?: string;
  user_agent?: string;
  created_at: string;
}

export interface AdminSettings {
  id: string;
  setting_key: string;
  setting_value: any;
  updated_at: string;
  updated_by?: string;
}

export interface DailyAnalytics {
  id: string;
  date: string;
  total_users: number;
  total_tool_uses: number;
  tool_breakdown: Record<string, number>;
  created_at: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  is_active: boolean;
  created_at: string;
  expires_at?: string;
}

export interface Policy {
  id: string;
  type: 'terms' | 'privacy';
  title: string;
  content: string;
  version: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  updated_by?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  category: string;
  tags: string[];
  is_published: boolean;
  is_featured: boolean;
  author: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface CountryStats {
  country: string;
  count: number;
  percentage: number;
}

export interface CashOfferClaim {
  id: string;
  email: string;
  phone?: string;
  full_name: string;
  status: 'pending' | 'approved' | 'rejected';
  claimed_at: string;
  processed_at?: string;
  notes?: string;
}

export interface MediaDownload {
  id: string;
  tool_type: 'youtube-thumbnail' | 'instagram-reel' | 'youtube-video' | 'youtube-audio';
  source_url: string;
  media_id: string;
  download_type: 'video' | 'audio' | 'thumbnail' | 'caption';
  file_size_mb: number;
  user_ip?: string;
  user_agent?: string;
  country: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error_message?: string;
  created_at: string;
  completed_at?: string;
}

// Analytics functions
export const trackToolUsage = async (toolName: string) => {
  try {
    const userAgent = navigator.userAgent;
    
    // Get real user IP and country
    let userIP = 'unknown';
    let userCountry = 'Unknown';
    
    try {
      // Try to get real IP and country data
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        userIP = ipData.ip;
        
        // Get country from IP
        const geoResponse = await fetch(`https://ipapi.co/${userIP}/json/`);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          userCountry = geoData.country_name || 'Unknown';
        }
      }
    } catch (error) {
      console.log('Could not fetch real location data, using fallback');
      
      // Fallback: Use timezone to estimate country
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const timezoneCountryMap: { [key: string]: string } = {
        'America/New_York': 'United States',
        'America/Chicago': 'United States',
        'America/Denver': 'United States',
        'America/Los_Angeles': 'United States',
        'America/Toronto': 'Canada',
        'America/Vancouver': 'Canada',
        'Europe/London': 'United Kingdom',
        'Europe/Paris': 'France',
        'Europe/Berlin': 'Germany',
        'Europe/Rome': 'Italy',
        'Europe/Madrid': 'Spain',
        'Europe/Amsterdam': 'Netherlands',
        'Europe/Stockholm': 'Sweden',
        'Europe/Oslo': 'Norway',
        'Europe/Copenhagen': 'Denmark',
        'Europe/Helsinki': 'Finland',
        'Europe/Warsaw': 'Poland',
        'Europe/Prague': 'Czech Republic',
        'Europe/Vienna': 'Austria',
        'Europe/Zurich': 'Switzerland',
        'Asia/Tokyo': 'Japan',
        'Asia/Seoul': 'South Korea',
        'Asia/Shanghai': 'China',
        'Asia/Hong_Kong': 'Hong Kong',
        'Asia/Singapore': 'Singapore',
        'Asia/Bangkok': 'Thailand',
        'Asia/Manila': 'Philippines',
        'Asia/Jakarta': 'Indonesia',
        'Asia/Kuala_Lumpur': 'Malaysia',
        'Asia/Kolkata': 'India',
        'Asia/Dubai': 'United Arab Emirates',
        'Australia/Sydney': 'Australia',
        'Australia/Melbourne': 'Australia',
        'Pacific/Auckland': 'New Zealand',
        'America/Sao_Paulo': 'Brazil',
        'America/Argentina/Buenos_Aires': 'Argentina',
        'America/Mexico_City': 'Mexico',
        'Africa/Cairo': 'Egypt',
        'Africa/Lagos': 'Nigeria',
        'Africa/Johannesburg': 'South Africa'
      };
      
      userCountry = timezoneCountryMap[timezone] || 'Unknown';
      userIP = 'estimated';
    }
    
    const { error } = await supabase.rpc('increment_tool_usage', {
      p_tool_name: toolName,
      p_user_ip: userIP,
      p_user_agent: userAgent
    });

    if (error) {
      console.error('Error tracking tool usage:', error);
    }
  } catch (error) {
    console.error('Error tracking tool usage:', error);
  }
};

export const getAnalytics = async () => {
  try {
    // Get daily analytics
    const { data: dailyData, error: dailyError } = await supabase
      .from('daily_analytics')
      .select('*')
      .order('date', { ascending: false })
      .limit(30);

    if (dailyError) throw dailyError;

    // Get total tool usage with country data
    const { data: toolUsage, error: toolError } = await supabase
      .from('tool_usage')
      .select('tool_name, country, created_at')
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    if (toolError) throw toolError;

    // Calculate tool usage stats
    const toolStats = toolUsage?.reduce((acc: Record<string, number>, usage) => {
      acc[usage.tool_name] = (acc[usage.tool_name] || 0) + 1;
      return acc;
    }, {}) || {};

    // Calculate real country statistics
    const countryStats = toolUsage?.reduce((acc: Record<string, number>, usage) => {
      if (usage.country && usage.country !== 'Unknown') {
        acc[usage.country] = (acc[usage.country] || 0) + 1;
      }
      return acc;
    }, {}) || {};

    const totalCountryUses = Object.values(countryStats).reduce((sum: number, count: number) => sum + count, 0);
    
    const realCountryStats: CountryStats[] = Object.entries(countryStats)
      .map(([country, count]) => ({
        country,
        count: count as number,
        percentage: Math.round(((count as number) / totalCountryUses) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 25); // Top 25 countries
    // Get recent activity
    const { data: recentActivity, error: activityError } = await supabase
      .from('tool_usage')
      .select('tool_name, created_at, country')
      .order('created_at', { ascending: false })
      .limit(10);

    if (activityError) throw activityError;

    return {
      dailyAnalytics: dailyData || [],
      toolUsage: toolStats,
      recentActivity: recentActivity || [],
      countryStats: realCountryStats,
      totalUsers: dailyData?.reduce((sum, day) => sum + day.total_users, 0) || 0,
      totalToolUses: dailyData?.reduce((sum, day) => sum + day.total_tool_uses, 0) || 0
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
};

export const getAdminSettings = async () => {
  try {
    // Check if Supabase is properly configured
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase not configured, using default settings');
      return null;
    }

    const { data, error } = await supabase
      .from('admin_settings')
      .select('*');

    if (error) throw error;

    // Convert to key-value object
    const settings: Record<string, any> = {};
    data?.forEach(setting => {
      settings[setting.setting_key] = setting.setting_value;
    });

    return settings;
  } catch (error) {
    // Handle network errors gracefully
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.warn('Unable to connect to Supabase. Using default settings.');
    } else {
      console.error('Error fetching admin settings:', error);
    }
    return null;
  }
};

export const updateAdminSetting = async (key: string, value: any) => {
  try {
    const { error } = await supabase
      .from('admin_settings')
      .upsert({
        setting_key: key,
        setting_value: value,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'setting_key'
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating admin setting:', error);
    return false;
  }
};

export const getNotifications = async () => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('is_active', true)
      .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};

export const createNotification = async (notification: Omit<Notification, 'id' | 'created_at'>) => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert(notification);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating notification:', error);
    return false;
  }
};

export const updateDailyAnalytics = async () => {
  try {
    const { error } = await supabase.rpc('update_daily_analytics');
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating daily analytics:', error);
    return false;
  }
};

// Policy management functions
export const getPolicies = async () => {
  try {
    const { data, error } = await supabase
      .from('policies')
      .select('*')
      .eq('is_active', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching policies:', error);
    return [];
  }
};

export const updatePolicy = async (id: string, updates: Partial<Policy>) => {
  try {
    const { error } = await supabase
      .from('policies')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating policy:', error);
    return false;
  }
};

export const getPolicy = async (type: 'terms' | 'privacy') => {
  try {
    const { data, error } = await supabase
      .from('policies')
      .select('*')
      .eq('type', type)
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching policy:', error);
    return null;
  }
};

// Article management functions
export const getPublishedArticles = async (limit?: number) => {
  try {
    let query = supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export const getFeaturedArticles = async (limit: number = 3) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching featured articles:', error);
    return [];
  }
};

export const getArticleBySlug = async (slug: string) => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};

export const getArticlesByCategory = async (category: string, limit?: number) => {
  try {
    let query = supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
      .eq('category', category)
      .order('published_at', { ascending: false });
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
};

// Admin functions for article management
export const getAllArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all articles:', error);
    return [];
  }
};

export const createArticle = async (article: Omit<Article, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { error } = await supabase
      .from('articles')
      .insert({
        ...article,
        updated_at: new Date().toISOString(),
        published_at: article.is_published ? new Date().toISOString() : null
      });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating article:', error);
    return false;
  }
};

export const updateArticle = async (id: string, updates: Partial<Article>) => {
  try {
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    // Set published_at when publishing for the first time
    if (updates.is_published && !updates.published_at) {
      updateData.published_at = new Date().toISOString();
    }
    
    const { error } = await supabase
      .from('articles')
      .update(updateData)
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating article:', error);
    return false;
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    return false;
  }
};

// Cash offer functions
export const getCashOfferClaims = async () => {
  try {
    const { data, error } = await supabase
      .from('cash_offer_claims')
      .select('*')
      .order('claimed_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching cash offer claims:', error);
    return [];
  }
};

export const updateCashOfferClaim = async (id: string, updates: Partial<CashOfferClaim>) => {
  try {
    const updateData = {
      ...updates,
      processed_at: updates.status && updates.status !== 'pending' ? new Date().toISOString() : undefined
    };

    const { error } = await supabase
      .from('cash_offer_claims')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating cash offer claim:', error);
    return false;
  }
};

// YouTube Downloads functions
export const getYouTubeDownloads = async () => {
  try {
    const { data, error } = await supabase
      .from('youtube_downloads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching YouTube downloads:', error);
    return [];
  }
};

export const createYouTubeDownload = async (downloadData: any) => {
  try {
    const { error } = await supabase
      .from('youtube_downloads')
      .insert(downloadData);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating YouTube download record:', error);
    return false;
  }
};

export const updateYouTubeDownload = async (id: string, updates: any) => {
  try {
    const { error } = await supabase
      .from('youtube_downloads')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating YouTube download:', error);
    return false;
  }
};

// Media Downloads functions
export const getMediaDownloads = async () => {
  try {
    const { data, error } = await supabase
      .from('media_downloads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching media downloads:', error);
    return [];
  }
};

export const createMediaDownload = async (downloadData: Partial<MediaDownload>) => {
  try {
    const { error } = await supabase
      .from('media_downloads')
      .insert(downloadData);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating media download record:', error);
    return false;
  }
};

export const updateMediaDownload = async (id: string, updates: Partial<MediaDownload>) => {
  try {
    const { error } = await supabase
      .from('media_downloads')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating media download:', error);
    return false;
  }
};