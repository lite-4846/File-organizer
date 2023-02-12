const fs = require('fs');
const path = require('path');
const { utility } = require('../utility');


const types = utility.types;


module.exports.organizeFn =  (dirPath) => {
  // console.log('Executed organize', dirPath);
  // 1. input => directory path given
  if (!dirPath) {
    let destPath = process.cwd();
    return;
  }
  let destPath;
  let doesExist = fs.existsSync(dirPath);
  if (doesExist) {
    // 2. create => organized_files (directory)

    destPath = path.join(dirPath, 'organized_files');
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath);
    }
  } else {
    console.log('Invalid path');
    return;
  }
  organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src);
  
  for (let i = 0; i < childNames.length; i++) {
    const childAddress = path.join(src, childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    if (isFile) {
      const category = getCategory(childNames[i]);
      sendFiles(childAddress, dest, category);
    }
  }
}

function getCategory(fileName) {
  // 3. identify categories of stuff
  let ext = path.extname(fileName);
  ext = ext.slice(1);
  for (let type in types) {
    let cType = types[type];
    for (let i = 0; i < cType.length; i++) {
      if (ext == cType[i]) {
        return type;
      }
    }
  }
}

function sendFiles(srcFilePath, dest, category='Undefined') {
  // 4. copy / cut files into organized_files
  let categoryPath = path.join(dest, category);
  if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath);
  }
  let fileName = path.basename(srcFilePath);
  let destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(srcFilePath, destFilePath);
}