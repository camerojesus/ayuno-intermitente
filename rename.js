// rename.js

import { rename } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = join(__dirname, 'dist');
const indexPath = join(distPath, 'index.html');
const newPath = join(distPath, 'ayunointermitente.html');

rename(indexPath, newPath, (err) => {
  if (err) throw err;
  console.log('Index.html renombrado a ayunointermitente.html');
});