<template>
  <div v-if="show && message" class="alert alert-primary">
    {{message}}
    <button @click="closeAlert" type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&#10005;</span>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Loans extends Vue {
  @Prop() readonly message!: string
  @Prop({ default: true }) show!: boolean
  @Prop() onClose!: Function

  closeAlert() {
    this.onClose()
  }
}
</script>

<style lang="scss" scoped>
.alert {
  position: relative;
  padding: 8px 22px;
  border: 1px solid transparent;
  border-radius: .25rem;
  max-width: 400px;
  margin: 8px;
  font-size: 14px;
  margin: auto;
  &.alert-primary {
    color: #004085;
    background-color: rgba(204, 229, 255, 0.5);
    border-color: #cce5ff;
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    color: inherit;
    cursor: pointer;
    background: none;
    border-radius: none;
    border: none;
    height: 100%;
  }
}
</style>