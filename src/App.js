import logo from './logo.svg';
import './App.css';
import { Stage, Sprite } from '@pixi/react';
import cactus from "./assets/cactus-22155.png"

function App() {
  return (
   <Stage
   width={300}
   height={300}
   options={{
    backgroundColor: 0x012b30,
    antialias: true
   }}
   >
    <Sprite image = {cactus}/>
    </Stage>
  );
}

export default App;
