const allowedOrigins = [
  'http://localhost:3000',
  'https://cat-wiki.iamstarcode.com',
  'https://cat-wiki-red.vercel.app',
];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
