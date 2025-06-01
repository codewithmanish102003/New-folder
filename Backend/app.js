const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');

require('dotenv').config();

const ownersRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productsRouter');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');

const db = require('./config/mongoose_connection');

app.use(cors({
    origin:"https://starwaycollections.netlify.app" ||"http://localhost:5173",
//   origin: process.env.FRONTEND_ORIGINS,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET || 'secret',
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