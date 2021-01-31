const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

//requerir passport
const passportConfig = require("./passport");
const passport = require('passport');
const session = require("express-session");

//secret: esto es porque la sesión se guarda encriptada. 
//Si se lleva a un ambiente productivo tiene que estar en una variable de entorno
const sessionMiddleware = session({
  name: "auth-test",
  secret: "s3cr3t_k3y",
  saveUninitialized: false,
  resave: false
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//esto va arriba del passport.initialize()
app.use(sessionMiddleware);
//esto para inicializar passport. Va antes de las rutas.
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
