
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io') (http);
const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';
var Lang = []; 
//var re = [];
var ele1, ele2;

app.get('/',(req,res)=>{
// res.end("codeMobiles");
 res.sendFile(__dirname+ '/index.html')
})
//ดึงค่ามาจาก db
setInterval(()=> {
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("dataset").find({}).toArray(function(err, result) {
    if (err) throw err;

    ele1 = Object.keys(result).length;//หาจำนวน element ใน db

    ele2 = Object.keys(Lang).length;// ตรวจสอบความยาวของข้อมูลที่ดึงจาก result

    //re = result;
    Lang =[];
    //ดึงข้อมูลที่เป็น object
    for(var i=0; i<Object.keys(result).length; i++) {
      Lang.push( String(result[i].name) ); 
    }

     db.close();
    });
  });
}, 1000);  


 //  ส่งค่าไปที่html      
http.listen(3000,function() {
    console.log('listening on *:3000');
    setInterval(()=> {

      console.log( ele1, ele2 );
      
      if(ele1 != ele2) {
        io.emit('message', Lang);

        // console.log( re[Object.keys(re).length -1].name );
      }

    }, 1000);
});