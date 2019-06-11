<template>
    <div class="demo">
        <table-page
          :filters="filters"
          :get-data="mockFetch"
          :columns="columns"
          @select-all="handleSelectAll"
          @selection-change="handleSelectChange"
          @select="handleSelect"
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
            <template v-slot:aaa="slotProps">
                <el-button type='text'>查看{{slotProps.scope.row.value}}</el-button>
            </template>
        </table-page>
    </div>
</template>
<style scoped lang='scss' src='./demo.scss'></style>
<script src='./demo.js'></script>
