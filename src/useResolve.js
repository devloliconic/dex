import { useState } from "react";

export const useResolve = ({ a, b, e, func }) => {
  console.log(a, b, e, func)
  console.log(Number(a), Number(b), Number(e))
  const [res, setRes] = useState([]);
  const [check, setCheck] = useState(0)
  const [checkRes, setCheckRes] = useState(0)
  const [data, setData] = useState([])
  const method = () => {
    let c = 0;
    let a0 = Number(a);
    let b0 = Number(b);
    let mas = [];
    let ex = Number(e)
    while (b0 - a0 > ex) {
      c = (a0+b0)/2
      if (func(a0) * func(c) < 0) {
        b0 = c;
      } else if(func(a0) * func(c) > 0) {
        a0 = c;
      }
        else {
          setRes(mas)
          setCheck(c)
          return c
      }
      mas.push({name: a0, uv: b0})
    }
    setRes(mas)
    setCheck((a0+b0)/2)
    return (a0+b0)/2;
  };
  const calcCheck = () => {
    setCheckRes(func(check))
  }
  const calcFunction = () => {
    const mas = []
    for(let i = Number(a); i < Number(b); i++){
      mas.push({name: i, uv: func(i)})
    }
    setData(mas)
    return mas
  }
  return { method, res, setRes, calcCheck,checkRes,calcFunction, data};
};
