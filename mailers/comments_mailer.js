const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method

exports.newComment = (comment) => {
    console.log('inside newComment mailer');
    nodeMailer.transporter.sendMail({
        from:'samarthbhardwaj2003@gmail.com',
        to:comment.user.email,
        subject:"new comment added",
        html:<h1>Yup your coment is puslished</h1>
    },(err,info)=>{
        if(err){
            console.log('Error in sending email',err);
            return;
        }
        console.log('Message sent',info);
        return ;
    });
}