
const ruleError = (errs, rules, ind) => {
    errs.forEach(err =>{
        err.message = rules?.[ind][err.code]
    })
    return errs
}

module.exports = {ruleError}