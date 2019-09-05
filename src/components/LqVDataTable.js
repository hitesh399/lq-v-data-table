import Vue from 'vue'

export default Vue.extend({
  name: 'lq-v-datatable',
  provide() {
    return {
        lqVDataTable: this
    };
  },
  props: {
    tableName: {
        type: String,
        required: true       
    },
    action: {
        type: String,
        required: true
    },
    method:{
        type: String,
        default: () => 'GET'
    },
    defaultSortBy: String,
    defaultSortOrder: {
        type: String,
        default: () => 'asc'
    },
    keepAlive: {
        type: Boolean,
        default: () => true
    },
    defaultPageSize: Number,
    staticData: Object,
    rowsPerPageItems: {
        type: Array,
        default: () => [10, 15, 30, 50, 100, 200, 500]
    },
    itemKey: {
        type: String,
        default: () => 'id'
    },
    keepSelected: {
        type: Boolean,
        default: () => false
    },
    autoRefresh: {
        type: Boolean,
        default: () => true
    },
    selectAll: {
        type: Boolean,
        default: () => false
    },
    keepSelectedOnPageChange: {
        type: Boolean,
        default: () => true
    },
    otherServerData: Array,
  },
  data () {
      return {
          isLoaded: false
      }
  },
  created() {
    if (!this.sortBy) {
        if (this.defaultSortBy) {
            this.$lqForm.setElementVal(this.tableName, 'sortBy', this.defaultSortBy)
            this.$lqForm.setElementVal(this.tableName, 'sort_by', { [this.defaultSortBy] : this.defaultSortOrder})
        }
        if (this.defaultSortOrder) {
            this.$lqForm.setElementVal(this.tableName, 'descending', this.defaultSortOrder === 'desc')
        }
    }
  },
  render: function () {
    return this.getLqList()
  },
  mounted: function () {
      this.isLoaded = true
  },
  computed: {
    currentPage: function () {
        return this.$helper.getProp(this.$store.state, ['form', this.tableName, 'values', 'page'], 1);
    },
    pageSize: function () {
        return this.$helper.getProp(this.$store.state, ['form', this.tableName, 'values', 'page_size'], 15);
    },
    sortBy: function () {
        return this.$helper.getProp(this.$store.state, ['form', this.tableName, 'values', 'sortBy'], null);
    },
    descending: function () {
        return this.$helper.getProp(this.$store.state, ['form', this.tableName, 'values', 'descending'], false);
    },
    total: function () {
        return this.$helper.getProp(this.$store.state, ['table', this.tableName, 'settings', 'total'], 0);
    },
    requesting: function () {
        return this.$helper.getProp(this.$store.state, ['table', this.tableName, 'requesting'], false);
    },
    selectedKeys: function () {
        return this.$helper.getProp(this.$store.state, ['form', this.tableName, 'values', 'selected'], []);
    },
    pagination: function () {
        return {
            page: this.currentPage,
            rowsPerPage: this.pageSize,
            totalItems: this.total,
            descending: this.descending,
            sortBy: this.sortBy
        }
    }
  },
  methods: {
    getDataTable (scope) {
        const self = this;
        const headers = this.$scopedSlots.headers;
        
        return this.$createElement(
            'v-data-table', 
            {
                class: {
                    'elevation-1': true,
                    'cell-md-space': true
                },
                on: {
                    ...this.$listeners,
                    'update:pagination': function (data) {                     
                        if (self.isLoaded) {
                            self.fetchData(data)
                        }
                    }
                },
                props: {
                    ...this.$attrs,
                    selectAll: self.selectAll,
                    items: scope.items,
                    loading: scope.requesting,
                    disablePagination: scope.requesting,
                    totalItems: scope.total,
                    rowsPerPageItems: this.rowsPerPageItems,
                    pagination: this.pagination,
                    itemKey: this.itemKey
                },
                scopedSlots: {
                    ...this.$scopedSlots,
                    headers: props => headers ? headers(props) : self.getTableHeader(props)
                },
                ref: 'vDatatable',
            },            
            this.renderSlots()
        )
    },
    getLqList () {
        // console.log('Scope', this.$slots)
        return this.$createElement('lq-list', {
            props: {
                keepAlive: this.keepAlive,              
                type: 'table',
                name: this.tableName,
                requestMethod: this.method,
                action: this.action,
                primaryKey: this.itemKey,
                extraDataKeys: ['sort_by'],
                autoRefresh: this.autoRefresh,
                keepSelectedOnPageChange: this.keepSelectedOnPageChange,
                defaultPageSize: this.defaultPageSize,
                staticData: this.staticData,
                otherServerData: this.otherServerData
            },
            scopedSlots: {
                ...this.$scopedSlots,
                default: props => this.getDataTable(props),
            }
        }, this.renderSlots())
    },
    renderSlots () {
        const slotNames = Object.keys(this.$slots);
        return slotNames.map(
            slotName => this.$createElement(
                'template', 
                { slot: slotName }, 
                this.$slots[slotName]
            )
        )
    },
    fetchData (data) {
        if (this.requesting) {
            return;
        }
        const { sortBy, descending } = data;
        if(data.page !== this.currentPage && data.rowsPerPage === this.pageSize) {
            this.$lqForm.removeElement(this.tableName, 'selected')
            this.$lqTable.switchPage(this.tableName, data.page);
        } else if (data.rowsPerPage !== this.pageSize) {
            this.$lqTable.changePageSize(this.tableName, data.rowsPerPage);
        }
        /**
         * To Sort Data.
         */
        if (sortBy !== this.sortBy) {
            this.$lqForm.setElementVal(this.tableName, 'sortBy', sortBy)
            this.$lqForm.setElementVal(this.tableName, 'descending', descending)
            if (sortBy) {
                this.$lqForm.setElementVal(this.tableName, 'sort_by', {
                    [sortBy] : descending ? 'desc' : 'asc'
                })
            } else {
                this.$lqForm.setElementVal(this.tableName, 'sort_by', null)
            }
            this.$lqTable.refresh(this.tableName, false);

        } else if (descending !== this.descending) {
            this.$lqForm.setElementVal(this.tableName, 'descending', descending)
            this.$lqForm.setElementVal(this.tableName, 'sort_by', {
                [sortBy] : descending ? 'desc' : 'asc'
            })
            this.$lqTable.refresh(this.tableName, false);
        }
    },
    changeSort (column, sortable) {
        if (!sortable) {
            return
        }
        let descending = this.sortBy === column ? !this.descending : false;
        this.fetchData({
            descending,
            sortBy: column,
            page: this.currentPage,
            rowsPerPage: this.pageSize,
        })
    },
    getTableHeader (props) {
        return this.$createElement('tr', this.getTH(props.headers))
    },
    getTH (headers) {
        let _headers = headers.map(header => {
            return this.$createElement('lq-v-data-table-header', {
                props: {header: header},
                attrs: {align: header.align ? header.align : 'left'},
                key: header.text
            })
        })
        if (this.selectAll ) {
            _headers.unshift(
                this.$createElement(
                    'th',
                    {
                        attrs: {align: 'left'}
                    },
                    [
                        this.$createElement(
                            'lq-v-data-table-select-all',
                            {
                                attrs: {
                                    primary: false,
                                    hideDetails: true,
                                },
                                props: {
                                    keepSelectedOnPageChange: this.keepSelectedOnPageChange
                                }
                            }
                        )
                    ]
                )
            )
        }
        return _headers;
    }
  },
  beforeDestroy() {
    if (!this.keepSelected) {
        this.$lqForm.removeElement(this.tableName, 'selected')
    }
  }
})