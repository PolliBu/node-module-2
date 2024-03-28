import express from "express";
import cors from "cors";
import { v4 } from "uuid";
import { promises as fs } from "fs";

const app = express();

// MIDDLEWARE =====================
// built-in
app.use(express.json());
app.use(cors());

// custom global middleware
app.use((req, res, next) => {
  console.log("Hello from middleware!!");

  // req.time = new Date().toLocaleString();

  next();
});

// single endpoint middleware
app.use("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // TEMP save user to the DB
    const usersDB = await fs.readFile("data.json");

    const users = JSON.parse(usersDB);
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(404).json({
        msg: "user not found..",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "internal server error..",
    });
  }
});

// CONTROLLERS ======================

// check server health
app.get("/ping", (req, res) => {
  // res.send('<h1>Hello from express!!</h1>');
  // res.sendStatus(200);
  res.status(200).json({
    status: "success",
    msg: "pong!",
    test: null,
  });
});

/**
 * REST api (Create, Read, Update, Delete)
 * POST, GET, PATCH (PUT), DELETE
 *
 * POST         /users
 * GET          /users
 * GET          /users/<userId>
 * PATCH (PUT)  /users/<userId>
 * DELETE       /users/<userId>
 */

// create
app.post("/users", async (req, res) => {
  try {
    const { name, year } = req.body;

    // TODO: user data validation!!!!!!

    const newUser = {
      id: v4(),
      name,
      year,
    };

    // TEMP save user to the DB
    const usersDB = await fs.readFile("data.json");

    const users = JSON.parse(usersDB);

    users.push(newUser);

    await fs.writeFile("data.json", JSON.stringify(users));

    // send response
    res.status(201).json({
      msg: "success!",
      user: newUser,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "internal server error..",
    });
  }
});

// read many
app.get("/users", async (req, res) => {
  try {
    // TEMP save user to the DB
    const usersDB = await fs.readFile("data.json");

    const users = JSON.parse(usersDB);

    res.status(200).json({
      msg: "success!",
      users,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "internal server error..",
    });
  }
});

// read one
app.get("/users/:id", (req, res) => {
  const { user } = req;

  res.status(200).json({
    msg: "success!",
    user,
  });
});

// app.patch('/users/:id', (req, res) => {
//   res.status(200).json({
//     msg: 'success!',
//     user,
//   });
// });

// app.delete('/users/:id', (req, res) => {
//   // res.status(200).json({
//   //   msg: 'success!',
//   //   user,
//   // });

//   res.sendStatus(204);
// });

// SERVER INIT =================
const port = 3001;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
