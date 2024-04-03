const dotenv = require('dotenv').config()
const express = require('express')
const { connectDataBase } = require('./utils/features');
const { errorMiddleware } = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const { createMessageInChat } = require('./seeders/chat');
// Routes Imports
const userRoutes = require('./routes/user')
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');


const databaseUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000

connectDataBase(databaseUri)

// createMessageInChat('660a84e09a26aabfab4b756f', 40)

// createSingleChat(1)
// createGroupChat(1)

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/user', userRoutes)
app.use('/chat', chatRoutes)
app.use('/admin', adminRoutes)

app.get('/', (req, res) => {
    res.send('<h1>Hello World<h1/>')
});


app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on port 3000`)
});