<template>
  <van-nav-bar
    title="Top Up"
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
          <img src="@/assets/image/top-up.png" alt="" class="w-5/12" />
        </div>

        <van-cell-group inset class="mb-3 mx-0">
          <van-field
            v-model="amount"
            name="amount"
            label="Amount"
            placeholder="Enter your amount"
            :error-message="errors.amount"
          />

          <van-field
            v-model="description"
            name="description"
            label="Description"
            placeholder="Enter your description"
            :error-message="errors.description"
          />

          <van-field name="image" label="Image" :error-message="errors.image">
            <template #input>
              <van-uploader v-model="image" max-count="1" />
            </template>
          </van-field>
        </van-cell-group>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTopUpStore } from "@/stores/topUpStore";
import { showSuccessToast } from "vant";

const router = useRouter();
const topUpStore = useTopUpStore();
const amount = ref("");
const description = ref("");
const image = ref([]);
const errors = ref({
  amount: "",
  description: "",
  image: "",
});
const submitBtnLoading = ref(false);

const onClickLeft = () => history.back();

const onSubmit = async (values) => {
  submitBtnLoading.value = true;

  errors.value = {
    amount: "",
    description: "",
    image: "",
  };

  let formData = new FormData();
  formData.append("amount", amount);
  formData.append("description", description);

  if (image.length > 0) {
    formData.append("image", image[0].file);
  }

  await topUpStore.store(formData);

  if (topUpStore.getErrorMessage) {
    if (topUpStore.getErrors) {
      errors.value = {
        amount: topUpStore.getErrors.amount
          ? topUpStore.getErrors.amount.join(", ")
          : "",

        description: topUpStore.getErrors.description
          ? topUpStore.getErrors.description.join(", ")
          : "",

        image: topUpStore.getErrors.image
          ? topUpStore.getErrors.image.join(", ")
          : "",
      };
    }
  } else {
    showSuccessToast(topUpStore.getResponse?.message);
    router.push(`top-up-history/${topUpStore.getResponse?.data?.trx_id}`);
  }

  submitBtnLoading.value = false;
};
</script>

<style scope></style>
