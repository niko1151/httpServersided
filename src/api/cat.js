const { sendJSON } = require("../utilities")

module.exports = {
    GET: {
        handler: function(req, res) {
            sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw"})

        }
    } 
}