import Vue from 'vue'

export default Vue.extend({
  name: 'lq-v-pagination',
  inject: ['lqForm'],
  render () {
    //   console.log( parseInt(this.lqForm.total ? this.lqForm.total / this.lqForm.pageSize : 0), 'I am herer')
    const self = this;
    return this.$createElement(
        'v-pagination', 
        {
            
            on: {
                ...this.$listeners,
                input: function (page) {
                    if(page !== self.lqForm.currentPage) {
                        self.lqForm.switchPage(page)
                    }
                }
            },
            props: {
                ...this.$attrs,
                length: Math.ceil(this.lqForm.total ? this.lqForm.total / this.lqForm.pageSize : 0),
                disabled: this.lqForm.requesting,
                value: this.lqForm.currentPage
            },
            scopedSlots: this.$scopedSlots,
            ref: 'vPagination',
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