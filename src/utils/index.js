export const buildArray = () => {
  const rows = 45;
  const cols = 100;

  const arr = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    arr.push(row);
  }
  return arr;
};

export const seedArray = (arr) => {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let row = [];

    for (let j = 0; j < arr[0].length; j++) {
      const n = Math.floor(Math.random() * 2);

      row.push(n);
    }
    newArr.push(row);
  }

  return newArr;
};

export const padArray = (arr) => {
  let paddingRow = [];
  for (let j = 0; j < arr[0].length + 2; j++) {
    paddingRow.push(0);
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i].unshift(0);
    arr[i].push(0);
  }
  arr.unshift(paddingRow);
  arr.push(paddingRow);

  return arr;
};

export const calcNeighbors = (arr, i, j) => {
  let total = 0;
  total += arr[i - 1][j];
  total += arr[i + 1][j];
  total += arr[i][j - 1];
  total += arr[i][j + 1];
  total += arr[i - 1][j - 1];
  total += arr[i - 1][j + 1];
  total += arr[i + 1][j - 1];
  total += arr[i + 1][j + 1];

  return total;
};

export const applyGameOfLife = (arr) => {
  let nextState = buildArray();
  const padded = padArray(arr);

  for (let i = 1; i < padded.length - 1; i++) {
    for (let j = 1; j < padded[0].length - 1; j++) {
      const neighbours = calcNeighbors(padded, i, j);
      if (neighbours <= 3 && neighbours >= 2 && padded[i][j] === 1) {
        nextState[i - 1][j - 1] = 1;
      } else if (neighbours === 3 && padded[i][j] === 0) {
        nextState[i - 1][j - 1] = 1;
      } else {
        nextState[i - 1][j - 1] = 0;
      }
    }
  }

  return nextState;
};
