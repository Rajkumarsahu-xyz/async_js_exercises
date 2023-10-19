const { readAndConvertToUpperCase, convertToLowerCaseAndSplit, sortAndWrite, deleteFilesFromList } = require("../problem2.js");

const lipsum = "../lipsum.txt";
const filenames = "../filenames.txt";

async function main() {
    try {
        const uppercasedFile = await readAndConvertToUpperCase(lipsum);
        const newFiles = await convertToLowerCaseAndSplit(uppercasedFile);
        const sortedFile = await sortAndWrite(newFiles);
        await deleteFilesFromList(filenames);
        console.log('Process completed successfully.');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();