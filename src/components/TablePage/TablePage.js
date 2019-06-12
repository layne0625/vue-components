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
    filters: {
      type: Array,
      required: true,
    },
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
    labelWidth: {
      type: String,
      default: '100px',
    },
    filterFormProps: {
      type: Object,
      default: () => ({}),
    },
  },
  async created() {
    const tableData = await this.getData();
    this.tableData = tableData;
  },
  methods: {
    handleFetch(resetPage = false) {
      const filterFormValues = this.$refs.tableFilter.filterForm;
      if (resetPage) {
        this.pageSize = 10;
        this.currentPage = 1;
      }
      this.getData({ ...filterFormValues, pageSize: this.pageSize, pageNo: this.currentPage });
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
