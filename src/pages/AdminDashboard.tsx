import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Activity, 
  Settings, 
  Eye, 
  EyeOff, 
  Save,
  Bell,
  Globe,
  Trash2,
  Plus,
  Edit,
  LogOut,
  FileText as ArticleIcon,
  X,
  DollarSign
} from 'lucide-react';
import { 
  getAnalytics, 
  getAdminSettings, 
  updateAdminSetting,
  createNotification,
  getPolicies,
  updatePolicy,
  supabase,
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  Article,
  getCashOfferClaims,
  updateCashOfferClaim,
  getYouTubeDownloads
} from '../lib/supabase';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<any>(null);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showApiKey, setShowApiKey] = useState(false);
  const [policies, setPolicies] = useState<any[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [cashOfferClaims, setCashOfferClaims] = useState<any[]>([]);
  const [youtubeDownloads, setYoutubeDownloads] = useState<any[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [showArticleForm, setShowArticleForm] = useState(false);

  // Form states
  const [logoSettings, setLogoSettings] = useState({
    logo_url: '',
    header_size: 48,
    footer_size: 48,
    homepage_size: 160
  });

  const [adsSettings, setAdsSettings] = useState({
    show_ads: false,
    header_ad: '',
    footer_ad: '',
    sidebar_ad: '',
    content_ad: '',
    success_ad: ''
  });

  const [promotionSettings, setPromotionSettings] = useState({
    show_promotion_form: false
  });

  const [toolsVisibility, setToolsVisibility] = useState<Record<string, boolean>>({});

  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    type: 'info',
    expires_at: ''
  });

  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category: 'General',
    tags: '',
    is_published: false,
    is_featured: false,
    author: 'ConvertFastly Team',
    meta_title: '',
    meta_description: ''
  });

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === 'cash-offers') {
      fetchCashOfferClaims();
    }
  }, [activeTab]);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  };

  const fetchData = async () => {
    try {
      const [analyticsData, settingsData, policiesData, articlesData, cashClaimsData, youtubeDownloadsData] = await Promise.all([
        getAnalytics(),
        getAdminSettings(),
        getPolicies(),
        getAllArticles(),
        getCashOfferClaims(),
        getYouTubeDownloads()
      ]);

      setAnalytics(analyticsData);
      setSettings(settingsData || {});
      setPolicies(policiesData || []);
      setYoutubeDownloads(youtubeDownloadsData);
      setArticles(articlesData || []);
      setCashOfferClaims(cashClaimsData || []);

      // Set form states from settings
      if (settingsData?.logo_settings) {
        setLogoSettings(settingsData.logo_settings);
      }
      if (settingsData?.ads_settings) {
        setAdsSettings(settingsData.ads_settings);
      }
      if (settingsData?.tools_visibility) {
        setToolsVisibility(settingsData.tools_visibility);
      }
      if (settingsData?.promotion_settings) {
        setPromotionSettings(settingsData.promotion_settings);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const fetchCashOfferClaims = async () => {
    try {
      const claims = await getCashOfferClaims();
      setCashOfferClaims(claims);
    } catch (error) {
      console.error('Error fetching cash offer claims:', error);
    }
  };

  const updateClaimStatus = async (id: string, status: string, notes?: string) => {
    try {
      const success = await updateCashOfferClaim(id, { 
        status: status as any, 
        admin_notes: notes,
        processed_at: new Date().toISOString()
      });
      
      if (success) {
        // Show success message for admin
        alert(`Cash offer claim ${status} successfully!`);
        fetchCashOfferClaims(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating claim status:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const saveLogoSettings = async () => {
    const success = await updateAdminSetting('logo_settings', logoSettings);
    if (success) {
      alert('Logo settings saved successfully!');
      fetchData();
    }
  };

  const saveAdsSettings = async () => {
    const success = await updateAdminSetting('ads_settings', adsSettings);
    if (success) {
      alert('Ads settings saved successfully!');
      fetchData();
    }
  };

  const saveToolsVisibility = async () => {
    const success = await updateAdminSetting('tools_visibility', toolsVisibility);
    if (success) {
      alert('Tools visibility saved successfully!');
      fetchData();
    }
  };

  const savePromotionSettings = async () => {
    const success = await updateAdminSetting('promotion_settings', promotionSettings);
    if (success) {
      alert('Promotion settings saved successfully!');
      fetchData();
    }
  };

  const createNewNotification = async () => {
    if (!notificationForm.title || !notificationForm.message) {
      alert('Please fill in title and message');
      return;
    }

    const notification = {
      ...notificationForm,
      expires_at: notificationForm.expires_at || null
    };

    const success = await createNotification(notification);
    if (success) {
      alert('Notification created successfully!');
      setNotificationForm({ title: '', message: '', type: 'info', expires_at: '' });
      fetchData();
    }
  };

  const updatePolicyContent = async (policyId: string, content: string) => {
    const success = await updatePolicy(policyId, { content });
    if (success) {
      alert('Policy updated successfully!');
      fetchData();
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleArticleSubmit = async () => {
    if (!articleForm.title || !articleForm.content) {
      alert('Please fill in title and content');
      return;
    }

    const articleData = {
      ...articleForm,
      slug: articleForm.slug || generateSlug(articleForm.title),
      tags: articleForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      meta_title: articleForm.meta_title || articleForm.title,
      meta_description: articleForm.meta_description || articleForm.excerpt
    };

    let success = false;
    if (editingArticle) {
      success = await updateArticle(editingArticle.id, articleData);
    } else {
      success = await createArticle(articleData);
    }

    if (success) {
      alert(`Article ${editingArticle ? 'updated' : 'created'} successfully!`);
      setShowArticleForm(false);
      setEditingArticle(null);
      setArticleForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        category: 'General',
        tags: '',
        is_published: false,
        is_featured: false,
        author: 'ConvertFastly Team',
        meta_title: '',
        meta_description: ''
      });
      fetchData();
    }
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setArticleForm({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      featured_image: article.featured_image || '',
      category: article.category,
      tags: article.tags.join(', '),
      is_published: article.is_published,
      is_featured: article.is_featured,
      author: article.author,
      meta_title: article.meta_title || '',
      meta_description: article.meta_description || ''
    });
    setShowArticleForm(true);
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const success = await deleteArticle(id);
      if (success) {
        alert('Article deleted successfully!');
        fetchData();
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderYouTubeDownloadsTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">YouTube Downloads</h3>
          <div className="text-sm text-gray-500">
            Total downloads: {youtubeDownloads.length}
          </div>
        </div>

        {youtubeDownloads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Video</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Format</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quality</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {youtubeDownloads.map((download) => (
                  <tr key={download.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 truncate max-w-xs">
                          {download.video_title || download.video_id}
                        </div>
                        {download.channel_name && (
                          <div className="text-sm text-gray-500">{download.channel_name}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        download.download_mode === 'video' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {download.download_mode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {download.selected_format?.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {download.selected_quality}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        download.status === 'completed' ? 'bg-green-100 text-green-800' :
                        download.status === 'failed' ? 'bg-red-100 text-red-800' :
                        download.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {download.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(download.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {download.user_ip?.substring(0, 10)}...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Download className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p>No YouTube downloads yet</p>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
            <button
              onClick={() => setActiveTab('youtube-downloads')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'youtube-downloads' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              YouTube Downloads
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'articles', label: 'Articles', icon: ArticleIcon },
              { id: 'cash-offers', label: 'Cash Offers', icon: DollarSign },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'policies', label: 'Policies', icon: Edit }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && analytics && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Tool Uses</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalToolUses || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Globe className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Countries</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.countryStats?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool Usage Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tools</h3>
              <div className="space-y-3">
                {Object.entries(analytics.toolUsage || {}).slice(0, 10).map(([tool, count]) => (
                  <div key={tool} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 capitalize">{tool.replace(/-/g, ' ')}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((count as number) / Math.max(...Object.values(analytics.toolUsage || {})) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count as number}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {analytics.recentActivity?.slice(0, 10).map((activity: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {activity.tool_name.replace(/-/g, ' ')}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        from {activity.country || 'Unknown'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(activity.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            {/* Logo Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                  <input
                    type="url"
                    value={logoSettings.logo_url}
                    onChange={(e) => setLogoSettings({...logoSettings, logo_url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Header Size (px)</label>
                    <input
                      type="number"
                      value={logoSettings.header_size}
                      onChange={(e) => setLogoSettings({...logoSettings, header_size: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Footer Size (px)</label>
                    <input
                      type="number"
                      value={logoSettings.footer_size}
                      onChange={(e) => setLogoSettings({...logoSettings, footer_size: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Homepage Size (px)</label>
                    <input
                      type="number"
                      value={logoSettings.homepage_size}
                      onChange={(e) => setLogoSettings({...logoSettings, homepage_size: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <button
                  onClick={saveLogoSettings}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Logo Settings</span>
                </button>
              </div>
            </div>

            {/* Ads Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Advertisement Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="show_ads"
                    checked={adsSettings.show_ads}
                    onChange={(e) => setAdsSettings({...adsSettings, show_ads: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="show_ads" className="text-sm font-medium text-gray-700">
                    Enable Advertisements
                  </label>
                </div>

                {adsSettings.show_ads && (
                  <div className="space-y-4">
                    {['header_ad', 'footer_ad', 'sidebar_ad', 'content_ad', 'success_ad'].map((adType) => (
                      <div key={adType}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {adType.replace('_', ' ')} Code
                        </label>
                        <textarea
                          value={adsSettings[adType as keyof typeof adsSettings] as string}
                          onChange={(e) => setAdsSettings({...adsSettings, [adType]: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows={3}
                          placeholder="Enter ad code here..."
                        />
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={saveAdsSettings}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Ad Settings</span>
                </button>
              </div>
            </div>

            {/* Tools Visibility */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools Visibility</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'color-palette-generator', 'image-resizer', 'password-generator', 'qr-code-generator',
                  'text-encoder-decoder', 'json-formatter', 'unit-converter', 'hash-generator',
                  'lorem-ipsum-generator', 'color-format-converter', 'emi-calculator', 'file-converter',
                  'currency-converter', 'pdf-to-word', 'word-to-pdf', 'image-compressor',
                  'ai-text-summarizer', 'ai-grammar-rewriter', 'ai-image-generator', 'text-to-speech',
                  'speech-to-text', 'language-translator', 'pdf-merger', 'pdf-splitter',
                  'word-editor', 'pdf-editor', 'age-calculator', 'keyword-research', 'website-audit',
                  'domain-authority-checker', 'backlink-checker', 'plagiarism-checker', 'traffic-estimator',
                  'meta-tag-generator', 'robots-txt-generator', 'sitemap-generator', 'broken-link-checker',
                  'pagespeed-checker', 'keyword-density-checker', 'content-optimizer', 'ai-content-writer'
                ].map((tool) => (
                  <div key={tool} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={tool}
                      checked={toolsVisibility[tool] !== false}
                      onChange={(e) => setToolsVisibility({...toolsVisibility, [tool]: e.target.checked})}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor={tool} className="text-sm text-gray-700 capitalize">
                      {tool.replace(/-/g, ' ')}
                    </label>
                  </div>
                ))}
              </div>
              <button
                onClick={saveToolsVisibility}
                className="mt-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                <span>Save Visibility Settings</span>
              </button>
            </div>

            {/* Promotion Settings */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Promotion Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="show_promotion_form"
                    checked={promotionSettings.show_promotion_form}
                    onChange={(e) => setPromotionSettings({...promotionSettings, show_promotion_form: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="show_promotion_form" className="text-sm font-medium text-gray-700">
                    Show Promotion Request Form on Tools
                  </label>
                </div>
                <p className="text-sm text-gray-500">
                  When enabled, users will see a form to request promotion of their content on tool pages.
                </p>
                <button
                  onClick={savePromotionSettings}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Promotion Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Manage Articles</h3>
              <button
                onClick={() => setShowArticleForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>New Article</span>
              </button>
            </div>

            {/* Article Form Modal */}
            {showArticleForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-semibold">
                      {editingArticle ? 'Edit Article' : 'Create New Article'}
                    </h4>
                    <button
                      onClick={() => {
                        setShowArticleForm(false);
                        setEditingArticle(null);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={articleForm.title}
                          onChange={(e) => {
                            setArticleForm({...articleForm, title: e.target.value});
                            if (!editingArticle) {
                              setArticleForm(prev => ({...prev, slug: generateSlug(e.target.value)}));
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                        <input
                          type="text"
                          value={articleForm.slug}
                          onChange={(e) => setArticleForm({...articleForm, slug: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                      <textarea
                        value={articleForm.excerpt}
                        onChange={(e) => setArticleForm({...articleForm, excerpt: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        rows={3}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Content (HTML)</label>
                      <textarea
                        value={articleForm.content}
                        onChange={(e) => setArticleForm({...articleForm, content: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                        rows={10}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                          type="text"
                          value={articleForm.category}
                          onChange={(e) => setArticleForm({...articleForm, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                        <input
                          type="text"
                          value={articleForm.author}
                          onChange={(e) => setArticleForm({...articleForm, author: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={articleForm.tags}
                        onChange={(e) => setArticleForm({...articleForm, tags: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="productivity, tools, tutorial"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image URL</label>
                      <input
                        type="url"
                        value={articleForm.featured_image}
                        onChange={(e) => setArticleForm({...articleForm, featured_image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                        <input
                          type="text"
                          value={articleForm.meta_title}
                          onChange={(e) => setArticleForm({...articleForm, meta_title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                        <input
                          type="text"
                          value={articleForm.meta_description}
                          onChange={(e) => setArticleForm({...articleForm, meta_description: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="is_published"
                          checked={articleForm.is_published}
                          onChange={(e) => setArticleForm({...articleForm, is_published: e.target.checked})}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
                          Published
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="is_featured"
                          checked={articleForm.is_featured}
                          onChange={(e) => setArticleForm({...articleForm, is_featured: e.target.checked})}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
                          Featured
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => {
                          setShowArticleForm(false);
                          setEditingArticle(null);
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleArticleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        {editingArticle ? 'Update' : 'Create'} Article
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cash-offers' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Cash Offer Claims</h2>
                  <div className="text-sm text-gray-500">
                    Total Claims: {cashOfferClaims.length}
                  </div>
                </div>

                {cashOfferClaims.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            PayPal Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Visits
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Claimed Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {cashOfferClaims.map((claim) => (
                          <tr key={claim.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{claim.name}</div>
                                <div className="text-sm text-gray-500">{claim.email}</div>
                                <div className="text-xs text-gray-400">{claim.country}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{claim.paypal_email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{claim.visit_count}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                claim.status === 'approved' ? 'bg-green-100 text-green-800' :
                                claim.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                                claim.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {claim.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(claim.claimed_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                {claim.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => updateClaimStatus(claim.id, 'approved')}
                                      className="text-green-600 hover:text-green-800 text-sm"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => updateClaimStatus(claim.id, 'rejected', 'Rejected by admin')}
                                      className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                      Reject
                                    </button>
                                  </>
                                )}
                                {claim.status === 'approved' && (
                                  <button
                                    onClick={() => updateClaimStatus(claim.id, 'paid', 'Payment processed')}
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                  >
                                    Mark Paid
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-6xl mb-4">💰</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Cash Offer Claims Yet</h3>
                    <p>Claims will appear here when users reach 50+ visits and request their $10 reward.</p>
                  </div>
                )}
              </div>
            )}
            {/* Articles List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{article.title}</div>
                          <div className="text-sm text-gray-500">/blog/{article.slug}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            article.is_published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {article.is_published ? 'Published' : 'Draft'}
                          </span>
                          {article.is_featured && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(article.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEditArticle(article)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(article.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Cash Offers Tab */}
        {activeTab === 'cash-offers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Cash Offer Claims</h3>
              <div className="text-sm text-gray-500">
                {cashOfferClaims.length} total claims
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['pending', 'approved', 'paid', 'rejected'].map((status) => {
                const count = cashOfferClaims.filter(claim => claim.status === status).length;
                const colors = {
                  pending: 'bg-yellow-50 text-yellow-800 border-yellow-200',
                  approved: 'bg-blue-50 text-blue-800 border-blue-200',
                  paid: 'bg-green-50 text-green-800 border-green-200',
                  rejected: 'bg-red-50 text-red-800 border-red-200'
                };
                
                return (
                  <div key={status} className={`rounded-lg p-4 text-center border ${colors[status as keyof typeof colors]}`}>
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm capitalize">{status}</div>
                  </div>
                );
              })}
            </div>

            {/* Claims Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PayPal Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visits
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Claimed
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cashOfferClaims.map((claim) => (
                    <tr key={claim.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{claim.name}</div>
                          <div className="text-sm text-gray-500">{claim.email}</div>
                          <div className="text-xs text-gray-400">{claim.country}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{claim.paypal_email}</div>
                        {claim.phone && (
                          <div className="text-xs text-gray-500">{claim.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{claim.visit_count}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={claim.status}
                          onChange={async (e) => {
                            const success = await updateCashOfferClaim(claim.id, { status: e.target.value as any });
                            if (success) {
                              fetchData();
                            }
                          }}
                          className={`text-xs px-2 py-1 rounded-full border-0 ${
                            claim.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            claim.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                            claim.status === 'paid' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="paid">Paid</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(claim.claimed_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={async () => {
                            const notes = prompt('Add admin notes:', claim.admin_notes || '');
                            if (notes !== null) {
                              const success = await updateCashOfferClaim(claim.id, { admin_notes: notes });
                              if (success) fetchData();
                            }
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Notes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Notification</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={notificationForm.message}
                  onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={notificationForm.type}
                    onChange={(e) => setNotificationForm({...notificationForm, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expires At (Optional)</label>
                  <input
                    type="datetime-local"
                    value={notificationForm.expires_at}
                    onChange={(e) => setNotificationForm({...notificationForm, expires_at: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <button
                onClick={createNewNotification}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                <span>Create Notification</span>
              </button>
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className="space-y-6">
            {policies.map((policy) => (
              <div key={policy.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                  {policy.type} Policy
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={policy.title}
                      onChange={(e) => {
                        const updatedPolicies = policies.map(p => 
                          p.id === policy.id ? {...p, title: e.target.value} : p
                        );
                        setPolicies(updatedPolicies);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      value={policy.content}
                      onChange={(e) => {
                        const updatedPolicies = policies.map(p => 
                          p.id === policy.id ? {...p, content: e.target.value} : p
                        );
                        setPolicies(updatedPolicies);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={10}
                    />
                  </div>
                  <button
                    onClick={() => updatePolicyContent(policy.id, policy.content)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4" />
                    <span>Update {policy.type} Policy</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* YouTube Downloads Tab */}
        {activeTab === 'youtube-downloads' && renderYouTubeDownloadsTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;