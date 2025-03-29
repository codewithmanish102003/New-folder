const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

require('dotenv').config();

const ownersRouter = require('./routes/ownersRouter');
const productRouter = require('./routes/productsRouter');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter2');

const db = require('./config/mongoose_connection');

app.use(flash());
app.use(cors({
    origin: 'http://localhost:5173',
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
    })
);

app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/owners', ownersRouter);
app.use('/api/cart', cartRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});