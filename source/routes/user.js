var services =  require('../services/user')
var indexer = require('../indexers/user')
const middleware = require('../controller/login')
const autoRouter = require('../utils/autoRouter/autoRouter')


router = autoRouter(indexer, services, middleware)

module.exports = router
