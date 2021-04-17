const express = require("express");
const mongoose = require("mongoose");
const app = express();
const FoodModel = require("./models/Food");
const cors = require("cors");
const mongoKey = process.env.MONGO;
app.use(express.json());
app.use(cors());
mongoose.connect(mongoKey, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });
  try {
    await food.save();
    res.send("insert data");
  } catch (err) {
    console.log(err);
  }
});

app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;
  await FoodModel.findByIdAndUpdate(
    { _id: req.body.id },
    { foodName: req.body.newFoodName },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000...");
});
