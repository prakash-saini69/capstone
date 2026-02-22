const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors());

// Added print statements so you know it's working!
mongoose.connect('mongodb://127.0.0.1:27017/capstoneDB')
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch(err => console.log("MongoDB Error:", err));

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// SIGNUP ROUTE
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({ email: req.body.email, password: hashedPassword });
        res.status(201).send("User Created");
    } catch (err) { res.status(400).send("Email already exists"); }
});



// LOGIN ROUTE
app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send("User not found");
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
        // UPDATE: Now we send the email back so the dashboard can use it!
        res.status(200).send({ message: "Success", email: user.email });
    } else {
        res.status(401).send("Wrong Password");
    }
});

// Added print statement here too!
app.listen(5000, () => console.log("Server running on port 5000"));