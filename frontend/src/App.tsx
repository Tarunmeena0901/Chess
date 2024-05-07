import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <textarea>
      enter room id
      </textarea>
      <button>
        join room
      </button>
    </>
  )
}

export default App
