var services =  require('../services/login')
var indexer = require('../indexers/login')
const autoRouter = require('../utils/autoRouter/autoRouter')

router = autoRouter(indexer, services)

module.exports = router