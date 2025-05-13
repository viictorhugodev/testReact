import { useState } from "react";
import { ModalDetailsComponent } from "./ModalDetailsComponent";
import { useTable } from "../hooks/useTable";

 export function TableComponent() {

  const { handleCloseModal, handleTrackingClick, isModalOpen, selectedTracking, setIsModalOpen, setSelectedTracking } = useTable()

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