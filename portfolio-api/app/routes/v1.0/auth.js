// * This file contains users data requests and posts * //
const users = require("./users")
const logs = require("../../utils/logs")

const fs = require("fs").promises
const { constants } = require("buffer")

const getUserData = async (id) => {
  try {
    await fs.access("app/data/users.json", constants.R_OK | constants.W_OK)
    let data = await fs.readFile('app/data/users.json', "utf-8")
    data = JSON.parse(data)
    for (let i in data) {
      if (data[i]["id"] === id) {
        return data[i]
      }
    }
    return 404
  } catch (error) {
    console.error(error)
    return 500
  }
}

const getUsersData = async () => {
  try {
    await fs.access("app/data/users.json", constants.R_OK | constants.W_OK)
    const data = await fs.readFile('app/data/users.json', "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
    return 500
  }
}

module.exports = (app) => {

  app.post("/api/v1.0/sign-in", async (req, res) => { 
    let users = await getUsersData()
    for(let i in users) {
      if(users[i].email === req.body.email) {
        if(users[i].hashedPassword === req.body.password) {
          req.session.user = users[i].id
          res.status(200).send()
        }
      }
    }
    res.status(401).send()
  })

}