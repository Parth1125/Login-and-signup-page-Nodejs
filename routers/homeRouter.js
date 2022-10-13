const express = require("express");
const Router = express.Router();
const homeSchema = require("../models/homeSchema");
const fs = require("fs");

Router.get("/", (err, res) => {
  res.render("register", { title: "Fill The Form", password: "", email: "" });
});

Router.post("/register", async (req, res) => {
  try {
    const { name, number, email, password, cpassword } = req.body;

    if (password === cpassword) {
      const userData = new homeSchema({
        name,
        number,
        email,
        password,
      });
      userData.save((err) => {
        if (err) {
          console.log("err");
        } else {
          res.render("register", { title: "Done", password: "", email: "" });
        }
      });

      const useremail = await homeSchema.findOne({ email: email });
      if (email === useremail.email) {
        res.render("register", {
          title: "",
          password: "",
          email: "Email Already Exist",
        });
      } else {
        console.log("err");
      }
    } else {
      res.render("register", {
        title: "",
        password: "Password Not Matching",
        email: "",
      });
    }
  } catch (error) {
    res.render("register", { title: "Error in Code", password: "", email: "" });
  }
});

// Log In

Router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await homeSchema.findOne({ email });

    if (useremail.password === password) {
      res.render("new", { title: "You are logged In" });
    } else {
      res.send("Password Not Matching");
    }
  } catch (err) {
    res.send("Invalid Email");
  }
});

module.exports = Router;
