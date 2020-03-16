require('dotenv').config();
const express = require('express');
const massive = require('massive');
const { json } = require('body-parser');
const cors = require('cors');
 const path = require("path");
const session = require('express-session');
const passport = require('passport');
const { getUser, strat, logout } = require(`${__dirname}/controllers/authCtrl/authCtrl`);

const app = express();
 app.use(express.static(__dirname+ '/../build'))
const port = process.env.port || 3001;
const routes = require('./routes/routes');
app.use(cors());
app.use(json());

massive(process.env.CONNECTION_STRING).then((dbinstance) => {
	app.set('db', dbinstance);
});

//brings sessions
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);

//functions for passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

// What properties do we want our user to have on session?
passport.serializeUser((profile, done) => {
	//const db = app.get('db');
	db.getUserByAuthid(profile.id).then((user) => {
		// console.log(profile.name);
		if (!user[0]) {
			db
				.addUserByAuthid(profile.id, profile.picture, profile.displayName)
				.then((response) => {
					return done(null, response[0]);
				})
				.catch((err) => console.log(err));
		} else {
			return done(null, user[0]);
		}
	});
});

// Put user on req.session
passport.deserializeUser((user, done) => {
	done(null, user);
});

app.get(
	'/login',
	passport.authenticate('auth0', {
		successRedirect: 'http://localhost:3000/',
		failureRedirect: 'http://localhost:3000/#/'
	})
);

app.use((req, res, next) => {
	if (!req.session.cart) req.session.cart = [];
	next();
});
app.get('/me', getUser);
app.get('/logout', logout);
routes(app);
 app.get("*", (req, res) => {
     res.sendFile(path.join(__dirname, ">./build/index.html"));
   });
app.listen(port, () => {
	console.log(`app is listening port ${port}`);
});
