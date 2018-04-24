const app = require('./server').default;

(async function startup() {
  try {
    await app();
  } catch (e) {
    console.error(e.stack); // eslint-disable-line no-console
    process.exit(1);
  }
})();
