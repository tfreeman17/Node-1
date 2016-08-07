var fs = require("fs");

var useStdin = function(){
	var input = process.stdin.read();
	if (input !== null){
		var inputSplit = input.toString().trim().split(" ");
			if( inputSplit[0] === "cat"){
				// console.log("meow");
				// cat <filename>
				catFile(inputSplit[1]);

			} else if (inputSplit[0] === "touch") {
				touchFile(inputSplit[1]);
			} else if (inputSplit[0] === "remove"){
				removeFile(inputSplit[1]);
			} else if (inputSplit[0] === "replace"){
				replaceWord(inputSplit[1], inputSplit[2], inputSplit[3]);
			} else if (inputSplit[0] === "grep"){
				grep(inputSplit[1], inputSplit[2]);
			}
			console.log("You typed; " + input);
	}
};

function touchFile(fileName) {
	fs.writeFile(fileName, "", function(err){
		if (err) {
			console.log("Could not write to file");
		} else {
			console.log("File created and saved");
		}
	});
}

function catFile(fileName){
	fs.readFile(fileName, function(err, data) {
		if (err) {
			console.log("unable to read from file");
		} else {
			console.log(data.toString());
		}

	});
}
// * remove a file
// 		"rm" <file name>
// 		> rm hello.txt
// 			entirely delete the file hello.txt

function removeFile(fileName){
	// rl.prompt([preserveCursor])
	// rl.question(query, function())
	// console.log("Are sure you want to delete this file? y or n");
		// if (y){
		// 	delete fileName
		// if (n){
		// 	console.log("You have choosen not to delete said file.")
		// }
		fs.unlink(fileName, function(err){
			if (err){
				console.log("not able to delete file named")
			} else {
				console.log ("GONE IT IS!")
			}
	});
}

function replaceWord (fileName, original, replacement){
	fs.readFile(fileName, function (err,data) {
  if (err) {
    return console.log(err);
  }
  var re = new RegExp(original, "g")
  var result = data.toString().replace(re, replacement);
  fs.writeFile(fileName, result, function (err) {
     if (err) return console.log(err);
  
  });
});
}

function grep(fileName, word){
	fs.readFile(fileName, function(err,data){
		if (err){
			console.log("Unable to read from file");
		} else {
			data = data.toString().split("\n");
			for (var i = 0; i < data.length; i++) {
				data[i] = data[i].trim().split(" ");
			}
			for (i = 0; i < data.length; i++) {
				for (var j = 0; j < data[i].length; j++) {
					if (data[i][j] == word){
						console.log(data[i].join(" "));
					}
				}
			}
		}
	}
)};

process.stdin.on('readable', useStdin);