// const db = require("../config/dbs").get();
// const collection = db.collection('user');
var { google } = require('googleapis');
var gmail = google.gmail('v1');


class Emails {
    constructor() {

        // const getmails = this.getmail.bind(this);

    }


    getmail(auth, id) {
        return new Promise((resolve, reject) => {
            gmail.users.messages.get({ auth: auth, userId: 'me', 'id': id }, (err, data) => {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    reject(err);

                } else {
                    resolve(data['data'])
                }

            });

        });

    }

    emails(auth) {

        let that = this;



        return new Promise((resolve, reject) => {
            gmail.users.messages.list({ auth: auth, userId: 'me', labelIds: ['INBOX'], maxResults: 5, }, function (err, response) {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    reject(err)
                } else {
                    const mapLoop = async _ => {
                        const promises = response['data'].messages.map(async p => {
                            const y = await that.getmail(auth, p.id)
                            return y;

                        })
                        const z = await Promise.all(promises);

                        resolve(z)
                    }
                    mapLoop();
                }

            });

        });


    }





}

module.exports = new Emails()