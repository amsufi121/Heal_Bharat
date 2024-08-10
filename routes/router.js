const express = require("express");

const router = express.Router();
const users = require("../models/userSchema");

// router.get("/", (req, res) => {
//   console.log("connect");
// });

router.post("/register", async (req, res) => {
  //   console.log(req.body);
  const { name, email, branch, year, prnnumber, add, desc } = req.body;

  // Corrected condition to properly check if year is not empty
  if (!name || !email || !branch || !year || !prnnumber || !add || !desc) {
    return res.status(422).json({ error: `plz fill the data` });
  }

  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      return res.status(422).json({ error: "this user is already present" });
    } else {
      const adduser = new users({
        name,
        email,
        branch,
        year,
        prnnumber,
        add,
        desc,
      });

      await adduser.save();
      res.status(201).json(adduser); // Responding with the created user
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

//get user data

router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});

// get individual user

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await users.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// update user data

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateuser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateuser);
    res.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete user data

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletuser = await users.findByIdAndDelete({ _id: id }, req.body, {
      new: true,
    });
    console.log(deletuser);
    res.status(201).json(deletuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
