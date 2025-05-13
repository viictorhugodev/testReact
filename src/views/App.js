import { ScannerComponent } from "../components/ScannerComponent";
import { TableComponent } from "../components/TableComponent";
import { ScannerContext, useScanner } from "../ScannerContext";

const App = () => {
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
