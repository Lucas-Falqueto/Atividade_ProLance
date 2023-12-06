const db = require('../data-source')
const userModel = require('../models/UserModel')
const UserEntity = require('../entity/User')
module.exports = class UserController {
    async save({ nome, email, numero, senha }) {
        const user = new userModel(nome, email, numero, senha);
        const userTable = db.getRepository(UserEntity)
        return await userTable.save(user);
    }

    async findUser(email) {
        const findUser = await db.manager.find(UserEntity, { where: { email: email } });
        if (findUser.length === 0) {
            return false
        } else {
            return findUser
        }
    }

    async findID(id) {
        const findid = await db.manager.find(UserEntity, { where: { id: id } });
        if (findid.length === 0) {
            return false
        } else {
            return findid
        }
    }

    async verifEmail(email) {
        const verifEmail = await db.manager.find(UserEntity, { where: { email: email } });

        if (verifEmail.length === 0) {
            return true
        } else {
            return false
        }
    }

    async putUserInfo(id, user) {
        try {
            const newUser = await db.manager.createQueryBuilder()
                .update(UserEntity)
                .set({
                    name: user.nome,
                    numero: user.numero,
                    sobre_mim: user.sobre_mim,
                })
                .where("id = :id", { id: id })
                .execute();

            return newUser;
        } catch (error) {
            throw error;
        }
    }



}