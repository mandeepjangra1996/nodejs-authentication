const express = require('express');
const Router  = express.Router();
const homeSchema = require('../models/homeSchema');

Router.get('/',(err,res)=>{
    res.render('register',{title :'Fill Form',password:'',email:''})
})

Router.post('/register', async (req, res) => {
    try {
      const { name, number, email, password, cpassword } = req.body;
  
      if (password === cpassword) {
        const userData = new homeSchema({
          name,
          number,
          email,
          password
        });
  
        await userData.save(); // Save the data using async/await
  
        const useremail = await homeSchema.findOne({ email: email });
        if (email === useremail.email) {
          return res.render('register', {
            title: '',
            password: '',
            email: 'Email is already in use. Please choose a different one.'
          });
        } else {
          console.log('err');
        }
      } else {
        return res.render('register', {
          title: '',
          password: 'Password not matching',
          email: ''
        });
      }
    } catch (error) {
      return res.render('register', {
        title: 'Error in Code',
        password: '',
        email: ''
      });
    }
  });
  
// signin 

Router.post('/login', (req, res) => {
  const { email, password } = req.body;

  homeSchema.findOne({ email: email }).exec()
    .then(result => {
      if (result && email === result.email && password === result.password) {
        res.render('dashboard', { name: result.name });
      } else {
        console.log('Invalid email or password');
      }
    })
    .catch(err => {
      console.log(err);
    });
});



module.exports = Router;