"use strict";
const { resolveObjectURL } = require('buffer');
const { freemem } = require('os');
const { resolve } = require('path');
const { consumers } = require('stream');

 // do not modify or delete this line

//Task 1
//data is a string, patterns is an array of patterns
function find(data, patterns) {
	//creates frequences and offsets
	let frequencies={};
	let offsets={};
	let index = 0;
//loops through all of the items in patterns
	patterns.forEach((patternCount) =>{
//sets frequencies to 0 and offsets to empty
	frequencies[patternCount] = 0;
	offsets[patternCount] = [];
//uses match to see if the items in patterns is the same as parts of the data
	let pair = data.match(new RegExp(patternCount,"g"));
		if (pair){
			//sets frequencies index so it is the same length of pair
			frequencies[patternCount] = pair.length;
			//if there is a pair then it will map it to the index of offsets
			offsets[patternCount] = pair.map((pattern, index) => data.indexOf(pattern,index)); 
		}
	});
	return{ frequencies,offsets};
}

const results1 = {};
const results2 = {};
const results3 = {};

analyse1();

//Task 2
function analyse1(dataFile, patternFile){
	const fs = require('fs');
	fs.readFile( 'file.data','utf8', (err,fileData)  => {
		dataFile = fileData.replace(/(\r\n|\n|\r)/gm, " ");
		if(err){
			console.log(err);
			return;
		}
	fs.readFile('file.pattern', 'utf8',(err,fileData2)=>{
		if(err){
			console.log(err);
			return;
		}
		patternFile = fileData2.split(/\s+/);
		results2.results = find(dataFile,patternFile);
		console.log("Analysis 1:\n",results2.results);
	});
});
}
//Task 3

const readFilePromise = (filePath) => {

	const fs = require('fs');
	const path = require('path');

	const FilePath = path.resolve(__dirname, filePath);

	return FilePath;
	return fs.promises.readFile(filePath,'utf8');
}

function analyse2(dataFile, patternFile){
	const fs = require('fs');

	const analyse2DataFile = readFilePromise('file.data');
	const analyse2PatternFile = readFilePromise('file.pattern');
	

	fs.readFile( analyse2DataFile,'utf8', (err,fileData)  => {
		dataFile = fileData.replace(/(\r\n|\n|\r)/gm, " ");
		if(err){
			console.log(err);
			return;
		}
	fs.readFile(analyse2PatternFile, 'utf8',(err,fileData2)=>{
		if(err){
			console.log(err);
			return;
		}
		patternFile = fileData2.split(/\s+/);
		results1.results = find(dataFile,patternFile);
		console.log("Analysis 2:\n",results1.results);
	});
});

}
analyse2();
//Task 4 
async function analyse3(dataFile, patternFile) {
	const fs = require('fs');

	try {

	  const data = await fs.promises.readFile('file.data', 'utf8');
	  const pattern = await fs.promises.readFile('file.pattern', 'utf8');
	  dataFile = data.replace(/(\r\n|\n|\r)/gm, " ");
	  patternFile = pattern.split(/\s+/);
		results3.results = find(dataFile,patternFile);
		 console.log("Analysis 3:\n",results3.results);
	} catch (error) {
		console.log(error);
	}
  }
analyse3();


//-------------------------------------------------------------------------------
//do not modify this function
function print(){
	console.log("Printing results...");
	Object.keys(results).forEach(function(elem){
		console.log("sequence: ", elem);
		console.log("frequencies are: ", results[elem].frequencies);
		console.log("offsets are: ", results[elem].offsets);
		console.log("---------------------------");
	});
}
//--------------- export the find function (required for the marking script)
module.exports ={find}; //do not modify this line