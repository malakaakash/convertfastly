import React, { useEffect, useState } from 'react';
import { getAdminSettings } from '../../lib/supabase';

interface AdComponentProps {
  position: 'header' | 'footer' | 'sidebar' | 'content' | 'success';
  className?: string;
}

const AdComponent: React.FC<AdComponentProps> = ({ position, className = '' }) => {
  const [adCode, setAdCode] = useState<string>('');
  const [showAds, setShowAds] = useState<boolean>(false);

  useEffect(() => {
    fetchAdSettings();
  }, []);

  const fetchAdSettings = async () => {
    const settings = await getAdminSettings();
    if (settings?.ads_settings) {
      setShowAds(settings.ads_settings.show_ads);
      setAdCode(settings.ads_settings[`${position}_ad`] || '');
    }
  };

  if (!showAds || !adCode) {
    return null;
  }

  return (
    <div 
      className={`ad-container ${className}`}
      dangerouslySetInnerHTML={{ __html: adCode }}
    />
  );
};

export default AdComponent;