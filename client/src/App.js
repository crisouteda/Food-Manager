import "./App.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";
function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  const addToList = () => {
    Axios.post("http://localhost:4000/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = (id) => {
    Axios.put("http://localhost:4000/update", {
      id: id,
      newFoodName: newFoodName,
    });
    console.log(newFoodName);
  };

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:4000/delete/${id}`, {});
  };

  useEffect(() => {
    Axios.get("http://localhost:4000/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);
  return (
    <div className="App">
      <h1>CRUD App With MERN </h1>
      <label>Food Name</label>
      <input
        type="text"
        onChange={(event) => {
          setFoodName(event.target.value);
        }}
      />
      <label>Days Since You Ate It </label>
      <input
        type="number"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />
      <button onClick={addToList}>Add To List</button>
      <h1>Food List</h1>
      {foodList.map((val, key) => {
        return (
          <div key={key}>
            <h1> {val.foodName}</h1>
            <h1> {val.daysSinceIAte}</h1>
            <input
              type="text"
              placeholder="New Food Name..."
              onChange={(event) => {
                setNewFoodName(event.target.value);
              }}
            />
            <button onClick={() => updateFood(val._id)}>Update</button>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
