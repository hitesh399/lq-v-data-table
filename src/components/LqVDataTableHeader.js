import Vue from 'vue'

export default Vue.extend({
  name: 'lq-v-datatable-header',
  inject: ['lqVDataTable'],
  props: {
    header: {
        type: Object,
        required: true
    }
  },
  render () {
    const self = this;
    return this.$createElement(
        'th', 
        {
            class: {
                column: true,
                sortable: !!this.header.sortable, 
                desc: this.header.sortable && this.lqVDataTable.pagination.descending,
                asc: this.header.sortable && !this.lqVDataTable.pagination.descending,
                active: this.header.value === this.lqVDataTable.pagination.sortBy
            },
            on: {
                ...this.$listeners,
                click: function (event) {
                    event.stopPropagation()
                    self.lqVDataTable.changeSort(self.header.value, self.header.sortable)
                }
            },
            ref: 'vtd',
        },            
        this.renderDefaultSlot()
    )
  },
  methods: {
    renderDefaultSlot () {
        return this.$scopedSlots.default ? this.$scopedSlots.default({}) : this.defaultSlot()
    },
    defaultSlot () {
        return [
            this.header.sortable ?  this.$createElement('v-icon', {}, 'arrow_upward') : null,
            this.header.text
        ]
    }
  }
})