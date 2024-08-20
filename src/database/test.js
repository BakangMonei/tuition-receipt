const dotenv = require('dotenv');
const result = dotenv.config();

// if (result.error) {
//   console.error("Error loading .env file:", result.error);
// } else {
//   console.log("Loaded .env file:", result.parsed);
// }


console.log("Environment variables:");
console.log(process.env.REACT_APP_EMAIL_USER);  // Output should be your email user
console.log(process.env.REACT_APP_EMAIL_PASS);  // Output should be your email password
