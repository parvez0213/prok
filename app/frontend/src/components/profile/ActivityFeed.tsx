import React, { useMemo, useState } from 'react';
import { ActivityItem } from './mock';

interface Props {
  items: ActivityItem[];
  pageSize?: number;
}

const ActivityFeed: React.FC<Props> = ({ items, pageSize = 10 }) => {
  const [page, setPage] = useState(1);
  const paged = useMemo(() => items.slice(0, page * pageSize), [items, page, pageSize]);
  const hasMore = paged.length < items.length;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
      <div className="space-y-3">
        {paged.map(item => (
          <div key={item.id} className="border rounded p-3">
            <div className="text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</div>
            <div className="mt-1">{item.content}</div>
          </div>
        ))}
      </div>
      {hasMore && (
        <button onClick={() => setPage(p => p + 1)} className="mt-4 w-full py-2 rounded bg-gray-100 hover:bg-gray-200">
          Load more
        </button>
      )}
    </div>
  );
};

export default ActivityFeed;