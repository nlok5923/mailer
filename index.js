const express = require('express');
const app = express();
const Email = require('./models/email');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
 console.log("listneing");   
})
