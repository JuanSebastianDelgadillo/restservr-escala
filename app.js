const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
require('dotenv').config();

//import routes
const authRoutes = require('./routers/auth');
const braintreeRoutes = require('./routers/braintree');
const categoryRoutes = require('./routers/category');
const orderRoutes = require('./routers/order');
const productRoutes = require('./routers/product');


// app express
const app = express();

// DB
// mongoose
//     .connect(process.env.DATABASE, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true
//     })
//     .then(() => console.log('DB Connected'));

const db = async() => {
    try {
        const success = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log(`Database Running`);
    } catch (error) {
        console.log('DB Connection Error', error);
    }
}
db();

//midlewares

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middlewares
// app.use('/api', authRoutes);
// app.use('/api', braintreeRoutes);
// app.use('/api', categoryRoutes);
// app.use('/api', orderRoutes);
// app.use('/api', productRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running ${port}`);
});