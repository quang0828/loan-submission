<template>
  <div class="loans-view">
    <Alert :onClose="onCloseAlert" :message="alertMsg" :show="showAlert" />
    <div class="header">
      <div class="page-title">
        <h1>Loans</h1>
        <router-link to="/loan-create"><Button>Submit Loan</Button></router-link>
      </div>
      <div @click="onClickLogout" class="logout">Logout</div>
    </div>
    <div>
      <div class="table-content">
        <table>
          <thead class="table-thead">
            <tr>
              <th v-for="col in columns" :key="col.key">{{ col.title }}</th>
            </tr>
          </thead>
          <tbody class="table-tbody">
            <tr v-for="row in list" :key="row._id">
              <td v-for="col in columns" :key="col.key">
                <span :class="col.key">{{ row[col.dataIndex] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Loading v-if="loading" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'vuex'
import { Component, Vue } from 'vue-property-decorator'
import { Button, Alert, Loading } from '@/components'
import { LoansAlerts } from '@/utils/constants'
import router from '@/router'
import { LoanType } from '@/utils/interface'

@Component({
  components: {
    Button,
    Alert,
    Loading
  },
  computed: {
    ...mapState('loan', ['error', 'loading', 'list'])
  },
  methods: {
    ...mapActions('loan', ['getLoans']),
    ...mapActions('user', ['userLogout', 'data']),
  },
})
export default class Loans extends Vue {
  loading!: boolean
  userLogout!: Function
  list!: Array<LoanType>
  getLoans!: Function
  alert: string = this.$route.params.alert
  alertMsg = ''
  showAlert = false

  columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Submitted Date',
      dataIndex: 'submittedDate',
      key: 'submittedDate',
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
      key: 'productType',
    },
    {
      title: 'Interest Rate',
      dataIndex: 'interestRate',
      key: 'interestRate',
    },
    {
      title: 'Principal Approved',
      dataIndex: 'principalApproved',
      key: 'principalApproved',
    },
    {
      title: 'Requested Loan Amount',
      dataIndex: 'loanAmount',
      key: 'loanAmount',
    },
    {
      title: 'Monthly Amortization',
      dataIndex: 'monthlyAmortization',
      key: 'monthlyAmortization',
    },
    {
      title: 'Terms',
      dataIndex: 'terms',
      key: 'terms',
    },
  ];

  created() {
    if (this.alert && this.alert === LoansAlerts.createSucceed) {
      this.alertMsg = LoansAlerts.createSucceed
      this.showAlert = true
    }
    this.getLoans()
  }

  onCloseAlert() {
    this.showAlert = false
  }

  onClickLogout() {
    this.userLogout()
    router.push({ name: 'login' })
  }
}
</script>

<style lang="scss" scoped>
.loans-view {
  max-width: 75rem;
  margin: auto;
  text-align: left;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .page-title {
    display: flex;
    align-items: center;
    h1 {
      margin-right: 22px
    }
  }
  .logout {
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
  }
  .table-content {
    font-size: 14px;
    line-height: 1.5;
    margin: 20px 0;
    overflow-x: auto;
    width: 100%;
    table {
      width: 100%;
      text-align: left;
      border-radius: 2px 2px 0 0;
      border-collapse: separate;
      border-spacing: 0;
      min-width: 900px;
    }
    .table-thead > tr > th {
      font-weight: 500;
      text-align: left;
      background: #fafafa;
      border-bottom: 1px solid #f0f0f0;
      position: relative;
      padding: 12px;
      overflow-wrap: break-word;
    }
    .table-tbody > tr {
      &:hover {
        background: #f8f8f8;
      }
      & > td {
      border-bottom: 1px solid #fefefe;
      position: relative;
      padding: 12px;
      overflow-wrap: break-word;
        ._id {
          padding: 0 7px;
          font-size: 12px;
          line-height: 20px;
          border: 1px solid #adc6ff;
          border-radius: 2px;
          color: #2f54eb;
          background: #f0f5ff;
        }
      }
    }
  }
}
</style>