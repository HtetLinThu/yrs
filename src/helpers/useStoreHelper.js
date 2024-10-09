import { useStationStore } from "@/stores/userPortal/stationStore";
import { useRouteStore } from "@/stores/userPortal/routeStore";

const stores = {
  stationStore: useStationStore(),
  routeStore: useRouteStore(),
};

const useStoreHelper = (storeName) => {
  return stores[storeName];
};

export { useStoreHelper };
