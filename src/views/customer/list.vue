<template>
  <div class="driverList">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        width="150px"
        align="center"
        label="货主编号"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.customerId }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="货主"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.customerName }} （{{ scope.row.cityName }})</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="类型"
        width="180px"
      >
        <template slot-scope="{row}">
          <el-tag :type="row.status | articleStatusFilter">
            {{ row.primaryClassificationName }}<span v-if="row.secondaryClassificationName">/{{ row.secondaryClassificationName }}</span>
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        min-width="60px"
        align="center"
        label="合同状态"
      >
        <template slot-scope="{row}">
          {{ row.contractEffectiveness }}
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="创建时间"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.createDate | Timestamp }}</p>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="创建人"
      >
        <template slot-scope="scope">
          <p><span v-if="scope.row.creatorName">({{ scope.row.creatorName }})</span></p>
        </template>
      </el-table-column>

      <el-table-column
        min-width="120px"
        align="center"
        label="合同止期"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.contractEnd | Timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column
        min-width="120"
        align="center"
        label="线路销售"
      >
        <template slot-scope="{row}">
          {{ row.lineSaleName | DataIsNull }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="goDetail(scope.row.customerId)"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { GetCustomerList } from '@/api/customer'
import { IArticleData } from '@/api/types'
import { HandlePages } from '@/utils/index'
import Pagination from '@/components/Pagination/index.vue'

  @Component({
    name: 'DriverList',
    components: {
      Pagination
    }
  })
export default class extends Vue {
    private total = 0
    private list: IArticleData[] = []
    private page: Object | undefined = ''
    private listLoading = true
    private listQuery = {
      key: '',
      page: 1,
      limit: 30,
      endDate: '',
      startDate: '',
      state: '',
      lineSaleId: ''
    }

    created() {
      this.getList()
      this.name()
    }

    private name(): any {
      // interface Person {
      //   readonly name: string;
      //   age?: number;
      // enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat}
      // console.log(Days)
      // console.log(Days['Sun'] === 0) // true
      // console.log(Days['Mon'] === 1) // true
      // console.log(Days['Tue'] === 2) // true
      // console.log(Days['Sat'] === 6) // true

      // console.log(Days[0] === 'Sun') // true
      // console.log(Days[1] === 'Mon') // true
      // console.log(Days[2] === 'Tue') // true
      // console.log(Days[6] === 'Sat') // true

      // var Days: any;
      // (function(Days) {
      //   Days[Days['Sun'] = 0] = 'Sun'
      //   Days[Days['Mon'] = 1] = 'Mon'
      //   Days[Days['Tue'] = 2] = 'Tue'
      //   Days[Days['Wed'] = 3] = 'Wed'
      //   Days[Days['Thu'] = 4] = 'Thu'
      //   Days[Days['Fri'] = 5] = 'Fri'
      //   Days[Days['Sat'] = 6] = 'Sat'
      // })(Days || (Days = {}))

      // enum Days {Sun = 7, Mon, Tue, Sat = <any>'S'}
      // console.log(Days)
    }

    private async getList() {
      this.listLoading = true
      const { data } = await GetCustomerList(this.listQuery)
      if (data.success) {
        this.list = data.data
        data.page = await HandlePages(data.page)
        this.total = data.page.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      }
    }

    private goDetail(id: string | (string | null)[] | null | undefined) {
      this.$router.push({ name: 'CustomerDetail', query: { id: id } })
    }
}
</script>

<style lang="scss" scoped>
  .driverList{
    padding: 20px;
    padding-bottom: 0;
    box-sizing: border-box;
    .el-table{
      max-height: 750px;
      border: 1px solid #dfe6ec;
      overflow-y: scroll;
    }
    .el-table::before{
      height: 0;
    }
    .edit-input {
      padding-right: 100px;
    }
    .cancel-btn {
      position: absolute;
      right: 15px;
      top: 10px;
    }
  }

</style>
