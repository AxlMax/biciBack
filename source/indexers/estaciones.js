indexestaciones = [
    {
        method  : "post",
        service : "Cestaciones",
        path    : "Cestaciones"
    },
    {
        method  : "get",
        service : "Restaciones",
        path    : "Restaciones"
    },
    {
        method  : "put",
        service : "Uestaciones",
        path    : "Uestaciones"
    },
    {
        method  : "patch",
        service : "LinkBici",
        path    : "LinkBiciE"
    },
    {
        method : "get",
        service : "GetBici",
        path    : "GetBiciE"
    },
]

module.exports = {indexer:indexestaciones, path:"estaciones"}