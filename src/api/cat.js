const { getAllpersons, getPersonByID, insertPerson } = require("../datasource/mysql")
const { sendJSON } = require("../utilities")

module.exports = {
    "GET": {
        handler: function(req, res, param) {
            if(param){
            getAllpersons(data => {
                sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param: "No param", data});
            })
            return;
            }
            param = param.replace("/","");
            getPersonByID(param, data => {
                if(data.length){
                    sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param, data});
                    return;
                }
                sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param, data: "No data"}, 404);
            })
        }
    },
    "POST": {
        handler: function(req, res, param) {
            if(param) {
                sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param}, 405);
                return;
            }
            getData(req)
                .then(input => {
                    insertPerson(input, data => {
                        sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", input, data});

                    })
                })
        }
    },
    "PUT": {
        handler: function(req, res, param) {
            if(!param) {
                sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", error: "Parameter required"}, 400);
                return;
            }
            getData(req)
                .then( input => {
                    updatePerson(param, input, data => {

                        sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param, data});
                    })
                })
        }
    },
    "DELETE": {
        handler: function(req, res, param) {
            if(!param) {
                sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", error: "Parameter required"}, 400);
                return;
            }            
            sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param});
        }
    }
}