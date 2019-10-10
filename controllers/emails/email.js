"use strict";


class emailController {
    constructor(router) {
        router.get('/emails', this.emails.bind(this));
    }


    /**
     * Get the recent email from your Gmail account
     *
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    emails(auth) {
        // Only get the recent email - 'maxResults' parameter
        gmail.users.messages.list({ auth: auth, userId: 'me', maxResults: 1, }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }

            // Get the message id which we will need to retreive tha actual message next.
            var message_id = response['data']['messages'][0]['id'];

            // Retreive the actual message using the message id
            gmail.users.messages.get({ auth: auth, userId: 'me', 'id': message_id }, function (err, response) {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    return;
                }

                console.log(response['data']);
            });
        });
    }

}

module.exports = emailController;