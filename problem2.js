const fs = require('fs').promises;

async function readAndConvertToUpperCase(inputFileName) {
    const data = await fs.readFile(inputFileName, 'utf-8');
    const uppercasedData = data.toUpperCase();
    await fs.writeFile('../uppercase.txt', uppercasedData);
    await fs.appendFile('../filenames.txt', '../uppercase.txt\n');
    return '../uppercase.txt';
}

async function convertToLowerCaseAndSplit(inputFileName) {
    const data = await fs.readFile(inputFileName, 'utf-8');
    const lowercasedData = data.toLowerCase();
    const sentences = lowercasedData.split(/[.!?]/).filter(sentence => sentence.trim() !== '');
    const newFiles = await Promise.all(sentences.map((sentence, index) => {
        const fileName = `sentence${index + 1}.txt`; 
        return fs.writeFile(fileName, sentence.trim()).then(() => fileName);
    }));
    await fs.appendFile('../filenames.txt', newFiles.join('\n') + '\n');
    return newFiles;
}

async function sortAndWrite(files) {
    const contents = await Promise.all(files.map(file => fs.readFile(file, 'utf-8')));
    contents.sort();
    await fs.writeFile('../sorted.txt', contents.join('\n'));
    await fs.appendFile('../filenames.txt', '../sorted.txt\n');
    return 'sorted.txt';
}

async function deleteFilesFromList(fileList) {
    const files = await fs.readFile(fileList, 'utf-8');
    const fileNames = files.trim().split('\n');
    await Promise.all(fileNames.map(file => fs.unlink(file)));
}

module.exports = {readAndConvertToUpperCase, convertToLowerCaseAndSplit, sortAndWrite, deleteFilesFromList};
