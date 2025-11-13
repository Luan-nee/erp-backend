const express = require("express");
const app = express();

app.get("/personas/:nombre", (req, res) => {
	console.log(req.params.nombre);
  res.send("Hello, " + req.params.nombre + "!");
});

app.listen(3000);
console.log("Server is running on http://localhost:3000");
