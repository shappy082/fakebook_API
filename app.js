const express = require('express');
const path = require('path');
//const helmet = require('helmet');
//const rateLimit = require("express-rate-limit");
const cors = require('cors');
const passport = require('passport');
const logger = require('morgan');

const config = require('./config/index');
const connectDB = require('./config/db')

const app = express();

const { logHandler } = require('./middleware/logHandler');
const { errorHandler } = require('./middleware/errorHandler');
const friendReqRoute = require('./routes/friendReqRoute');
const userFaceRoute = require('./routes/userFaceRoute');
const commentRoute = require('./routes/commentRoute');

//console.log(process.env);
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'))
}

app.use(logger('dev'))
app.use(logHandler);

connectDB(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//'./public'
app.use(express.static(path.join(__dirname, 'public')));
//init passport
app.use(passport.initialize());

app.use('/user', userFaceRoute);
app.use('/friend', friendReqRoute);
app.use('/comment', commentRoute);

app.use(errorHandler);

app.listen(config.PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${config.PORT}`));
