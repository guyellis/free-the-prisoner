#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Props are the characters and values are encrypted
 */
const keyMap: Record<string, string> = {};
/**
 * Props are encrypted and values are characters
 */
const encryptMap: Record<string, string> = {};

const randomUpperChar = (): string => 
  String.fromCharCode(65+Math.floor(Math.random() * 26));

/**
 * 
 * @param char - the character to encrypt
 * @returns - encrypted char
 */
const encryptChar = (char: string): string => {
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

const encryptLine = (line: string): string => line
  .split('')
  .map(encryptChar)
  .join('');

const generateOutput = (contents: string): string => {
  const inLines = contents.split('\n');
  const outLines = inLines.map(encryptLine);
  const outContentLines = outLines.reduce((acc, outLine) => {
    acc.push(outLine.split('').map((char) => char.match(/^[A-Z]*$/) ? '_' : char).join(''));
    acc.push(outLine);
    return acc;
  }, [] as string[]);
  return outContentLines.join('\n');
};

export const createEncryptedFile = (folder: string): void => {
  if(!folder) {
    throw new Error('No folder param specified in createEncryptedFile()');
  }
  const puzzleFolder = '../../puzzles/';
  const inFilePath = path.join(__dirname, puzzleFolder, folder, 'cryptograms.txt')
  const outFilePath = path.join(__dirname, puzzleFolder, folder, 'printables/cryptograms.txt')
  const fileContent = fs.readFileSync(inFilePath).toString().toUpperCase();
  const encryptedContents = generateOutput(fileContent);
  fs.writeFileSync(outFilePath, encryptedContents);
};
