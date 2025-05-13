import { useState } from "react";

export const useTable = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTracking, setSelectedTracking] = useState(null);

  const handleTrackingClick = (tracking) => {
    setSelectedTracking(tracking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return {
    isModalOpen,
    setIsModalOpen,
    selectedTracking,
    setSelectedTracking,
    handleTrackingClick,
    handleCloseModal,
  }
}
