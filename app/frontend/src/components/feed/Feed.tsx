import React, { useEffect, useState } from 'react';
import ProfileHeader from '../profile/ProfileHeader';
import ProfileSections from '../profile/ProfileSections';
import ActivityFeed from '../profile/ActivityFeed';
import { mockProfile } from '../profile/mock';

interface ProfileBundle {
  user: any;
  profile: any;
  activities: any[];
}

const Feed: React.FC = () => {
  const [data, setData] = useState<ProfileBundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setData(mockProfile);
      } catch (e) {
        setError('Failed to load feed');
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-4 space-y-4">
        <div className="animate-pulse h-36 bg-gray-200 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            <div className="h-40 bg-gray-200 rounded" />
            <div className="h-40 bg-gray-200 rounded" />
          </div>
          <div className="h-80 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-red-600">{error}</div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <ProfileHeader user={data.user} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <ProfileSections profile={data.profile} phone={data.user.phone} />
        </div>
        <div className="md:col-span-1">
          <ActivityFeed items={data.activities} />
        </div>
      </div>
    </div>
  );
};

export default Feed; 