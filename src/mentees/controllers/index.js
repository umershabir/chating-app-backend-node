// mentees sign up
// mentees sign in
app.post("/mentee/signin", (req, res) => {
  console.log(req.body.email);
  MenteesSignUpModal.findOne({ email: req.body.email })
    .then((user) => {
      if (user.password !== req.body.password) {
        return res.status(400).send({
          message: "Password does not match",
        });
      }
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );
      res.status(200).send({
        message: "Login Successfully",
        response: {
          email: user.email,
          type: user.type,
        },
        token,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "email does not registered",
        err,
      });
    });
});
// mentors sign up
//
app.post("/mentor/signup", (req, res) => {
  // console.log(req);
  console.log(req.body);
  const newMentor = new MentorsSignupScheema({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    category: req.body.category,
    type: req.body.type,
  });
  newMentor.save().then(() => {
    const token = jwt.sign(
      {
        userEmail: req.body.email,
      },
      "RANDOM-TOKEN",
      { expiresIn: "24h" }
    );
    res.status(200).send({
      message: "signup Successfully",
      response: {
        user: {
          email: req.body.email,
          name: req.body.fullName,
          type: req.body.type,
        },
        token,
      },
    });
  });
  // return res.status(201).json({ message: "Account created successfully!" });
});
// mentors sign in
app.post("/mentor/signin", (req, res) => {
  MentorsSignupScheema.findOne({ email: req.body.email })
    .then((user) => {
      if (user.password !== req.body.password) {
        return res.status(400).send({
          message: "password does not match",
        });
      }
      const token = jwt.sign(
        {
          userId: user._id,
          userEmail: user.email,
        },
        "RANDOM-TOKEN",
        {
          expiresIn: "24h",
        }
      );
      res.status(200).send({
        message: "Login Successfully",
        response: {
          email: user.email,
          type: user.type,
        },
        token,
      });
    })
    .catch((err) => {
      res.status(400).send({
        message: "email does not registered",
        err,
      });
    });
});
app.get("/categories", auth, (req, res) => {
  res.json({
    message: "you are authorized to access me",
    response: [
      {
        title: "software developers",
      },
      {
        title: "fashion",
      },
      {
        title: "showbees",
      },
      {
        title: "media",
      },
      {
        title: "enterprenure / business",
      },
    ],
  });
});
