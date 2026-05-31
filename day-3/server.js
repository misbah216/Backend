const express= require('express');
const app=express();

app.use(express.json());

const notes=[];

app.post("/notes",(req,res)=>{
    const note=req.body;
    console.log(req.body);
    notes.push(note);
    res.send("note created");
})

app.get("/notes",(req,res)=>{
    res.send(notes);
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})


