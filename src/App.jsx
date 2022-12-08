import { useEffect, useState } from "react";
import styled from "./App.module.css";
import { Button, Input, Radio } from "antd";
import { useResolve } from "./useResolve.js";
import { CartesianGrid, Line, XAxis, YAxis, LineChart } from "recharts";

function App() {
  const [value, setValue] = useState(1);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [e, setE] = useState(0.001);
  const [check, setCheck] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [graphMas, setGraphMas] = useState([]);

  const { method } = useResolve(
    a,
    b,
    e,
    value,
    setAnswer,
    setCheck,
    setGraphMas
  );

  const onRadioChange = (e) => {
    setValue(e.target.value);
  };

  const handleClearCLick = () => {
    window.location.reload();
  };

  useEffect(() => {
    switch (value) {
      case 1:
        setA(-2);
        setB(1);
        break;
      case 2:
        setA(0);
        setB(2);
        break;
      case 3:
        setA(0);
        setB(1);
        break;
    }
  }, [value]);

  return (
    <>
      <h1 className={styled.logo}>Метод дихотомии &#128526;</h1>
      <p className={styled.text}>Для решения нелинейных уравнений</p>
      <div className={styled.table}>
        <div className={styled.form}>
          <p className={styled.text}>Выберите функцию &#128200;</p>
          <Radio.Group
            onChange={onRadioChange}
            value={value}
            buttonStyle="solid"
            optionType="button"
          >
            <Radio value={1}>x^2-x-2</Radio>
            <Radio value={2}>3-x^3</Radio>
            <Radio value={3}>4-e^x*x^2</Radio>
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
          <p className={styled.text}>Задайте Точность&#127919;</p>
          <div className={styled.inputBox}>
            <Input
              placeholder="e"
              value={e}
              onChange={(e) => setE(e.target.value)}
              type="number"
            />
          </div>
          <Button type={"primary"} style={{ width: "100%" }} onClick={method}>
            Вычислить
          </Button>
          {answer ? <p className={styled.text}>x = {answer}</p> : null}
          {check ? <p className={styled.text}>f(x) = {check}</p> : null}

          {answer ? (
            <Button
              type="ghost"
              style={{ width: "100%" }}
              onClick={handleClearCLick}
            >
              Сбросить&#128465;
            </Button>
          ) : null}
        </div>
      </div>
      {answer ? (
        <>
          <p className={styled.text}>График функции&#128519;</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <LineChart width={600} height={300} data={graphMas}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </div>
        </>
      ) : null}
    </>
  );
}

export default App;
