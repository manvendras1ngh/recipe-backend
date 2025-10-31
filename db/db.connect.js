import mongoose from "mongoose";

const instantiateConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection to db successful");
  } catch (error) {
    console.error("Connection to database failed", error);
  }
};

export default instantiateConnection;
