<template>
  <div class="loan-submit-form-view">
    <h1>Submit Loan</h1>
    <div class="loan-form-wrapper">
      <form @submit="onSubmitHandler">
        <FormGroup label="Product Type">
          <Select
            v-model="formModel.productType"
            required
            placeholder="Select product type"
            :options="productTypeOptions"
          />
        </FormGroup>
        <FormGroup label="Loan Amount">
          <NumberInput :step="0.01" required v-model="formModel.loanAmount" :min="1" />
        </FormGroup>
        <FormGroup label="Interest Rate (%)">
          <NumberInput :step="0.01" :disabled="true" :value="interestRate" />
        </FormGroup>
        <FormGroup label="Terms (months)">
          <Select
            v-model="formModel.terms"
            required
            placeholder="Select terms"
            :options="termOptions"
          />
        </FormGroup>
        <FormGroup label="Monthly Amortization">
          <NumberInput :step="0.01" :disabled="true" :value="monthlyAmortization" />
        </FormGroup>
        <FormGroup label="Documents">
          <TextInput />
        </FormGroup>
        <Loading v-if="loading" />
        <div v-else>
          <div class="btn-nav"><Button>Apply</Button></div>
          <div class="btn-nav"><Button @click="onCancelHandler" color="danger">Cancel</Button></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'
import { Button, TextInput, FormGroup, NumberInput, Select, Loading } from '@/components'
import { LoanType } from '@/utils/interface'
import { interestRates, LoansAlerts } from '@/utils/constants'
import { monthlyAmortizationCalculator } from '@/utils/loansHelpers'
import router from '@/router';

@Component({
  components: {
    Button,
    TextInput,
    FormGroup,
    NumberInput,
    Select,
    Loading
  },
  computed: {
    ...mapState('loan', ['error', 'loading', 'createdLoan'])
  },
  methods: {
    ...mapActions('loan', ['submitLoan'])
  },
})
export default class LoanCreate extends Vue {
  loading!: boolean
  submitLoan!: (info: LoanType) => void
  createdLoan!: LoanType

  @Watch('createdLoan')
  onCreatedLoanChanged(val: LoanType, oldVal: LoanType) {
    if (val && val._id !== oldVal?._id) {
      router.push({ name: 'loans', params: { alert: LoansAlerts.createSucceed } })
    }
  }

  readonly productTypeOptions = [
    { value: 'PurchaseOrder', text: 'Purchase Order' },
    { value: 'InvoiceFinancing', text: 'Invoice Financing'}
  ]

  readonly termOptions = [
    { value: 3, text: '3 months' },
    { value: 6, text: '6 months' },
    { value: 12, text: '12 months' },
    { value: 24, text: '24 months' }
  ]

  public formModel: LoanType = {
    productType: undefined,
    loanAmount: 0,
    terms: undefined,
    documents: '',
  }

  public get interestRate() {
    return this.formModel.productType ? interestRates[this.formModel.productType] : 0;
  }

  public get monthlyAmortization() {
    const loanAmount = typeof this.formModel.loanAmount === 'string' ? parseFloat(this.formModel.loanAmount) : this.formModel.loanAmount
    return monthlyAmortizationCalculator(
      loanAmount,
      this.interestRate,
      this.formModel.terms || 0,
    )
  }

  onSubmitHandler(event: Event) {
    event.preventDefault();
    this.submitLoan({...this.formModel});
  }

  onCancelHandler() {
    router.push({ name: 'loans' })
  }
}
</script>

<style lang="scss" scoped>
.loan-form-wrapper {
  max-width: 400px;
  margin: auto;
  padding: 16px;
}
.btn-nav {
  display: inline-block;
  margin: 8px;
}
</style>