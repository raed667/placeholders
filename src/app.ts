import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";

import { environment } from "./common/environment";
import routes from "./routes";

const { NODE_ENV, CORS_ALLOWED_ORIGINS } = environment();

/** **********************************************************************************
 *                              Create Express server
 ********************************************************************************** */
const appExpress = express();

/** **********************************************************************************
 *                              Set basic express settings
 ********************************************************************************** */

appExpress.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);

      // If not origin is present, allow all
      if (!CORS_ALLOWED_ORIGINS || CORS_ALLOWED_ORIGINS.length === 0)
        return callback(null, true);

      if (CORS_ALLOWED_ORIGINS.indexOf(origin) === -1) {
        return callback(
          new Error(
            "The CORS policy for this site does not allow access from the specified Origin."
          ),
          false
        );
      }
      return callback(null, true);
    },
  })
);
appExpress.use(express.json());
appExpress.use(express.urlencoded({ extended: true }));

/** **********************************************************************************
 *                              Prometheus
 ********************************************************************************** */

// Used for metrics, runs before each request
appExpress.use((_req: Request, res: Response, next: NextFunction) => {
  res.locals.startEpoch = Date.now();
  next();
});

// Show routes called in console during development
if (NODE_ENV === "dev") {
  appExpress.use(
    morgan("dev", {
      skip: (req: Request) => req.url.includes("metrics"),
    })
  );
}

/** **********************************************************************************
 *                              Register API routes
 ********************************************************************************** */
appExpress.use("/", routes);

appExpress.get("/favicon.ico", async (_req, res) => {
  res.status(404);
});

/** **********************************************************************************
 *                              Start the Express server
 ********************************************************************************** */

// Export express instance
export default appExpress;
