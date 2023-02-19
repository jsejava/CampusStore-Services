const { expressjwt: jwt } = require("express-jwt");
const expressJwt = require("express-jwt");

const secret = process.env.secret;
const api = process.env.API_URL;

const jwtAuth = jwt({
  secret,
  algorithms: ["HS256"],
  //isRevoked: isRevoked,
}).unless({
  path: [
    { url: /\/public\/uploads(.*)/, method: ["GET", "OPTIONS"] },
    { url: /\/api\/v1\/products(.*)/, method: ["GET", "OPTIONS"] },
    { url: /\/api\/v1\/categories(.*)/, method: ["GET", "OPTIONS"] },
    `${api}/users/login`,
    `${api}/users/register`,
  ],
});

async function isRevoked(req, playload, done) {
  if (!playload.isAdmin) {
    await done(null, true);
  }
  await done();
}

module.exports = jwtAuth;

// express-jwt isRevoked option
