const { validationResult } = require('express-validator') // Esta propiedad es para poder validar campos

const validarCampos = (req = request, res = response, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    next() // "next()" permite que siga el flujo del codigo
}

module.exports = {
    validarCampos
}