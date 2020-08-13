<template>
  <button @click="onclick" :type="type" :class="color">
      <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Button extends Vue {
  @Prop({ type: String, default: 'submit' }) readonly type!: string
  @Prop({ type: String, default: 'default' }) readonly color!: 'default' | 'danger'

  onclick = (e: { target: HTMLInputElement }) => {
    this.$emit('click', e)
  }
}
</script>

<style lang="scss" scoped>
button {
  border-radius: 4px;
  border: 1px solid;
  outline: none;
  color: #007bff;
  background-color: transparent;
  background-image: none;
  border-color: #007bff;
  background: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
  &.danger {
    color: #dc3545;
    background-color: transparent;
    background-image: none;
    border-color: #dc3545;
    &:hover {
      color: #fff;
      background-color: #dc3545;
      border-color: #dc3545;
    }
  }
}
</style>