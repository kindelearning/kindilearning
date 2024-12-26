const StatCard = ({ icon, value, label }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow border border-gray-200 hover:shadow-lg transition-all">
      <div className="text-3xl text-gray-600">{icon}</div>
      <div className="ml-4">
        <p className="text-xl font-semibold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export const UserStatsWidget = ({ stats }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        User Statistics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
    </div>
  );
};

// Example data for the widget
export const statsData = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-person-fill"
        viewBox="0 0 16 16"
      >
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm3-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      </svg>
    ),
    value: "1,234",
    label: "Total Users",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-graph-up"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M0 0h1v15h15v1H0V0zm4 12l3.293-3.293 1.414 1.414L7 14l4-4 3.293 3.293L14 12.586 10.707 9.293l-1.414-1.414L6 12l-3-3L2 10.586 4 12z"
        />
      </svg>
    ),
    value: "345",
    label: "Active Users",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-person-plus-fill"
        viewBox="0 0 16 16"
      >
        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 15v-1h6v1H8zm2-6a3 3 0 1 1-4-2.82c.16.055.323.102.488.142a5.973 5.973 0 0 1 4.53.1 3 3 0 0 1-.018 5.578z" />
      </svg>
    ),
    value: "78",
    label: "New Sign-Ups",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-people-fill"
        viewBox="0 0 16 16"
      >
        <path d="M13 14s-1 0-1-1 1-4-2-4-2 3-2 4-1 1-1 1h6z" />
        <path
          fill-rule="evenodd"
          d="M5.216 14A2.238 2.238 0 0 1 6 12.546c0-1.356 1.223-3.009 3-3.009S12 11.19 12 12.546A2.238 2.238 0 0 1 12.784 14H5.216z"
        />
        <path d="M9 9.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM4.5 6a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0z" />
      </svg>
    ),
    value: "23%",
    label: "Growth Rate",
  },
];
