var
  express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  morgan = require('morgan')

var MENSAJE = process.env.MENSAJE
console.log(MENSAJE)

var PORT = process.env.PORT || 3300

var DB_URL = 'mongodb://localhost/donate_a_ride_app'

mongoose.connect(DB_URL)

var Dar = mongoose.model('Donate_a_ride', {
  carrier: String,
  cash: Number
})

var app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/donate', function(req, res){
  var donation = new Dar(req.body)
  console.log("new donation collected")
  donation.save(function (err, donation_detail){
    if (err){
      throw err ("something went wrong w the new donation")
    } else {
      res.sendFile(__dirname + '/public/thank_you.html')
    }
  })
})

app.listen(PORT, function(){
  console.log("Server is running on port", PORT + '!!!!!!!!!!!!!')
})
