const crypto = require('crypto');

module.exports = (region, secret) => {
  const DATE = '11111111';
  const SERVICE = 'ses';
  const MESSAGE = 'SendRawEmail';
  const TERMINAL = 'aws4_request';
  const VERSION = 0x04;

  const messages = [
    DATE,
    region,
    SERVICE,
    TERMINAL,
    MESSAGE,
  ];

  const key = messages.reduce((credential, message) => {
    const text = Buffer.from(message).toString('utf-8');

    return crypto.createHmac('sha256', credential).update(text).digest();
  }, `AWS4${secret}`);

  return Buffer.concat([Buffer.from([VERSION]), key]).toString('base64');
};
