/**
 * 使用参照readme.md
 */
export default {
  name: 'ocj-TablePage',
  data() {
    return {
      tableData: { total: 0, data: [] },
      currentPage: 1,
      pageSize: 10,
    };
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
    getData: {
      type: Function,
      required: true,
    },
    tableProps: {
      type: Object,
      default: () => ({}),
    },
    pagination: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    async fetchData(params) {
      const data = await this.getData(params);
      this.tableData = data;
    },
    initFetch(values) {
      this.fetchData({ ...values, pageSize: this.currentPage, pageNo: this.currentPage });
    },
    handleFetch(resetPage = false) {
      const filterFormValues = this.$refs.tableFilter.filterForm;
      if (resetPage) {
        this.pageSize = 10;
        this.currentPage = 1;
      }
      this.fetchData({ ...filterFormValues, pageSize: this.pageSize, pageNo: this.currentPage });
    },
    refetch() {
      this.handleFetch();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.handleFetch();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.handleFetch(false);
    },
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection);
    },
    handleSelectAll(selection) {
      console.log('selection inner', selection);
      this.$emit('select-all', selection);
    },
    handleSelect(selection, row) {
      this.$emit('select', selection, row);
    },
  },
};
