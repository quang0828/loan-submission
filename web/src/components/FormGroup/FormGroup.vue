<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class FormGroup extends Vue {
  @Prop(String) readonly label!: string
}
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>