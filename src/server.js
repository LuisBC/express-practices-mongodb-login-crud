import express from "express";
import path from "path";
import morgan from "morgan";
import { create } from "express-handlebars";
import indexRoutes from "./routes/index.routes";
import notesRoutes from "./routes/notes.routes";
import usersRoutes from "./routes/users.routes";
import methodOverride from "method-override";
import flash from "connect-flash";
import session from "express-session";
import passport from "passport";
import "./config/passport";

// Initializations
const app = express();

// Settings
app.set("views", path.join(__dirname, "views"));
const hbs = create({
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  defaultLayout: "main",
  extname: ".hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use(indexRoutes);
app.use(notesRoutes);
app.use(usersRoutes);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

export default app;
