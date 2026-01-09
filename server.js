const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Read users
function readUsers() {
    const data = fs.readFileSync("users.json");
    return JSON.parse(data);
}

// Save users
function saveUsers(users) {
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

/* SIGN UP */
app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;
    const users = readUsers();

    const exists = users.find(u => u.email === email);
    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    users.push({ username, email, password });
    saveUsers(users);

    res.json({ message: "Account created successfully" });
});

/* LOGIN */
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
