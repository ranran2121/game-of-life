import "./globals.css";
import { useCallback, useState, useEffect } from "react";
import { seedArray, buildArray, applyGameOfLife } from "./utils/index.js";

const arr = buildArray();
let timer = "";

function App() {
  const [array, setArray] = useState(arr);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSeed, setHasSeed] = useState(false);

  const handleSeed = useCallback(() => {
    const newArr = seedArray([...array]);
    setArray(newArr);
    setHasSeed(true);
  }, [array]);

  const handleClear = useCallback(() => {
    clearTimeout(timer);
    setIsPlaying(false);
    setHasSeed(false);
    const newArr = buildArray();
    setArray(newArr);
  }, []);

  const handlePlay = () => {
    if (hasSeed) {
      setIsPlaying(!isPlaying);
    } else {
      alert("Please initialize the grid");
    }
  };

  useEffect(() => {
    if (isPlaying) {
      timer = setTimeout(() => {
        const nextState = applyGameOfLife([...array]);
        setArray([...nextState]);
      }, 300);
    } else {
      clearTimeout(timer);
    }
  }, [array, isPlaying]);

  return (
    <div className="main">
      <div id="gridContainer">
        <table>
          <tbody>
            {array.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((column, j) => {
                    if (array[i][j] === 0) {
                      return <td key={j} className="w-4 h-4"></td>;
                    } else
                      return (
                        <td
                          key={j}
                          className="w-4 h-4"
                          style={{ backgroundColor: "#7312a1" }}
                        ></td>
                      );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="controls">
        <button id="start" onClick={handlePlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button id="clear" onClick={handleClear}>
          Clear
        </button>
        <button id="seed" onClick={handleSeed}>
          Seed
        </button>
      </div>
    </div>
  );
}

export default App;
