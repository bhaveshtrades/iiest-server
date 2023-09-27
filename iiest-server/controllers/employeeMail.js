const nodemailer = require('nodemailer');

function sendEmployeeInfo(username, password, empId, clientMail){
        const transport = nodemailer.createTransport({
        service:'gmail',
         auth: {
                   user: 'bdaipuria@gmail.com',
                   pass: 'xsqujfnsquekoejd'
              }
         });
        const mailOptions = {
              from: 'bdaipuria@gmail.com', 
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