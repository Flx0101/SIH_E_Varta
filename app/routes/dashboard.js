var router = require('./../helpers/index').router;

router.get('/' , (req , res , next) => {
    console.log("Hello");
})

module.exports = router;