import dotenv from "dotenv";
dotenv.config();

const { DATABASE_USER, DATABASE_PASSWORD } = process.env;

export const dbConnection = {
  url: `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@express-food.3ma8mvy.mongodb.net/`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
