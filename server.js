    const express = require('express');
    const fs = require('fs');
    const { v4: uuidv4 } = require('uuid');
    const { chat, hackergpt } = require('./AIs/chatgpt');
    const { palm } = require('./AIs/palm')
    const app = express();
    const port = 3000;
    const API_KEYS_FILE = 'apiKeys.json';

    app.use(express.json());

    // Load existing API keys from a JSON file
    let validApiKeys = [];

    try {
    const data = fs.readFileSync(API_KEYS_FILE, 'utf8');
    validApiKeys = JSON.parse(data);
    } catch (err) {
    console.error('Error reading API keys file:', err);
    }

    // Save API keys and user information to the JSON file
    const saveApiKeys = () => {
    fs.writeFile(API_KEYS_FILE, JSON.stringify(validApiKeys, null, 2), (error) => {
        if (error) {
        console.error('Error writing API keys file:', error.message);
        }
    });
    };

    // Custom function to generate API keys with the specified format
    const generateApiKey = () => {
    const apiKeyPrefix = 'zie-ai--v1--';
    const apiKey = `${apiKeyPrefix}${uuidv4()}`;
    return apiKey;
    };

    // Endpoint to generate API keys
    app.post('/v1/generate-key', (req, res) => {
    const { userID, username } = req.body;

    if (!userID || !username) {
        res.status(400).json({
        error: 'Bad Request: userID and username are required in the request body',
        });
        return;
    }

    const userKey = `${userID}_${username}`;
    const existingUser = validApiKeys.find((info) => info.userKey === userKey);

    if (existingUser) {
        // User already has an API key, resend it
        res.json({
        apiKey: existingUser.apiKey,
        message: 'API key already exists for the user',
        });
    } else {
        const newKey = generateApiKey();
        validApiKeys.push({ userKey, apiKey: newKey });
        saveApiKeys();

        res.json({
        apiKey: newKey,
        message: 'API key generated for the user',
        });
    }
    });

    // Middleware for API key authorization
    const apiKeyMiddleware = (req, res, next) => {
    const providedApiKey = req.headers.authorization;

    if (!providedApiKey) {
        return res.status(401).json({ error: 'Authorization header is missing.' });
    }

    if (!validApiKeys.some((info) => info.apiKey === providedApiKey)) {
        return res.status(403).json({ error: 'Invalid API key.' });
    }

    next();
    };

    app.use(apiKeyMiddleware);

    // Custom middleware to determine the model type
    const modelMiddleware = (req, res, next) => {
        let receivedModel = req.body.model;
    
        console.log('Received model:', receivedModel);
    
        if (!receivedModel) {
            return res.status(400).json({ error: 'Model type is required in the request body.' });
        }
    
        const model = receivedModel.trim().toLowerCase(); // Use a different variable name
    
        const modelHandlers = {
            "gpt-3.5": chat,
            hackergpt: hackergpt,
            "palm-2": palm
        };
    
        if (!modelHandlers[model]) {
            return res.status(400).json({ error: 'Invalid model type specified.' });
        }
    
        req.modelHandler = modelHandlers[model];
        next();
    };
    
    app.use(modelMiddleware);

    // Route for handling different models
    app.post('/v1/chat', (req, res) => {
    const { modelHandler } = req;

    if (modelHandler) {
        modelHandler(req, res);
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
    });

    // Start server
    app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
    });
