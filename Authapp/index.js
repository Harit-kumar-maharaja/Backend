const express = require("express")
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 7000;

const cookieParser = require("cookie-parser")
app.use(cookieParser());

app.use(express.json());


require("./config/database").connect();

//route impot and mount
const user = require("./routes/user")
app.use("/api/v1" , user);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!" });
});

//activate
app.listen(PORT , () => {
    console.log(`App is listening at ${PORT}`);
})