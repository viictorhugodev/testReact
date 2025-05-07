import React, { createContext, useCallback, useContext, useState } from "react";

const dummyData = [
  {
    id: 10,
    trackingNumber: "TRK010",
    package: "Music",
    deliveryDate: "2024-03-29",
    client: "Anna Lee",
    facility: "Warehouse A",
  },
  {
    id: 9,
    trackingNumber: "TRK009",
    package: "Art",
    deliveryDate: "2024-03-28",
    client: "Chris Martin",
    facility: "Warehouse C",
  },
  {
    id: 8,
    trackingNumber: "TRK008",
    package: "Tools",
    deliveryDate: "2024-03-27",
    client: "Emma Taylor",
    facility: "Warehouse B",
  },
  {
    id: 7,
    trackingNumber: "TRK007",
    package: "Sports",
    deliveryDate: "2024-03-26",
    client: "Tom Wilson",
    facility: "Warehouse A",
  },
  {
    id: 6,
    trackingNumber: "TRK006",
    package: "Toys",
    deliveryDate: "2024-03-25",
    client: "Lisa Davis",
    facility: "Warehouse C",
  },
  {
    id: 5,
    trackingNumber: "TRK005",
    package: "Food",
    deliveryDate: "2024-03-24",
    client: "David Brown",
    facility: "Warehouse B",
  },
  {
    id: 4,
    trackingNumber: "TRK004",
    package: "Furniture",
    deliveryDate: "2024-03-23",
    client: "Sarah Williams",
    facility: "Warehouse A",
  },
  {
    id: 3,
    trackingNumber: "TRK003",
    package: "Books",
    deliveryDate: "2024-03-22",
    client: "Mike Johnson",
    facility: "Warehouse C",
  },
  {
    id: 2,
    trackingNumber: "TRK002",
    package: "Clothing",
    deliveryDate: "2024-03-21",
    client: "Jane Smith",
    facility: "Warehouse B",
  },
  {
    id: 1,
    trackingNumber: "TRK001",
    package: "Electronics",
    deliveryDate: "2024-03-20",
    client: "John Doe",
    facility: "Warehouse A",
  },
];

const ScannerContext = createContext();

const ScannerProvider = ({ children }) => {
  const [tableData, setTableData] = useState(dummyData);
  const [newItems, setNewItems] = useState(new Set());

  const handleScan = useCallback(
    (scanValue) => {
      if (scanValue.trim()) {
        const newScan = {
          id: Math.max(...tableData.map((item) => item.id)) + 1,
          trackingNumber: scanValue,
          package: "-",
          deliveryDate: "-",
          client: "-",
          facility: "-",
        };

        setTableData((prevData) => {
          const newData = [newScan, ...prevData];
          setNewItems((prev) => {
            const updated = new Set(prev);
            updated.add(newScan.id);
            setTimeout(() => {
              setNewItems((current) => {
                const next = new Set(current);
                next.delete(newScan.id);
                return next;
              });
            }, 1500);
            return updated;
          });
          return newData;
        });
      }
    },
    [tableData]
  );

  const deleteTracking = useCallback((trackingId) => {
    setTableData((prevData) =>
      prevData.filter((item) => item.id !== trackingId)
    );
    setNewItems((prev) => {
      const updated = new Set(prev);
      updated.delete(trackingId);
      return updated;
    });
  }, []);

  const value = {
    handleScan,
    tableData,
    deleteTracking,
    newItems,
  };

  return (
    <ScannerContext.Provider value={value}>{children}</ScannerContext.Provider>
  );
};

const useScanner = () => {
  const context = useContext(ScannerContext);
  if (!context) {
    throw new Error("useScanner must be used within a ScannerProvider");
  }
  return context;
};

export { ScannerProvider, useScanner };
