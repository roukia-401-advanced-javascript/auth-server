'use strict';

const express = require('express');

// cors and morgan its a global middleware 3rd party
const cors = require('cors'); 
const morgan = require('morgan'); // dives info in the terminal when we run the app

/*for each of the middleware that i used it in seprate file not in the server here :
1. require the file of it 
2. app.use(rquiredFile) //global midleware
note : 404 >> should be after all routes
       500 >> should be the last thing in the middle */


const userRoutes = require('./middleware/routes.js')
const error404 = require('./middleware/404.js');
const error500 = require('./middleware/500.js');


// const categoryRoutes = require('../routes/category.js');
// const productsRoutes = require('../routes/products.js');
// const apiv1 = require('../routes/api-v1.js');

const app = express();

// Express built in middleware
app.use(express.json());

// 3rd party middlewares
app.use(cors());
app.use(morgan('dev'));

//-----------------------------------------------routes----------------------

app.use(userRoutes);


//------------------------------------------------------------------------------



app.get('/bad', (req, res)=> {
  throw new Error('bad Request .... ');
});  // iam throung an error so i can test if the error handler working well

// after all my routes
// 404 page not found
// * anything else other than my routes 
app.use('*', error404); // require the file first 

//error handler when there is an error by default it will go to the error handler the one with the 4 arguments 500
app.use(error500); // require the file first 


module.exports = {
  server: app, 
  start: port => {
    let PORT = port || process.env.port || 4000;
    app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));
  },
};