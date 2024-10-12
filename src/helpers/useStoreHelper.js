import { useRouteStore } from "@/stores/routeStore";
import { useStationStore } from "@/stores/stationStore";
import { useTicketStore } from "@/stores/ticketStore";
import { useTopUpHistoryStore } from "@/stores/topUpHistoryStore";
import { useWalletTransactionStore } from "@/stores/walletTransactionStore";

const stores = {
  routeStore: useRouteStore(),
  stationStore: useStationStore(),
  ticketStore: useTicketStore(),
  topUpHistoryStore: useTopUpHistoryStore(),
  walletTransactionStore: useWalletTransactionStore(),
};

const useStoreHelper = (storeName) => {
  return stores[storeName];
};

export { useStoreHelper };
