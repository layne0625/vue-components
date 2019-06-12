<template>
    <div class="demo">
        <table-page
          ref="tablePage"
          :filters="filters"
          :get-data="mockTableFetch"
          :columns="columns"
          @select-all="handleSelectAll"
          @selection-change="handleSelectChange"
          @select="handleSelect"
          label-width="120px"
        >
            <template v-slot:operates>
                <div class="table-operates">
                    <el-button type='primary'>新增</el-button>
                    <el-button type='primary'>导出</el-button>
                </div>
            </template>
            <template v-slot:tableTips>
                <el-alert title="成功提示的文案" type="success" :closable="false"/>
            </template>
            <template v-slot:rowOperate="slotProps">
                <el-button type='text'>查看</el-button>
                <el-button type='text' @click="handleDelete(slotProps.scope.row.id)">删除</el-button>
            </template>
        </table-page>
    </div>
</template>
<style scoped lang='scss' src='./demo.scss'></style>
<script src='./demo.js'></script>
