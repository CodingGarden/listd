import { createClient } from 'redis';
import { building } from '$app/environment';
import { config } from '../config.server';

const client = createClient({
	url: config.REDIS_URL,
});

// TODO: use logging library...
// eslint-disable-next-line no-console
client.on('error', (err) => console.log('Redis Client Error', err));

if (!building) {
	await client.connect();
}

export default client;
