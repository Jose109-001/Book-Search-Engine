const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware, context } = require("./utils/auth");

const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");

const app = express();
const PORT = process.env.PORT || 3001;

//create new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

(async () => {
  await server.start();
  //integrate our Apollo server with Express application as middleware
  server.applyMiddleware({ app });
})();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

// if we're in production, serve client/build as static assets
if (true || process.env.NODE_ENV === "production") {
  console.log("Production");
  app.use(express.static(path.join(__dirname, "../client/build")));
}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
