const express = require("express");
const app = express();
const port = 3003;

//FAKE DATA
const db = {
  users: [
    {
      id: 1,
      email: "andothi@gmail.com",
      password: "123456",
      name: "Nguyen Van A",
    },
  ],
};

//Session
const sessions = {};
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.get("/dasboard", (req, res) => {
  res.render("pages/dasboard");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    const sessionId = Date.now().toString();
    sessions[sessionId] = {
      userId: user.id,
    };

    //max-age: time exsit of cookie, httpOnly: just can read on BE side, Secure: for https
    res
      .setHeader(
        "Set-Cookie",
        `sessionId=${sessionId}; max-age=3600; httpOnly; Secure`
      )
      .redirect("/dasboard");
    return;
  }
  res.send("Login fail");
});

app.listen(port, () => {
  console.log("Demo");
});
