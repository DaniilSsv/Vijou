require("dotenv").config();
const cors = require("cors")
const swaggerUI = require('swagger-ui-express');
const PORT = process.env.PORT;

const userRoute = require("./routes/auth")

const express = require("express")
const app = express();

const connectToMongoDB = require("./util/db")
connectToMongoDB();

app.use(cors())
app.use(express.json())
app.use('/api/auth', userRoute);
app.use('/api/streamkey', require('./routes/streamkey'));

// Swagger
const swaggerFile = require('./swagger-output.json');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(PORT || 3000, () => {
    console.log(`Server running on port ${PORT}`)
})