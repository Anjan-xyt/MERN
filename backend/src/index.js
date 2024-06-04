import connectDataBase from "./databases/database.js";
import app from "./app.js";
import dotenv from "dotenv";


dotenv.config({
  path: "./.env",
});

connectDataBase()
  .then(() => {
    app.listen(process.env.PORT || 10000, () => console.log(`Server is running on port : ${process.env.PORT}`));
  })
  .catch((error) => {
    console.error(error);
  });