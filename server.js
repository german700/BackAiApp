const PORT = process.env.PORT || 8086;

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./src/user.routes");
const aiRoutes = require("./src/ai.routes");

app.use("/api/users", userRoutes);
app.use("/api/ai", aiRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor corriendo en " + PORT);
});
