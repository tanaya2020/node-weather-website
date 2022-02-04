const request = require('postman-request')

const forecast = (lattitude,longitude,callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=86a54f0a2a14e74b23945508efa13456&query='+ lattitude +','+ longitude

request({url, json: true}, (error,{body})=>{
    if(error){
        callback('Unable to connect to weather services!', undefined)
    }else if(body.error){
        callback('Unable to find location', undefined)
    }else{
        callback(undefined,
        'It is currenty '+ body.current.temperature +' degrees out, but it feels like '+body.current.feelslike+' degrees out. The humidity is '
         + body.current.humidity + '%, and the current weather shows  ' + body.current.weather_descriptions +"."
         )
    }
})

}

module.exports=forecast