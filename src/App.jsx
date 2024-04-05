import {
  useState,
  useContext,
  useEffect,
  useRef,
  useReducer,
  useMemo
} from "react"
import "./App.css"
import ShinCodeContext from "./main"

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1
    case "decrement":
      return state - 1
    default:
      return state
  }
}

function App() {
  // 状態が変わった時に画面表示も変えてくれる
  const [count, setCount] = useState(0)

  // バケツリレーをしなくてもよくなる
  const shincodeInfo = useContext(ShinCodeContext)

  // ref:reference(参照する)の略
  // 指定した要素の情報を見に行く
  const ref = useRef()

  const [state, dispatch] = useReducer(reducer, 0)

  const handleClick = () => {
    setCount(count + 1)
  }

  const handleRef = () => {
    console.log(ref.current.value)
    console.log(ref.current.offsetHeight)
  }

  // 発火のタイミングを決めることができる
  // 変数が変わった時に発火するのか、それともページがリロード（マウント）された時に発火するのか、それともアンマウント（要素がツリーから削除）された時に発火するのか
  useEffect(() => {
    console.log("Hello, Hooks")
    // （依存関係がある場合は）useEffectの中では無限ループになるのでset関数を使わない！
    // setCount(count + 1)
  }, [count])

  // useMemo
  // ブラウザのメモリに値を保存（メモ化）することができる
  // 重い処理を依存関係のみに限定できる
  // 使いすぎるとメモリを圧迫してしまう
  const [count01, setCount01] = useState(0)
  const [count02, setCount02] = useState(0)

  // const square = () => {
  //   console.log("実行されました")
  //   let i = 0
  //   while (i < 300000000) i++
  //   return count02 * count02
  // }

  // 変数のメモ化
  const square = useMemo(() => {
    console.log("実行されました")
    let i = 0
    // 重い処理
    while (i < 300000000) i++
    return count02 * count02
  }, [count02]) // count02が更新されない限り、square関数は実行されない

  return (
    <>
      <h1>useState, useEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>

      <hr />

      <h1>useContext</h1>
      <p>{shincodeInfo.name}</p>
      <p>{shincodeInfo.age}</p>

      <hr />

      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>useRef</button>

      <hr />

      <h1>useReducer</h1>
      <p>カウント：{state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>

      <hr />

      <h1>useMemo</h1>
      <div>カウント1: {count01}</div>
      <div>カウント2: {count02}</div>
      {/* <div>square: {square()}</div> */}
      <div>結果: {square}</div>
      <button onClick={() => setCount01(count01 + 1)}>+</button>
      <button onClick={() => setCount02(count02 + 1)}>+</button>
    </>
  )
}

export default App
