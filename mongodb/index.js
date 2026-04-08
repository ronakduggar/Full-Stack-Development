const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/rest_api_2")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const schema = new mongoose.Schema(
  {
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
  },
  { timestamps: true },
);

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
app.get("/html/users", async (req, res) => {
  const allUsers = await userModel.find();
  const html = `<ol>
    ${allUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
  </ol>`;
  return res.send(html);
});

app.get("/users", async (req, res) => {
  const allUsers = await userModel.find();
  return res.send(allUsers);
});

app
  .route("/rest/users/:id")
  .get(async (req, res) => {
    const id = await userModel.findById(req.params.id);
    return res.json(id);
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

app.post("/rest/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  ) {
    return res.status(401).json({ message: "All Fields are Required" });
  }
  try {
    const result = await userModel.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", data: result });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
