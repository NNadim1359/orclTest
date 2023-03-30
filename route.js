const express = require('express');

const router = express.Router();

router.get('/', ( req, res, next ) => {
    res.send('Hello!!! Your app is working. Now test your oracle query');
});

module.exports = router;