/**
 * 使用参照readme.md
 */
export default {
  name: 'ocj-TablePage',
  data() {
    return {
      tableData: [],
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
    handleFetch(params) {
      console.log(params);
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
