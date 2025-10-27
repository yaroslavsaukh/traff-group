import crypto from 'crypto';

function findNonce(timestamp, clientId, difficulty = 4) {
  const prefix = '0'.repeat(difficulty);
  let nonce = 0;
  while (true) {
    const hash = crypto
      .createHash('sha256')
      .update(`${timestamp}${nonce}${clientId}`)
      .digest('hex');
    if (hash.startsWith(prefix)) return nonce.toString();
    nonce++;
  }
}

const clientId = 'client_123';
const timestamp = Date.now();
const nonce = findNonce(timestamp, clientId, 4);

console.log({ clientId, timestamp, nonce });
