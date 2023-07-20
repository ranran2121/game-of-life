import "./globals.css";
import { useCallback, useState } from "react";
import { seedArray, buildArray, applyGameOfLife } from "./utils/index.js";

const arr = buildArray();

function App() {
  const [array, setArray] = useState(arr);

  const handleSeed = useCallback(() => {
    const newArr = seedArray([...array]);
    setArray(newArr);
  }, [array]);

  const handleClear = useCallback(() => {
    const newArr = buildArray([...array]);
    setArray(newArr);
  }, [array]);

  const handlePlay = useCallback(() => {
    const nextState = applyGameOfLife([...array]);
    setArray([...nextState]);
  }, [array]);

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
                          style={{ backgroundColor: "red" }}
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
          Next
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
