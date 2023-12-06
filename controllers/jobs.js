require('dotenv').config()
const jwt = require('jsonwebtoken')
const JobController = require('./JobController')
const jobs = (req, res) => {
    const { titulo, descricao } = req.body
    const decoded = jwt.verify(req.cookies.userRegistered, process.env.KEY_API)
    const user = decoded.id
    const job = {
        idUser: user,
        titulo: titulo,
        descricao: descricao
    }

    new JobController().save(job)
    return res.json({ status: "success", success: "Novo trabalho registrado com sucesso" })

}

module.exports = jobs;