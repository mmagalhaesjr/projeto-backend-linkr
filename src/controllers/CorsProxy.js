import { getLinkPreview } from "link-preview-js";

async function urlFetch(req, res) {
    try {
        const { url } = req.body;
        if (!url || typeof url !== "string") return res.status(400).send("invalid url informed on body");
        const fetchData = await getLinkPreview(url, { followRedirects: "follow" });
        const data = {
            title: fetchData.title || fetchData.siteName,
            description: fetchData.description || `${fetchData.title || fetchData.siteName} - ${url}`,
            images: fetchData.images || fetchData.favicons,
        };
        return res.status(200).send(data);
    } catch (_) {
        return res.status(400).send("invalid url or offline site informed on body");
    }
}

export { urlFetch };