const express = require("express");
const menu = require("./data");
const pizzasRouter = require("./routers/pizzas");
const ingredientsRouter = require("./routers/ingredients");
const handleError = require("./middlewares/handleError");
const notFoundRoute = require("./middlewares/notFoundRoute");

// npm install cors
const corsMiddleware = require("cors");

const app = express();
const port = 3001;

// Diamo il permesso a questo indirizzo di richiedere i dati
app.use(corsMiddleware({
  origin: 'http://127.0.0.1:5500'
}));

// aggiungo il body parser in formato json per poter leggere il body della richiesta quando arriva alle rotte post, put e patch
app.use(express.json());


app.use(express.static("public"));


// includo tutte le rotte delle pizze con prefisso "pizzas" nelle url di ogni rotta
app.use("/pizzas", pizzasRouter);
app.use("/ingredients", ingredientsRouter);

app.get("/", (req, res) => {
  // pippo.ciao();
  console.log("Rotta home è stata chiamata");
  
  res.json({
    message: "Ciao, questa è la mia pizzeria",
  });
});


app.get('/ricerca', (req, res) => {
  const pizzaName = req.query.nome; // "Mar"
  // const pizzas = menu.filter((curPizza) => curPizza.name.toLowerCase().includes(pizzaName.toLowerCase()))
  const pizzas = menu.filter((curPizza) => {
    const curPizzaName = curPizza.name.toLowerCase();
    return curPizzaName.includes(pizzaName.toLocaleLowerCase());
  })
  res.json(pizzas);
});

app.use(notFoundRoute);

// Dopo tutte le rotte inseriamo il moddleware che gestisce errore
app.use(handleError);

app.listen(port, () => {
  console.log("Server is listening");
});




