import { useState } from 'react'
import './App.css'
import Sidebar from './containers/Sidebar'
import Board from './containers/Board'
import Header from './containers/Header'
import Overlay from './components/Overlay'

export default function App() {
  const [showOverlay, setShowOverlay] = useState(false);


  return (
    <div className="App">
      <Header />

      <Board />

      {showOverlay && <Overlay />}
    </div>
  )
}