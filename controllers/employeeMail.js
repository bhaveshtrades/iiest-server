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
              subject: "Welcome to IIEST Federation - Your Employee Information", 
              html: `<p>Welcome to IIEST Federation! We are excited to have you on board. Below, you will find important details regarding your employee account:</p>
              <p><strong>Employee ID:</strong> ${empId}</p>
              <p><strong>Username:</strong> ${username}</p>
              <p><strong>Password:</strong> ${password}</p>
              <p>We look forward to your contributions to the company.</p>
              <p>Best regards,<br>
              [Your Name]<br>
              [Your Position]<br>
              [Company Name]<br>
              [Contact Information]</p>`
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