 GNU nano 7.2                   ecosystem.config.js
module.exports = {
apps:[{
  name: "63-server",
  script:"./app.js",
    env : {
      NODE_ENV: "production",
      PORT: 80,
      DATABASE_URL: "postgresql://postgres.owvulpavltevffzqwcoh:4oLnGMk6r89Xq4gS@>
      JWT_SECRET: "hayolo",
      GOOGLE_CLIENT_ID: ""
    }
  }]
}



