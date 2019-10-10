"use strict";

const profile = require('../../libs/profile');

class profileController {
    constructor(router) {
        router.get('/image', this.authenticatethisUser, this.imageUrl.bind(this));
        router.get('/coverInfo/:id', this.authenticatethisUser, this.coverInfo.bind(this));
        // router.get('/skills', this.skills.bind(this));
        // router.get('/experiance', this.experiance.bind(this));
        // router.get('/basic', this.basic.bind(this));
    }

    authenticatethisUser(req,res, next){

        console.log("i am authenticating ")
       
        // next("Tough luck buddy"); 
        next();
        
    }

    /**
     * this is error middleware, when previous middleware gives error it will hit below function     
     */

    function (err, req, res, next) {

        console.log("error exception")
        // err === your HttpException
      }

    async imageUrl(req, res) {

        console.log("Hi i m in image")

        // res.json("HEY i m in inage")
        try {
            let data = await profile.imageUrl();
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


    async coverInfo(req, res) {

        console.log(req.params.id)

        if (req.params.id) {
            try {

                let data = await profile.coverInfo(req.params.id)

                console.log(data)

                res.status(200)
                    .json({
                        'responseCode': 200,
                        'responseDesc': "success",
                        'data': data
                    });
            } catch (e) {
                console.log(e)
                res.status(500)
                    .json({
                        'responseCode': 500,
                        'responseDesc': "error",
                        'data': {}
                    });
            }

        }
    }

   

    skills() {

    }

    experiance() {

    }

    basic() {

    }


}

module.exports = profileController;