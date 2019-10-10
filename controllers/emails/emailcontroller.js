"use strict";
const emails = require('../../libs/emails');


class emailController {
    constructor(router) {
        // console.log(app.locals.token111)
        router.get('/emails', this.emails.bind(this));
    }

    emails(req,res){

        // console.log(req.app.locals.token111)

        // console.log("------------>", this)
        emails.emails(req.app.locals.token111);

    }
   

}

module.exports = emailController;