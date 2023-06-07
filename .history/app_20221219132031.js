require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const newsRouter = require('./routes/news');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({}));
app.use('/api/files', express.static('./public'));
app.use('/api/news', newsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.info(`Server starting on port ${PORT}...`);
});
