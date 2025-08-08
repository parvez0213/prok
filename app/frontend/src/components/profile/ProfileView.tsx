import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileSections from './ProfileSections';
import ActivityFeed from './ActivityFeed';
import { mockProfile } from './mock';

const ProfileView: React.FC = () => {
  const data = mockProfile;
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <ProfileHeader user={data.user} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <ProfileSections profile={data.profile} />
        </div>
        <div className="md:col-span-1">
          <ActivityFeed items={data.activities} />
        </div>
      </div>
    </div>
  );
};

export default ProfileView; 