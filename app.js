// Import necessary modules and packages
require('dotenv').config(); // Loads environment variables from a .env file for secure access to sensitive data.
const express = require("express"); // Express framework for building web applications in Node.js.
const bodyParser = require("body-parser"); // Middleware for parsing incoming request bodies, particularly form submissions.
const ejs = require("ejs"); // Templating engine for generating HTML markup with plain JavaScript.
const { Pool } = require('pg'); // PostgreSQL client for managing database connections.
const bcrypt = require('bcrypt'); // Library for hashing passwords to securely store them.
const passport = require('passport'); // Authentication middleware for handling user login sessions.
const LocalStrategy = require('passport-local').Strategy; // Strategy for handling username/password login.
const session = require('express-session'); // Middleware for managing sessions, keeping users logged in between pages.
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Strategy for authenticating with Google OAuth 2.0.

// Initialize the Express application
const app = express();

// Serve static files from the 'public' directory, such as CSS, client-side JavaScript, and images.
app.use(express.static("public"));

// Set EJS as the templating engine to dynamically render HTML templates with JavaScript logic.
app.set('view engine', 'ejs');

// Use bodyParser to parse URL-encoded bodies (as sent by HTML forms) and JSON bodies (sent by API clients).
app.use(bodyParser.urlencoded({ extended: true }));

// Establish a pool of connections to the PostgreSQL database using credentials from the .env file.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Set up bcrypt to hash passwords with a specified number of salt rounds, increasing security.
const saltRounds = 10;

// Configure the session middleware for persisting user sessions across HTTP requests.
app.use(session({
  secret: process.env.SESSION_SECRET, // A secret used to sign the session ID cookie, which is a random unique string.
  resave: false, // Don't resave sessions that haven't changed.
  saveUninitialized: false // Don't create a session until something is stored.
}));

// Initialize Passport and configure it to use sessions to keep users logged in.
app.use(passport.initialize());
app.use(passport.session());

// Implement the Google authentication strategy using Passport.
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID, // Google client ID from the Google Developer Console.
  clientSecret: process.env.CLIENT_SECRET, // Google client secret from the Google Developer Console.
  callbackURL: "http://localhost:3000/auth/google/secrets", // URL to which Google will redirect users after they authenticate.
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo" // URL from which to obtain the user profile information.
},
async (accessToken, refreshToken, profile, cb) => {
  // 'findOrCreate' functionality will be implemented here. We use 'async' because we're performing asynchronous database operations.
  const googleId = profile.id; // Unique identifier for the user provided by Google.
  try {
    // Check if the user already exists in our database.
    const existingUser = await pool.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
    if (existingUser.rows.length > 0) {
      // If the user exists, we pass them to the done callback, which will continue the login process.
      cb(null, existingUser.rows[0]);
    } else {
      // If the user does not exist, create a new user in the database with their Google ID and email.
      const newUser = await pool.query(
        'INSERT INTO users (google_id, email) VALUES ($1, $2) RETURNING *',
        [googleId, profile.emails[0].value]
      );
      // Pass the new user to the done callback.
      cb(null, newUser.rows[0]);
    }
  } catch (err) {
    // If there's an error during the database operation, we pass it to the done callback to handle it appropriately.
    cb(err);
  }
}));

// Implement the local authentication strategy using Passport.
passport.use(new LocalStrategy({
  usernameField: 'email', // Specify the name of the fields in the login form.
  passwordField: 'password'
},
  async (email, password, done) => {
    // Attempt to find the user by their email address.
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        // Verify the password against the hashed password in the database.
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return done(null, false); // Password doesn't match, authentication failed.
        return done(null, user); // Password matches, authentication successful.
      } else {
        return done(null, false); // No user with the provided email address.
      }
    } catch (err) {
      return done(err); // An error occurred during the database query.
    }
  }
));

// Serialize the user's identity into the session.
passport.serializeUser((user, done) => {
  done(null, user.id); // Save user id to the session.
});

// Deserialize the user's identity from the session.
passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      done(null, result.rows[0]); // User found, attach to req.user.
    } else {
      done(new Error('User not found')); // User not found in database.
    }
  } catch (err) {
    done(err); // Error during database operation.
  }
});

// Define routes for the web application.
app.get("/", (req, res) => {
  res.render("home"); // Render the home page.
});

// Initiate Google OAuth login.
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }) // Request access to the user's profile and email.
);

// Google OAuth callback route.
app.get("/auth/google/secrets", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    res.redirect("/secrets"); // On successful authentication, redirect to the secrets page.
  }
);

// Display the login page.
app.get("/login", (req, res) => {
  res.render("login"); // Render the login page.
});

// Process the login form.
app.post("/login", passport.authenticate('local', {
  successRedirect: '/secrets', // On successful login, redirect to the secrets page.
  failureRedirect: '/login' // On login failure, redirect back to the login page.
}), (req, res) => {
  // This function is not called due to the redirects above.
});

// Display the registration page.
app.get("/register", (req, res) => {
  res.render("register"); // Render the registration page.
});

// Process the registration form.
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body; // Get email and password from the form.
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password.
    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword] // Insert new user into the database.
    );
    req.login(newUser.rows[0], err => {
      if (err) throw err; // Handle errors during login.
      res.redirect('/secrets'); // Redirect to the secrets page after registration.
    });
  } catch (err) {
    console.error('Registration error:', err); // Log registration errors.
    res.redirect('/register'); // Redirect back to the registration page on error.
  }
});

// Route to display all secrets.
app.get("/secrets", function(req, res){
  if (req.isAuthenticated()) {
    pool.query('SELECT content FROM secrets', (error, results) => {
      if (error) {
        console.error('Error fetching secrets:', error); // Log errors fetching secrets.
        res.redirect('/'); // Redirect to the home page on error.
      } else {
        res.render("secrets", { secrets: results.rows.map(row => row.content) }); // Render the secrets page with secrets.
      }
    });
  } else {
    res.redirect("/login"); // Redirect to the login page if not authenticated.
  }
});

// Route for submitting secrets.
app.get("/submit", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("submit"); // Render the submit page for authenticated users.
  } else {
    res.redirect("/login"); // Redirect to the login page if not authenticated.
  }
});

// Route to handle secret submission.
app.post("/submit", function(req, res){
  if (req.isAuthenticated()) {
    const submittedSecret = req.body.secret; // Get the submitted secret from the form.
    pool.query('INSERT INTO secrets (content, user_id) VALUES ($1, $2)',
      [submittedSecret, req.user.id], (error) => { // Insert the secret into the database.
        if (error) {
          console.error('Error saving secret:', error); // Log errors saving the secret.
          res.redirect('/submit'); // Redirect back to the submit page on error.
        } else {
          res.redirect('/secrets'); // Redirect to the secrets page after saving the secret.
        }
    });
  } else {
    res.redirect('/login'); // Redirect to the login page if not authenticated.
  }
});

// Log the user out and end the session.
app.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) console.error('Error during logout:', err); // Log errors during logout.
    req.session.destroy(function(err) {
      if (err) console.error('Error destroying session:', err); // Log errors destroying the session.
      res.redirect('/'); // Redirect to the home page after logout.
    });
  });
});

// Start the web server on the specified port.
app.listen(3000, () => {
  console.log("Server started on port 3000. Navigate to http://localhost:3000 to access the application."); // Log the server start message.
});

