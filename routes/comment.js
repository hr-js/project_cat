/** 投稿内容をDBに格納・更新する */
'use strict';
let express = require('express');
let router = express.Router();
let comment = require('./rakusjs_module/db/mongoCollectionComment');

/** 投稿内容をDBにinsertする */
router.post('/', function (req, res, next) {
    // insert
    try {
        comment().insertOne(req.body);
        res.status(200).json({
            status: true
        });

    // error
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        });
    }
});

/** 投稿件数を取得 */
router.get('/count', function (req, res, next) {
    // 年月日のみ取得
    const TODAY = req.query.date.toString().replace(/T.*$/, '');
    try{
        comment().find({date:{"$gt":TODAY}}).toArray(function(err, docs){
            res.status(200).json({
                status: true,
                count: docs.length
            });
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            error: error
        });
    }

});

module.exports = router;
