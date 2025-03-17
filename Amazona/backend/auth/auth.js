// Connect to MongoDB
mongoose
  .connect(process.env.dbURI)
  .then(() => console.log("DB Connected!"))
  .catch((e) => console.log(e));

// Authenticate/Login user
async function authenticate(username, password) {
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    return true;
  }
  return false;
}

// Register user
async function registerUser(username, password) {
  const newUser = new User({ username, password });
  await newUser.save();
  console.log("New user:", newUser);
}
