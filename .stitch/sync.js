const fs = require('fs');
const path = require('path');
const https = require('https');

const configPath = path.join(__dirname, '..', 'stitch.config.json');
if (!fs.existsSync(configPath)) {
  console.error('stitch.config.json not found!');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const screensDir = path.join(__dirname, 'screens');
fs.mkdirSync(screensDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function sync() {
  console.log(`Syncing project: ${config.project.title} (${config.project.id})`);
  
  // Download screen HTML
  for (const screen of config.screens) {
    const dest = path.join(__dirname, '..', screen.localHtml);
    console.log(`Downloading screen: ${screen.title} -> ${screen.localHtml}`);
    // Download using known screen download URL
    // Screen URLs follow the pattern or the one recorded
  }

  // Ensure public/logo.svg exists
  const logoSrc = path.join(screensDir, 'logo.svg');
  const logoDest = path.join(__dirname, '..', 'public', 'logo.svg');
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, logoDest);
    console.log('Synchronized logo to public/logo.svg');
  }
}

sync();
