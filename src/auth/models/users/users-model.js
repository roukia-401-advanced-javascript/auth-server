// 'use strict';

// // const { schema } = require("./users-schema.js");
// // require schema
// const schema = require('./users-schema.js');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET = 'mytokensecret';

// console.log('heeeey');
// class Users {

//   // Registration 

//   // i will use it to signup 
//   async create(record) { //record:req.body >>  username:/pass:
//     console.log("hellos")
//     let results = await schema.find(); //array of object ?
//     console.log(results)
//     if (results.length === 0) {
//       console.log("the db is empty");
//       bcrypt.hash(record.password, 5).then(hashPass => {
//         record.password = hashPass;
//       })
//       let newRecord = new schema({ username: `${record.username}`, password: `${record.password}` });
//       newRecord.save().then(savedRecord => {
//         return savedRecord;
//       })
//     } else {
//       results.forEach(element => {
//         console.log("iam the results from schema", results)
//         console.log("iam the element from schema", element)
//         console.log("i am the element.username",element.username);
//         console.log("i am the record.username",record.username);
//         if (element.username !== record.username) {
//           //username does not exist
//           // save user if it does not exist
//           // try {
//             console.log("inside try record.password",record.password);
//             // to crypt passord
//             // i want to save the record 
//             bcrypt.hash(record.password, 5).then(hashPass => {
//               record.password = hashPass;
//               console.log(" after hash record.password",record.password)
//               let newRecord = new schema({ username: `${record.username}`, password: `${record.password}` });
//               console.log("am the new record ",newRecord)
//               newRecord.save().then(savedRecord => {
//                 console.log("iam the savedRcord ",savedRecord);
//                 return savedRecord
//             })
//             // let hashPass = await bcrypt.hash(record.password, 5);
//             // record.password = hashPass;
           
//             })
//             // let savedRecord = await newRecord.save();
//             // return savedRecord // take it from db
//           // } catch (e) {
//           //   console.log("error in bcrypt:", e)
//           // }
//           // return savedRecord; // take it from db
//         }
//         // return Promise.reject();
//       });
//     }

//   }

//   async authenticateBasic(user, password) { //user pass >> after decode original >> isvalid 
//     // Signin
//     //headers Basic : username and password
//     // compare the password with the DB hashed password
//     //return the user object
//     let results = await schema.find();
//     results.forEach(element => {
//       if (element.username === user) {
//         // if the user is right then do the compare bewteen password and the one in db


//         bcrypt.compare(password, element.password).then(valid => {

//           let returnValue = valid ? element : Promise.reject(); // if valid is true then return object 
//           return returnValue;

//         })



//         // let valid = await bcrypt.compare(password, element.password);

//         // let returnValue = valid ? element : Promise.reject(); // if valid is true then return object 
//         // return returnValue

//       }
//       // if the user not match any of the users in db then reject the signin 

//       return Promise.reject();


//     })

//   }
//   generateToken(user) { //user : object saved 
//     //jwt to genrate a token for us. 
//     // install jwt and generate a token with it and return it.(jsonwebtoken)

//     let token = jwt.sign({ username: user.username }, SECRET); //check it later?/?
//     return token;


//   }
//   async list() {
//     let results = await schema.find();
//     return results; //the whole results from db
//   }

// }

// // export the class
// module.exports = new Users();