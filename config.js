require("dotenv").config();

// Required by bcrypt
const SECRET_KEY = process.env.SECRET_KEY;
const BCRYPT_WORK_FACTOR = 12; // determines "strength" of hashing

module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};
