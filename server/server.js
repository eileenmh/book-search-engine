// TODO: implement the Apollo Server and apply it to the Express server as middleware
/* 
NOTE: Apollo Server recently migrated to Apollo Server 3. This major-version release impacts how Apollo Server interacts in an Express environment. To implement Apollo Server 2 as demonstrated in the activities, you MUST use the following script npm install apollo-server-express@2.15.0 to install Apollo Server 2. Alternately, to migrate to the latest version of Apollo Server, please refer to the Apollo Server Docs on Migrating to Apollo Server 3Links to an external site. and Apollo Server Docs on Implementing Apollo Server Express with v3Links to an external site.. Note that if you are using Apollo Server 3 you are required use await server.start() before calling server.applyMiddleware.
*/
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();
