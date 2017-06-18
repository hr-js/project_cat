'use strict';
let express = require('express');
let router = express.Router();
let comment = require('./rakusjs_module/db/mongoCollectionComment');

/*
/ 投稿内容をDBに格納・更新する
*/
router.post('/', function (req, res, next) {

    // insert
    try {
        comment().insertOne(req.query);
        res.status(200);

    // error
    } catch (error) {
        res.status(500).json({
            'error': error
        });
    }
});

module.exports = router;