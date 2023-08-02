const db = require("../config/connection");
const { Comment, User } = require("../models");
const commentSeeds = require("./commentSeeds.json");
const userSeeds = require("./userSeeds.json");
const cleanDB = require("./cleanDB");

const seedDatabase = async () => {
  try {
    await cleanDB("Comment", "comments");
    await cleanDB("User", "users");

    await Comment.create(commentSeeds);
    await User.create(userSeeds);

    console.log("All done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
};

db.once("open", seedDatabase);
