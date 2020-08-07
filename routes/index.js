var express = require('express');
var router = express.Router();

var User = require('../models/user');

// ! Register - get : ==================================================

router.get('/', function(req, res, next){
    return res.render('index');
});


// ! Register - post : ==================================================

router.post('/', function(req,res,next){

    var personInfo = req.body;

    if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf ){ // 1st IF Start :-------------------------------

        res.send();
    } else {
       
        if ( personInfo.password == personInfo.passwordConf){ // 2nd IF Start :-------------------------------

            // As a second way, you can write "findOne" method instead of "find": 
            // or use just "find":
            User.findOne({email: personInfo.email}, function(err, data){

                if(!data){

                   /*  var uID; */

                    // As a second way, you can write "findOne" method instead of "find": 
                    // or use just "find":
                    User.findOne({},function(err,data){

                      /*   if(data){
                            uID = data.unique_id +1;
                        } else {
                            uID = 1;
                        }
 */
                        var newPerson = new User({
                          /*   unique_id: uID,  */
                            email: personInfo.email,
                            username : personInfo.username,
                            password : personInfo.password,
                            passwordConf : personInfo.passwordConf
                        });

                        newPerson.save(function(err, Person){
                            if(err)
                                console.log(err);
                            else
                                console.log('Success');
                        });
                    }).sort({_id:-1}).limit(1);

                    res.send({"Success": "You are registered, You can login now."});
                   
                } else{
                    res.send({"Success":"Email is already used."});
                }

            }); // 2nd IF End :-------------------------------
        } else {
            res.send({"Success":"Password is not matched"});
        }
    } // 1st IF End :-------------------------------
});

// ! Forget Password - get : ==================================================

router.get('/forgetpass', function(req,res,next){
    res.render('forget');
})

// ! Forget Password - post : ==================================================

router.post('/forgetpass', function(req, res, next){

    User.findOne({email:req.body.email}, function(err, data){

        if(!data){
            res.send({"Message":"This Email is not regiistered!"});
        } else {

            if(req.body.password == req.body.passwordConf){
                data.password = req.body.password;
                data.passwordConf = req.body.passwordConf;

                data.save(function(err, Person){
                    if(err)
                    console.log(err);
                    else
                    console.log("Success");
                    res.send({"Success":"Password is changed!"});
                });
            } else {
                res.send({"Message":"Password does not matched! Both password should be same!"});
            }
        }
    });
});

module.exports = router;