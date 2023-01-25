var   services =  require('../services/bici')
var   indexer = require('../indexers/bici')
const middleware = require('../controller/login')
const autoRouter = require('../utils/autoRouter/autoRouter')


router = autoRouter(indexer, services, middleware)

module.exports = router