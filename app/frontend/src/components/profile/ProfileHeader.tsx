import React from 'react';
import { UserSummary } from './mock';

interface Props {
  user: UserSummary;
}

const ProfileHeader: React.FC<Props> = ({ user }) => {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-50 via-sky-50 to-emerald-50 border border-white shadow">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0">
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt={user.name} className="h-24 w-24 rounded-2xl object-cover" />
            ) : (
              user.name.substring(0, 1).toUpperCase()
            )}
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          <div className="mt-1 inline-flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm">{user.title}</span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm">{user.location}</span>
            {user.phone && (
              <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-sm">PH: {user.phone}</span>
            )}
          </div>
          <div className="mt-4 flex items-center justify-center md:justify-start gap-4 text-sm">
            {user.social.linkedin && (
              <a className="text-blue-700 hover:underline" href={user.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            )}
            {user.social.twitter && (
              <a className="text-sky-500 hover:underline" href={user.social.twitter} target="_blank" rel="noreferrer">Twitter</a>
            )}
            {user.social.github && (
              <a className="text-gray-800 hover:underline" href={user.social.github} target="_blank" rel="noreferrer">GitHub</a>
            )}
            {user.social.website && (
              <a className="text-indigo-600 hover:underline" href={user.social.website} target="_blank" rel="noreferrer">Website</a>
            )}
          </div>
          <div className="mt-4 flex items-center justify-center md:justify-start gap-6 text-sm text-gray-600">
            <span><strong>{user.connections}</strong> connections</span>
            <span><strong>{user.mutualConnections}</strong> mutual</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;