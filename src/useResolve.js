import { useState } from "react";

export const useResolve = ({ a, b, e, func }) => {
  const [res, setRes] = useState([]);
  const method = () => {
    let c = 0;
    let a0 = Number(a);
    let b0 = Number(b);
    while (b0 - a0 > Number(e)) {
      c = (a0 + b0) / 2;
      if (func(b0) * func(c) < 0) {
        a0 = c;
      } else {
        b0 = c;
      }
      setRes((res) => [...res, { name: a0, uv: b0 }]);
    }
    return (a0 + b0) / 2;
  };
  return { method, res, setRes };
};
