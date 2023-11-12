import 'dotenv/config';

export const mongoConfig = {
  uri: String(process.env.MONGO_DB_URL),
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
