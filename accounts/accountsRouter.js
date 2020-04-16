const express = require("express");

const acc = require("./accountsDB");

const router = express.Router();

router.get("/", (req, res) => {
  acc
    .get()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Server error retrieving the accounts." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    acc
      .getByID(id)
      .then((account) => {
        res.status(200).json(account);
      })
      .catch((err) => {
        //   console.log(err);
        res.status(500).json({
          message: "Server error retrieving specified account",
          error: err,
        });
      });
  } else if (!id) {
    res.status(404).json({ message: `Specified ID does not exist` });
  }
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  if (body.name && body.budget) {
    acc
      .insert(body)
      .then((newAcc) => {
        res.status(201).json(newAcc);
      })
      .catch((error) => {
        res.status(500).json({
          message: "server error creating account",
          error: error,
        });
      });
  } else {
    res.status(400).json({ message: `Please add a name and budget` });
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (id && body.name && body.budget) {
    acc
      .update(id, body)
      .then((updatedAcc) => {
        res.status(201).json(updatedAcc);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Server error updating specified account",
          error: err,
        });
      });
  } else if (!id) {
    res.status(404).json({ message: `Specified ID does not exist` });
  } else if (!body.name || !body.budget) {
    res.status(400).json({ message: `name and budget are required` });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (id) {
    acc
      .remove(id)
      .then((noMore) => {
        res.status(200).json(noMore);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Server error deleting specified account",
          error: err,
        });
      });
  } else if (!id) {
    res.status(404).json({ message: `Specified ID does not exist` });
  }
});
module.exports = router;
