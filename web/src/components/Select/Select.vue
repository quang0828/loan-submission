<template>
    <select
      :required="required"
      :autofocus="autofocus"
      :value="value"
      @input="onChange">
      <option v-if="placeholder" value="" disabled selected hidden>{{placeholder}}</option>
      <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.value">
        {{ option.text }}
      </option>
    </select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Select extends Vue {
  @Prop() value!: string
  @Prop() readonly placeholder!: string
  @Prop({ type: Boolean, default: false }) readonly required!: boolean
  @Prop({ type: Boolean, default: false }) readonly autofocus!: boolean
  @Prop() readonly options!: Array<{ value: number | string; text: number | string}>

  
  onChange = (e: { target: HTMLInputElement }) => {
    this.$emit('input', e.target.value)
  }
}
</script>

<style lang="scss" scoped>
select {
  padding: 8px 4px;
}
</style>