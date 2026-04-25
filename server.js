const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"));

const Score=mongoose.model("Score",{user:String,score:Number});

app.post("/save-score",async(req,res)=>{
let s=new Score(req.body);
await s.save();
res.send("saved");
});

app.get("/leaderboard",async(req,res)=>{
let data=await Score.find().sort({score:-1});
res.json(data);
});

app.listen(5000,()=>console.log("Server running"));
