import Vue from 'vue'

export default Vue.extend({
  name: 'lq-v-datatable-select',
  inject: ['lqVDataTable'],
  props: {
      item: {
          type: Object,
          required: true
      }
  },
  computed: {
    id () {
        return this.item[this.lqVDataTable.itemKey]
    }
  },
  render () {
    const self = this
    return this.$createElement(
        'v-checkbox', 
        {
            
            on: {
                ...this.$listeners,
                change: function (val) {
                    let selected = self.lqVDataTable.selectedKeys.slice()
                    if (val) {
                        selected.push(self.id)
                    } else {
                        const index = selected.indexOf(self.id)
                        if (index !== -1) {
                            selected.splice(index, 1)
                        }
                    }
                    self.$lqForm.setElementVal(self.lqVDataTable.tableName, 'selected', selected)
                }
            },
            props: {
                ...this.$attrs,
                inputValue: this.lqVDataTable.selectedKeys.indexOf(this.id) !== -1
            },
            scopedSlots: this.$scopedSlots,
            ref: 'vcheckbox',
        },            
        this.renderSlots()
    )
  },
  methods: {
    renderSlots () {
        const slotNames = Object.keys(this.$slots);
        return slotNames.map(
            slotName => this.$createElement(
                'template', 
                { slot: slotName }, 
                this.$slots[slotName]
            )
        )
    }
  }
})