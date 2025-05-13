import { useState } from "react";

export const useScanner = () => {

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

  return  {
    scanValue,
    isLoading,
    onScan,
    handleKeyPress,
    handleInputChange,
    scanValue,
    setScanValue,
  }
}
