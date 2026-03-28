const fs = require("fs");

console.log("Synchronous File Write:");
const data = fs.writeFileSync("example.txt", "Hello, World!", "utf8");

console.log("File has been written synchronously");

fs.writeFile("example_async.txt", "Hello, Async World!", "utf8", (err) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("File has been written asynchronously");
  }
});

fs.appendFileSync("example.txt", "\nAppended Text Synchronously.\n", "utf8");

fs.copyFileSync("example.txt", "example_copy.txt");

fs.unlinkSync("example_copy.txt");
