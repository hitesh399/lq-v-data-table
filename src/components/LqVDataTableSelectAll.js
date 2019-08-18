import Vue from 'vue'

export default Vue.extend({
  name: 'lq-v-datatable-select-all',
  inject: ['lqVDataTable', 'lqForm'],
  props: {
      keepSelectedOnPageChange: {
          type: Boolean,
          default: () => true
      }
  },
  computed: {
    isSelected () {
        let selctedLength = 0;
        this.lqForm.items.map((v) => {
            if (this.lqVDataTable.selectedKeys.indexOf(v[this.lqVDataTable.itemKey]) !== -1) {
                selctedLength ++;
            } 
        })
        const allSelected = this.lqForm.items.length && this.lqForm.items.length === selctedLength
        return { 
            all : allSelected,
            indeterminate: !allSelected && selctedLength > 0
        }
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
                    const pluse = val;
                    // console.log('self.keepSelectedOnPageChange)', self.keepSelectedOnPageChange)
                    let selected = self.lqVDataTable.selectedKeys.slice()
                    if (self.keepSelectedOnPageChange) {
                        self.lqForm.items.forEach(function (v) {
                            const id = v[self.lqVDataTable.itemKey];
                            const index = selected.indexOf(id)
                            if (index === -1 && pluse) {
                                selected.push(id) 
                            } else if (index !== -1 && !pluse) {
                                selected.splice(index, 1)
                            }
                        })
                    } else {
                        selected = [];
                        if (pluse) {
                            selected = self.lqForm.items.map(v =>  v[self.lqVDataTable.itemKey]);
                        }
                    }
                    self.$lqForm.setElementVal(self.lqVDataTable.tableName, 'selected', selected)
                }
            },
            props: {
                ...this.$attrs,
                inputValue: this.isSelected.all,
                indeterminate: this.isSelected.indeterminate,
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