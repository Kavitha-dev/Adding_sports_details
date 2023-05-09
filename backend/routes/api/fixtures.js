const express = require('express');
const router = express.Router();

//Fixture model
const Fixture = require('../../models/Fixture');

//const { default: Fixtures } = require('../../../frontend/src/components/Fixtures');
// const { default: Fixtures } = require('../../../frontend/src/components/Fixtures');

// @route GET api/fixtures
//@description get All fixtures
//@access Public 
router.get('/',(req,res)=>{
      Fixture.find()
      // .sort({date:-1})
      .then(fixtures=>res.json(fixtures))  
});



// @route POST api/fixtures
//@description create an fixture
//@access Public 

router.post('/',(req,res)=>{
    const {gameName,homeTeam,awayTeam,date,time,place}= req.body;
    if(!gameName || !homeTeam || !awayTeam || !date || !time || !place){
        return res.status(400).json({msg:'Please enter all fields'});
    }
    const newFixture = new Fixture({
        gameName,
        homeTeam,
        awayTeam,
        date,
        time,
        place
    });
    newFixture.save()
    .then(fixture=>
        res.json({
        fixture:{
            // id:fixture.id,
            gameName: fixture.gameName,
            homeTeam: fixture.homeTeam,
            awayTeam: fixture.awayTeam,
            date: fixture.date,
            time: fixture.time,
            place: fixture.place
        }
    }));
    
});

// @route DELETE api/fixtures/:id
//@description delete an fixture
//@access Public 
// @route DELETE api/fixtures/:id
//@description delete an fixture
//@access Public 
router.delete('/:id',(req,res)=>{

  try{
  const fixture= Fixture.findById(req.params.id)
      if(!fixture) throw Error('No fixture found');
      const removed = fixture.remove();
      if (!removed)
        throw Error('Something went wrong while trying to delete the fixture');
  
      res.status(200).json({ success: true });
   
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
});

// @route PUT api/fixtures/:id
//@description update an fixture
//@access Public 

router.put('/:id',(req,res)=>{
   var updatedRecord = {
    gameName: req.body.gameName,
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    date: req.body.date,
    time: req.body.time,
    place: req.body.place
   }
   Fixture.findByIdAndUpdate(req.params.id, {$set:updatedRecord},{new:true},(err,fixture)=>{
     if(!err) res.send(fixture)
     else console.log('Error while updating a record :'+JSON.stringify(err,undefined,2))
   })
});

module.exports = router;



