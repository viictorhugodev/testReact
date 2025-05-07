import React from 'react';
import ScannerComponent from '../components/ScannerComponent';
import TableComponent from '../components/TableComponent';
import { ScannerProvider } from '../context/ScannerContext';

function App() {
  return (
    <ScannerProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScannerComponent />
          <TableComponent />
        </div>
      </div>
    </ScannerProvider>
  );
}

export default App;
