<template>
    <div class="component-TablePage">
        <table-filter :filters='filters' @fetch="handleFetch" :filter-form-props="filterFormProps"/>
        <slot name='operates'></slot>
        <slot name='tableTips'></slot>
        <el-table
            :data="tableData"
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
    </div>
</template>
<style scoped lang='scss' src='./TablePage.scss'></style>
<script src='./TablePage.js'></script>
