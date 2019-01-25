const express = require("express");
const Joi = require("joi");
const BlueBird = require("bluebird");
const bcrypt = require("bcrypt");
const jwt = BlueBird.promisifyAll(require("jsonwebtoken"));
const config = require("../../config");
const db = require("../db/db");

const router = express.Router();

router.get("/hello", async (req, res) => {
  res.status(200).send({data: "It's alive!\nHello"});
});

router.post("/register", async (req, res) => {
  const login = req.body.login;
  const password = req.body.password;


  const resultAccount = await db.createAccount(resultUser.userId)
    .catch(error => {
      switch (error.code) {
        default: {
          res.status(500).send({code: 500, status: "INTERNAL_SERVER_ERROR", message: "Internal server error"});
          break;
        }
        case "ER_DUP_ENTRY": {
          res.status(409).send({code: 409, status: "CONFLICT", message: "User already exists"});
          break;
        }
      }
    });

  if (typeof resultAccount === "undefined") {
    return;
  }

  const token = await jwt.signAsync({
    userId: resultUser.userId,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // exp in 1 week
  }, config.secret)
    .catch(error => {
      switch (error.code) {
        default: {
          res.status(500).send({code: 500, status: "INTERNAL_SERVER_ERROR", message: "Internal server error"});
          break;
        }
      }
    });

  if (typeof token !== "undefined") {
    res.status(200).send({token: token});
  }
});

router.post("/authorize", async (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  res.status(200).send({isAuthorized: true});

});

module.exports = router;
