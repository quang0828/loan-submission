<template>
  <div class="login-view">
    <img alt="Vue logo" src="@/assets/logo.png">
    <LoginForm :onSubmit="onSubmit" :error="error" :loading="loading" />
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import router from '@/router';
import { Component, Vue, Watch } from 'vue-property-decorator'
import { LoginForm } from '@/components'
import { LoginType } from '@/utils/interface'
import { UserState } from '@/store/modules/user'

@Component({
  components: {
    LoginForm,
  },
  computed: {
    ...mapState('user', ['data', 'error', 'loading', 'token'])
  },
  methods: {
    ...mapActions('user', ['userLogin'])
  },
})

export default class Login extends Vue {
  data!: UserState
  error!: string
  loading!: boolean
  token!: string
  userLogin!: (loginInfo: LoginType) => void

  @Watch('token')
  onTokenChange(token: string) {{
    if (token) {
      router.push({ name: 'loans' })
    }
  }}
  
  onSubmit(loginInfo: LoginType) {
    this.userLogin({...loginInfo});
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 100px;
}
</style>
