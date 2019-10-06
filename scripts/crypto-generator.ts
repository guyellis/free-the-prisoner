#!/usr/bin/env node

import { createEncryptedFile } from '../lib/crypto-gen';

const [,,puzzleFolder] = process.argv;

createEncryptedFile(puzzleFolder);
