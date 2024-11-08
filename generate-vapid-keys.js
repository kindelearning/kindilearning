const crypto = require('crypto');
const webpush = require('web-push');
const vapidKeys = webpush.generateVAPIDKeys();
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Paste the following keys in your .env file:');
console.log('NEXT_PUBLIC_VAPID_PUBLIC_KEY=', vapidKeys.publicKey);
console.log('VAPID_PRIVATE_KEY=', vapidKeys.privateKey);

// Generate a random secret key of 32 bytes

console.log('Webhook Secret Key:', secretKey);
