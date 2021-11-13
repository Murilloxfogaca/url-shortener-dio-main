import express from 'express'
import cors from 'cors'
import { URLController } from './controller/URLController'
import { MongoConnection } from './database/MongoConnection'

const api = express()

const allowedOrigins = ['*'];
// Habilita o Cors para a porta 3000
const options: cors.CorsOptions = {
  origin: allowedOrigins, 
  methods: ['GET, POST']
};

api.use(cors(options));

api.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

api.use(express.json())


const database = new MongoConnection()
database.connect()

const urlController = new URLController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)

api.listen(5000, () => console.log('Express listening'))
