import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ApprovedClaim {
  id: string;
  name: string;
  email: string;
  paypal_email: string;
  status: string;
  processed_at: string;
  admin_notes?: string;
}

export const useCashOfferNotification = () => {
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);
  const [approvedClaim, setApprovedClaim] = useState<ApprovedClaim | null>(null);

  useEffect(() => {
    checkForApprovedClaim();
    
    // Check every 30 seconds for new approvals
    const interval = setInterval(checkForApprovedClaim, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const checkForApprovedClaim = async () => {
    try {
      // Get user's email from localStorage or session
      const userEmail = localStorage.getItem('userEmail');
      const userPayPal = localStorage.getItem('userPayPal');
      
      if (!userEmail && !userPayPal) return;

      // Check for recently approved claims for this user
      const { data, error } = await supabase
        .from('cash_offer_claims')
        .select('*')
        .eq('status', 'approved')
        .or(`email.eq.${userEmail},paypal_email.eq.${userPayPal}`)
        .gte('processed_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
        .order('processed_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error checking for approved claims:', error);
        return;
      }

      if (data && data.length > 0) {
        const claim = data[0];
        
        // Check if we've already shown notification for this claim
        const notificationShown = localStorage.getItem(`approval_shown_${claim.id}`);
        
        if (!notificationShown) {
          setApprovedClaim(claim);
          setShowApprovalPopup(true);
          
          // Mark as shown so we don't show again
          localStorage.setItem(`approval_shown_${claim.id}`, 'true');
        }
      }
    } catch (error) {
      console.error('Error checking cash offer approval:', error);
    }
  };

  const handleClosePopup = () => {
    setShowApprovalPopup(false);
    setApprovedClaim(null);
  };

  return {
    showApprovalPopup,
    approvedClaim,
    handleClosePopup
  };
};