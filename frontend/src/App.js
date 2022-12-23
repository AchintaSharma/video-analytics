import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "./components/Charts/BarChart";

import Button from './components/UI/Button/Button'
import Card from './components/UI/Card/Card'

const App = () => {
  const [data1, setData1] = useState([]);
  const [id1, setId1] = useState("");
  const [idFromButton1Click, setIdFromButton1Click] = useState();

  const [data2, setData2] = useState([]);
  const [id2, setId2] = useState("");
  const [idFromButton2Click, setIdFromButton2Click] = useState();


  const button1ClickHandler = () => {
    setIdFromButton1Click(id1)
  }

  const button2ClickHandler = () => {
    setIdFromButton2Click(id2)
  }

  useEffect(() => {
    axios.get(`http://192.168.0.104:8000/data/${idFromButton1Click}`)
      .then(res => {
        console.log(res)
        setData1(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [idFromButton1Click])

  useEffect(() => {
    axios.get(`http://192.168.0.104:8000/data/${idFromButton2Click}`)
      .then(res => {
        console.log(res)
        setData2(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [idFromButton2Click])

  const chart1Data = {
    labels: ["Value"],
    datasets: [
      {
        label: "Old Value",
        data: data1.map(item => item.old_value),
        backgroundColor: [
          "#FF9F1C",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "New Value",
        data: data1.map(item => item.new_value),
        backgroundColor: [
          "#FFBF69",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ]
  }

  const chart2Data = {
    labels: ["Value"],
    datasets: [
      {
        label: "Old Value",
        data: data2.map(item => item.old_value),
        backgroundColor: [
          "#FF9F1C",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "New Value",
        data: data2.map(item => item.new_value),
        backgroundColor: [
          "#FFBF69",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ]
  }

  return (
    <div>
      <header><h2>Welcome to Video Analysis</h2></header>
      <Card>
        <label htmlFor='video1'>Video1 ID: </label>
        <input id="video1" type="text" value={id1} onChange={e => setId1(e.target.value)} />

        <Button type='button' onClick={button1ClickHandler}>Fetch</Button>
        <div>
          <h3>Video 1 details:</h3>
          {data1.map(item => {
            return <p key={item.id} >Item ID: {item.id}, Entity ID: {item.entity_id}, Old Value: {item.old_value}, New Value: {item.new_value}</p>
          })}
        </div>
      </Card>
      <Card >
        <BarChart chartData={chart1Data} />
      </Card>

      <Card>
        <label htmlFor='video2'>Video2 ID: </label>
        <input id="video2" type="text" value={id2} onChange={e => setId2(e.target.value)} />
        <Button className="button" type='button' onClick={button2ClickHandler}>Fetch</Button>
        <div>
          <h3>Video 2 details:</h3>
          {data2.map(item => {
            return <p key={item.id} >Item ID: {item.id}, Entity ID: {item.entity_id}, Old Value: {item.old_value}, New Value: {item.new_value}</p>
          })}
        </div>
      </Card>

      <Card >
        <BarChart chartData={chart2Data} />
      </Card>
    </div>
  )
}

export default App;