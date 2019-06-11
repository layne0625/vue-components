export default {
  data() {
    return {
      autocompleteOptions: [],
    };
  },
  inheritAttrs: false,
  props: {
    itemType: {
      type: String,
      default: 'input',
    },
    value: [String, Array, Date, Number, Boolean],
    options: Array,
    remoteMethod: Function,
    renderItem: Function,
  },
  methods: {
    handleUpdateModel(value) {
      this.$emit('input', value);
    },
    async fetchAutoCompleteData(keyword) {
      if (this.remoteMethod && typeof this.remoteMethod === 'function') {
        const data = await this.remoteMethod(keyword);
        this.autocompleteOptions = data;
      }
    },
  },
  render(h) {
    const attributes = {
      attrs: this.$attrs,
    };
    if (this.itemType === 'select') {
      return (
        <el-select value={this.value} on-change={this.handleUpdateModel}>
          {
              this.options.map(item => (
                <el-option
                key={item.value}
                label={item.label}
                value={item.value}
                {...attributes} />
              ))
          }
        </el-select>
      );
    } if (this.itemType === 'autocomplete') {
      return (
        <el-select
        value={this.value}
        remote
        filterable
        {...attributes}
        remote-method={this.fetchAutoCompleteData}
        on-change={this.handleUpdateModel}
        >
          {
            this.autocompleteOptions.map(item => (
              <el-option
                key={item.value}
                label={item.label}
                value={item.value}
                {...attributes}
              />
            ))
          }
        </el-select>
      );
    } if (this.itemType === 'date' || this.itemType === 'rangePicker') {
      const defaultType = this.itemType === 'rangePicker' ? 'daterange' : 'date';
      return (
        <el-date-picker value={this.value} type={defaultType} valueFormat='yyyy-MM-DD' {...attributes} on-input={this.handleUpdateModel}></el-date-picker>
      );
    } if (this.itemType === 'custom') {
      return this.renderItem(h, this);
    }
    return (
      <el-input value={this.value} on-input={this.handleUpdateModel} {...attributes} ></el-input>
    );
  },
};
