import express from 'express';
import cors from 'cors';
import { createClient } from 'redis';
import { checkAvailability } from './src/scrapers/index.js';
import { appsData } from './src/appsData.js';

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

// Redis client setup with graceful fallback
let redisClient;
let useRedis = false;

const initRedis = async () => {
    try {
        redisClient = createClient();
        redisClient.on('error', err => console.log('Redis Client Error', err));
        await redisClient.connect();
        useRedis = true;
        console.log("Connected to Redis");
    } catch (err) {
        console.log("Redis not available, falling back to no-cache", err);
    }
};

initRedis();

const inMemoryCache = {};

app.get('/check', async (req, res) => {
    const { location, category, app: appNameSearch } = req.query;

    if (!location || !category) {
        return res.status(400).json({ error: "location and category are required parameters" });
    }

    const appsToCheck = appsData[category];
    if (!appsToCheck) {
        return res.status(400).json({ error: "Invalid category" });
    }

    let targetApps = appsToCheck;
    if (appNameSearch) {
        targetApps = appsToCheck.filter(a => a.name.toLowerCase().includes(appNameSearch.toLowerCase()));
    }

    const results = [];

    for (const appItem of targetApps) {
        const cacheKey = `avail:${appItem.id}:${location.toLowerCase()}`;

        let isAvailable = null;

        if (useRedis) {
            const cached = await redisClient.get(cacheKey);
            if (cached !== null) {
                isAvailable = cached === 'true';
            }
        } else {
            if (inMemoryCache[cacheKey] !== undefined) {
                isAvailable = inMemoryCache[cacheKey];
            }
        }

        if (isAvailable === null) {
            isAvailable = await checkAvailability(appItem.name, location);

            if (useRedis) {
                await redisClient.set(cacheKey, isAvailable ? 'true' : 'false', { EX: 3600 });
            } else {
                inMemoryCache[cacheKey] = isAvailable;
            }
        }

        results.push({ ...appItem, isAvailable });
    }

    // Sort by priority
    results.sort((a, b) => a.priority - b.priority);

    res.json(results);
});

app.get('/categories', (req, res) => {
    res.json(Object.keys(appsData));
});

app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
