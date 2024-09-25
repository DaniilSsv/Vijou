const NodeMediaServer = require("node-media-server");

const httpConfig = {
    port: 8000,
    allow_origin: "*",
    mediaroot: "./media",
};

const rtmpConfig = {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 10,
    ping_timeout: 60,
};

const transformationConfig = {
    ffmpeg: "./ffmpeg",
    tasks: [
        {
            app: "live",
            hls: true,
            hlsFlags: "[hls_time=2:hls_list_size=3:hls_flags=delete_segments]",
            hlsKeep: false,
        },
    ],
    MediaRoot: "./media",
};

const config = {
    http: httpConfig,
    rtmp: rtmpConfig,
    trans: transformationConfig,
};

const nms = new NodeMediaServer(config);

/*
nms.on('prePublish', async (id, StreamPath, args) => {
    let streamKey = StreamPath.split('/')[2];
    let keyExists = await Key.exists({ streamKey });

    if (!keyExists) {
        let session = nms.getSession(id);
        session.reject();
    }
});
*/

nms.run();