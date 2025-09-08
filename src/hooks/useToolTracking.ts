import { useEffect } from 'react';
import { trackToolUsage } from '../lib/supabase';

export const useToolTracking = (toolName: string) => {
  useEffect(() => {
    // Track tool usage when component mounts
    trackToolUsage(toolName);
  }, [toolName]);
};