const mongoose= require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const FixtureSchema = new Schema({
   gameName:{
        type:String,
        required:true
    },
    homeTeam:{
        type:String,
        required:true,     
    },
    awayTeam:{
        type:String,
        required:true,
    },
   date:{
      type:String,
      required: true
     
    },
    time: {
        type: String,
        required: true
    },
    place:{
        type: String,
        required:true
    },
 homeScore: String,
    awayScore: String,
       
    
});

module.exports = Fixture=mongoose.model('fixture',FixtureSchema);