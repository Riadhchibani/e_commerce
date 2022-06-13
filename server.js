let express  = require('express');

let app = express();

app.use(express.static(__dirname+'/docs'));


app.get('/*',(req,res)=> {
  res.sendFile(__dirname+'/docs/index.html');
});

app.listen(process.env.PORT || 8080)
