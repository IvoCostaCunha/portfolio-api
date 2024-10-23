// * This file contains backend display pages requests and posts * //
let html = `
<div>
    <h1> API backend for portfolio-app </h1>
    <p> See <a href="/api-docs"> API documentation</a> for this API endpoints. </p>
</div>
`

module.exports = (app) => {
    // Presentation page
    app.get("/", async (req, res) => {
        res.status(200).send(html)
     })
}