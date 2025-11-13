// AssetContext.js
import { createContext, useState, useCallback } from 'react';

export const AssetContext = createContext();

export function AssetProvider({ children }) {
  const [loadedAssets, setLoadedAssets] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);

  const registerAsset = useCallback(() => {
    setTotalAssets(prev => prev + 1);
  }, []);

  const assetLoaded = useCallback(() => {
    setLoadedAssets(prev => prev + 1);
  }, []);

  const resetAssets = useCallback(() => {
    setLoadedAssets(0);
    setTotalAssets(0);
  }, []);

  return (
    <AssetContext.Provider value={{ loadedAssets, totalAssets, registerAsset, assetLoaded, resetAssets }}>
      {children}
    </AssetContext.Provider>
  );
}
