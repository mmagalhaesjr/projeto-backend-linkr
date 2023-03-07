import cors from "cors";
import express from "express";

import AllRoutes from "../routes/AllRoutes.js";
import signRoutes from "../routes/SignRoutes.js";

const app = express();
let server = null;

async function onShutDownServer() {
    if (server) {
        server.close(() => {
            process.exit(0);
        });
    }
}

async function initializeServer() {
    if (!server) {
        app.use(cors());
        app.use(express.json());

        app.use(signRoutes);
        app.use(AllRoutes);

        server = app.listen(5000);
    }

    process.on("SIGTERM", async () => await onShutDownServer());
    process.on("SIGINT", async () => await onShutDownServer());
}

export default initializeServer;