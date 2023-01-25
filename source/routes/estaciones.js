var services     =  require('../services/estaciones')
var indexer      = require('../indexers/estaciones')
const middleware = require('../controller/login')
const autoRouter = require('../utils/autoRouter/autoRouter')

router = autoRouter(indexer, services, middleware)

module.exports = router