const StatisticsWidget = ({ title, value, icon, change, trend }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all">
      <div className="flex items-center justify-between space-x-4">
        {/* Icon */}
        <div className="flex-shrink-0 text-gray-600 p-3 bg-gray-100 rounded-lg">
          {icon}
        </div>
        {/* Title and Value */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>

      {/* Percentage Change */}
      <div
        className={`mt-4 flex items-center ${
          trend === "up" ? "text-green-600" : "text-red-600"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className={`bi ${trend === "up" ? "bi-arrow-up" : "bi-arrow-down"}`}
          viewBox="0 0 16 16"
        >
          <path d="M8 0l1 1h4v4h1V1a1 1 0 0 0-1-1H8zm0 7l-1-1H3V2H2v4a1 1 0 0 0 1 1h4zm0 2l-1 1v6a1 1 0 0 0 1 1h4v-5h1v4a1 1 0 0 0 1-1V9H8zm0 5H4v-4h4v4z" />
        </svg>
        <p className="ml-2 text-sm font-medium">{change}</p>
      </div>
    </div>
  );
};

export default StatisticsWidget;
