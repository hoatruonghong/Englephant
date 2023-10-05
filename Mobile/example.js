var axios = require('axios');
var data = JSON.stringify({
    "collection": "Pronunciation",
    "database": "Englephant",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-hbwjg/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': '15VeeSO50WYHJjKouwr7R1eajOxpbJrtcequZeYWt82uWsoxQSMwrdvyQp0gDSOL',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
