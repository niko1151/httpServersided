const cnf = require("./config/serverconfig.json");
const http = require("http");

//const listener = function(req, res) {
    //console.log(req);
    //console.log(req.url);
    //console.log(req.method, req.url);
    //const url = new URL(req.url, "http://localhost:3003");
    //const url = new URL(req.url, cnf.host + ":" + cnf.port);
    //console.log(req.method, url);
    //res.end("hej....");
//}

const controller = require("./controller");

//const server = http.createServer(listener);
http.createServer(controller).listen(cnf.port);

//server.listen(3003);
//server.listen(cnf.port);
//console.log("Servern er startet. Gå til http://localhost:3003");
console.log("Servern er startet. Gå til " + cnf.host + ":" + cnf.port);