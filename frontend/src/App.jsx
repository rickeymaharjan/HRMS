import { useState } from "react"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <p>hello world</p>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
       increase counter
      </button>
      <p>counter: {count}</p>
    </div>
  )
}

export default App
