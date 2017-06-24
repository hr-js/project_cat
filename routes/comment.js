/* 投稿内容をDBに格納・更新する */
'use strict';
let express = require('express');
let router = express.Router();
let comment = require('./rakusjs_module/db/mongoCollectionComment');

/* 投稿内容をDBにinsertする */
router.post('/', function (req, res, next) {

    // insert
    try {
        comment().insertOne(req.query);
        res.status(200).json({
            'status': true
        });

    // error
    } catch (error) {
        res.status(500).json({
            'status': false
            ,'error': error
        });
    }
});

module.exports = router;