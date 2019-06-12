### template
```
<template>
    <div >
        <table-page ref="tablePage" :filters="filters" :get-data="mockTableFetch" :columns="columns" @select-all="handleSelectAll" @selection-change="handleSelectChange" @select="handleSelect">
            <template v-slot:operates>
                <div class="table-operates">
                    <el-button type='primary' icon="el-icon-plus" size="small">新增</el-button>
                    <el-button size="small">导出</el-button>
                    <el-button size="small">导出明细</el-button>
                </div>
            </template>
            <template v-slot:status="slotProps">
                <el-link type='success' :underline="false">成功</el-link>
            </template>
            <template v-slot:rowOperate="slotProps">
                <el-button type='text'>查看</el-button>
                <el-button type='text' @click="handleDelete(slotProps.scope.row.id)">删除</el-button>
            </template>
        </table-page>
    </div>
</template>
<script>
export default {
    data() {
        return {
            columns: [{
                prop: 'prop1',
                label: '类目1'
            }, {
                prop: 'prop2',
                label: '类目2',
                slotName: 'status'
            }],
            // filters目前支持 input, select, autocomplete, date, rangePicker, custom
            filters: [{
                // itemType默认为input， 如果itemType不写， 默认渲染el-input
                name: 'name1',
                label: '类目1'
            }, {
                label: '类目2',
                name: 'name2',
                // element元素props加在itemProps中
                itemProps: {
                    type: 'password',
                    placeholder: '密码'
                }
            }, {
                label: '类目3',
                name: 'name3',
                itemType: 'autocomplete',
                itemProps: {
                    remoteMethod: this.mockFetch,
                }
            },
            {
                label: '类目4',
                name: 'name4',
                itemType: 'select',
                itemProps: {
                    options: [{label: 'item1', value: '1'}, {label: 'item2', value: '2'}]
                }
            }, {
                label: '类目5',
                name: 'name5',
                itemType: 'rangePicker',
            }, {
                label: '类目6',
                name: 'name6',
                itemType: 'date',
            },
            ]
        };
    },
    methods: {
        mockFetch(keyword) {
            const data = mockData.filter(item => item.label.includes(keyword));
            return Promise.resolve(keyword ? data : mockData);
        },
        mockTableFetch(params) {
            console.log(params);
            return Promise.resolve({total: 10, data: mockData});
        },
        handleDelete(id) {
            console.log(id);
            // 操作之后需要重新获取列表数据
            this.$refs.tablePage.refetch();
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