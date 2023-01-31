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
    }
]

module.exports = {indexer:indexBici, path:"bici"}