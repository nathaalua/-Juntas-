const psicologosModel = require('../models/psicologosModels.json')

const findAllPsicologos = (req, res) => {
    
    const { nome = null, payment = null, autor = null } = req.query

    try {
        let filterPsicologos = psicologosModel.slice()

        if (filterPsicologos.length === 0) {
            return res.status(200).json({
                message: "Ainda não possuimos psicólogos cadastrados em nossa plataforma"
            })
        }

        if (nome) {
            filterPsicologos = filterPsicologos.filter(currentPsicologos => currentPsicologos
                .nome
                .toLocaleLowerCase()
                .includes(nome.toLocaleLowerCase())
            )
        }

        if (filterPsicologos.length === 0) {
            throw new Error("descupa, mas não foi encontrado nenhum resultado para essa busca")
        }

        res.status(200).json(filterPsicologos)

    } catch (error) {
        console.error(error)
        console.log('query recebida: ', req.query)

        res.status(404).json({
            message: error.message,
            details: "query invalida: ",
            query: req.query
        })
    }
}

const findById = (req, res) => {
    const { id } = req.params
   
    try {
        const findPsicologos = psicologosModel.find(psicologos => psicologos.id == id)

        if (!findPsicologos) throw new Error(`desculpa, não foi possivel encontrar o psicólogo com o id ${id}`)

        res.status(200).json(findPsicologos)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: "Poxa, desculpa, foi mal, ainda não possuimos esse psicólogo na nossa plataforma.",
            details: error.message,
        })
    }
}


const findPsicologosByPayment = (req, res) => {
    const { payment } = req.params
   
    try {
        const findPsicologos = psicologosModel.find(psicologos => psicologos.payment == payment)

        if (!findPsicologos) throw new Error(`desculpa, não foi possivel encontrar o psicólogo pela forma de pagamento ${id}`)

        res.status(200).json(findPsicologos)

    } catch (error) {
        console.error(error)
        res.status(404).json({
            message: "Poxa, desculpa, foi mal, ainda não possuimos esse psicólogo na nossa plataforma.",
            details: error.message,
        })
    }
}

const createPsicologos = (req, res) => {
    const {  nome, payment } = req.body

    try {

        const id = psicologosModel.length

        if (nome === null || nome === undefined || nome.trim() == "") {
            throw {
                
            }
        }


        if (
            findPsicologosByPayment &&
            findPsicologosByPayment.nome.toLocaleLowerCase() == nome.toLocaleLowerCase()
        ) {
            throw {
                statusCode: 409,
                message: "Já existe um psicólogo com essas informações.",
                details: "já existe no sistema um um psicólogo com essas informações"
            }
        }

        const newPsicologos = { id, nome, payment }

        console.log(newPsicologos)

        psicologosModel.push(newPsicologos)

        console.table(psicologosModel)

        res.status(201).json(newPsicologos)

    } catch (error) {
        if (error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({ "message" : error.message })
    }
}

module.exports = {
    findAllPsicologos,
    findPsicologosByPayment,
    findById,
    createPsicologos
}

