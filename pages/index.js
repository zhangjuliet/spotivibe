import Head from "next/head";
import { useState, useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import styles from "./index.module.css";
import React, { useRef, useEffect } from 'react';


export default function Home() {
  const [vibeInput, setVibeInput] = useState("");
  const [result, setResult] = useState([]);

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    const resultsArray = [];

    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vibe: vibeInput }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }

        data.result = data.result.trim().toLowerCase();

        if (!resultsArray.includes(data.result)) {
          resultsArray.push(data.result);
        }
        else {
          i--;
        }
        setVibeInput("");
      } catch (error) {
        // Consider implementing your own error handling logic here
        console.error(error);
        alert(error.message);
      }
    }
    setResult(resultsArray);
    console.log(resultsArray);

      
    // const gifRef = useRef(null);

    // useEffect(() => {
    //   let pos = 0;
    //   const moveGif = () => {
    //     pos += 1;
    //     gifRef.current.style.left = `${pos}px`;
    //     if (pos >= window.innerWidth) {
    //       pos = 0;
    //     }
    //   };
    //   const interval = setInterval(moveGif, 10);
    //   return () => clearInterval(interval);
    // }, []);
  }

  return (
    <div>
      <Head>
        <title>spotivibe</title>
        <link rel="icon" href="/spotivibe_logo.png" />
      </Head>

      <div className="background">
        <style>{'body { background-color: #3d479d; }'}</style>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            particles: {
              number: {
                value: 90,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: "#b7d3fc"
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000"
                },
                polygon: {
                  nb_sides: 5
                },
                image: {
                  src: "img/github.svg",
                  width: 100,
                  height: 100
                }
              },
              opacity: {
                value: 0.2762016745712954,
                random: true,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: 43.403120289774996,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: false,
                distance: 500,
                color: "#ffffff",
                opacity: 0.4,
                width: 2
              },
              move: {
                enable: true,
                speed: 1,
                direction: "top",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: false,
                  mode: "bubble"
                },
                onclick: {
                  enable: false,
                  mode: "repulse"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 0.5
                  }
                },
                bubble: {
                  distance: 400,
                  size: 4,
                  duration: 0.3,
                  opacity: 1,
                  speed: 3
                },
                repulse: {
                  distance: 200,
                  duration: 0.4
                },
                push: {
                  particles_nb: 4
                },
                remove: {
                  particles_nb: 2
                }
              }
            },
            retina_detect: true,
          }}
        />
      </div>

      <main className={styles.main}>
        <img src="/spotivibe_logo.png" className={styles.icon} />
        <h3 style={{color: 'white'}}>spotivibe</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="vibe"
            placeholder="Enter a vibe"
            value={vibeInput}
            onChange={(e) => setVibeInput(e.target.value)}
          />
          <input type="submit" value="Generate Playlist" />
        </form>
        <div className={styles.result}>{result.map((item, index) => (
          <div key={index}>{item}</div>
        ))}</div>

      </main>
      
      <div className="fish">
        <img
              src="purplefish.gif"
              alt="Moving GIF"
              //ref={gifRef}
              style={{ position: 'absolute', right: '0px', bottom: '0px' }}
              height="200" 
            />
        <img
            src="bluefish.gif"
            alt="Moving GIF"
            //ref={gifRef}
            style={{ position: 'absolute', right: '70px', bottom: '375px' }}
            height="200" 
          />
          <img
            src="orangefish.gif"
            alt="Moving GIF"
            //ref={gifRef}
            style={{ position: 'absolute', left: '100px', bottom: '300px', transform: [
              {scaleX: "-1"}
          ]}}
            height="200" 
          />

          <img
            src="greenfish.gif"
            alt="Moving GIF"
            //ref={gifRef}
            style={{ position: 'absolute', right: '0px', top: '30px' }}
            height="100" 
          />
          <img
            src="rainbowfish.gif"
            alt="Moving GIF"
            //ref={gifRef}
            style={{ position: 'absolute', right: '500px', bottom: '0px' }}
            height="250" 
          />
          <img
            src="pufferfish.png"
            alt="Moving GIF"
            //ref={gifRef}
            style={{ position: 'absolute', left: '50px', top: '100px' }}
            height="100" 
          />
          <img
            src="pufferfish.png"
            alt="Moving GIF"
            //ref={gifRef}
            style={{ position: 'absolute', right: '250px', bottom: '180px' }}
            height="100" 
          />
          <img
            src="greenfish.gif"
            alt="Moving GIF"
            //ref={gifRef}
            style={{ position: 'absolute', left: '200px', bottom: '30px' }}
            height="200" 
          />
          <img
            src="seaweed-transparent-background-2.png"
            //ref={gifRef} 
            style={{ position: 'absolute', left: '0px', bottom: '-30px' }}
            height="400" 
            width = "200"
          />
          <img
            src="seaweed-transparent-background-2.png"
            //ref={gifRef} 
            style={{ position: 'absolute', right: '60px', bottom: '-30px' }}
            height="400" 
            width = "200"
          />
          <img
            src="seaweed-transparent-background-2.png"
            //ref={gifRef} 
            style={{ position: 'absolute', left: '-60px', bottom: '-60px' }}
            height="500" 
            width = "200"
          />
          <img
            src="sang.png"
            style={{ position: 'absolute', right: '0px', bottom: '-120px' }}
            height="300" 
            width = "1600"
          />
          <img
            src="seaweed-transparent-background-2.png"
            //ref={gifRef} 
            style={{ position: 'absolute', right: '260px', bottom: '-40px' }}
            height="300" 
            width = "200"
          />
          <img
            src="seaweed-transparent-background-2.png"
            //ref={gifRef} 
            style={{ position: 'absolute', right: '360px', bottom: '-30px' }}
            height="200" 
            width = "100"
          />
          <img
            src="seaweed-transparent-background-2.png"
            //ref={gifRef} 
            style={{ position: 'absolute', left: '100px', bottom: '-30px' }}
            height="300" 
            width = "150"
          />
          
          
          <img
            src="seaweed-transparent-background-2.png"
            //ref={gifRef} 
            style={{ position: 'absolute', right: '800px', bottom: '-60px' }}
            height="300" 
            width = "200"
          />
          <img
            src="seaweed-transparent-background-2.png"
            //ref={gifRef} 
            style={{ position: 'absolute', left: '230px', bottom: '-100px' }}
            height="100" 
            width = "200"
          />
          <img
            src="seaweed-transparent-background-2.png"
            //ref={gifRef} 
            style={{ position: 'absolute', right: '100px', bottom: '-100px' }}
            height="100" 
            width = "200"
          />
          <img
            src="seaweed-transparent-background-2.png"
            //ref={gifRef} 
            style={{ position: 'absolute', right: '560px', bottom: '-50px' }}
            height="100" 
            width = "200"
          />
          
        
      </div>
    </div>
  );
}
