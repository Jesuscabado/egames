import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { config } from "dotenv";
config();
console.log(process.env.GOOGLE_CLIENT_ID);

const emails = ["emaildeprueba123@gmail.com"];

passport.use(
  "auth-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://api.hyruleshop.jesuscabado.com/api/auth/google",
    },

    function (accessToken, refreshToken, profile, done) {
      const response = emails.includes(profile.emails[0].value);

      if (response) {
        done(null, profile);
      } else {
        emails.push(profile.emails[0].value);
        done(null, profile);
      }
    }
  )
);

export default passport;
