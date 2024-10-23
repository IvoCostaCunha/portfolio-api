const projects = require("./projects")
const users = require("./users")
const data = require("./data")
const pages = require("./pages")
const auth = require("./auth")


module.exports = (app) => {
    data(app),
    projects(app),
    users(app),
    pages(app),
    auth(app)
}