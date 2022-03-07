const app = require('express').Router();
const path = require('path');
const {enableAuth} = require('../config');
const {config} = require('../../config');
const cors = require('cors');
var fs = require('fs');
const jsonServer = require('json-server');
const router = jsonServer.router(path.join(__dirname, '..', 'db.json'));

// CORS Additions
app.use(cors({origin: 'http://localhost:2000',methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(require('body-parser').json());

app.use('/auth/v1', require('./auth'));

// Swagger Init - Not going to setup it but I know this is a good practice.
const expressSwagger = require('express-swagger-generator')(app);
expressSwagger({
	swaggerDefinition: {
   	info: {
   		title: config.SWAGGER_TITLE,
   		description: config.SWAGGER_DESCRIPTION,
   		version: config.SWAGGER_VERSION,
   	},
    	host: config.SWAGGER_API_HOST,
    	consumes: [
   		"application/json"
    	],
    	produces: [
   		"application/json"
    	],
    	schemes: ['https', 'http'],
    	securityDefinitions: {
			JWT: {
				type: 'apiKey',
				scheme: 'bearer',
				in: 'header',
				name: 'Authorization',
				description: "Authentication Token for NodeJS API",
			}
   	}
	},
	basedir: __dirname, 
	files: ['../api/*.js'] //Path to the API handle folder i.e controller
});


// app.use(cors());
// app.options({
//     origin:'http://localhost:2000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }, cors());

if(enableAuth) {
  const authorize = require('./auth/authorize');
  app.get('/api/v1/cartoons(|/*)', authorize(['cartoons:all', 'cartoons:read']));
  app.post('/api/v1/cartoons(|*)', authorize(['cartoons:all', 'cartoons:add']));
  app.put('/api/v1/cartoons(|*)', authorize(['cartoons:all', 'cartoons:write']));
  app.delete('/api/v1/cartoons(|*)', authorize(['cartoons:all', 'cartoons:remove']));
  app.patch('/api/v1/cartoons(|*)', authorize(['cartoons:all', 'cartoons:write']));
  app.get('/api/v1/fruits', authorize(['fruits:read']), function(req, res){
		try{   
			const name = req.query.name; 
			if(name === "" || name === undefined || !isNaN(name)){
				res.status(200).send({
					total: 0,
					success: true,
					message : "You can get value by name query string only",
					data : null                               
				});
			}
			const {fruits} = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db.json'), 'utf8'));
			const fruit = fruits.find(item => JSON.stringify(item.name) === name);
			if(fruit === "" || fruit === undefined){
				res.status(200).send({
					total: 0,
					success: false,
					message : "Unable to find data",
					data : null                               
				});
			}        
            res.status(200).send({
                total: 1,
                success: true,
                message : "Data has been fetched, successfully",
                data : fruit                              
            });
        } catch(error){
            res.status(400).send({
                total: 0,
                success: false,
                data: null,
                message :error+" Unable to get data",
            })  
        }
	 });
}

// Routes Init
app.use('/api/v1', router);

app.use((err, req, res, next) => {
  if(err) { next(); }
  console.log('err:', err);
});

app.get('/test',function(req, res){
	const moment = require('moment');
  var Time = moment(new Date()).format('hh:mm A');  
	res.send("Testing API Connection "+Time)
})


module.exports = app;
