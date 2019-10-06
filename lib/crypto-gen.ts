#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const randomUpperChar = (): string => 
  String.fromCharCode(65+Math.floor(Math.random() * 26));

interface EncryptCharOptions {
  char: string;
  keyMap: Record<string, string>;
  encryptMap: Record<string, string>;
}

const encryptChar = ({char, keyMap, encryptMap}: EncryptCharOptions): string => {
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

interface EncryptLineOptions {
  line: string;
  keyMap: Record<string, string>;
  encryptMap: Record<string, string>;
}

const encryptLine = ({
    line,
    keyMap,
    encryptMap,
  }: EncryptLineOptions): string => line
  .split('')
  .map((char) => encryptChar({char, keyMap, encryptMap}))
  .join(' '); // put a space between each letter

const generateOutput = (contents: string): string => {
  /**
   * Props are the characters and values are encrypted
   */
  const keyMap: Record<string, string> = {};

  /**
   * Props are encrypted and values are characters
   */
  const encryptMap: Record<string, string> = {};

  const inLines = contents.split('\n');
  const outLines = inLines.map((line) => encryptLine({line, keyMap, encryptMap}));
  // We now have an array of encrypted lines
  // We need to insert a line of appropriately spaced underscores above each
  // of these lines.
  const outContentLines = outLines.reduce((acc, outLine) => {
    // Generate a line of underscores to go above the encrypted line.
    // Only put underscores above the letters A to Z
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
