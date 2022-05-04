// src/store/counter.Strore.js
import { makeAutoObservable } from "mobx"

class CounterStore {
  // 定义数据
  count = 0
  constructor() {
    // 响应式数据
    makeAutoObservable(this)
  }
  // 更新数据
  addCount = () => {
    this.count++
  }
}

export { CounterStore }


// src/store/number.Strore.js
import { makeAutoObservable } from "mobx"

class NumberStore {
  // 定义数据
  list = [1, 2, 3, 4, 5, 6]
  constructor() {
    // 响应式数据
    makeAutoObservable(this)
  }
  // 定义计算
  get filterList() {
    return this.list.filter(item => item % 2 == 0)
  }
  // 更新数据
  addNumber = () => {
    this.list = this.list.concat([7, 8, 9, 10])
  }
}

export { NumberStore }


// src/store/index.js
import React from 'react'
import { CounterStore } from './counter.Strore'
import { NumberStore } from './number.Strore'

class RootStore {
  constructor() {
    this.counterStore = new CounterStore()
    this.numberStore = new NumberStore()
  }
}

const rootStore = new RootStore()
// 通过 context 将 rootStore 传递给需要用的业务组件
const context = React.createContext(rootStore)
// 调用 useStore 方法即可获取 rootStore
const useStore = () => React.useContext(context)

export { useStore }

// src/App.jsx
import { useStore } from './store/index'
import { observer } from 'mobx-react-lite'

function App() {
  const rootStore = useStore()
  const { counterStore, numberStore } = rootStore

  return (
    <div>
      <button onClick={counterStore.addCount}>
        count: {counterStore.count}
      </button>
      <p>{numberStore.filterList.join('-')}</p>
      <button onClick={numberStore.addNumber}>添加数据</button>
    </div>
  )
}

export default observer(App)
