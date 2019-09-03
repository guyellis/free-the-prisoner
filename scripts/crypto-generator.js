#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Props are the characters and values are encrypted
 */
const keyMap = {};
/**
 * Props are encrypted and values are characters
 */
const encryptMap = {};

const randomUpperChar = () => 
  String.fromCharCode(65+Math.floor(Math.random() * 26));

/**
 * 
 * @param {string} char - the character to encrypt
 * @returns {string} - encrypted char
 */
const encryptChar = (char) => {
  if (!char.match(/^[A-Z]*$/)) {
    return char;
  }
  if (keyMap[char]) {
    return keyMap[char];
  }
  let rndAlpha;
  do {
    rndAlpha = randomUpperChar();
  } while (rndAlpha === char || encryptMap[rndAlpha]);

  keyMap[char] = rndAlpha;
  encryptMap[rndAlpha] = char;
  return keyMap[char];
}

const encryptLine = (line) => line
  .split('')
  .map(encryptChar)
  .join('');

const generateOutput = (contents) => {
  const inLines = contents.split('\n');
  const outLines = inLines.map(encryptLine);
  const outContentLines = outLines.reduce((acc, outLine) => {
    acc.push(outLine.split('').map((char) => char.match(/^[A-Z]*$/) ? '_' : char).join(''));
    acc.push(outLine);
    return acc;
  }, []);
  return outContentLines.join('\n');
};

const inFile = path.join(__dirname, '../puzzles/mountain-lion-cub/cryptograms.txt')
const outFile = path.join(__dirname, '../puzzles/mountain-lion-cub/printables/cryptograms.txt')

const fileContent = fs.readFileSync(inFile).toString().toUpperCase();
const encryptedContents = generateOutput(fileContent);
fs.writeFileSync(outFile, encryptedContents);
