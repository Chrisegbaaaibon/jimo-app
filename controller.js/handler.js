const  user = require('../database/schema');
const mailer = require('nodemailer');

exports.requestBrochure=async (req, res)=>{
   // processes start here ---
   try {
      // Mailing pass---
      const smtpProtocol = mailer.createTransport({
         service: "Gmail",
           auth: {
              user: "christopheregbaaibon@gmail.com",
              pass: process.env.PASS
           }
        });
     

        const name = req.body.name;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const requestBrochure = req.body.requestBrochure
        const application =req.body.application;
        const reqB = new user({ name, email, phoneNumber, requestBrochure, application })
      if(!name, !email, !phoneNumber){
         res.status(400).json({
            message: "You shall not pass!🙂"
         });
      }else{
         const checkIfEmailExists = await user.find({email : email}).limit();
         if(checkIfEmailExists.length == 0){
            if(requestBrochure === true){
               if(application === true){
                  // send both
               let mailOption = {
                  from: 'christopheregbaaibon@gmail.com',
                  to: email,
                  subject: 'Seasons greetings',
                  html: "I'm testing the API for sending mail <br> Send me a text when you see this mail!😇"
                };
                
                smtpProtocol.sendMail(mailOption, (err, response)=>{
                  if(err){
                     console.log(err)
                   }else{
                      console.log('Message sent ' );
                   }
             reqB.save();
            console.log('saved!')   
            res.json({
               data: reqB
            })
         })            
                 }else{
                    // send brochure only
                    let BMailOption = {
                     from: 'christopheregbaaibon@gmail.com',
                     to: email,
                     subject: 'Seasons greetings',
                     html: "I'm testing the API for sending mail <br> Send me a text when you see this mail!😇<br> Brochure file"
                    };

                    smtpProtocol.sendMail(BMailOption, (err, response)=>{
                       if(err){
                          console.log(err)
                       }else{
                          console.log('message sent B')
                       }
                    })
                 }
                 reqB.save()
                 console.log("save B")
                 res.json({
                    data: reqB
                 })
              }else{
                 if(user.application == true){
                    // send application only
                    let CMailOption = {
                     from: 'christopheregbaaibon@gmail.com',
                     to: email,
                     subject: 'Seasons greetings',
                     html: "I'm testing the API for sending mail <br> Send me a text when you see this mail!😇<br> Application file"
                    };
                    smtpProtocol.sendMail(CMailOption, (err, response)=>{
                     if(err){
                        console.log(err)
                     }else{
                        console.log('message sent c')
                     }
                  })
                  reqB.save();
                  console.log('Save C');
                  res.json({
                     data: reqB
                  })

                 }else{
                    // Successfully subscribed 🙂🙂
                    let DMailOption = {
                     from: 'christopheregbaaibon@gmail.com',
                     to: email,
                     subject: 'Seasons greetings',
                     html: "I'm testing the API for sending mail <br> Send me a text when you see this mail!😇<br> Successfully subscribe"
                    }
                    smtpProtocol.sendMail(DMailOption, (err, response)=>{
                     if(err){
                        console.log(err)
                     }else{
                        console.log('message sent D')
                     }
                  })
                  reqB.save();
                  console.log('Save D');
                  res.json({
                     data: reqB
                  })
                 }
              }
         }else{
            res.json({
               message: "Email already submitted!"
            })
         }
   }
   } catch (error) {
      console.log(error)
   }
}


exports.getUsers = (req, res)=>{
   user.find((err, users)=>{
      if(err){
         console.log(err)
         res.json({
            statusCode : "500",
            message: "Error while retieving users!"
         });
      }else{
         res.json({users})
      }
   })
}
