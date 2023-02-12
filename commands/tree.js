const fs = require('fs');
const path = require('path');

module.exports.treeFn = (dirPath) => {
  if (!dirPath) {
    treeHelper(process.cwd(), '');
    return;
  }
  let destPath;
  let doesExist = fs.existsSync(dirPath);
  if (doesExist) {
    treeHelper(dirPath, '')
  }
}

function treeHelper(dirPath, indent) {
   let isFile = fs.lstatSync(dirPath).isFile();
   if (isFile) {
      let fileName = path.basename(dirPath);
      console.log(indent + " --> " + fileName);
      return ;
   }
   let dirName = path.basename(dirPath);
   console.log(indent + '=>', dirName);
   let childrens = fs.readdirSync(dirPath)
   for (let i = 0; i < childrens.length; i++) {
    let childPath = path.join(dirPath, childrens[i])
    treeHelper(childPath, indent + '\t')
   }
}

