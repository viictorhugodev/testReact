import React, { useState } from "react";

function ScannerComponent() {
  const [scanValue, setScanValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onScan = async () => {
    if (scanValue.trim()) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onScan();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    const validValue = value.replace(/[^A-Z0-9]/g, "");
    setScanValue(validValue);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={scanValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter tracking number"
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase disabled:opacity-50 disabled:bg-gray-100"
        />
        <button
          onClick={onScan}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          Scan
        </button>
      </div>
      {isLoading && (
        <div className="mt-4 flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Validating tracking number...</span>
        </div>
      )}
    </div>
  );
}

function TableComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTracking, setSelectedTracking] = useState(null);

  const handleTrackingClick = (tracking) => {
    setSelectedTracking(tracking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Package Tracking List
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Total items:</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            0
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tracking Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Package
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Facility
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors duration-300">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                No data available
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="inline-block cursor-pointer bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                  No data available
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                No data available
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                No data available
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                No data available
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                No data available
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ModalDetailsComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        trackingDetails={selectedTracking}
      />
    </div>
  );
}

function ModalDetailsComponent({ isOpen, onClose, trackingDetails }) {
  if (!isOpen) return null;

  const handleDelete = () => {
    if (trackingDetails?.id) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-white/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tracking Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Tracking Number</p>
              <p className="font-medium">{trackingDetails?.trackingNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-medium">{trackingDetails?.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium">{trackingDetails?.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-medium">{trackingDetails?.location}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Tracking History</h3>
            <div className="space-y-2">
              {trackingDetails?.history?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-2 bg-gray-50 rounded"
                >
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">{item.status}</p>
                    <p className="text-sm text-gray-600">
                      {item.date} - {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Delete Tracking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScannerComponent />
        <TableComponent />
      </div>
    </div>
  );
}

export default App;
