import { ModalDetailsComponent } from "./ModalDetailsComponent";
import { useTable } from "../hooks/useTable";
import { useScannerContext } from "../ScannerContext";


export function TableComponent() {

  const { handleCloseModal, isModalOpen, selectedTracking } = useTable()
  const { tableData, newItems } = useScannerContext(); 
  console.log("🧪 tableData desde contexto:", tableData);


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
            {tableData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              tableData.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-50 transition-colors duration-300 ${
                    newItems.has(item.id) ? "bg-green-100" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 font-medium cursor-pointer">
                    {item.trackingNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.package}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.deliveryDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.facility}</td>
                </tr>
              ))
            )}
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