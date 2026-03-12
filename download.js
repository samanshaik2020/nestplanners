const fs = require('fs');
const https = require('https');

const dir = './public/models';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(`${dir}/model.glb`);
https.get('https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Box/glTF-Binary/Box.glb', function (response) {
    response.pipe(file);
});
