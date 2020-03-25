const express = require('express');
const app = express();

const api_helper = require('./ncovapi');
const cors = require('cors');

app.use(cors());


const msServiceApi = 
"https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/PH_masterlist/"+
"FeatureServer/0"+
"/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*"+
"&groupByFieldsForStatistics=residence&orderByFields=value%20desc&outStatistics=%5B%7B%22statisticType%22%3A%22count%22%2C%22onStatisticField%22%3A%"
+"22FID%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
app.get('/public/api/ncovtracker', (req, res) => {
    api_helper.ncovtrackerapi(msServiceApi)
        .then(response => {
            res.json(response)
        }).catch(error => {
            res.send(error)
        })        
    })

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});