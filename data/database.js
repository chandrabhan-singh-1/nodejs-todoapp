import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "BackendAPIs",
    })
    .then(() => {
      console.log("Database Connection Successful!");
    })
    .catch((err) => {
      console.log(err);
    });
};
