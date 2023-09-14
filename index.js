const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const{v4:uuidv4}=require("uuid");
const override=require("method-override");
app.use(express.urlencoded({extended:true}));//parsing
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(override('_method'));
app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {
        id:uuidv4(),
        username:"shanmukha",
        content:"i love coding",
    },
    {
        id:uuidv4(),
        username:"ms Dhoni",
        content:"i love cricket",

    },
    {
        id:uuidv4(),
        username:"raviteja",
        content:"i love acting",

    },
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("index2.ejs");
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts")
})
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post=posts.find((p)=>id===p.id);

    res.render("index3.ejs",{post});
    
});
app.patch("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    res.redirect("/posts")
    


})
  
app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.get("/posts/:id/delete",(req,res)=>{
    let { id } = req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("server is strated");
})