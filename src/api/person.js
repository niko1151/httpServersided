const { getAllpersons, getPersonByID, insertPerson, deletePerson, updatePerson } = require("../datasource/mysql")
const { sendJSON, getData } = require("../utilities")

module.exports = {
    "GET": {
        handler: function(req, res, param) {
            if(!param){
            getAllpersons(data => {
                sendJSON(req, res, {route: "/api/person", method: req.method, says: "Hej", param: "No param", data});
            })
            return;
            }
            param = param.replace('/',' ');
            getPersonByID(param, data => {
                if(data.length){
                    sendJSON(req, res, {route: "/api/person", method: req.method, says: "Hej", param, data});
                    return;
                }
                sendJSON(req, res, {route: "/api/person", method: req.method, says: "Hej", param, data: "No data on get by id"}, 404);
            })
        }
    },
    "POST": {
        handler: function(req, res, param) {
            if(param) {
                sendJSON(req, res, {route: "/api/person", method: req.method, says: "Hej", param, error: "No param required"}, 405);
                return;
            }
            getData(req)
            .then(input => {
                insertPerson(input, data => {
                    sendJSON(req, res, {route: "/api/person", method: req.method, says: "Hej", input, data});
                })
            })
        }
    },
    "PUT": {
        handler: function(req, res, param) {
            if(!param) {
                sendJSON(req, res, {route: "/api/person", method: req.method, says: "Hej", error: "Parameter required in put"}, 400);
                return;
            }
            getData(req)
            .then( input => {
                param = param.replace('/',' ');
                updatePerson(param, input, data => {
                    sendJSON(req, res, {route: "/api/person", method: req.method, says: "Hej", param, input, data});
                })
            })
        }
    },
    "DELETE": {
        handler: function(req, res, param) {
            if(param) {
                param = param.replace('/',' ');
                deletePerson(param, data => {
                    sendJSON(req, res, {route: "/api/person", method: req.method, says: "Hej", param, data});
                })
                return;
            }            
            sendJSON(req, res, {route: "/api/person", method: req.method, says: "Hej", param, data: "No data on delete"}, 404);
        }
    }
}