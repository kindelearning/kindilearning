export default function ActivityFeed() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {/* Activity 1 */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-person-add text-blue-500"
              viewBox="0 0 16 16"
            >
              <path d="M8 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 11a4 4 0 1 1 8 0v2H4V11zm9 2v2h-2v-2h2zm1 0h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v-2h2V13h-2z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-medium">John Doe</p>
            <p className="text-sm text-gray-600">Joined the platform</p>
            <p className="text-xs text-gray-400">2 hours ago</p>
          </div>
        </div>

        {/* Activity 2 */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-cart-check text-green-500"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 10a.5.5 0 0 0-.5.5V13h7V8.707l2.646 2.647a.5.5 0 1 0 .708-.708l-3-3a.5.5 0 0 0-.708 0L7.5 8.707V10h-.5zM3 6.5A1.5 1.5 0 0 1 4.5 5h7A1.5 1.5 0 0 1 13 6.5V8h-2V7H5v1H3V6.5z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-medium">New Order Placed</p>
            <p className="text-sm text-gray-600">Order ID #1023</p>
            <p className="text-xs text-gray-400">3 hours ago</p>
          </div>
        </div>

        {/* Activity 3 */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-pencil-square text-yellow-500"
              viewBox="0 0 16 16"
            >
              <path d="M11.207 0l2.086 2.086a2 2 0 0 1 0 2.828l-7 7a2 2 0 0 1-1.141.586L1 12l.586-5.143a2 2 0 0 1 .586-1.141l7-7a2 2 0 0 1 2.828 0zM13.707 2.707a1 1 0 0 0 0-1.414L12 0 9.293 2.707 7.707 1.293a.5.5 0 0 0-.707 0l-6 6a.5.5 0 0 0 0 .707l2.464 2.464a.5.5 0 0 0 .707 0l6-6a1 1 0 0 0-1.414-1.414z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-medium">Profile Updated</p>
            <p className="text-sm text-gray-600">
              Your profile has been updated
            </p>
            <p className="text-xs text-gray-400">4 hours ago</p>
          </div>
        </div>

        {/* Activity 4 */}
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-file-earmark-plus text-teal-500"
              viewBox="0 0 16 16"
            >
              <path d="M12 0h-6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 14H4V2h8v12zM8 5.5A.5.5 0 0 1 8.5 5H9v2H8V6h-.5a.5.5 0 0 1-.5-.5V5.5h-.5z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-medium">New Document Created</p>
            <p className="text-sm text-gray-600">Document #2234 created</p>
            <p className="text-xs text-gray-400">5 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
