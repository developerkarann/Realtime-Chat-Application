const corsOptions = {
    // origin: ["http://localhost:5173", "http://localhost:4173", process.env.CLIENT_URL],
    origin: true,
    Credential: true
}

module.exports = { corsOptions }