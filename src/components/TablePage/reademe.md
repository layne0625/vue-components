### template
```
<template>
    <div >
        <table-page :filters="filters" :get-data="mockFetch" :columns="columns" @select-all="handleSelectAll" @selection-change="handleSelectChange" @select="handleSelect">
            <!-- 用于提供批量操作 -->
            <template v-slot:operates>
                <div class="table-operates">
                    <el-button type='primary'>新增</el-button>
                    <el-button type='primary'>导出</el-button>
                </div>
            </template>
            <!-- 用于操作提示 -->
            <template v-slot:tableTips>
                <el-alert title="成功提示的文案" type="success" :closable="false"/>
            </template>
            <!-- 用于某一列单独渲染使用, 注意这里的slotName要在columns中对应 -->
            <template v-slot:aaa="slotProps">
                <el-button type='primary'>查看{{slotProps.scope.row.value}}</el-button>
            </template>
            <!-- 如果单独列渲染较多， 或者表格不符合需求， 可以加个默认的slot， 自定义el-table-column -->
        </table-page>
    </div>
</template>
<script>
export default {
    data() {
        return {
            columns: [{
                prop: 'name3',
                label: '申请采购金额'
            }, {
                prop: 'name4',
                label: '实际入库金额',
                slotName: 'aaa'
            }],
            // filters目前支持 input, select, autocomplete, date, rangePicker, custom
            filters: [{
                // itemType默认为input， 如果itemType不写， 默认渲染el-input
                name: 'username',
                label: '用户名'
            }, {
                label: '密码',
                name: 'password',
                itemType: 'input',
                // element元素props加在itemProps中
                itemProps: {
                    type: 'password',
                    placeholder: '密码'
                }
            }, {
                label: '采购单',
                name: 'poCode',
                itemType: 'autocomplete',
                itemProps: {
                    remoteMethod: this.mockFetch,
                }
            },
            {
                label: '供应商名称',
                name: 'provider',
                itemType: 'select',
                itemProps: {
                    options: [{label: 'item1', value: '1'}, {label: 'item2', value: '2'}]
                }
            }, {
                label: '采购时间',
                name: 'POCreatedAt',
                itemType: 'rangePicker',
            }, {
                label: '期望入库日期',
                name: 'expectedDate',
                itemType: 'date',
            },
            ]
        };
    },
    methods: {
        mockFetch(keyword) {
            const mockData = [{label: 'aa', value: 1}, {label: 'aa2', value: 2}, {label: 'bb', value: 3}, {label: 'cc', value: 4}, {label: 'dd',value: 5}],
                data = mockData.filter(item => item.label.includes(keyword));
            return Promise.resolve(keyword ? data : mockData);
        },
        handleSelectAll(selection) {
            console.log(selection);
        },
        handleSelectChange(selection) {
            console.log(selection);
        },
        handleSelect(selection, row) {
            console.log(selection, row);
        }
    }
};
</script>
```