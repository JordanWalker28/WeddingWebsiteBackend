express = require('express'),
router = express.Router();

// Student Model
let dietSchema = require('../models/Diet');

// CREATE Student
router.route('/create-diet').post((req, res, next) => {
  dietSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// READ Students
router.route('/').get((req, res) => {
  dietSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Student
router.route('/:username').get((req, res) => {
  dietSchema.findOne({username : req.params.username}, function(error,data){
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Student
router.route('/:username').put((req, res, next) => {
  dietSchema.findOneAndUpdate({username : req.params.username}, {
    $set: req.body
  }, {useFindAndModify: false}, (error, data) => {
    if(data === null){
      dietSchema.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
    }else{
      if (error) {
        return next(error);
      } else {
        res.json(data)
      }
    }
  })

})

module.exports = router;