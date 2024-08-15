<template>
  <div class="card">
    <div class="img" @click="deleteResume">
      <img src="@/assets/icons/trash.svg" alt="" />
    </div>
    <div class="card-body">
      <h2 class="full-name">{{ fullName }}</h2>
      <p class="title">{{ title }}</p>
      <p class="email">{{ email }}</p>
      <p class="phone">{{ phone }}</p>
      <p class="location">{{ city }}, {{ country }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const fullName = computed(
  () => `${props.data.firstname} ${props.data.lastname}`
);
const title = computed(() => props.data.title);
const email = computed(() => props.data.email);
const phone = computed(() => props.data.phone);
const city = computed(() => props.data.city);
const country = computed(() => props.data.country);
</script>

<style scoped lang="scss">
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
