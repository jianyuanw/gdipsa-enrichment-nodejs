const jwt = require("jsonwebtoken");

const username = "Alex";
const roles = ["admin"];
const jwt_key = "my-secret";
const jwt_exp = 5000;

const token = jwt.sign({ username, roles }, jwt_key, { expiresIn: jwt_exp });
console.log(token);

jwt.verify(token, jwt_key, (err, data) => {
  if (err) {
    console.log(`Token verification failed: ${err.message}`);
  } else {
    console.log(`Token verified. User: ${data.username}`);
  }
});
