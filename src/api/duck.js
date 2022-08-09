const { sendJSON } = require("../utilities")

module.exports = {
    GET: {
        handler: function(req, res, param) {
            sendJSON(req, res, {route: "/api/duck", method: req.method, says: "Quack", param})

        }
    },
    POST: {
        handler: function(req, res, param) {
            sendJSON(req, res, {route: "/api/duck", method: req.method, says: "Quack", param})

        }
    },
    PUT: {
        handler: function(req, res, param) {
            sendJSON(req, res, {route: "/api/duck", method: req.method, says: "Quack", param})

        }
    },
    DELETE: {
        handler: function(req, res, param) {
            sendJSON(req, res, {route: "/api/duck", method: req.method, says: "Quack", param})

        }
    } 
}