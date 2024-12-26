const ActivityItem = ({ icon, description, timestamp }) => {
  return (
    <div className="flex items-center space-x-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-all">
      <div className="text-xl text-gray-600">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-800">{description}</p>
        <p className="text-xs text-gray-500">{timestamp}</p>
      </div>
    </div>
  );
};

export const RecentActivityWidget = ({ activities }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <ActivityItem
            key={index}
            icon={activity.icon}
            description={activity.description}
            timestamp={activity.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

// Example data for the widget
export const activityData = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-check-circle"
        viewBox="0 0 16 16"
      >
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.493 6.243l1.407-1.407 2.58 2.58 5.95-5.95 1.407 1.407-7.357 7.357a1 1 0 0 1-1.413 0l-3.39-3.39a1 1 0 0 1 0-1.414z" />
      </svg>
    ),
    description: "Completed an order: Order #4567",
    timestamp: "2 minutes ago",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-pencil"
        viewBox="0 0 16 16"
      >
        <path d="M12.854.146a.5.5 0 0 1 .707 0l2 2a.5.5 0 0 1 0 .707l-9 9a.5.5 0 0 1-.222.12l-3.5 1.75a.5.5 0 0 1-.63-.63l1.75-3.5a.5.5 0 0 1 .12-.222l9-9a.5.5 0 0 1 .707 0l2 2a.5.5 0 0 1 0 .707l-6.268 6.268-1.293-.607 6.268-6.268L12.854.146z" />
      </svg>
    ),
    description: 'Updated a blog post: "How to Grow Your Business"',
    timestamp: "10 minutes ago",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-upload"
        viewBox="0 0 16 16"
      >
        <path d="M.5 13a.5.5 0 0 1 .5-.5h4V5.707l4.146 4.147a.5.5 0 0 1-.707.708L5 6.707V12h4.5a.5.5 0 0 1 .5.5h2a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5H10v-.5a.5.5 0 0 1-.5-.5V10h-1V9H9V8H8V7H7V6H6V5H5V4H4V3H3V2H2V1H1V0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1h8V0h1a.5.5 0 0 1 .5.5v1H15v4h-1V4h-2v-.5H12v-.5h-1.5V2h-1V3z" />
      </svg>
    ),
    description: "Uploaded a new image to media",
    timestamp: "30 minutes ago",
  },
];

