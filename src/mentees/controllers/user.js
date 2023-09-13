export function registerations(req, res, next) {
  console.log(req.body);
  const newMentee = new MenteesSignUpModal({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
  });
  newMentee.save().then(() => {
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
}
