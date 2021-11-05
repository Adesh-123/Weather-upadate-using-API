const express = require('express');
const app = express();
const cors = require('cors');
const ratelimit=require('express-rate-limit');
require('dotenv').config()

const PORT= process.env.PORT || 5000;
app.use(cors());

const limiter=ratelimit({
    windowMS:10*60*1000 ,//10 mins;
    max:100
})

app.use(limiter);
app.set('trust proxy',1);

app.use('/api', require('./routes'))
app.use(express.static('public'));

app.listen(PORT,()=>{
    console.log("sever is running correctly ",{PORT});
})
