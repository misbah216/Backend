const express= require("express");
const app=express();

app.use(express.json());

const notes=[];

app.get("/notes",(req,res)=>{
    res.send(notes);
})

app.post("/notes",(req,res)=>{
    notes.push(...req.body);
    res.send("notes created");
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index];
    res.send("notes deleted successfully");
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description=req.body.description;
    res.send("notes updated successfully");
})

module.exports=app;


