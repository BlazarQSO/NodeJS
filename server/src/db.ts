import { MONGO_DB_URL } from './public.env';

export const mongoConfig = {
  uri: MONGO_DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
