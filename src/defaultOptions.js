const lqTableOptions = {
    options: {
        rowsPerPageItems: [10, 15, 30, 50, 100, 200, 500],
        itemKey: 'id',
        pageSize: 30,
        keepSelected: true,
        autoFilter: true,
        keepSelectedOnPageChange: true,
        keepAlive: true,
        loadingText: 'Fetching...',
        noDataText: 'No data available'
    },
    get rowsPerPageItems() {
        return this.options.rowsPerPageItems
    },
    get itemKey() {
        return this.options.itemKey
    },
    get pageSize() {
        return this.options.pageSize
    },
    get keepSelected() {
        return this.options.keepSelected
    },
    get autoFilter() {
        return this.options.autoFilter
    },
    get loadingText() {
        return this.options.loadingText
    },
    get noDataText() {
        return this.options.noDataText
    },
    get keepSelectedOnPageChange() {
        return this.options.keepSelectedOnPageChange
    },
    get keepAlive() {
        return this.options.keepAlive
    },
    merge: function (options) {
        this.options = {
            ...this.options,
            ...options
        }
    }
}
export { lqTableOptions }