// import {Excel} from '@/components/excel/Excel'
// import {Formula} from './components/formula/Formula'
// import {Header} from './components/header/Header'
// import {Table} from './components/table/Table'
// import {Toolbar} from './components/toolbar/Toolbar'
// import {createStore} from './core/createStore'
// import {storage, debounce} from './core/utils'
// import {rootReducer} from './redux/rootReducer'
// import {initialState} from '@/redux/initialState'
import {Router} from './core/routes/Router'
import './scss/index.scss'


new Router('#app', {})
// const store = createStore(rootReducer, initialState)
// const stateListener = debounce((state) => {
//   console.log('app state', state)
//   storage('excel-state', state)
// }, 500)
// store.subscribe(stateListener)
// const excel = new Excel('#app', {
//   components: [Header, Toolbar, Formula, Table],
//   store,
// })
// excel.render()
