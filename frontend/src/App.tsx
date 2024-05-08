import './App.css'
import { Route, Routes , BrowserRouter } from 'react-router-dom'
import { Landing } from './screens/Landing'
import { Game } from './screens/Game'


function App() {

  return (
    <div className='bg-slate-800'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/game' element={<Game />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
