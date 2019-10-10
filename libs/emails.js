// const db = require("../config/dbs").get();
// const collection = db.collection('user');
var { google } = require('googleapis');
var gmail = google.gmail('v1');


class Emails {
    constructor() {

    }


    emails(auth) {
        // Only get the recent email - 'maxResults' parameter

        // console.log(auth)
        gmail.users.messages.list({ auth: auth, userId: 'me', maxResults: 1, }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }

            // Get the message id which we will need to retreive tha actual message next.
            var message_id = response['data']['messages'][0]['id'];

            // console.log(response['data'])

            // Retreive the actual message using the message id

            response['data'].messages.map( p => {
                gmail.users.messages.get({ auth: auth, userId: 'me', 'id': p.id }, function (err, response) {
                    if (err) {
                        console.log('The API returned an error: ' + err);
                        return;
                    }
    
                    console.log(response['data'].payload.parts[0].body.data);
                    let message_raw = response['data'].payload.parts[0].body.data;
                    
                    let data = message_raw;
                    let buff = new Buffer(data, 'base64');
                    let text = buff.toString();
                    console.log(text);
                });
            })
            
        });
    }


}

module.exports = new Emails()