<template>
    <div class="component-TablePage">
      <table-filter
      ref="tableFilter"
      :filters='filters'
      @fetch="handleFetch"
      :filter-form-props="filterFormProps"
      :label-width="labelWidth"/>
      <slot name='operates'></slot>
      <slot name='tableTips'></slot>
      <el-table
          :data="tableData.data"
          v-bind="tableProps"
          @selection-change="handleSelectionChange"
          @select="handleSelect"
          @select-all="handleSelectAll"
      >
          <slot>
              <el-table-column v-for="(item, index) in columns" :key="index" v-bind="item">
                  <template v-slot="scope" v-if="item.slotName">
                      <slot :name='item.slotName' :scope="scope"></slot>
                  </template>
              </el-table-column>
          </slot>
      </el-table>
      <div class="table-pagination">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.total">
          </el-pagination>
      </div>
    </div>
</template>
<style scoped lang='scss' src='./TablePage.scss'></style>
<script src='./TablePage.js'></script>
