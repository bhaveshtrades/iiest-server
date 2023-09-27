const nodemailer = require('nodemailer');
const mailData = JSON.parse(process.env.NODE_MAILER);

//Function to send mail to employee
function sendEmployeeInfo(username, password, empId, clientMail){
        const transport = nodemailer.createTransport({
        service:'gmail',
         auth: {
                   user: mailData.email,
                   pass: mailData.pass
              }
         });
        const mailOptions = {
              from: mailData.email, 
              to: clientMail,
              subject: "IIEST: This is your employee data. Please do not share it with anyone.", 
              html: `<h2>Username: ${username}</h2>,
                     <h2>Password: ${password}</h2>,
                     <h2>Employee ID: ${empId}</h2>`
          }
        transport.sendMail(mailOptions, function(error, response){
            if(error){
               console.error(error)
               return res.status(500).json({error});
             }else{
               console.log(response)
               return res.status(200).json({success: "Email has been sent successfully"});
             }
            })
}

module.exports = { sendEmployeeInfo }