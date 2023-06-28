import React, {useEffect, useRef} from 'react';
import './App.css';
import { Stage, Sprite, useTick, useApp, TilingSprite } from '@pixi/react';
import { Texture, Point } from 'pixi.js';
import cactus from "./assets/cactus-22155.png"
import desertBackground from "./assets/DSC_0285.JPG"

function App() {
  const spriteRef = useRef({ current: { prevX: 0, prevY: 0 } });
  const backgroundRef = useRef(null);
  const app = useApp();

  
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log('this is a keydown')
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

  useTick((delta) => {
    const sprite = spriteRef.current;
    const background = backgroundRef.current;
   

    if (sprite && background) {
      const speed = 5;
      const velocityX = sprite.x - sprite.prevX;
      const velocityY = sprite.y - sprite.prevY;
      sprite.prevX = sprite.x
      sprite.prevY = sprite.y

        background.x -= velocityX * speed * delta
        background.y -= velocityY * speed * delta


        const minX = sprite.width / 2;
        const maxX = background.width - sprite.width / 2;
        const minY = sprite.height / 2;
        const maxY = background.height - sprite.height / 2;
  
        // Keep the sprite within the bounds
        sprite.x = Math.max(minX, Math.min(maxX, sprite.x));
        sprite.y = Math.max(minY, Math.min(maxY, sprite.y));
  
        background.x = Math.max(stageWidth - background.width, Math.min(0, background.x));
        background.y = Math.max(stageHeight - background.height, Math.min(0, background.y));
      }
      const backgroundTexture = Texture.from(desertBackground);
      backgroundRef.current.texture = backgroundTexture
    }, [spriteRef, backgroundRef]);



const scale = 3;

const stageWidth = 256 * scale;
const stageHeight = 224 * scale;
const spriteWidth = 32 * scale;
const spriteHeight = 32 * scale;

// useEffect(() => {

// }, [spriteRef, backgroundRef])

  return (

   <Stage
   width={stageWidth}
   height={stageHeight}
   options={{
    backgroundColor: 0x012b30,
    antialias: true,
   }}
   >
    <Sprite ref={backgroundRef} width={stageWidth} height={stageHeight}/>
  
      <Sprite
        ref={spriteRef}
        // image={cactus}
        texture={Texture.from(cactus)}
        x={128}
        y={112}
        width={spriteWidth}
        height={spriteHeight}
        anchor={new Point(0.5, 0.5)}
        interactive= {true}
      />
    </Stage>

  );
}

export default App;
