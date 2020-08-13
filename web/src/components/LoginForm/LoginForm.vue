<template>
  <div id="login-form">
    <h1>Application</h1>
    <p class="error">{{ error }}<p>
    <form @submit="onSubmitHandler">
      <FormGroup label="Email">
          <TextInput v-model="formModel.email" type="email" placeholder="Email address" :required="true" :autofocus="true" />
      </FormGroup>
      <FormGroup label="Password">
          <TextInput v-model="formModel.password" type="password" placeholder="Password" :required="true" />
      </FormGroup>
      <Button v-if="!loading" type="submit">Sign in</Button>
      <Loading v-else />
    </form>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FormGroup, TextInput, Button, Loading } from '@/components';
import { LoginType } from '@/utils/interface';

@Component({
  components: {
    FormGroup,
    TextInput,
    Button,
    Loading
  }
})
export default class LoginForm extends Vue {
  @Prop({ required: true }) readonly onSubmit!: (info: LoginType) => void
  @Prop() readonly error!: string
  @Prop({ default: false }) readonly loading!: boolean

  public formModel: LoginType = {
    email: '',
    password: ''
  }

  onSubmitHandler = (event: Event) => {
    event.preventDefault();
    this.onSubmit(this.formModel)
  }
}
</script>

<style lang="scss" scoped>
#login-form {
  max-width: 320px;
  width: 100%;
  margin: auto;
  padding: 16px;
  box-sizing: border-box;
}
.error {
  color: red;
  text-align: left;
}
</style>
