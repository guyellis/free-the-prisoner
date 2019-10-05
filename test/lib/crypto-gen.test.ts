import { createEncryptedFile } from '../../lib/crypto-gen';
import fs from 'fs';

jest.mock('fs');
fs.readFileSync = jest.fn();
fs.writeFileSync = jest.fn();

describe('crypt-gen', () => {
    it('works', () => {
        
    });
});
