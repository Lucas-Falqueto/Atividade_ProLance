const UserController = require('./UserController')

const editUser = async (req, res) => {
    const { nome, sobre_mim, numero } = req.body
    if (!nome) return res.json({ status: "error", error: "Coloque seu nome corretamente" })
    try {

        const user = await new UserController().findID(req.params.id)
        if (!user) return res.json({ status: "error", error: "Não foi possivel atualizar no momento tente mais tarde" })
        const newUser = await new UserController().putUserInfo(req.params.id, { id: user.map(x => x.id), email: user.map(x => x.email), senha: user.map(x => x.senha), nome: !nome ? user.map(x => x.nome) : nome, sobre_mim: !sobre_mim ? user.map(x => x.sobre_mim) : sobre_mim, numero: !numero ? user.map(x => x.numero) : numero })
        console.log(newUser)
        return res.json({ status: "success", success: "Dados atualizados com sucesso" })
    } catch (error) {
        return res.json({ status: "success", success: "Não foi possivel atualizar no momento tente mais tarde" })
    }


}

module.exports = editUser;