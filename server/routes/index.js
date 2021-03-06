const router = require("express").Router();
const path = require("path");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

if (process.env.NODE_ENV === "production") {
  // serve up react front-end in production
  console.log("Dont send index");
  // router.use((req, res) => {
  //   res.sendFile(path.join(__dirname, "../../client/build/index.html"));
  // });
}

module.exports = router;
