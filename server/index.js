var db = require('./db');
const express = require('express')
const authJWT = require("./authJwt");
const keyConfig = require("./config/key.config");
var jwt = require("jsonwebtoken");
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express()

const port = 9000;

var mailer = require("nodemailer");
var Crypto = require('crypto')
var moment = require('moment')
var bcrypt = require("bcrypt")
var bodyParser = require('body-parser');
app.use(cors())

var corsOptions = {		
	//origin: 'http://165.22.184.151:3000'
     origin: 'http://localhost:3000'
 }

  
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/displayLinkedUser",function(req,res){

  const UserID = req.query.UserID;
  
  db.conn.query("SELECT LinkedUserID FROM UserRelationships WHERE UserID = ? ;",UserID,(err,result) =>
  {
    if(err)
    {
      console.log(err);
      res.send({err:err});
      res.send({status : false, message :"Internal error"});
    }
    else
    {
      // console.log(result);
       console.log(result.length);
       var i;
       var optionArray = [] ;
        var promise = [];
        result.map((item) => {
         console.log(  item['LinkedUserID']);
          promise.push( new Promise ((resolve, reject) =>(
            db.conn.query("SELECT EmailID , First_Name, Last_Name FROM Users WHERE UserID ="+item['LinkedUserID']+" ;",
            function(err, optionresult, fields){
              if(err) throw err;
              console.log(optionresult.length);
              if(optionresult.length>0) {
                for(var j=0;j<optionresult.length;j++) {
                optionArray.push({"EmailID" : optionresult[j].EmailID, "First_Name":optionresult[j].First_Name, "Last_Name":optionresult[j].Last_Name});
                }
                item['User'] = optionArray;
                optionArray = [] ;
                console.log("*** " + JSON.stringify(item));
              } else {
                console.log("error");
              }
              resolve();
            })

      )))});
      Promise.all(promise).then(() =>{
        res.send(result);
      });
    
    }

    }
  )
})

app.get("/displaySCategories",function(req,res){

  db.conn.query("SELECT * FROM SCategories", (err,result) => 
  {
    if(err)
    {
      console.log(err);
      res.send({err: err});

      res.send({status : false, message :"Internal error"});
    }
    else
    {
      console.log(result);
      res.send(result);

      /*
       if(result && result.length >0)
      {
        res.send({ status: true, UserID: result[0].UserID,
          email: result[0].email,
          subject: result[0].subject,
          message: result[0].message,
         
        })
      }  
*/

    }
  })
})




app.get("/DisplayContactUs",function(req,res){

  db.conn.query("SELECT * FROM contactUs", (err,result) => 
  {
    if(err)
    {
      console.log(err);
      res.send({err: err});

      res.send({status : false, message :"Internal error"});
    }
    else
    {
      console.log(result);
      res.send(result);

      /*
       if(result && result.length >0)
      {
        res.send({ status: true, UserID: result[0].UserID,
          email: result[0].email,
          subject: result[0].subject,
          message: result[0].message,
         
        })
      }  
*/

    }
  })
})

app.put("/blockUser",(req,res) => {

  const UserID = req.body.UserID;


  db.conn.query("UPDATE Users SET Current_Status = 'Blocked' WHERE  UserID = ? ;",[UserID],
  (err,result) => {

    if(err)
    {
      console.log(err);
      res.send(err);
    }
    else{
      res.send({"message" : "User Blocked"});
    }

  })

})

app.get("/displayAllUsers",function(req,res){

  db.conn.query("SELECT UserID,UserType,First_Name, Last_Name, Current_Status FROM Users", (err,result) => 
  {
    if(err)
    {
      console.log(err);
      res.send({err: err});

      res.send({status : false, message :"Internal error"});
    }
    else
    {
      console.log(result);
      res.send(result);
      /*
      if(result && result.length >0)
      {
        res.send({ status: true, UserID: result[0].UserID,
          UserType:  result[0].UserType,
          First_Name: result[0].First_Name,
          Last_Name: result[0].Last_Name,
          DOB: result[0].DOB,
          Sex : result[0].Sex,
          LicenseID : result[0].LicenseID,
          BucketType: result[0].BucketType,
          Current_Status : result[0].Current_Status,
          Subscription : result[0].Subscription,
        })
      }  
      */

    }
  })
})


app.put("/EditQues",(req,res) => {

  const QText = req.body.QText;
  const SurveyID = req.body.SurveyID;
  const QuesID = req.body.QuesID;

  db.conn.query("UPDATE SQuestions SET QText = ? WHERE SurveyID = ? and QuesID = ?;",[QText,SurveyID,QuesID],
  (err,result) => {

    if(err)
    {
      console.log(err);
      res.send(err);
    }
    else{
      res.send({"message" : true});
    }

  })

})

app.delete("/deleteQues", (req,res) => {

  const SurveyID = req.body.SurveyID;
  const QuesID = req.body.QuesID;

  const sqlDelete = "DELETE FROM SQuestions WHERE SurveyID = ? AND QuesID = ?;";

  db.conn.query (sqlDelete,[SurveyID,QuesID],(err,result) => {
    if(err) {
    console.log(err);
    res.send({ "status": false, message: "Error while deleting "});
    }

    if(result) {
      res.send({ "status": true});
      }
}
)
})



app.post("/saveUserResponse",[authJWT.verifyToken], (req,res) => {
  console.log(req.body);
  const UserID = req.userId;
  const UserType = req.userType;
  const surveyID = req.body.SurveyID;
  const UserResponse = req.body.UserResponse;

  var promise = [];
  for(var i = 0;i< UserResponse.length; i++ )
  {
    console.log(UserResponse[i].QuesID + " ID " + UserResponse[i].optionId );

    promise.push( new Promise ((resolve, reject) =>(
      db.conn.query("INSERT INTO UserResponses(UserID,UserType,SurveyID,QuesID,OptID,Response) VALUES (?,?,?,?,?,?);",
      [UserID,UserType,surveyID,UserResponse[i].QuesID,UserResponse[i].optionId ,UserResponse[i].OptionText] ,
      function(err, optionresult, fields){
        if(err) throw err;
        console.log(optionresult);
        resolve();
      })

)))
 } // end of for


Promise.all(promise).then(() =>{
  res.send({"status": true});
});


})


app.post("/newsletter", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  db.conn.query( "INSERT INTO Newsletter (email) VALUES (?);",
     [email],
     (err,result) => {

      res.send({ "status": true});
       console.log(result);
     });
});


app.get("/displayUserbucket",function(req,res){

  db.conn.query("SELECT * FROM UserBuckets", (err,result) => 
  {
    if(err)
    {
      console.log(err);
      res.send({err: err});

      res.send({status : false, message :"Internal error"});
    }
    else
    {
      console.log(result);
      if(result && result.length >0)
      {
        res.send(result);
      }     
    }
  })
})

app.post("/addBucket", (req,res) => 
    {
      const BucketType = req.body.BucketType;
      const BucketDesc = req.body.BucketDesc;
     
      db.conn.query( "INSERT INTO UserBuckets (BucketType,BucketDesc) VALUES (?,?)",
         [BucketType,BucketDesc],
         (err,result) => {
            if(err)
            {res.send({ "message": err});
            }
            if(result) {
            res.send({ "status": true});
            }
         });
      });

      app.post("/addSCategories", (req,res) => 
      {
        const CategoryID = req.body.CategoryID;
        const BucketType = req.body.BucketType;
        const CatDesc = req.body.CatDesc;
       
      
      
        db.conn.query( "INSERT INTO SCategories (CategoryID,BucketType,CatDesc) VALUES (?,?,?)",
           [CategoryID,BucketType,CatDesc],
           (err,result) => {
              if(err)
              {res.send({ "message": err});
              }
              if(result) {
              res.send({ "status": true});
              }
           });
        });

      app.post("/addSurvey", (req,res) => 
      {
        const SurveyTitle = req.body.SurveyTitle;
        const NoQues = req.body.NoQues;
        const OptDesc = req.body.OptDesc;
        const CategoryID = req.body.CategoryID;
        const SurveyStatus = req.body.SurveyStatus;
       
      
      
        db.conn.query( "INSERT INTO Surveys (SurveyTitle,NoQues,OptDesc,CategoryID,SurveyStatus) VALUES (?,?,?,?,?)",
           [SurveyTitle,NoQues,OptDesc,CategoryID,SurveyStatus],
           (err,result) => {
              if(err)
              {res.send({ "message": err});
              }
              if(result) {
              res.send({ "status": true});
              }
           });
        });

        app.post("/addSurveyQuestion", (req,res) => 
      {

        const SurveyID = req.body.SurveyID;
        const QuesID = req.body.QuesID;
        const QText = req.body.QText;
        const RespType = req.body.RespType;
      
      
        db.conn.query( "INSERT INTO SQuestions (SurveyID,QuesID,QText,RespType) VALUES (?,?,?,?)",
           [SurveyID,QuesID,QText,RespType],
           (err,result) => {
              if(err)
              {res.send({ "message": err});
              }
              if(result) {
              res.send({ "status": true});
              }
           });
        });


        app.post("/addQOptions", (req,res) => 
      {

        const SurveyID = req.body.SurveyID;
        const QuesID= req.body.QuesID;
        const OptID = req.body.OptID;
        const OptText = req.body.OptText;
        
    
      
         db.conn.query( "INSERT INTO QOptions (SurveyID,QuesID,OptID,OptText) VALUES (?,?,?,?);",
           [SurveyID,QuesID,OptID,OptText],
           (err,result) => {
              if(err)
              {res.send({ "message": err});
              }
              if(result) {
              res.send({ "status": true});
              }
           });
           
        });
  

app.post('/user/login', function(request, response) {
    console.log(request.body)
    var EmailID = request.body.user.email;
    var password = request.body.user.password;
    console.log(EmailID,password)
    if (EmailID && password) {
// check if user exists
        db.conn.query('SELECT * FROM Users WHERE EmailID = ? AND Pass = ? ', [EmailID, password], function(error, results, fields) {
            if(error)
            {
                 console.log("failed");
                 response.send({
                  "code":400,
                  "failed":"error ocurred"
            });
            } 
            console.log("results=",results);
            if (results.length > 0) {
                console.log(results[0].UserID);
                var token = jwt.sign({ id: results[0].UserID,type:results[0].UserType  }, keyConfig.secret, {
                  expiresIn: 500 // 86400 - 24 hours
                  });
                  var UserType=results[0].UserType
                 response.send({
                        "code":200,
                        "success":"login sucessful","token":token,"UserType":UserType});
            } else 
            {
                response.send({
                    "code":204,
                    "success":'Incorrect EmailID and/or Password!'});
            }           
            response.end();
        });
    } 
    else {
        response.send({
            "code":210,
            "success":'Please Email ID does not Exist!'
            });
        response.end();
    }
});

app.post('/user/signup', function(req,res){
    console.log(req.body)
    var data = {
        "First_Name":req.body.user.firstname,
        "Last_Name":req.body.user.lastname,
        "EmailID":req.body.user.email,
        "Pass":req.body.user.password,
        "UserType":req.body.user.userType,
        "Current_Status":req.body.user.Current_Status,
        "LicenceID":req.body.user.LicenceID,
    }
      const SALT_ROUND = 12
      db.conn.query("SELECT COUNT(*) As total from Users where EmailID = ?;",
      data.EmailID, function(error,results,fields){
          if(error){
            console.log(error)
            res.send({
                "code":400,
            "Status":"error ocurred"
            })
          }
          else if(results[0].total>0){
              res.send({
                  "code" : 210,
                  "Status" : "Email Already exists"
              })
          }
          else {
            const token = Crypto.randomBytes(30).toString('hex')
            var tokenexpires = new Date()
            console.log(db.conn.escape(tokenexpires))
            
              //data.Password = hashedPassword
              var sql = "INSERT INTO Users (First_Name, Last_Name, EmailID, Pass, UserType, LicenseID, Current_Status, resetPasswordToken, resetPasswordTokenExpires) values (?, ?, ?, ?, ?, ?, ?, ?, ?)"
              db.conn.query(sql,[data.First_Name, data.Last_Name, data.EmailID, data.Pass, data.UserType, data.LicenceID , data.Current_Status, token, tokenexpires] , function(error,results,fields){
                console.log(req.body);
                if(error){
                    console.log(error)
                    res.send({
                        "code":400,
                    "failed":"error ocurred"
                    })
                }
                else{
                     
                    console.log("fv");
                    res.send({
                    "code":200,
                    "success":"user registered sucessfully"});
            
                }
            })

          }
      })
})

   

 app.get("/profiledetails",[authJWT.verifyToken],(req, res) => {

        const userid = req.userId;
        //console.log(username);
        //res.send({message: username});
        console.log("**Z");
        console.log(userid);
    
        
      
        db.conn.query("SELECT emailID,First_Name, Last_Name, DOB, Sex, LicenseID,pass from Users where UserID = ?", userid,
        (err,result) => {
          if(err)
          {
            console.log(err);
            res.send({err: err});
    
            res.send({ status : false, message : "Internal error"});
          }
          else
          {
            console.log(result);
            if (result && result.length > 0) {
            res.send({ status: true, email: result[0].emailID,First_Name: result[0].First_Name, 
              lastname : result[0].Last_Name,
              dob : result[0].DOB,
              sex : result[0].Sex,
              LicenseID : result[0].LicenseID,
              pass : result[0].pass
            });
            }
            else {
              res.send({ status : false, message : "Profile doesnt exist"});
            }
          }
        }
        )
      });
      

app.delete("/profiledelete", [authJWT.verifyToken],(req,res) => {
        const userid = req.userId;
    
    
        const sqlDelete = "DELETE FROM Users WHERE UserID = ?";
    
        db.conn.query (sqlDelete,userid, (err,result) => {
          if(err) {
          console.log(err);
          res.send({ "status": false, message: "Error while delete DB"});
          }
      
          if(result) {
            res.send({ "status": true});
            }
      }
      )
    })
    
    app.put("/profileupdate" , [authJWT.verifyToken],(req,res) =>
    {
      const userid = req.userId;
      const fname = req.body.fname;
      const lname = req.body.lname;
      
     

 const sqlUpdate = "UPDATE  Users SET First_Name = ?, Last_Name = ? where UserID = ? ";
      db.conn.query(sqlUpdate,[fname,lname,userid], (err,result) =>
      {
        if(err) {
        console.log(err);
        res.send({ "status": false, message: "Error while updating DB"});
        }
    
        if(result) {
          res.send({ "status": true});
          }
    
      })
    })
    
    
    app.post("/contactUs", (req,res) => 
    {
      const email = req.body.email;
      const subject = req.body.subject;
      const mes = req.body.mes;
    
      db.conn.query( "INSERT INTO contactUs (email, subject, message) VALUES (?,?,?)",
         [email,subject,mes],
         (err,result) => {
            if(err)
            {res.send({ "message": err});
            }
            if(result) {
            res.send({ "status": true});
            }
         });
      });
           

app.get("/displayAllSurvey",function(req,res){

        db.conn.query("SELECT * FROM Surveys", (err,result) => 
        {
          if(err)
          {
            console.log(err);
            res.send({err: err});

            res.send({status : false, message :"Internal error"});
          }
          else
          {
            console.log(result);
            if(result && result.length >0)
            {
             res.send(result);
             /* res.send({ status: true, surveyId : result[0].SurveyID,
                surveyTitle : result[0].SurveyTitle,
                NoQues: result[0].NoQues,
                OptDesc: result[0].OptDesc,
                CategoryID: result[0].CategoryID,
                SurveyStatus: 'A'

                */
             
            }
            
          }
        })
      })

	 app.get("/surveyQandOpt",function(req,res){

        const surveyId = req.query.surveyId;
        
        db.conn.query("SELECT * FROM SQuestions WHERE SurveyID = ? ;",surveyId,(err,result) =>
        {
          if(err)
          {
            console.log(err);
            res.send({err:err});
            res.send({status : false, message :"Internal error"});
          }
          else
          {
            // console.log(result);
             console.log(result.length);
             var i;
             var optionArray = [] ;
              var promise = [];
              result.map((item) => {
               console.log(  item['SurveyID'] + "  " + item['QuesID']);
                promise.push( new Promise ((resolve, reject) =>(
                  db.conn.query("SELECT OptID , OptText FROM QOptions WHERE SurveyID ="+item['SurveyID']+"  and QuesID ="+item['QuesID']+" ;",
                  function(err, optionresult, fields){
                    if(err) throw err;
                    console.log(optionresult.length);
                    if(optionresult.length>0) {
                      for(var j=0;j<optionresult.length;j++) {
                      optionArray.push({"optionId" : optionresult[j].OptID, "OptionText":optionresult[j].OptText});
                      }
                      item['options'] = optionArray;
                      optionArray = [] ;
                      console.log("*** " + JSON.stringify(item));
                    } else {
                      console.log("error");
                    }
                    resolve();
                  })

            )))});
            Promise.all(promise).then(() =>{
              res.send(result);
            });
          
          }

          }
        )
      })

 app.get("/surveyOptions", function(req,res){

        const SurveyID = req.query.SurveyID;
        const QuesID = req.query.QuesID;

        db.conn.query("SELECT OptID , OptText FROM QOptions WHERE  SurveyID = ? AND QuesID = ? ;",[SurveyID,QuesID],(err,result) =>
        {
          if(err)
          {
            console.log(err);
            res.send({err:err});
            res.send({status : false, message :"Internal error"});
          }
          else
          {
            console.log(result);
            res.send(result);
          }
        }
        )

      })


app.post('/user/forgotpassword', function(req, res){
    var data = {
        
      "EmailID":req.body.email,
        }
     console.log(req.body.email); 
     console.log("DB")  
     db.conn.query(`SELECT * FROM users where EmailID='${req.body.email}'`,
     data.Email, function(error,results,fields){
        console.log(req)
        if(error){
            console.log(error)
            res.send({
                "code":400,
            "Status":"error ocurred"
            })
          }
        else if(results.length == 0){
            console.log("no results")
            
            res.send({
                "code": 210,
                "Status" : "EmailID Not recognized"
            })
        }
        else{
            const crypto=require('crypto');
            const token = crypto.randomBytes(30).toString('hex')
            var resetPasswordTokenExpires = new Date()
            console.log(db.conn.escape(resetPasswordTokenExpires))
            var t = req.body.email
            var sql = `Update users SET resetPasswordToken = '${token}', resetPasswordTokenExpires = '${resetPasswordTokenExpires}' Where EmailID = '${req.body.email}'`
            db.conn.query(sql,[token,resetPasswordTokenExpires,t],function(error,result,fields){
                if(error){
                    console.log(error)
                    res.send({
                        "code":400,
                    "failed":"error ocurred"
                    })
                }
                else{
                    var nodemailer = require('nodemailer');
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'startwell611@gmail.com',
                          pass: 'stormrage7'
                        }
                    });
                      var mailOptions = {
                        from: 'startwell2021@gmail.com',
                        to: req.body.email,
                        subject: 'Link To Reset Password',
                        text:'You are recieving this email because you have requested to reset the password.\n'
                        +'Please click the below link\n\n'+
                        'http://165.22.184.151:3000/ResetPassword?token='+token
                      };

                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                      res.send({
                
                        "code":200,
                            "success":"Email Sent Successfully"
                    });

                }
            })
            
        }
     })

})


app.get('/user/resetpassword', cors(corsOptions),function(req,res){
    console.log("In re-setpassword",req.query)
    var data = {
        "resetPasswordToken" : req.query.resetPasswordToken,
    }
    console.log(data.resetPasswordToken)
    db.conn.query(`SELECT * from users where resetPasswordToken = '${req.query.resetPasswordToken}'`,
    data.resetPasswordToken,function(error,results,fields){
        console.log("query result",results)
        var d = new Date()
        console.log("token expires date value",d,"  ",new Date(results[0].resetPasswordTokenExpires))
        console.log("time value", (d -new Date(results[0].resetPasswordTokenExpires)))
        if(error){
            res.send({
                "code":400,
                "Status":"error occured"
            })
        }
        else if(((d - new Date(results[0].resetPasswordTokenExpires)<=360000))){
            //res.setHeader("Access-Control-Allow-Origin","*")
            //res.redirect('http://localhost:3000/ResetPassword')
            res.send({

                "code" : 200,
                "Status":"reset link OK",
                results
            })
            
        }
        else{
            res.send({
                "code" : 210,
                "Status" : "reset link expired"
            })
        }
    })

})

app.put('/user/updatepassword', function(req,res)
{
    var data = {
       
      "EmailID":req.body.email,
       "Pass":req.body.password
    
        }
      const SALT_ROUND = 12
      let hashedPassword = bcrypt.hashSync(data.Pass,SALT_ROUND)
        db.conn.query(`Update users SET Pass = '${req.body.password}' Where EmailID ='${req.body.email}'`,
        [hashedPassword,data.EmailID],function(error,results,fields){
            console.log(data.EmailID)
            console.log(hashedPassword)
            console.log(req.body.password)
            if(error){
                console.log(error);
                res.send({
                    "code":400,
                    "Status":"error occured",
                })
            }
            else{
                res.send({
                    "code":200,
                    "Status" : "Password updated successfully",
                })
            }
        })

})

app.get('/user_response', function(request, response) {
  console.log("body",request.body)
  console.log("query",request.query)
  var data = {
    "UserID" : request.query.UserID,
    
  }
    
  console.log(data.UserID)
// check if user exists
    db.conn.query(`select * from UserResponses A join CrossReference B on A.SurveyID=B.SurveyID_Customer and A.QuesID=B.QuesID_Customer join SQuestions C on A.SurveyID=C.SurveyID and A.QuesID=C.QuesID where UserID = '${request.query.UserID}'`, function(error, results, fields)
       {
         console.log("error",error)
          if(error)
          {	  console.log("failed");
               //response.send("Failed");
          
           }
          else
          {
            console.log("outside")
            if (results.length > 0)
            {
              console.log("inside")
              userResponses = results
             // response.send("user Success");
              var type = 'Provider';
              db.conn.query(`select A.SNo, A.UserID, A.UserType, U.Current_Status, A.SurveyID, A.QuesID, A.OptID, A.AttemptID, A.Response, A.Time_stamp, C.QText,C.Weights,U.EmailID, U.First_Name from  UserResponses A join CrossReference B on A.SurveyID=B.SurveyID_Provider and A.QuesID=B.QuesID_Provider join SQuestions C on A.SurveyID=C.SurveyID and A.QuesID=C.QuesID join Users U on U.UserID=A.UserID where A.UserType ='${type}' order by(SNo)`, function(error2, results2, fields2)
              {
                console.log("error2",error2)
               if(error2)
                {
                  console.log("failed");
                  response.send("failed");
                }
               else
               {
                 console.log(results2.length)
                 if (results2.length > 0)
                 {
                   var providerResponses = results2
                   
                   lst = compareValues(userResponses, providerResponses)
                   console.log(lst)
                   console.log("Successfully compared!!")
                   response.send(lst);

                 }
           //console.log("User response =",userResponses);
               }
          
          
            });


       }
           //console.log("User response =",userResponses);
      }
          
          
  });
});

var provider_response=[]

var compareValues =function(userResponses,providerResponses)
{
//datastructure to store every providers matching score with user
console.log("userResponses",userResponses)
console.log("Provider Response", providerResponses)
var match=0;
var first=[0, -1]; var second=[0, -1];
var third=[0, -1];
var score = 0; var provider = [];

var map = new Map();

for (var a=0; a<userResponses.length; a++){
  score = 0; 
  provider = [];
  
  for (var i=0; i<providerResponses.length; i++){

    score = 0; 
      //console.log("PR:",providerResponses[i])
      if((userResponses[a].Response == "No-Preference" || providerResponses[i].Response=="No-Preference"))
      {
          score = providerResponses[i].Weights/2
          provider = [score, providerResponses[i].UserID,providerResponses[i].EmailID,providerResponses[i].First_Name]
      }
      else if (userResponses[a].Response == providerResponses[i].Response)
      {
        score = providerResponses[i].Weights
        provider = [score, providerResponses[i].UserID,providerResponses[i].EmailID,providerResponses[i].First_Name]
        
        // console.log("userscore",userscore," prod score", prodscore)
        // if((userscore-5) <= prodscore <= (userscore+5) && Math.max(match))
        // {
        //   console.log(userResponses[a].EmailID,' : ',providerResponses[i].EmailID);
        // }
        //   //calculate score for every provider
         //console.log(provider[0],provider[1],provider[2],provider[3])
       } //var score =score+weight 
       if (map.has(providerResponses[i].EmailID)){
         //console.log("Score: ", score)
         //console.log("Total: ", map.get(providerResponses[i].EmailID))
         map.set(providerResponses[i].EmailID, map.get(providerResponses[i].EmailID) + score)
       }
       else{
        map.set(providerResponses[i].EmailID, score)
       }


       
  
    //console.log(provider[0])

  }
 
  }
  console.log("mapppp",map)
//   for (let [key, value] of map){
//     if (value > first[1]){
//       third = second
//       second = first
//       first[0] = key
//       first[1] = value  
//       console.log("value >first[i",key,value)
//  }
//  if (value > second[1] && value < first[1])
//  {        
//   third = second
//   second[0] = key
//   second[1] = value
//   console.log("value >second[i",key,value)
//  }
//   if (value > third[1] && value < second[1]){
        
//         third[0] = key
//         third[1] = value
//         console.log("last",key,value)
//     }
//   }
map[Symbol.iterator] = function* () {
  yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
}
var ctr=0;
for (let [key, value] of map) {     // get data sorted
 ctr=ctr+1;
 if(ctr==1)
 {
   first[0]=key
   first[1]=value
 }
 if(ctr==2)
 {
   second[0]=key
   second[1]=value
 }
 if(ctr==3)
 {
   third[0]=key
   third[1]=value
 }
 if(ctr==3)
 break;

}
console.log("we are avengers")
console.log([...map]); 
  return [first,second,third]

}



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})