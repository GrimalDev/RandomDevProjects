module.exports = function (passport, LocalStrategy, bcrypt, user_database) {
  /* On définit l'authentification utilisateur */

  const authenticateUser = (req, email, password, done) => {
      user_database.findOne({ email: email }, async function(err, user) {
          if (err) throw err
          if (user == null) {
              return done(null, false, req.flash('error', 'User does not exist' ))
            }
        
            try {
              if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
              } else {
                return done(null, false, req.flash('error', 'Wrong password' ))
              }
            } catch (e) {
              return done(e)
            }
      });
  }

  /* definition of the passport */

  passport.use(new LocalStrategy({
          passReqToCallback: true,
          usernameField: "email",
          passwordField: "password"
      },
      authenticateUser
  ));

  /* serialize and deserialize user */

  passport.serializeUser(function(user, done) {
      done(null, user._id);
      });
    
  passport.deserializeUser(function(_id, done) {
      user_database.findOne({ _id : _id }, function(err, user) {
          done(err, user);
      });
  });
}