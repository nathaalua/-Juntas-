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
    const { payment } = req.query

    try {
        const findPsicologos = psicologosModel.filter(psicologos => psicologos.pagamento.toString().toLowerCase().includes(payment.toLowerCase()))

        if (!findPsicologos) throw new Error(`desculpa, não foi possivel encontrar o psicólogo pela forma de pagamento ${req.query}`)

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
    const {  name, payment } = req.body

    try {

        const id = psicologosModel.length + 1

        if (name === null || name === undefined || name.trim() == "") {
            throw {
              statusCode: 409,
              message: "O nome precisa ser preenchido",
              details: "Preencha o nome para cadastrar um novo psicólogo."
            }
        }

        const findPsicologos = psicologosModel.find(psicologos => psicologos.nome.toLowerCase() === name)
        console.log(findPsicologos)
        if (findPsicologos)
        {
            throw {
                statusCode: 409,
                message: "Já existe um psicólogo com essas informações.",
                details: "já existe no sistema um um psicólogo com essas informações"
            }
        }

        const newPsicologos = { id, name, payment }

        console.log(newPsicologos)

        psicologosModel.push(newPsicologos)

        console.table(psicologosModel)

        res.status(201).json(newPsicologos)

    } catch (error) {
        if (error.statusCode) res.status(error.statusCode).json(error)
        else res.status(500).json({ "message" : error.message })
    }
}

const updatePsicologo = (req, res) => {
  const { id } = req.params
 
  try {
      const findPsicologos = psicologosModel.find(psicologos => psicologos.id == id)

      if (!findPsicologos) throw new Error(`desculpa, não foi possivel encontrar o psicólogo com o id ${id}`)

      const updatedPsicologo = {
        id: findPsicologos.id,
        nome: req.body.nome || findPsicologos.nome,
        endereço: req.body.endereço || findPsicologos.endereço,
        numero: req.body.numero || findPsicologos.numero,
        bairro: req.body.bairro || findPsicologos.bairro,
        cidade: req.body.cidade || findPsicologos.cidade,
        telefone: req.body.telefone || findPsicologos.telefone, 
        pagamento: req.body.pagamento || findPsicologos.pagamento,
        atendimento: req.body.atendimento || findPsicologos.atendimento,
        site: req.body.site || findPsicologos.site,
      }
      const index = psicologosModel.indexOf(findPsicologos)

      psicologosModel.splice(index, 1, updatedPsicologo)

      const update = psicologosModel.find(psicologos => psicologos.id == id)

      res.status(200).json(update)

  } catch (error) {
      console.error(error)
      res.status(500).json({
          message: "Falha ao atualizar cadastro, por favor tente novamente mais tarde.",
          details: error.message,
      })
  }
}

const deletePsicologo = (req, res) => {
  const { id } = req.params
 
  try {
      const findPsicologos = psicologosModel.find(psicologos => psicologos.id == id)

      if (!findPsicologos) throw new Error(`desculpa, não foi possivel encontrar o psicólogo com o id ${id}`)

      const index = psicologosModel.indexOf(findPsicologos)

      psicologosModel.splice(index, 1)
 
      res.status(200).json({
        "Psicólogo deletado com sucesso": findPsicologos,
        "Lista de psicólogos": psicologosModel
      })

  } catch (error) {
      console.error(error)
      res.status(500).json({
          message: "Falha ao deletar cadastro, por favor tente novamente mais tarde.",
          details: error.message,
      })
  }
}

module.exports = {
    findAllPsicologos,
    findPsicologosByPayment,
    findById,
    createPsicologos,
    updatePsicologo,
    deletePsicologo
}
