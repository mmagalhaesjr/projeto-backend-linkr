import cors from "cors";
import express from "express";

import AllRoutes from "../routes/AllRoutes.js";
import CorsProxy from "../routes/CorsProxy.js";
import PostsRoutes from "../routes/Posts.js";
import SignRoutes from "../routes/SignRoutes.js";
import UserRoutes from "../routes/Users.js";

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

        app.use(CorsProxy);
        app.use(PostsRoutes)
        app.use(SignRoutes);
        app.use(UserRoutes);
        app.use(AllRoutes);

        server = app.listen(process.env.PORT || 5000);
    }

    process.on("SIGTERM", async () => await onShutDownServer());
    process.on("SIGINT", async () => await onShutDownServer());
}

export default initializeServer;