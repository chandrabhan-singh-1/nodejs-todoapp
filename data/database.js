import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "BackendAPIs",
    })
    .then((c) => {
      console.log(`Database Connection Successful: ${c.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
