#!/usr/bin/env node

import path from 'path';
import { createEncryptedFile } from '../lib/crypto-gen';

const inFilePath = path.join(__dirname, '../puzzles/mountain-lion-cub/cryptograms.txt')
const outFilePath = path.join(__dirname, '../puzzles/mountain-lion-cub/printables/cryptograms.txt')

createEncryptedFile({ inFilePath, outFilePath });
