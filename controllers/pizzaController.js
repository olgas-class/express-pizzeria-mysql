const connection = require("../data/db");

const index = (req, res) => {
  const sql = "SELECT * FROM `pizzas`";

  connection.query(sql, (err, pizze) => {
    if (err) {
      return res.status(500).json({
        message: "Errore interno del server",
      });
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

  connection.query(sql, [id], (err, pizze) => {
    if (err) {
      return res.status(500).json({
        message: "errore interno del server",
      });
    } else if (pizze.length === 0) {
      return res.status(404).json({
        message: "Pizza non trovata",
      });
    } else {
      // Nel caso del bonus si fa la seconda query con join qui
      return res.status(200).json({
        status: "success",
        data: pizze[0],
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
