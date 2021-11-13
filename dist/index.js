"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const URLController_1 = require("./controller/URLController");
const MongoConnection_1 = require("./database/MongoConnection");
const api = express_1.default();
const allowedOrigins = ['*'];
const options = {
    origin: allowedOrigins,
    methods: ['GET, POST']
};
api.use(cors_1.default(options));
api.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
api.use(express_1.default.json());
const database = new MongoConnection_1.MongoConnection();
database.connect();
const urlController = new URLController_1.URLController();
api.post('/shorten', urlController.shorten);
api.get('/:hash', urlController.redirect);
api.listen(5000, () => console.log('Express listening'));
//# sourceMappingURL=index.js.map