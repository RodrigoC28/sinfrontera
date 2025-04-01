const Utilizador = require("../models/utilizador.model");

//create, crea utilizador
exports.create = (req, res) => { // Verifica se os dados foram recebidos pelo controlador            

  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  // Define um objeto 'Utilizador' com os dados recebidos     

  const utilizador = new Utilizador({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    email: req.body.email,
    password: req.body.password,
    telemovel: req.body.telemovel
  });

  // Efetua o pedido de criação do novo Utilizador ao model (com os dados recebidos)                                         

  Utilizador.create(utilizador, (error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {

      //console, vai escrever na consola os dados
      req.session.user = {
        id_utilizador: data.id_utilizador,
        nome: data.nome,
        email: data.email,
        tipo_utilizador: data.tipo_utilizador
      };
      console.log("Utilizador registado e sessão criada: ", req.session.user);
      res.redirect("/");
    }
  });
};

exports.login = (req, res) => {
  Utilizador.findIfUserExists(req.body.email, req.body.password, (error, user) => {
    if (error) {
      if (error.result === "não encontrado") {
        return res.status(400).render("pages/index", { op: 1, success: false, error: "O email ou palavra-passe está incorreto.",
        });
      } else {
        return res.status(500).render("pages/index", { op: 1, success: false, error: "Ocorreu um erro inesperado.",
        });
      }
    }

    // se utilizador já existir vai redirecionar para a sessão
    req.session.user = {
      id_utilizador: user.id_utilizador,
      nome: user.nome,
      email: user.email,
      tipo_utilizador: user.tipo_utilizador,
    };

    console.log("Utilizador logado com sucesso: ", req.session.user);

    res.redirect("/");
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error("Erro ao terminar sessão:", err);
          return res.status(500).send("Erro ao terminar sessão.");
      }

      // Redireciona para la página principal
      res.redirect("/");
  });
};

exports.findAll = (req, res) => {
  // Efetua o pedido dos dados ao model                               

  Utilizador.getAll((error, data) => {
    if (error) {
      res.status(500).send({
        success: false,
        message:
          "Ocorreu um erro ao executar a operação. [" + error.message + "]",
      });
    } else {
      // Executa o render() do template e envia os respetivos parâmetros 
      res.render("pages/index", { op: 7, success: true, dados: data });
    }
  });
};


exports.findOne = (req, res) => {
  

  // Efetua o pedido dos dados ao model                               
  Utilizador.findById(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(400).send({
          success: false,
          message: "Utilizador com o ID ${req.params.id} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados do Utilizador com o ID ${req.params.id}",
        });
      }
    } else {
      // Executa o render() do template e envia os respetivos parâmetros   
    
      res.render("pages/index", { op: 3, success: true, dados: data });
    }
  });
};


exports.update = (req, res) => {
  // Verifica se os dados foram recebidos pelo controlador            
  if (!req.body) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }

  // Efetua o pedido de atualização dos dados do Utilizador na BD        
   
  Utilizador.update(req.body.id, new Utilizador(req.body), (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message:
            "Utilizador com o ID " +
            req.body.id +
            ", não encontrado. [" +
            error.message +
            "]",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar atualizar os dados do Utilizador com o ID " +
            req.body.id +
            ". [" +
            error.message +
            "]",
        });
      }
    } else {
      res.redirect("/");
    }
  });
};

exports.delete = (req, res) => {
  Utilizador.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message: "Utilizador com o ID ${req.params.id} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados dos utilizadores com o ID ${req.params.id}",
        });
      }
    } else {
      res.redirect("/utilizadores");
    }
  });
};

//deleteAll, para apagar utilizador
exports.deleteAll = (req, res) => {
  Utilizador.removeAll((error, data) => {
    if (error) {
      res
        .status(500)
        .send({ success: false, message: "Conteúdo inexistente." });
    } else {
      res.redirect("/utilizadores");
    }
  });
};

//mostra a UI de criado com sucesso
exports.show = (req, res) => {
  res.render("pages/index", { op: 2, success: true });
};

exports.showLogin = (req, res) => {
  res.render("pages/index", { op: 1, success: true });
};