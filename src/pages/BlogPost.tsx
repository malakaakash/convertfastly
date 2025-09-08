import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Tag, ArrowLeft, Share2, Clock } from 'lucide-react';
import { getArticleBySlug, getArticlesByCategory, Article } from '../lib/supabase';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (articleSlug: string) => {
    try {
      const articleData = await getArticleBySlug(articleSlug);
      if (articleData) {
        setArticle(articleData);
        
        // Calculate reading time (average 200 words per minute)
        const wordCount = articleData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        setReadingTime(Math.ceil(wordCount / 200));
        
        // Fetch related articles from the same category
        const related = await getArticlesByCategory(articleData.category, 3);
        setRelatedArticles(related.filter(a => a.id !== articleData.id));
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareArticle = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
        alert('Article URL copied to clipboard!');
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Article URL copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Blog</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.meta_title || article.title} | ConvertFastly Blog</title>
        <meta name="description" content={article.meta_description || article.excerpt} />
        <meta name="keywords" content={article.tags.join(', ')} />
        <link rel="canonical" href={`https://convertfastly.com/blog/${article.slug}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={`https://convertfastly.com/blog/${article.slug}`} />
        <meta property="og:type" content="article" />
        {article.featured_image && (
          <meta property="og:image" content={article.featured_image} />
        )}
        <meta property="article:author" content={article.author} />
        <meta property="article:published_time" content={article.published_at || article.created_at} />
        <meta property="article:section" content={article.category} />
        {article.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back to Blog */}
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Blog</span>
        </Link>

        {/* Article Header */}
        <header className="space-y-6">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
            {article.is_featured && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.published_at || article.created_at)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
            <button
              onClick={shareArticle}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>

          {article.featured_image && (
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
            />
          )}
        </header>

        {/* Article Content */}
        <article className="prose prose-lg prose-gray max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/blog/${relatedArticle.slug}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {relatedArticle.featured_image && (
                    <img
                      src={relatedArticle.featured_image}
                      alt={relatedArticle.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BlogPost;