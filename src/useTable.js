import { useState } from 'react';
import { useScanner } from './ScannerContext';

export const useTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTracking, setSelectedTracking] = useState(null);
  const { tableData, newItems } = useScanner();

  const handleTrackingClick = (tracking) => {
    setSelectedTracking(tracking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    selectedTracking,
    tableData,
    newItems,
    handleTrackingClick,
    handleCloseModal
  };
}; 