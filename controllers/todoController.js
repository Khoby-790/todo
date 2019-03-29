const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

//local url
const lUrl = "mongodb://localhost:3000/mydb";

//url to database
// const url = "mongodb+srv://root:admin@mycluster-gjhob.mongodb.net/test?retryWrites=true";

//connect to mongoose database
// mongoose.connect("mongodb+srv://root:admin@mycluster-gjhob.mongodb.net/test?retryWrites=true",{ useNewUrlParser: true });



// MongoClient.connect(lUrl,(err,db)=>{
// 	if(err) {
// 		console.log("error nie" + JSON.stringify(err));
// 	}else{
// 	console.log("Database created");
// 	}// db.close();
// });


//create a schema
// let todoSchema = new mongoose.Schema({
// 	item: String
// });

//create a model
// let Todo = mongoose.model('Todo',todoSchema);

// let item = Todo({item:"get flowers"});

let data = [{item:"get some coffee"},{item:"read some stuff"},{item:"write some code"}];

let urlencodedParser = bodyParser.urlencoded({extended:false});

// we are exporting the todoController function from here
module.exports = function(app){

	//the get request
	app.get('/todo',function(request,response){
		response.render('index',{todos:data});
	});

	//the post request
	app.post('/todo', urlencodedParser ,function(request,response){
		data.push(request.body);
		response.json(data);
	});

	//the delete request
	app.delete('/todo/:item',function(request,response){
		data = data.filter(function(todo){
			return todo.item.replace(/ /g, '-') !== request.params.item;
		});

		response.json(data);
	});

}