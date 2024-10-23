// * This file contains project data requests and posts * //
const fs = require("fs").promises
const { constants } = require("buffer")

const getProjectsData = async () => {
  try {
    await fs.access("app/data/projects.json", constants.R_OK | constants.W_OK)
    const data = await fs.readFile('app/data/projects.json', "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
    return 500
  }
}

const getProjectData = async (name) => {
  try {
    await fs.access("app/data/projects.json", constants.R_OK | constants.W_OK)
    let data = await fs.readFile('app/data/projects.json', "utf-8")
    data = JSON.parse(data)
    for (let i in data) {
      if (data[i]["name"] === name) {
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

  app.get("/api/v1.0/projects", async (req, res, next) => {
    const data = await getProjectsData()
    if (data != 500) {
      res.status(200).send(data)
    }
    else {
      res.status(500).send()
    }
  })

  app.get("/api/v1.0/project/:name", async (req, res) => {
    const data = await getProjectData(req.params.name)
    if (data != 500 && data != 404) {
      res.status(200).send(data)
    }
    else {
      res.status(500).send()
    }
  })
}