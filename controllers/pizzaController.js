const connection = require("../data/db");

const index = (req, res) => {
  const environment = process.env.ENVIRONMENT; 

  const sql = "SELECT * FROM `pizzass`";

  connection.query(sql, (err, pizze) => {
    if (err) {
      const responseObj = {
        message: "Errore interno del server",
      }

      if(environment === "development") {
        responseObj.details = err.stack;
      }

      return res.status(500).json(responseObj);
    } else {
      return res.status(200).json({
        status: "success",
        data: pizze,
      });
    }
  });
};

const show = (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM `pizzas` WHERE id = ?";
  const ingredientsSql = `
    SELECT ingredients.* 
    FROM ingredients
    JOIN ingredient_pizza
    ON ingredients.id = ingredient_pizza.ingredient_id
    JOIN pizzas
    ON pizzas.id = ingredient_pizza.pizza_id
    WHERE pizzas.id = ?
  `;

  connection.query(sql, [id], (err, pizze) => {
    if (err) {
      return res.status(500).json({
        message: "errore interno del server"
      });
    } else if (pizze.length === 0) {
      return res.status(404).json({
        message: "Pizza non trovata",
      });
    } else {
      // prendiamo gli ingredienti collegati alla pizza
      connection.query(ingredientsSql, [id], (err, ingredienti) => {
        if (err) {
          return res.status(500).json({
            message: "errore interno del server",
          });
        } else {
          const datiPizza = pizze[0];
          console.log(ingredienti, pizze[0]);

          return res.status(200).json({
            status: "success",
            data: {
              ...datiPizza,
              ingredienti,
            },
          });
        }
      });
    }
  });
};

// const create = (req, res) => {
//
// };
//
// const update = (req, res) => {
//
// };
//
// const modify = (req, res) => {
//
// };

const destory = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM `pizzas` WHERE id = ?";

  connection.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: "errore interno del server",
      });
    } else {
      return res.sendStatus(204);
    }
  });
};

module.exports = {
  index,
  show,
  // create,
  // update,
  // modify,
  destory,
};
