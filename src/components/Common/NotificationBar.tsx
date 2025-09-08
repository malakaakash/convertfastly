import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { getNotifications, Notification } from '../../lib/supabase';

const NotificationBar: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.warn('Could not fetch notifications, continuing without them');
      setNotifications([]);
    }
  };

  const dismissNotification = (id: string) => {
    setDismissedIds(prev => [...prev, id]);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const activeNotifications = notifications.filter(
    notification => !dismissedIds.includes(notification.id)
  );

  if (activeNotifications.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {activeNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`border rounded-lg p-4 flex items-start space-x-3 ${getColorClasses(notification.type)}`}
        >
          {getIcon(notification.type)}
          <div className="flex-1">
            <h4 className="font-medium">{notification.title}</h4>
            <p className="text-sm mt-1">{notification.message}</p>
          </div>
          <button
            onClick={() => dismissNotification(notification.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationBar;