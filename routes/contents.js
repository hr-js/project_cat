'use strict';
let express = require('express');
let router = express.Router();
let collection = require('./rakusjs_module/mongo_conf');

/* 
/ MongoDBへ投稿内容をinsert
/ 投稿内容は編集しないので、
/ CRUDには対応しない予定
 */
router.get('/', function (req, res, next) {
    // collectionをload
    let contents = collection('contents');

    try {
        // insert
        contents.insertOne(req.query);
        res.status(200);

    } catch (error) {
        // error
        res.status(500).json({ 'error': error});
    }


});

module.exports = router;