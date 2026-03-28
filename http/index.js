const http = require("http");
const fs = require("fs");
const url = require("url");

function handler(req, res) {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${req.url}: ${req.method} New Request is Received\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    switch (myUrl.pathname) {
      case "/":
        res.end("Welcome to Home Page");
        break;
      case "/about":
        const userName = myUrl.query.userName;
        res.end(`Your Name is : ${userName}`);
        break;
      case "/contact":
        res.end("Welcome to Contact Page");
        break;
      case "/signup":
        if (req.method === "GET") res.end("Welcome to Signup Page");
        else if (req.method === "POST") res.end("DB Query");
        else res.end("Invalid Method");
        break;

      default:
        res.end("404 Page Not Found");
    }
    // res.end("Hello from Server");
  });
}

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
