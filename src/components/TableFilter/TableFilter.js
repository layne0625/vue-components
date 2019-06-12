/* eslint-disable no-undefined , no-mixed-operators */
import FormItem from './FormItem';

const rangePickerSpan = 1; // 暂定为1列
export default {
  data() {
    return {
      filterForm: this.getInitFilterForm(),
      collapse: true,
      itemSpan: (24 / this.col),
    };
  },
  components: {
    FormItem,
  },
  props: {
    filters: {
      type: Array,
      default() {
        return [];
      },
    },
    canCollapse: {
      type: Boolean,
      default: true,
    },
    col: {
      type: Number,
      default: 4,
      validator(value) {
        return [2, 3, 4].indexOf(value) !== -1;
      },
    },
    labelWidth: {
      type: String,
      default: '100px',
    },
    filterFormProps: {
      type: Object,
      default: () => ({
      }),
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('fetch', true);
    },
    handleReset() {
      this.filterForm = this.getInitFilterForm();
      this.$emit('fetch', true);
    },
    toggleCollapse() {
      this.collapse = !this.collapse;
    },
    getElementDefaultValue(item) {
      switch (item.type) {
        case 'checkbox':
          return [];
        default:
          return '';
      }
    },
    getSpan(item) {
      if (item.itemType === 'rangePicker') {
        return rangePickerSpan * this.itemSpan;
      }
      return this.itemSpan;
    },
    getInitFilterForm() {
      return this.filters.reduce((prev, cur) => {
        if (cur.name) {
          if (cur.defaultValue !== undefined) {
            return {
              ...prev,
              [cur.name]: cur.defaultValue,
            };
          }
          const defaultValue = this.getElementDefaultValue(cur);
          return {
            ...prev,
            [cur.name]: defaultValue,
          };
        }
        return prev;
      }, {});
    },
  },
  computed: {
    filterItems() {
      return this.collapse ? this.collapseItems : this.filters;
    },
    collapseItems() {
      const items = [];
      let num = 0;
      this.filters.forEach((item) => {
        if (num < 4) {
          items.push(item);
          num = item.itemType === 'rangePicker' ? num + rangePickerSpan : num + 1;
        }
      });
      return items;
    },
    showCollapse() {
      const total = this.filters.slice(0, 4).reduce((prev, cur) => {
        if (cur.itemType === 'rangePicker') {
          return prev + rangePickerSpan;
        }
        return prev + 1;
      }, 0);
      if (this.canCollapse === false || (this.filters.length <= 4 && total <= 4)) {
        return false;
      }
      return true;
    },
    operateOffset() {
      const total = this.filterItems.reduce((prev, cur) => {
        if (cur.itemType === 'rangePicker') {
          return prev + rangePickerSpan;
        }
        return prev + 1;
      }, 0);
      return (this.col - 1 - total % this.col) * this.itemSpan;
    },
  },
};
