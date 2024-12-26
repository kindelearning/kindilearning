export default function OverviewCard() {
    return (
    <><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
    {/* Total Users Card */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Total Users
        </h3>
        <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-up"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a.5.5 0 0 1 .5.5v7.793l3.646-3.647a.5.5 0 1 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L7.5 8.293V.5A.5.5 0 0 1 8 0z" />
          </svg>
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">1,243</p>
      <p className="text-sm text-gray-500">Since last month</p>
    </div>

    {/* Active Users Card */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Active Users
        </h3>
        <div className="text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-down"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a.5.5 0 0 1-.5-.5v-7.793l-3.646 3.647a.5.5 0 1 1-.708-.708l4-4a.5.5 0 0 1 .708 0l4 4a.5.5 0 1 1-.708.708L8.5 8.707V15.5a.5.5 0 0 1-.5.5z" />
          </svg>
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">320</p>
      <p className="text-sm text-gray-500">Active today</p>
    </div>

    {/* Total Revenue Card */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Total Revenue
        </h3>
        <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-up"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a.5.5 0 0 1 .5.5v7.793l3.646-3.647a.5.5 0 1 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L7.5 8.293V.5A.5.5 0 0 1 8 0z" />
          </svg>
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">$7,230</p>
      <p className="text-sm text-gray-500">This month</p>
    </div>

    {/* Conversion Rate Card */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Conversion Rate
        </h3>
        <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-up"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a.5.5 0 0 1 .5.5v7.793l3.646-3.647a.5.5 0 1 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L7.5 8.293V.5A.5.5 0 0 1 8 0z" />
          </svg>
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">2.4%</p>
      <p className="text-sm text-gray-500">Since last month</p>
    </div>

    {/* Products Card */}
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Products
        </h3>
        <div className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-box"
            viewBox="0 0 16 16"
          >
            <path d="M9.293 0h-2.586a1 1 0 0 0-.707.293l-6 6A1 1 0 0 0 0 7v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7a1 1 0 0 0-.293-.707l-6-6A1 1 0 0 0 9.293 0zM1 8V7l5-5h4l5 5v1H1zm8 5.5V11h2v2h-2zm0 2v1H7v-1H5v-2h6v2h-2z" />
          </svg>
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">1,124</p>
      <p className="text-sm text-gray-500">Available products</p>
    </div>
  </div>
    
    </>
    );
  }
  