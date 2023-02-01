indexBici = [
    {
        method  : "post",
        service : "Cbici",
    },
    {
        method  : "get",
        service : "Rbici",
    },
    {
        method  : "put",
        service : "Ubici",
    },
    {
        method  : "delete",
        service : "Dbici",
    }
]

module.exports = {indexer:indexBici, path:"bici"}