const express = require('express');
const mongoose = require('mongoose');


const app=express();
// Middleware
app.use(express.json());

// Connect to DB

mongoose.connect("mongodb://localhost/sportsclub",{ useNewUrlParser: true,useFindAndModify:false,
useCreateIndex:true,useUnifiedTopology:true})
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err));

//Use Routes
//app.use('/api/admins', require('./routes/api/admins'));
//app.use('/api/adminlogin', require('./routes/api/adminlogin'));
app.use('/api/fixtures', require('./routes/api/fixtures'));



const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server running on port ${port}`));
