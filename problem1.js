const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

const data = {
    key1: Math.random()*10,
    key2: Math.random()*10,
    key3: Math.random()*10,
    key4: Math.random()*10,
    key5: Math.random()*10,
    key6: Math.random()*10
};

function createDirectory(directory, callback) {
    fs.mkdir(directory, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err}`);
      } else {
        console.log(`Directory '${directory}' created successfully.`);
        callback();
      }
    });
}


// Part 1: Callbacks and fs module (Don't use promises or async / await)

function createRandomJSONFilesPart1(callback) {
    const files = [];
    for (let i = 1; i <= 3; i++) {
        const fileName = `file${i}.json`;
        const content = JSON.stringify(data, null, 2);

        fs.writeFile(`/home/raj/async_js_exercises/directory/${fileName}`, content, (err) => {
            if (err) {
                callback(err);
            } else {
                console.log(`${fileName} created.`);
                files.push(`/home/raj/async_js_exercises/directory/${fileName}`);

                if (files.length === 3) {
                    console.log("All files created, proceed to deletion");
                    deleteFilesPart1(files, callback);
                }
            }
        });
    }
}

function deleteFilesPart1(files, callback) {
    let deletedCount = 0;
    files.forEach((fileName) => {
        fs.unlink(fileName, (err) => {
            if (err) {
                callback(err);
            } else {
                console.log(`${fileName} deleted.`);
                deletedCount++;

                if (deletedCount === files.length) {
                    // All files deleted
                    callback(null, 'All files deleted successfully.');
                }
            }
        });
    });
}


// Part 2: Callbacks and Promises (No async/await)

function createRandomJSONFilesPart2(callback) {
    const promises = [];
    for (let i = 1; i <= 3; i++) {
        const fileName = `file${i}.json`;
        const content = JSON.stringify(data, null, 2);

        const promise = writeFile(`/home/raj/async_js_exercises/directory/${fileName}`, content)
            .then(() => {
                console.log(`${fileName} created.`);
            })
            .catch((err) => {
                callback(err);
            });

        promises.push(promise);
    }

    Promise.all(promises)
        .then(() => {
            callback(null, 'All files created successfully.');
        })
        .catch((err) => {
            callback(err);
        });
}

function deleteFilesPart2(callback) {
    const promises = [];
    for (let i = 1; i <= 3; i++) {
        const fileName = `file${i}.json`;
        const promise = unlink(`/home/raj/async_js_exercises/directory/${fileName}`)
            .then(() => {
                console.log(`${fileName} deleted.`);
            })
            .catch((err) => {
                callback(err);
            });

        promises.push(promise);
    }

    Promise.all(promises)
        .then(() => {
            callback(null, 'All files deleted successfully.');
        })
        .catch((err) => {
            callback(err);
        });
}


// Part 3: Async/Await

async function createAndDeleteFilesPart3() {
    try {
        for (let i = 1; i <= 3; i++) {
            const fileName = `file${i}.json`;
            const content = JSON.stringify(data, null, 2);
            await writeFile(`/home/raj/async_js_exercises/directory/${fileName}`, content);
            console.log(`${fileName} created.`);
        }

        for (let i = 1; i <= 3; i++) {
            const fileName = `file${i}.json`;
            await unlink(`/home/raj/async_js_exercises/directory/${fileName}`);
            console.log(`${fileName} deleted.`);
        }
    } catch (err) {
        console.error('Error:', err);
    }
}


module.exports = {createDirectory, createRandomJSONFilesPart1, deleteFilesPart1, createRandomJSONFilesPart2, deleteFilesPart2, createAndDeleteFilesPart3};