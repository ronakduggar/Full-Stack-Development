const fs = require("fs");

fs.readFile("class.txt", "utf-8", (err, data) => {
  console.log(data);
});

// console.log("Before Executing the Non-Blocking Task");

// //Blocking
// const result = fs.writeFileSync("test.txt", "Hello, World!");
// console.log(result);

// //Non-Blocking
// fs.writeFile("text.txt", "Hello, World!", (err, data) => {
//   if (err) {
//     console.log("Error writing file:");
//   } else {
//     console.log(data);
//   }
// });

// console.log("After Executing the Non-Blocking Task");
