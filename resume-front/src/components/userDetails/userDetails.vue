<template>
  <div class="card">
    <div class="img" @click.stop="openPopUp = !openPopUp">
      <img src="@/assets/icons/trash.svg" alt="" />
    </div>
    <div class="card-body">
      <h2 class="full-name" v-if="fullName">{{ fullName }}</h2>
      <p class="title" v-if="title">{{ title }}</p>
      <p class="email" v-if="email">{{ email }}</p>
      <p class="phone" v-if="phone">{{ phone }}</p>
      <p class="location" v-if="city">{{ city }}<span v-if="city && country">,</span> {{ country }}</p>
    </div>
    <div class="card-fixed" v-if="openPopUp">
      <h3>Are you sure you want to delete your resume?</h3>
      <div class="card-btns">
        <div class="btn btn-delete" @click.stop="deleteResume">Delete</div>
        <div class="btn btn-cancel" @click.stop="openPopUp = !openPopUp">
          Cancel
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

// Define emits
const emit = defineEmits(["deleteCv"]);
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

let openPopUp = ref(false);
const fullName = computed(
  () => `${props.data.firstname} ${props.data.lastname}`
);
const title = computed(() => props.data.title);
const email = computed(() => props.data.email);
const phone = computed(() => props.data.phone);
const city = computed(() => props.data.city);
const country = computed(() => props.data.country);

function deleteResume() {
  emit("deleteCv");
}
</script>

<style scoped lang="scss">
.card-fixed {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;
  z-index: 9999;
}

.card-btns {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  gap: 50px;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: none;
    &:hover {
      color: unset;
    }
    &-delete {
      background: #e23636;
    }
    &-cancel {
      background-color: #82dd55;
    }
  }
}

.card {
  margin: 0 auto;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  position: relative;
}

.img {
  width: 25px;
  height: 35px;
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 9999;
  cursor: pointer;
  & img {
    width: 100%;
    height: 100%;
  }
}

.card-header {
  background: url("https://via.placeholder.com/400") center/cover no-repeat;
  height: 150px;
  position: relative;
}

.card-body {
  padding: 16px;
  cursor: pointer;
  transition: transform 330ms ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
}

.full-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.title,
.email,
.phone,
.location {
  color: #666;
  margin-bottom: 4px;
}
</style>
