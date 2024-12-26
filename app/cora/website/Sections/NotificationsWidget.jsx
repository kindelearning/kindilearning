const NotificationItem = ({ title, description, time }) => {
  return (
    <div className="flex justify-between items-start p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all border border-gray-200">
      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <div className="text-xs text-gray-500">{time}</div>
    </div>
  );
};

export const NotificationsWidget = ({ notifications }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Notifications
      </h3>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              title={notification.title}
              description={notification.description}
              time={notification.time}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

// Example data for the widget
export const notificationsData = [
  {
    title: "New User Signup",
    description: "A new user has signed up for your service.",
    time: "5 mins ago",
  },
  {
    title: "Payment Received",
    description: "You have received a payment of $250.",
    time: "1 hour ago",
  },
  {
    title: "Server Maintenance",
    description: "Scheduled server maintenance completed successfully.",
    time: "3 hours ago",
  },
  {
    title: "Profile Updated",
    description: "User John Doe updated their profile information.",
    time: "Yesterday",
  },
];
