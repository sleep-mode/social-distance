import { bootstrap } from './bootstrap';

/**
 * Entry
 */
bootstrap().then(server => {
  server.listen(5000, () => {
    console.log('server listen 5000');
  });
});
