const app= require('./src/app');
const mongoose=require("mongoose");

function connectTodb(){
        mongoose.connect("mongodb+srv://mahira:rQhejiRw5pI2sIAC@cluster0.5ztgj3q.mongodb.net/day-6")
        .then(()=>{
                console.log("connected to database");
        })
}

connectTodb();

app.listen(3000,()=>{
        console.log("server is running on port 3000");
})
