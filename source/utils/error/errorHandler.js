const errorHandler = (error, res, errorMessage, okMessage) => {
    if(error){
        res.status(500).send(errorMessage)
    }else{
        res.status(200).send(okMessage)
    }
}

const errorSaving = (document, res) => {
    try {
        document.save()
        .then(()=> res.status(200).send(document))
        .catch(err => res.status(500).send(err))
    }
    catch(error){
        res.status(400).send(error)
    }
}

module.exports = {errorHandler, errorSaving}