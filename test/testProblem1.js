const { createDirectory, createRandomJSONFilesPart1, deleteFilesPart1, createRandomJSONFilesPart2, deleteFilesPart2, createAndDeleteFilesPart3 } = require("../problem1.js");

async function runningProblem1() {
    try {
        
      // Part 1
      await new Promise((resolve) => {
        createDirectory("/home/raj/async_js_exercises/directory", (err) => { 
            if (err) { 
                return console.error(err); 
            } 
            console.log('Directory created successfully!');
            createRandomJSONFilesPart1((err, message) => {
                if (err) {
                    console.error('Error creating/deleting files:', err);
                } else {
                    console.log(message);
                    resolve();
                }
            });
        });
      });
  
      // Part 2
      await new Promise((resolve) => {
        createDirectory("/home/raj/async_js_exercises/directory", (err) => { 
            if (err) { 
                return console.error(err); 
            } 
            console.log('Directory created successfully!');
            createRandomJSONFilesPart2((err, message) => {
                if (err) {
                    console.error('Error creating files:', err);
                } else {
                    console.log(message);
                    deleteFilesPart2((err, message) => {
                        if (err) {
                            console.error('Error deleting files:', err);
                        } else {
                            resolve();
                            console.log(message);
                        }
                    });
                }
            });
        });
      });
  
      // Part 3
      await new Promise((resolve) => {
        createDirectory("/home/raj/async_js_exercises/directory", (err) => { 
            if (err) { 
                return console.error(err); 
            } 
            console.log('Directory created successfully!');
            createAndDeleteFilesPart3();
            resolve();
        });
      });
  
      console.log("All parts completed successfully.");
    } catch (err) {
      console.error("Error running the program:", err);
    }
  }
  
runningProblem1();