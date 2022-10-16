import React, { useState, useEffect } from "react";
import "./App.css";
// import sample from "./sample.json";

function App() {
  const [sampleSorted, setSampleSorted] = useState([]);
  const [arrLength, setArrLength] = useState(0);
  const [numOfRows, setNumOfRows] = useState(3);
  const [errors, setErrors] = useState({
    bool : false,
    message : ""
  });

  const isJson = (str) => {
    try{
       JSON.parse(str);
    }catch (e){
       return false;
    }
   return true;
 }

 const setOriginalValue = () => {
  setArrLength(0)
  setNumOfRows(0)
  setSampleSorted([])
 }

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({bool: false, message: ""})
    const data = e.target[0].value
    const dataIsJson = isJson(data)
    const unprocessedStr = e.target[1].value
    const num = Number(unprocessedStr)
    const numIsInteger = Number.isInteger(num) && num > 0

    if (!(dataIsJson)) {
      setErrors({bool: true, message: "Data isn't a valid json"})
      document.getElementById('input-form').reset()
      setOriginalValue()
      return;
    }

    if (!numIsInteger) {
      setErrors({bool: true, message: "Row number should be an integer"})
      document.getElementById('input-form').reset()
      setOriginalValue()
      return;
    }

    // length validation
    const parsedData = JSON.parse(data)
    if (parsedData.length >50) {
      setErrors({bool: true, message: "array.length mus be <= 50"})
      document.getElementById('input-form').reset()
      setOriginalValue()
      return;
    }

    for (let i = 0 ; i < parsedData.length; i ++) {
      const item = parsedData[i]
      const isInteger = Number.isInteger(item.weight)
      const itemName = item.name
      if (typeof itemName !== 'string') {
        setErrors({bool: true, message: "name must be a string"})
        document.getElementById('input-form').reset()
        setOriginalValue()
        return;
      }
      if (itemName.length > 50) {
        setErrors({bool: true, message: "string.length must be <= 50"})
        document.getElementById('input-form').reset()
        setOriginalValue()
        return;
      }
      if (!isInteger) {
        setErrors({bool: true, message: "weight must be an integer"})
        document.getElementById('input-form').reset()
        setOriginalValue()
        return;
      }
    }
      if (num > parsedData.length) {
        setErrors({bool: true, message: "row number <= array.length"})
        document.getElementById('input-form').reset()
        setOriginalValue()
        return;
      }


      parsedData.sort((a, b) => {
        if (a.weight < b.weight) return 1;
        return -1;
      });
      setArrLength(parsedData.length);
      setNumOfRows(num);
      setSampleSorted(parsedData);
      document.getElementById('input-form').reset()
  }

  return (
    <div className="container">
        <form className="input" id="input-form" onSubmit={onSubmit}>
          <div className="input-item">
            <h2 className="text"><label for="json">Data</label></h2>
            <textarea name="json" rows="20" cols="22"/>
          </div>
          <div className="input-item">
          <h2 className="text"><label for="rows">Row Number</label></h2>
            <input type="text" name="rows"/>
          </div>
          <div className="input-item">
            
            <input type="submit" className="submit-button"/>
          </div>
          <div className="input-item">
            {errors.bool ? <p className="text">{errors.message}</p> : null}
          </div>
        </form>
      <div className="result">
        <h2 className="text">Result</h2>
        <div className="result-index">
          {sampleSorted && arrLength && numOfRows
            ? sampleSorted.map(({ name, weight, value }) => (
                <div
                  className="result-index-item"
                  style={{
                    flex: `${weight} ${weight} ${100/((arrLength/numOfRows) + 1)}%`,
                    backgroundColor: value < 0 ? "red" : "green",
                  }}
                >
                  <p>{name}</p>
                  <p>{value * 100}</p>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default App;
