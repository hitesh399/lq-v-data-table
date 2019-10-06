import LqVDataTable from './components/LqVDataTable';
import LqVPagination from './components/LqVPagination';
import LqVDataTableSelect from './components/LqVDataTableSelect';
import LqVDataTableSelectAll from './components/LqVDataTableSelectAll';
import LqVDataTableHeader from './components/LqVDataTableHeader';
import { lqTableOptions } from './defaultOptions'

export default {
    // The install method will be called with the Vue constructor as
    // the first argument, along with possible options
    install (Vue, options = {}) {
      lqTableOptions.merge(options)
      Vue.component('lq-v-data-table', LqVDataTable)
      Vue.component('lq-v-pagination', LqVPagination)
      Vue.component('lq-v-data-table-select', LqVDataTableSelect)
      Vue.component('lq-v-data-table-select-all', LqVDataTableSelectAll)
      Vue.component('lq-v-data-table-header', LqVDataTableHeader)
    }
  }