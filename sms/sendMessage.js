module.exports = function (number, message, callback) {
     request.post({url: 'messages/send', qs: {device: config.deviceId, number: number, message: message}}, function (err, httpResponse, body) {
         if (err || httpResponse.statusCode != 200) {
             console.log(err);
             console.log(body);
             return callback(clc.red('Error'));
         }

         callback(err || httpResponse.statusCode != 200);
    });
};