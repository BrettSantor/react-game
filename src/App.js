import React, {useEffect, useRef} from 'react';
import './App.css';
import { Stage, Sprite } from '@pixi/react';
import cactus from "./assets/cactus-22155.png"

function App() {
  const spriteRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const sprite = spriteRef.current;
      const speed = 5;

      if (!sprite) return;

      switch (event.keyCode) {
        case 65: 
        sprite.x -= speed;
        break;
        case 87:
        sprite.y -= speed;
        break;
        case 68: 
        sprite.x += speed;
        break;
        case 83:
        sprite.y += speed;
        break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    };

  }, []);

const scale = 2;

const stageWidth = 256 * scale;
const stageHeight = 224 * scale;
const spriteWidth = 32 * scale;
const spriteHeight = 32 * scale;

  return (
   <Stage
   width={stageWidth}
   height={stageHeight}
   options={{
    backgroundColor: 0x012b30,
    antialias: true
   }}
   >
    <Sprite ref={spriteRef} image = {cactus} x ={128} y ={112} width={spriteWidth} height={spriteHeight}/>
    </Stage>
  );
}

export default App;
