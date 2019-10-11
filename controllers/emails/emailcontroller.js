"use strict";
const emails = require('../../libs/emails');


class emailController {
    constructor(router) {
        // console.log(app.locals.token111)
        router.get('/emails', this.emails.bind(this));
    }

    async emails(req, res) {


        try {
            let data = await emails.emails(req.app.locals.token111);
            res.status(200)
                .json({
                    'responseCode': 200,
                    'responseDesc': "success",
                    'data': data
                });

        } catch (e) {
            res.status(200)
                .json({
                    'responseCode': 200,
                    'responseDesc': "success",
                    'data': data
                });
        }

    }


}

module.exports = emailController;