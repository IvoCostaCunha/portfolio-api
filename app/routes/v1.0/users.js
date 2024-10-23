// * This file contains users data requests and posts * //
const fs = require("fs").promises
const { constants } = require("buffer")

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

// Get the data of a single user by id
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

module.exports = (app) => {

  app.get("/api/v1.0/users", async (req, res) => {
    const fullData = await getUsersData()
    let data = []
    for(let i in fullData) {
      let item = {id: fullData[i].id, email: fullData[i].email}
      data.push(item)
    }

    if (data != 500) {
      res.status(200).send(data)
    }
    else {
      res.status(500).send()
    }
  })

  app.get("/api/v1.0/user/:id", async (req, res) => {
    const fullData = await getUserData(req.params.id)
    let data = {id: fullData.id, email: fullData.email}
    if (fullData != 500 && fullData != 404) {
      res.status(200).send(data)
    }
    else {
      res.status(500).send()
    }
  })
}