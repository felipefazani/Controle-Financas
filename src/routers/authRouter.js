const express = require('express');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res) => {
    console.log(req.body);
    res.json(req.body);
});

module.exports = authRouter;