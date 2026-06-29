const app = require("./app");
const dotenv = require("dotenv") ;
const connectDB = require("./config/db") ;

dotenv.config();

  app.get("/", (req, res,next) => {
    res.send("API IS RUNNING....");
  });


const startServer = async () => {
  await connectDB();
  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
  });
};

startServer();
