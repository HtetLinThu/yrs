<template>
  <van-nav-bar
    title="Buy Ticket"
    :fixed="true"
    left-text=""
    left-arrow
    @click-left="onClickLeft"
  />

  <div class="pt-[46px]"></div>

  <div class="p-3">
    <van-form @submit="onSubmit">
      <div class="bg-white rounded-lg">
        <div class="flex justify-center items-center py-3">
          <img src="@/assets/image/buy-ticket.png" alt="" class="w-5/12" />
        </div>

        <div class="pb-3">
          <van-radio-group v-model="type">
            <van-cell-group inset class="border">
              <van-cell
                v-for="ticket_pricing in ticket_pricings"
                :key="ticket_pricing.type"
                :title="ticket_pricing.title"
                clickable
                @click="type = ticket_pricing.type"
              >
                <template #right-icon>
                  <van-radio :name="ticket_pricing.type" />
                </template>
                <template #label>
                  <div>
                    <p>
                      <van-icon name="diamond-o" /> {{ ticket_pricing.price }}
                    </p>
                    <p>
                      <van-icon name="diamond-o" />
                      {{ ticket_pricing.description }}
                    </p>
                  </div>
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>

        <div
          v-if="type == 'one_time_ticket'"
          class="origin-component mx-4 rounded-lg pb-3"
        >
          <van-field
            v-model="originStationTitle"
            is-link
            readonly
            label="Origin"
            placeholder="Select Origin"
            @click="originFieldClick"
            class="rounded-lg border"
          />
          <van-popup v-model:show="showOriginPicker" position="bottom">
            <van-picker
              title="Station"
              confirm-button-text="Confirm"
              cancel-button-text="Cancel"
              :columns="stations"
              :columns-field-names="{ value: 'slug', text: 'title' }"
              @confirm="originPickerConfirm"
              @cancel="showOriginPicker = false"
              @change="originPickerChange"
            />
          </van-popup>
        </div>

        <div
          v-if="type == 'one_time_ticket'"
          class="destination-component mx-4 rounded-lg pb-3"
        >
          <van-field
            v-model="destinationStationTitle"
            is-link
            readonly
            label="Destination"
            placeholder="Select Destination"
            @click="destinationFieldClick"
            class="rounded-lg border"
          />
          <van-popup v-model:show="showDestinationPicker" position="bottom">
            <van-picker
              title="Station"
              confirm-button-text="Confirm"
              cancel-button-text="Cancel"
              :columns="stations"
              :columns-field-names="{ value: 'slug', text: 'title' }"
              @confirm="destinationPickerConfirm"
              @cancel="showDestinationPicker = false"
              @change="destinationPickerChange"
            />
          </van-popup>
        </div>
      </div>

      <div class="my-4">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          color="#1CBC9B"
          :loading="submitBtnLoading"
        >
          Confirm
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useBuyTicketStore } from "@/stores/buyTicketStore";
import { useTicketPricingStore } from "@/stores/ticketPricingStore";
import { useStationStore } from "@/stores/stationStore";
import { showSuccessToast } from "vant";

const router = useRouter();
const buyTicketStore = useBuyTicketStore();
const ticketPricingStore = useTicketPricingStore();
const stationStore = useStationStore();

const ticket_pricings = ref([]);

const stations = ref([]);
const page = ref(1);
const last_page = ref(null);
const finished = ref(false);

const originStationSlug = ref(null);
const originStationTitle = ref("");
const showOriginPicker = ref(false);

const destinationStationSlug = ref(null);
const destinationStationTitle = ref("");
const showDestinationPicker = ref(false);

const type = ref(null);

const errors = ref({
  type: "",
  origin_station_slug: "",
  destination_station_slug: "",
});
const submitBtnLoading = ref(false);

const onClickLeft = () => history.back();

const fetchTicketPricing = async () => {
  await ticketPricingStore.get();
  ticket_pricings.value = ticketPricingStore.getResponse?.data ?? [];
};

const fetchStation = async () => {
  if (finished.value == false) {
    await stationStore.get({ page: page.value, search: "" });
    stations.value.push(...(stationStore.getResponse?.data ?? []));
    last_page.value = stationStore.getResponse?.meta?.last_page ?? null;

    if (page.value >= last_page.value) {
      finished.value = true;
    } else {
      page.value++;
    }
  }
};

const originFieldClick = () => {
  showOriginPicker.value = true;
  fetchStation();
};

const originPickerConfirm = ({ selectedOptions }) => {
  originStationSlug.value = selectedOptions[0]?.slug;
  originStationTitle.value = selectedOptions[0]?.title;
  showOriginPicker.value = false;
};

const originPickerChange = ({
  selectedValues,
  selectedOptions,
  selectedIndexes,
  columnIndex,
}) => {
  if (
    stations.value[stations.value.length - 1]?.slug == selectedOptions[0].slug
  ) {
    fetchStation();
  }
};

const destinationFieldClick = () => {
  showDestinationPicker.value = true;
  fetchStation();
};

const destinationPickerConfirm = ({ selectedOptions }) => {
  destinationStationSlug.value = selectedOptions[0]?.slug;
  destinationStationTitle.value = selectedOptions[0]?.title;
  showDestinationPicker.value = false;
};

const destinationPickerChange = ({
  selectedValues,
  selectedOptions,
  selectedIndexes,
  columnIndex,
}) => {
  if (
    stations.value[stations.value.length - 1]?.slug == selectedOptions[0].slug
  ) {
    fetchStation();
  }
};

const onSubmit = async (values) => {
  submitBtnLoading.value = true;

  errors.value = {
    type: "",
    origin_station_slug: "",
    destination_station_slug: "",
  };

  await buyTicketStore.store(
    type.value,
    originStationSlug.value,
    destinationStationSlug.value
  );

  if (buyTicketStore.getErrorMessage) {
    if (buyTicketStore.getErrors) {
      errors.value = {
        type: buyTicketStore.getErrors.type
          ? buyTicketStore.getErrors.type.join(", ")
          : "",

        origin_station_slug: buyTicketStore.getErrors.origin_station_slug
          ? buyTicketStore.getErrors.origin_station_slug.join(", ")
          : "",

        destination_station_slug: buyTicketStore.getErrors
          .destination_station_slug
          ? buyTicketStore.getErrors.destination_station_slug.join(", ")
          : "",
      };
    }
  } else {
    showSuccessToast(buyTicketStore.getResponse?.message);
    router.push(`ticket/${buyTicketStore.getResponse?.data.ticket_number}`);
  }

  submitBtnLoading.value = false;
};

onMounted(() => {
  fetchTicketPricing();
});
</script>

<style scope></style>
