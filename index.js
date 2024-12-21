const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({extended: false}));

app.get("/api/users", function (req, res) {
    return res.json(users);
})
app.get("/users", (req, res) => {
    const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ul >
        `;
    res.send(html);
});
app.route("/api/users/:id")
.get((req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user);
})
.patch((req,res)=>{
    return res.json({ status: "pending"});
})
.patch((req,res)=>{
    return res.json({ status: "pending"});
});
app.post("/api/users", (req, res)=>{
    const body = req.body;
    users.push({ ...body, id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err , data)=>{
        return res.json({ status: "pending"});
    })
   
})

app.listen(PORT, () => console.log(`Server started at port:${ PORT } `));