const express = require('express');
const app = express();
const Email = require('./models/email');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const mailer = require('nodemailer');
const mail = require('./helper/email');

mongoose
  .connect('mongodb+srv://creator:nnNN@@22@cluster0.bkrcv.mongodb.net/emails', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected');
  })
  .catch((err) => {
    console.log('not connected');
  });

  var transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
      user: 'mailermoral@gmail.com',
      pass: 'Mailermoral@123',
    },
  });

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/../public')));
app.use(express.static('public'));

app.get('/' ,(req,res) => {
    res.render('subscribe',{});
});

app.post('/' , async (req,res) => {
    let userIinfo = new Email({
        email: req.body.email,
    });
    await userIinfo.save()
    .then((doc) => {
        console.log(doc);
        res.render('thankyou',{});
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/emails' ,async (req,res) => {
  await Email.find()
  .then((doc) => {
    console.log("emails",doc);
  })
})

app.post('/unsubscribe/:id', async (req,res) => {
  await Email.findOneAndDelete({email: req.params.id})
  .then((doc) => {
    res.render('sorry' ,{});
    console.log("deleting",doc );
  })
})

app.get('/unsubscribe' ,async (req, res) => {
  res.render('unsubscribe',{});
})

app.get('/send-mail' ,async (req, res) => {
  var mailOptions = {
  from: 'mailermoral@gmail.com',
  to: 'nlokhande5923@gmail.com',
  subject: 'Introduction with Rich dad Poor dad',
  html: mail.mail,
};

 await transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

})

// const sendMail = async (email) => {
//   console.log(email);
//   var mailOptions = {
//     from: 'mailermoral@gmail.com',
//     to: 'nlok5923@gmail.com',
//     bcc: email,
//     subject: 'Introduction with Rich dad Poor dad',
//     html: mail.mail,
//   };
  
//   return new Promise((resolve,reject) => {
//       transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         resolve(info);
//         console.log('Email sent: to'+ email + info.response);
//       }
//     });
//   });
// }



app.get('/rollout', async (req,res) => {
  
  // const maillist = ['mailermoral@gmail.com', 'nlokhande5923@gmail.com'];
  var maillist = ['khatrivatsal8@gmail.com'];
  // await Email.find()
  // .then(async (doc) => {
  //   doc.map((user) => {
  //     maillist.push(user.email);
  //   })
  // })
  console.log(maillist);
  // await sendMail(mailList);
  maillist.forEach(function (to, i , array) {

    var msg = {
      from: 'mailermoral@gmail.com',
      subject: 'Summary chapter-1 Rich Dad Poor Dad',
      html: mail.mail,
    };

    msg.to = to;

    transporter.sendMail(msg, function (err) {
      if (err) { 
        console.log('Sending to ' + to + ' failed: ' + err);
        return;
      } else { 
        console.log('Sent to ' + to);
      }
  
      if (i === maillist.length - 1) { msg.transport.close(); }
    });
  });
  


})

app.get('/test' ,(req, res) => {
  res.render('email',{});
})

// var transporter = mailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   service: 'gmail',
//   auth: {
//     user: 'mailermoral@gmail.com',
//     pass: 'Mailermoral@123',
//   },
// });

// var mailOptions = {
//   from: 'techar.service@gmail.com',
//   to: req.body.Insemail,
//   subject: 'Your lecture is live',
//   html: emailData,
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

app.listen(port, () => {
 console.log("listneing");   
})
