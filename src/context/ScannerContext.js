import React, { createContext, useCallback, useContext, useState } from 'react';
import { dummyData } from '../mock/dummyData';

const ScannerContext = createContext();

export const ScannerProvider = ({ children }) => {
  const [tableData, setTableData] = useState(dummyData);
  const [newItems, setNewItems] = useState(new Set());

  const handleScan = useCallback((scanValue) => {
    if (scanValue.trim()) {
      const newScan = {
        id: Math.max(...tableData.map(item => item.id)) + 1,
        trackingNumber: scanValue,
        package: '-',
        deliveryDate: '-',
        client: '-',
        facility: '-'
      };

      setTableData(prevData => {
        const newData = [newScan, ...prevData];
        setNewItems(prev => {
          const updated = new Set(prev);
          updated.add(newScan.id);
          setTimeout(() => {
            setNewItems(current => {
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
  }, [tableData]);

  const deleteTracking = useCallback((trackingId) => {
    setTableData(prevData => prevData.filter(item => item.id !== trackingId));
    setNewItems(prev => {
      const updated = new Set(prev);
      updated.delete(trackingId);
      return updated;
    });
  }, []);

  const value = {
    handleScan,
    tableData,
    deleteTracking,
    newItems
  };

  return (
    <ScannerContext.Provider value={value}>
      {children}
    </ScannerContext.Provider>
  );
};

export const useScanner = () => {
  const context = useContext(ScannerContext);
  if (!context) {
    throw new Error('useScanner must be used within a ScannerProvider');
  }
  return context;
}; 