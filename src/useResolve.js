export const useResolve = (
  a0,
  b0,
  e0,
  value,
  setAnswer,
  setCheck,
  setGraphMas
) => {
  const getFunction = () => {
    if (value === 1) {
      return (x) => Math.pow(x, 2) - x - 2;
    }
    if (value === 2) {
      return (x) => 3 - Math.pow(x, 3);
    }
    if (value === 3) {
      return (x) => 4 - Math.exp(x) - 2 * Math.pow(x, 2);
    }
  };

  const method = () => {
    const func = getFunction();
    let a = parseFloat(a0);
    let b = parseFloat(b0);
    let e = parseFloat(e0);
    let graphMas = [];
    console.log(a, b, e);
    let c = 0;

    do {
      c = (a + b) / 2;
      if (func(c) * func(a) < 0) {
        b = c;
      } else {
        a = c;
      }
    } while (Math.abs(a - b) >= e);
    setAnswer(c);
    setCheck(func(c));
    for (let i = -10; i <= 10; i++) {
      graphMas.push({ name: i, uv: func(i) });
    }
    setGraphMas([...graphMas]);
  };

  return { method };
};
