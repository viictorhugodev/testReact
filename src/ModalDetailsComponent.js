import React from 'react';
import { useScanner } from './ScannerContext';

const ModalDetailsComponent = ({ isOpen, onClose, trackingDetails }) => {
  const { deleteTracking } = useScanner();

  if (!isOpen) return null;

  const handleDelete = () => {
    if (trackingDetails?.id) {
      deleteTracking(trackingDetails.id);
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
                <div key={index} className="flex items-start space-x-3 p-2 bg-gray-50 rounded">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">{item.status}</p>
                    <p className="text-sm text-gray-600">{item.date} - {item.location}</p>
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
};

export default ModalDetailsComponent; 