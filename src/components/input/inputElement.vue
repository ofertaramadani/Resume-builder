<template>
    <div class="input">
        <input 
        :type="inputType"
        :placeholder="inputPlaceholder"
        :value="inputValue"
        @input="$emit('update:inputValue', $event.target.value)"
        :class="['custom-focus', customClass]"
        >
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
  
defineProps({inputType:String, inputPlaceholder:String, inputValue:String, customClass:String});
</script>

<style lang="scss" scoped>
@import './input.scss';
</style>