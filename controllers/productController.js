
module.exports = {
    index: (req, res) => {
        res.status(200).json({ msg: "Realizaste una peticion getProducts" })
    },
    getOne: (req, res) => {
        res.status(200).json({ msg: "Realizaste una peticion getOneProduct" })
    },
    update: (req, res) => {
        res.status(200).json({ msg: "Realizaste una peticion updateProduct" })
    },
    create: (req, res) => {
        res.status(200).json({ msg: "Realizaste una peticion createProducts" })
    },
    delete: (req, res) => {
        res.status(200).json({ msg: "Realizaste una peticion deleteProduct" })
    }
}