const { request, response } = require('express')
const Usuario = require('../models/usuarios')
const bcrypt = require('bcrypt')
const {esAdmin} = require('../helpers/db-validator')

const index = async (req = request, res = response) => {
    const { desde = 0, limite = 10 } = req.query
    const sentencia = { activo: true }
    // let usuarios = await Usuario.find()
    const [total, urs] = await Promise.all([
        Usuario.countDocuments(sentencia),
        Usuario.find(sentencia).skip(desde).limit(limite)
    ])
    res.status(200).json({ total, urs })
}
const getOne = async (req = request, res = response) => {
    let { id } = req.params
    let usuario = await Usuario.findOne({ _id: id })
    res.status(200).json({ usuario })
}
const update = async (req = request, res = response) => {
    const { id } = req.params
    const { password, email, ...resto } = req.body
    if (password) {
        let passEncrip = bcrypt.hashSync(password, 12)
        resto.password = passEncrip
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true })
    res.status(201).json({ usuario: usuario, msg: "Usuario actualizado con exito!" })
}
const create = async (req = request, res = response) => {
    const id = req.body.id
    esAdmin(id)
    // const { firstName, lastName, email, password } = req.body;
    // let passEncrip = bcrypt.hashSync(password, 12)
    // const newUser = new Usuario({ firstName, lastName, email, password: passEncrip })
    // try {
    //     await newUser.save()
    //     return res.status(200).json({ msg: "Usuario creado con exito!" })
    // } catch (error) {
    //     return res.json({ error })
    // }
    res.send(esAdmin(id))

}
const del = async (req = request, res = response) => {
    const { id } = req.params
    const usuario = await Usuario.findById(id)
    if (!usuario.activo) {
        return res.json({ msg: "El usuario esta inactivo" })
    }
    const usuarioBorrado = await Usuario.findByIdAndUpdate(id, { activo: false }, { new: true })

    res.status(200).json({ msg: "El usuaio paso a estar inactivo", data: usuarioBorrado })
}
const activeUser = async (req = request, res = response) => {
    const { id } = req.params
    const urs = await Usuario.findOne({ _id: id })  
    if (!urs.activo) {
        const usuario = await Usuario.findByIdAndUpdate(id, { activo: true }, { new: true })
        res.status(201).json({ usuario: usuario, msg: "Usuario actualizado con exito!" })
    }
    else {
        const usuario = await Usuario.findByIdAndUpdate(id, { activo: false }, { new: true })
        res.status(201).json({ usuario: usuario, msg: "Usuario inactivo" })
    }
}

module.exports = {
    index,
    getOne,
    update,
    create,
    del,
    activeUser
}