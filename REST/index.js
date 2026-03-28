const express = require("express");
const fs = require("fs");
const users = require("./mock_data.json");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/rest_api")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
});

const userModel = mongoose.model("User", schema);

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // console.log("Hello from middleware first");
  next();
});

app.use((req, res, next) => {
  // console.log("Hello from middleware second");
  fs.writeFile(
    "log.txt",
    `Request received on: ${req.method} - ${req.path}\n`,
    () => {
      next();
    },
  );
});

//ROUTES
app.get("/html/users", (req, res) => {
  const html = `<ol>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ol>`;
  return res.send(html);
});

app.get("/users", (req, res) => {
  return res.send(users);
});

app
  .route("/rest/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    users.find((user) => {
      if (user.id === id) {
        return res.json(user);
      }
    });
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const user = users.find((u) => u.id === id);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    Object.assign(user, body);
    fs.writeFile("./mock_data.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.json({ message: "Error updating user" });
      }
      return res.json({ message: "User updated successfully" });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res.json({ message: "User not found" });
    }

    users.splice(index, 1);

    fs.writeFile("./mock_data.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.json({ message: "Error deleting user" });
      }

      return res.json({ message: "User deleted successfully" });
    });
  });

app.post("/rest/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./mock_data.json", JSON.stringify(users), (err, data) => {
    return res.json({ message: "User created successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
