import { useRouteStore } from "@/stores/routeStore";
import { useStationStore } from "@/stores/stationStore";
import { useTicketStore } from "@/stores/ticketStore";
import { useTopUpHistoryStore } from "@/stores/topUpHistoryStore";
import { useWalletTransactionStore } from "@/stores/walletTransactionStore";
import routeJson from "@/assets/json/route.json";

// const stores = {
//   routeStore: useRouteStore(),
//   stationStore: useStationStore(),
//   ticketStore: useTicketStore(),
//   topUpHistoryStore: useTopUpHistoryStore(),
//   walletTransactionStore: useWalletTransactionStore(),
// };

const stores = {
  routeStore: routeJson.data,
  stationStore: useStationStore(),
  ticketStore: useTicketStore(),
  topUpHistoryStore: useTopUpHistoryStore(),
  walletTransactionStore: useWalletTransactionStore(),
};

const useStoreHelper = (storeName) => {
  return stores[storeName];
};

export { useStoreHelper };
