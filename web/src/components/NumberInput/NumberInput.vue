<template>
  <input
    :step="step"
    :type="type"
    :placeholder="placeholder"
    :required="required"
    :autofocus="autofocus"
    :value="value"
    :min="min"
    :max="max"
    :disabled="disabled"
    @input="onChangeInput"
  >
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class NumberInput extends Vue {
  @Prop({ type: String, default: 'number' }) readonly type!: string
  @Prop() value!: string
  @Prop() readonly placeholder!: string
  @Prop({ type: Boolean, default: false }) readonly required!: boolean
  @Prop({ type: Boolean, default: false }) readonly autofocus!: boolean
  @Prop() readonly min!: number
  @Prop() readonly max!: number
  @Prop() readonly disabled!: boolean
  @Prop({ default: 1 }) readonly  step!: number
  
  onChangeInput = (e: { target: HTMLInputElement }) => {
    this.$emit('input', e.target.value)
  }
}
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  padding: 8px 4px;
}
</style>