require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const {DB_USER, DB_PASS, PORT, API_KEY} = process.env;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-flat-27990',
      user : DB_USER,
      password : DB_PASS,
      database : 'smartbrain'
    }
  });

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => res.send('it is working'))

app.post('/signin', (req,res)=>{(signin.handleSignin(req,res,db,bcrypt))})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req,res,db)})

app.put('/image', (req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res,API_KEY)})

app.listen(process.env.PORT||3001, () => {
    console.log(`listening on port ${process.env.PORT}`)
})


