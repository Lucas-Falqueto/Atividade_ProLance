const express = require('express')
const loggedIn = require('../controllers/loggedIn')
const logout = require('../controllers/logout')
const { default: axios } = require('axios')


const router = express.Router()
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './public/' })
})

router.get('/login', loggedIn, (req, res) => {
    if (!req.user) {
        res.sendFile('login.html', { root: './public/' })
    } else if (req.user) {
        res.redirect("/lancaprojetos")
    }
})

router.get('/lancaprojetos', loggedIn, async (req, res) => {
    if (await req.user) { res.render('lancaprojetos', { status: "loggedIn", user: req.user }) } else { res.redirect("/login") }
})
router.get('/logout', logout)

router.get('/publicaProjetos', loggedIn, (req, res) => {
    if (!req.user) res.sendFile('login.html', { root: './public/' })
    res.sendFile('publicProject.html', { root: './public/' })

})

async function buscaEmprego(id) {
    const response = await axios.get(`http://localhost:3001/api/job/${id}`)
    return response.data
}
router.get('/descricaoVaga&:id', loggedIn, async (req, res) => {
    if (!req.user) res.sendFile('login.html', { root: './public/' })

    const job = await buscaEmprego(req.params.id)
    for (const jobItem of job.job) {
        res.render('descricaoDaVaga', { status: "loggedIn", user: req.user, job: jobItem })
    }

})




module.exports = router;