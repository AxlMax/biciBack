indexUser = [
    {
        method  : "post",
        service : "Cuser",
        path    : ""
    },
    {
        method  : "get",
        service : "Ruser",
        path    : ""
    },
    {
        method  : "put",
        service : "Uuser",
        path    : ""
    },
    {
        method  : "delete",
        service : "Duser",
        path    : ""
    },
    {
        method : "patch",
        service : "LinkBici",
        path    : "LinkBici"
    }
]

module.exports = {indexer:indexUser, path:"user"}