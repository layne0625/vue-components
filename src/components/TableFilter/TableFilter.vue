<template>
  <el-form
  :model="filterForm"
  ref="filterForm"
  class="filter-form component-Filter"
  label-position="right"
  :label-width="labelWidth"
  v-bind="filterFormProps" >
    <el-row :gutter="20">
      <el-col :span="getSpan(item)" :key="index" v-for="(item, index) in filterItems">
        <el-form-item :label="item.label">
          <form-item
            v-model="filterForm[item.name]"
            :itemType="item.itemType"
            v-bind="item.itemProps || {}"
            :renderItem="item.renderItem"
          />
        </el-form-item>
      </el-col>
      <el-col :span="itemSpan" :offset="operateOffset">
        <el-form-item class="operates">
          <el-link
            v-if="showCollapse"
            @click="toggleCollapse"
            type='primary'
            :underline="false"
            :icon='collapse ? "el-icon-arrow-down" : "el-icon-arrow-up"'
            >{{collapse ? '展开' : '收起'}}</el-link>
          <el-button @click="handleReset" class="reset-btn">重置</el-button>
          <el-button @click="handleSubmit" type="primary">搜索</el-button>
          <template v-slot:label>
            <span></span>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<style scoped lang='scss' src='./TableFilter.scss'></style>
<script src='./TableFilter.js'></script>
