const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
const path=require("path");


const noteModel = require("./models/note.model");

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find();
    res.json(notes);
});



app.post("/api/notes", async (req,res)=>{
    const {title, description} = req.body;

    if (!title || !description || String(title).trim() === "" || String(description).trim() === "") {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }

    const note = await noteModel.create({
        title: String(title).trim(),
        description: String(description).trim()
    });

    res.status(201).json({
        message:"note created successfully",
        note
    });

});


app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const note = await noteModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully" });
});

app.patch("/api/notes/:id", async(req,res)=>{
    const id=req.params.id
    const{description}=req.body
    await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"note updated successfully"})

});

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,".." , "/public/index.html"))
})

module.exports=app;