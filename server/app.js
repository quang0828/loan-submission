const express = require('express')
const userRouter = require('./routers/user')
const loanRouter = require('./routers/loan')
const cors = require('cors')
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '.env') });


const app = express()
require('./db/db')
const port = process.env.PORT

// const allowedOrigins = ['www.example1.com',
//                       'www.example2.com'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    // if(!allowedOrigins.includes(origin)){
    //   const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    //   return callback(new Error(msg), false);
    // }
    return callback(null, true);
  }

}));

app.use(express.json())
app.use(userRouter)
app.use(loanRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
