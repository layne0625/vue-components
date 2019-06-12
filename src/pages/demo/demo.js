const mockData = [{ label: 'aa', value: 1, id: 1 }, { label: 'aa2', value: 2, id: 2 }, { label: 'bb', value: 3, id: 3 }, { label: 'cc', value: 4, id: 4 }, { label: 'dd', value: 5, id: 5 }];
export default {
  data() {
    return {
      columns: [{
        type: 'selection',
        width: '55',
      }, {
        prop: 'label',
        label: 'Title1',
      }, {
        prop: 'value',
        label: 'Title2',
      }, {
        prop: 'name1',
        label: 'Title3',
      }, {
        prop: 'name2',
        label: 'Title4',
      }, {
        prop: 'name3',
        label: 'Title5',
      }, {
        prop: 'name4',
        label: 'Title6',
        slotName: 'rowOperate',
      }],
      filters: [{
        name: 'filter1',
        label: 'filter1',
      }, {
        label: 'filter2',
        name: 'filter2',
        itemType: 'input',
        itemProps: {
          type: 'password',
          placeholder: '密码',
        },
      }, {
        label: 'filter3',
        name: 'filter3',
        itemType: 'autocomplete',
        itemProps: {
          remoteMethod: this.mockFetch,
        },
      },
      {
        label: 'filter4',
        name: 'filter4',
      }, {
        label: 'filter5',
        name: 'filter4',
        itemType: 'select',
        itemProps: {
          options: [{ label: 'item1', value: '1' }, { label: 'item2', value: '2' }],
        },
      }, {
        label: 'filter6',
        name: 'filter6',
        itemType: 'rangePicker',
      }, {
        label: 'filter7',
        name: 'filter8',
        itemType: 'date',
      },
      ],
    };
  },
  methods: {
    mockFetch(keyword) {
      const data = mockData.filter(item => item.label.includes(keyword));
      return Promise.resolve(keyword ? data : mockData);
    },
    mockTableFetch(params) {
      console.log(params);
      return Promise.resolve({ total: 100, data: mockData });
    },
    handleDelete(id) {
      console.log(id);
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
    },
  },
};
