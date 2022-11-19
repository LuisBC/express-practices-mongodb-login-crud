import app from "./server";
import "./database";
import { PORT } from "./config";

app.listen(PORT, () => {
  console.log("Server listening on port ", PORT);
});
