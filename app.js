const express = require ("express");
const https = require("https");
const bodyParser= require ("body-parser");


const app = express();

 app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function (req, res){

    res.sendFile(__dirname+ "/index.html");
    
})

app.post ("/" , function(req,res){
    

    
const query = req.body.cityName ;
    const appKey = "5bf26e1e3883d323f528328ed9510a90";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appKey +"&units="+unit;
    
    https.get ( url , function (response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp ;
            const weatherDescription = weatherData.weather[0].description ;
            const icon = weatherData.weather[0].icon;
            const imageURL =  "http://openweathermap.org/img/wn/"+ icon +"@2x.png" ;

            res.write("<p> The weather is Currently " + weatherDescription + " </p>");
            res.write ("<h1>The Temparature in "+ query  +" is  " + temp + " degree celcious.</h1>") ;
            res.write("<img src="+ imageURL + ">");


            res.send();
            

          
            
        })
    })
})





app.listen (3000, function (){
    console.log ("server running on port 3000");
})