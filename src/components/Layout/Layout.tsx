import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import PartnerPromotion from './PartnerPromotion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 lg:ml-64">
          {/* Ad Space Placeholder - Header */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 text-center text-sm text-gray-600 hidden lg:block">
            {/* Ad Space Placeholder - Header Banner */}
            Header Advertisement Space
          </div>
          
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
          
          {/* Ad Space Placeholder - Footer */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 text-center text-sm text-gray-600 hidden lg:block">
            {/* Ad Space Placeholder - Footer Banner */}
            Footer Advertisement Space
          </div>
        </main>
      </div>
      
      <Footer />
      <PartnerPromotion />
    </div>
  );
};

export default Layout;