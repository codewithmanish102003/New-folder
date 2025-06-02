const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');

require('dotenv').config();

const ownersRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productsRouter');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');

const db = require('./config/mongoose_connection');

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://starwaycollections.netlify.app',
      'http://localhost:5173'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET || 'secret',
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 14 * 24 * 60 * 60 // optional: 14 days
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);



app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/owners', ownersRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});