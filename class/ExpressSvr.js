var express = require('express')
var http = require('http');

export default class ExpressSvr {
        constructor() {
            this._app = express();
        };
        get(route,cb) {
            return this._app.get(route,cb);
        };
        start(port) {
        	http.createServer(this._app).listen(port,()=>console.log('run @'+port))
            //this._app.listen(port,()=>console.log('run @'+port))
        };
}
