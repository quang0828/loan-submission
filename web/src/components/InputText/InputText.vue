<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :required="required"
    :autofocus="autofocus"
    :value="value"
    @input="onChangeInput"
  >
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class InputText extends Vue {
  @Prop({ type: String, default: 'text' }) readonly type!: string
  @Prop(String) value!: string
  @Prop(String) readonly placeholder!: string
  @Prop({ type: Boolean, default: false }) readonly required!: boolean
  @Prop({ type: Boolean, default: false }) readonly autofocus!: boolean
  
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