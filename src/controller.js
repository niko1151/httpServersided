const cnf = require("./config/serverconfig.json");
const {sendTXT, sendJSON, sendFile, redirect, logger, streamfile} = require("./utilities.js");
const api = {
    "cat": require("./api/cat"),
    "duck": require("./api/duck"),
    "person": require("./api/person")
};

module.exports = function(req, res) {
    logger(req, res);
    const url = new URL(req.url, cnf.host + ":" + cnf.port);

    const endpoint = url.pathname;
    if(endpoint === "/") {
        redirect(res, "http://localhost:3003/html/index.html");
        return;
    }
    let regex = /^\/(html|css|js|img)\/[\w-]+\.(html|css|js|jpe?g|png|gif|bmp|svg|tiff)$/i;
    //console.log(req.method, url);
    //res.end("hej....");
    let regexRes = endpoint.match(regex);
    //console.log(regexRes);


    if(regexRes){
       // sendJSON(req, res, regexRes);
       sendFile(req, res, cnf.docroot + regexRes[0]);
        return;
    }

    regex = /^\/api\/(?<route>\w+)(?<param>\/\d+)?$/;

    regexRes = endpoint.match(regex);
    console.log(regexRes);
    if(regexRes) {
        //Hvis jeg er her er mønsteret OK
        if(api[regexRes.groups.route]) {
            //Hvis jeg er her findes en route
            if(api[regexRes.groups.route][req.method]) {
                //Hvis jeg er her så er der en handler til http methoden
                api[regexRes.groups.route][req.method].handler(req, res, regexRes.groups.param);
                return;
            }
            sendJSON(req, res, {msg: `Method ${req.method} not allowed here+`}, 405);
            return;
        }
    }

    //Hvis jeg er her er der ikke fundet et regex match!!!
    sendJSON(req, res, {msg: "Regex match ikke fundet", endpoint: endpoint}, 404);
    //sendTXT(req, res, "Hilsen fra servern");
}