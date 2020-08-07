// 1.Part : Requirement & MongoDB Atlas URL

	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	mongoAtlas='mongodb+srv://alper:Q1w2e3r4@myfirstclustor.r7mci.mongodb.net/MyFirstClustor?retryWrites=true&w=majority';

// 2.Part : Database Connection:

mongoose.connect(
	mongoAtlas,{
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
		useUnifiedTopology: true
	}
)
.then(()=>console.log('MongoDB Connected!'))
.catch(err=> console.log(err));

// 3.Part: Schema Creation:

var userSchema = new Schema({
	unique_id : Number,
	email: String,
	username : String,
	password : String,
	passwordConf : String
}),

User = mongoose.model('newfbw10',userSchema );

module.exports = User;