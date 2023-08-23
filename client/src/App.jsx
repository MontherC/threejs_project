import Canvas from './canvas';
import Customizer from './pages/Customizer.jsx'
import Home from './pages/Home.jsx'

function  App (){
  return (
    <main className="app transition-all">
      <Home />
      <Canvas />
      <Customizer />
    </main>
  )
}

export default App
