const express = require("express");
const {connectToMongoDB} = require("./connection")
const urlRoute = require("./routes/url");
const URL = require("./modules/url")

const app = express();
const PORT = 8010;

connectToMongoDB("mongodb://127.0.0.1:27017/show-URL")
.then(()=>{console.log("manogdb connected")})


//middleware
app.use(express.json())

app.use("/url", urlRoute);

// dynamic id
app.get("/:shortId", async (req,res)=>{
const shortId = req.params.shortId;
const entry= await URL.findOneAndUpdate({
    shortId
},{$push:{
    visitHistory:{
        timestamps: Date.now()
    },
}})
res.redirect(entry.redirectURL)
}
)


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))


module.exports = {
    connectToMongoDB
}