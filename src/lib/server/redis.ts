import { createClient } from 'redis';
import { config } from '../config.server';

const client = createClient({
	url: config.REDIS_URL,
});

// TODO: use logging library...
client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export default client;
