import "./globals.css";
import { useCallback, useState, useEffect } from "react";
import {
  seedArray,
  buildArray,
  applyGameOfLife,
  ROWS,
  COLS,
  SPEED,
} from "./utils/index.js";

const arr = buildArray(ROWS, COLS);
let timer = "";

function App() {
  const [array, setArray] = useState(arr);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSeed, setHasSeed] = useState(false);
  const [rows, setRows] = useState(ROWS);
  const [cols, setCols] = useState(COLS);
  const [speed, setSpeed] = useState(SPEED);

  const handleSeed = useCallback(() => {
    if (!isPlaying) {
      const newArr = seedArray([...array]);
      setArray(newArr);
      setHasSeed(true);
    }
  }, [array, isPlaying]);

  const handleClear = useCallback(() => {
    clearTimeout(timer);
    setIsPlaying(false);
    setHasSeed(false);
    const newArr = buildArray(ROWS, COLS);
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
        const nextState = applyGameOfLife([...array], rows, cols);
        setArray([...nextState]);
      }, speed);
    } else {
      clearTimeout(timer);
    }
  }, [array, cols, isPlaying, rows, speed]);

  useEffect(() => {
    const arr = buildArray(rows, cols);
    setArray(arr);
  }, [rows, cols]);

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

      <div className="console">
        <div>
          <label htmlFor="rows">Rows:</label>
          <input
            id="rows"
            type="number"
            min="10"
            max="100"
            steps="1"
            value={rows}
            onChange={(e) => {
              if (!isPlaying) {
                setRows(e.target.value);
              }
            }}
          />
        </div>
        <div>
          <label htmlFor="cols">Cols:</label>
          <input
            id="cols"
            type="number"
            min="10"
            max="100"
            steps="1"
            value={cols}
            onChange={(e) => {
              if (!isPlaying) {
                setCols(e.target.value);
              }
            }}
          />
        </div>
        <div>
          <label htmlFor="speed">Speed(ms):</label>
          <input
            id="speed"
            type="number"
            min="200"
            max="2000"
            steps="1"
            value={speed}
            onChange={(e) => {
              if (!isPlaying) {
                setSpeed(e.target.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
