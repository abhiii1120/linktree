import app from "./src/app.js";
import connectDB from "./src/db/db.js";

let port = process.env.PORT || 3000;


connectDB();
app.listen(port,() => {
    console.log('server running on port',port);
})