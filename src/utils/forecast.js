const request = require('postman-request')

const forecast = (lattitude,longitude,callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=86a54f0a2a14e74b23945508efa13456&query='+ lattitude +','+ longitude

request({url, json: true}, (error,{body})=>{
    if(error){
        callback('Unable to connect to weather services!', undefined)
    }else if(body.error){
        callback('Unable to find location', undefined)
    }else{
        callback(undefined, {
        Weather:'It is currenty '+ body.current.temperature +' degree out. But it feels like '+body.current.feelslike+' degree out and the weather is ' + body.current.weather_descriptions
        })
    }
})

}

module.exports=forecast