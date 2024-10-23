const { constants } = require("buffer")
const { timeLog } = require("console")

const fs = require("fs").promises

reqLog = async (req, time) => {
    const method = req.method
    const url = req.url
    const ip = req.ip
    const date = time

    try {
        await fs.access("app/data/logs.json", constants.R_OK | constants.W_OK)

        logData = JSON.parse(await fs.readFile("app/data/logs.json"))
        logData[logData.length] = { method: method, url: url, ip: ip, utc: date }
        const newEntry = JSON.stringify(logData)

        await fs.writeFile("app/data/logs.json", newEntry)
    } catch (error) {
        console.error(error)
    }

}

module.exports = {
    reqLog
}
