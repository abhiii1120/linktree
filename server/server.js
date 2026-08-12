import createApp from "./src/app.js";
import env from "./src/config/env.js";
import logger from "./src/config/logger.js";
import { connectDB } from "./src/db/db.js";

let app = createApp();

function createServer(){
    connectDB().then(() => {
        app.listen(env.PORT,() =>{
            logger.info({PORT:env.PORT},'server is running on port')
        })
    }).catch((err) => {
        logger.info({error:err},'error while connecting db');
    })
}

createServer();