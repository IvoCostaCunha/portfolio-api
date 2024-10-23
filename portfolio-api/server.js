const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const path = require('path')
const cors = require('cors');
const logs = require('./app/utils/logs.js')
const session = require('express-session')
const {expressjwt: jwt} = require('express-jwt')

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require("./app/doc/swagger.json");

const port = process.env.PORT || 8080
const app = express()

const log = function (req, res, next) {
    const time = new Date().toUTCString()
    console.log("\n" + req.method + " request:")
    console.log("By: " + req.ip)
    console.log("To: " + req.url)
    console.log("At: " + time)

    let loggedEndpoints = [ 
        "/api/v1.0/sign-in", 
        "/api/v1.0/users", 
        "/api/v1.0/user/{id}"
    ]

    for(let i in loggedEndpoints) {
        if(req.url === loggedEndpoints[i]) {
            console.log("Authetification tentative logged.")
            reqLog(req, time)
        }
    }

    next()
}

// Cors options
const whitelist = [ process.env.HOSTDEV, process.env.HOSTLIVE ]

const corsOptions = {
    origin: (origin, callback) => {

        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// app.use(cors(corsOptions))
app.use( session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))
// app.use("/api/v1.0/", jwt({ secret: "pass", algorithms: ["HS256"] }));
app.use(bodyParser.json()) 
// app.use(log)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


// API routes
require("./app/routes/v1.0")(app)

app.listen(port, () => {  
    console.log('Server online on port: ' + port);
})