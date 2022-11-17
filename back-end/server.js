const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});


const eventSchema = new mongoose.Schema({
  text: String,
  start: String,
  end: String,
});

eventSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
eventSchema.set('toJSON', {
  virtuals: true
});

const Event = mongoose.model('Event', eventSchema);

app.get('/api/events', async (req, res) => {
  try {
    let events = await Event.find();
    res.send({events: events});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/events', async (req, res) => {
    const event = new Event({
    text: req.body.text,
    start: req.body.start,
    end: req.body.end
    
  });
  try {
    await event.save();
    res.send({event:event});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});




/*app.post('/api/events/:id/:text/:start', (req, res) => {
  console.log("In cart post");
  let id = req.params.id;
  let text = req.params.text;
  let start = req.params.start;
  const foundItem = Event.find(event => event.id == id);
  if(foundItem) {
      res.send(foundItem);
  }else{
    let event = {
    id: id,
    text: text,
    start: start,
    
  };
    Event.push(event);
    res.send(event);
  }
 
});*/

/*app.put('/api/cart/:id/:quantity', (req, res) =>{
    console.log("in cart put");
    id = req.params.id
    quantity = req.params.quantity
    const foundItem = cart.find(item => item.id == id);
    const newQuantity = quantity;
    if (foundItem){
        if(newQuantity == 0){
            
        }else{
          foundItem.quantity = newQuantity;
          res.send(foundItem);
        }
    }else if(!foundItem){
      res.status(404)
        .send("Sorry, that product doesn't exist");
      return;
    }
    cart.push(item);
    res.send(item);
    
    
});*/

/*app.get('/api/products', (req, res) => {
  console.log("In get");
  res.send(products);
});

app.post('/api/products', (req, res) => {
  console.log("In post");
  id = id + 1;
  let product = {
    id: id,
    name: req.body.name,
    price: req.body.price
  };
  products.push(product);
  res.send(product);
});

app.delete('/api/products/:id', (req, res) => {
  console.log("In delete");
  let id = parseInt(req.params.id);
  let removeIndex = products.map(product => {
      return product.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that product doesn't exist");
    return;
  }
  products.splice(removeIndex, 1);
  res.sendStatus(200);
});





const event = new mongoose.Schema({
  date: [String],
  time: [String],
  description: [String],
});

userName.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
  
userName.set('toJSON', {
  virtuals: true
});

const Username = mongoose.model('Username', userName);

app.get('/api/usernames', async (req, res) => {
  try {
    let username = await Username.find();
    res.send({username: username});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/usernames', async (req, res) => {
    const username = new Username({
    date: req.body.data,
    time: req.body.time,
    description: req.boy.des
  });
  try {
    await ticket.save();
    res.send({ticket:ticket});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
*/

app.listen(3000, () => console.log('Server listening on port 3000!'));