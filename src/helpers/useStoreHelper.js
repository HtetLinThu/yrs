import { useStationStore } from "@/stores/userPortal/stationStore";

const stores = {
  stationStore: useStationStore(),
};

const useStoreHelper = (storeName) => {
  return stores[storeName];
};

export { useStoreHelper };
