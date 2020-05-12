const db = require("../data/dbConfig.js");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db("accounts");
}

function getById(id) {
  return db("accounts").where({ id }).first();
}

function insert(post) {
  return db("accounts")
    .insert(post)
    .then((NewAccountID) => {
      return getById(NewAccountID[0]);
    });
}

function update(id, changes) {
  return db("accounts").where({ id }).update(changes);
}

function remove(id) {
  return db("accounts").where({ id }).del();
}
