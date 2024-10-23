// * This file contains website data requests and posts * //
const { constants } = require("buffer")
const fs = require("fs").promises

const getData = async () => {
  try {
    fs.access("app/data/data.json", constants.W_OK | constants.R_OK)
    const data = await fs.readFile('app/data/data.json', "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
    return 500
  }
}

module.exports = (app) => {

  app.get("/api/v1.0/website-data", async (req, res) => {
    const data = await getData()
    if (data != 500) {
      res.status(200).send(data)
    }
    else {
      res.status(500).send()
    }
  })

  app.post("/api/v1.0/modify"), async (req, res) => {
    if(req.session.user) {
      console.log(req.body.data)
      res.status(200).send("OK Signed in")
    }
    else {
      res.status(401).send()
    }
  }

}