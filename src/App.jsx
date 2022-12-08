import { useState } from "react";
import styled from "./App.module.css";
import { Button, Input, Radio } from "antd";
import { useResolve } from "./useResolve.js";
import { CartesianGrid, Line, XAxis, YAxis, LineChart } from "recharts";

function App() {
  const [value, setValue] = useState(1);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [e, setE] = useState();
  const [x1, setX] = useState();


  const onRadioChange = (e) => {
    setRes([]);
    setValue(e.target.value);
  };

  const getFunction = () => {
    if (value === 1) {
      return (x) =>  Math.pow(x,2) + 2 * x + 1;
    }
    if (value === 2) {
      return (x) => 3-x**3
    }
    if (value === 3) {
      return (x) => 2*x-3;
    }
    if (value === 4) {
      return (x) => x - 1;
    }
  };

  const func = getFunction();

  const { method, res, setRes, calcCheck, checkRes,data, calcFunction } = useResolve({ a, b, e, func });

  const handeCalcClick = () => {
    setX(method());
    calcFunction()
  };

  const handleClearClick = () => {
    window.location.reload()
  }
  console.log(res)
  return (
    <>
      <h1 className={styled.logo}>Метод дихотомии &#128526;</h1>
      <div className={styled.table}>
        <div className={styled.form}>
          <p className={styled.text}>Выберите функцию &#128200;</p>
          <Radio.Group
            onChange={onRadioChange}
            value={value}
            buttonStyle="solid"
            optionType="button"
          >
            <Radio value={1}>x^2+2x+1</Radio>
            <Radio value={2}>3-x^3</Radio>
            <Radio value={3}>2*x-3</Radio>
            <Radio value={4}>x-1</Radio>
          </Radio.Group>
          <p className={styled.text}>Задайте начальный интервал</p>
          <div className={styled.inputBox}>
            <Input
              placeholder="a"
              value={a}
              onChange={(e) => setA(e.target.value)}
              type="number"
            />
          </div>
          <Input
            placeholder="b"
            onChange={(e) => setB(e.target.value)}
            value={b}
            type="number"
          />
          <p className={styled.text}>Задайте Точность</p>
          <div className={styled.inputBox}>
            <Input
              placeholder="e"
              value={e}
              onChange={(e) => setE(e.target.value)}
              type="number"
            />
          </div>
          <Button
            type={"primary"}
            style={{ width: "100%" }}
            disabled={!(a && b && e) || a > b}
            onClick={handeCalcClick}
          >
            Вычислить
          </Button>
          {x1 ? <p className={styled.text}>x = {x1}</p> : null}
          {x1 ? <Button type="primary" onClick={calcCheck} style={{width: '100%'}}>Выполнить проверку</Button>: null}
          {checkRes ? <p className={styled.text}>f(x) = {checkRes}</p>: null
          }
          {x1 ? <Button type="ghost" style={{width: '100%'}} onClick={handleClearClick}>Сбросить</Button> : null}

        </div>
      </div>
      {x1 ? (
          <>
            <p className={styled.text}>График получения ответа методом дихотомии</p>
          <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
      >
        <LineChart width={600} height={300} data={res}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
          <CartesianGrid stroke="#ccc"/>
          <XAxis dataKey="name"/>
          <YAxis/>
        </LineChart>
      </div>
            <p className={styled.text}>График функции</p>

            <div
        style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
        >
        <LineChart width={600} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        </LineChart>
        </div>
          </>) : null}
    </>
  );
}

export default App;
