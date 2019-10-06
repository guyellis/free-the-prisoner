import { createEncryptedFile } from '../../lib/crypto-gen';
import fs, { PathLike } from 'fs';


type ReadFileSync = (path: PathLike | number, options?: { encoding?: null; flag?: string } | null) => Buffer;



jest.mock('fs', () => ({
  readFileSync: jest.fn(() => Buffer.from('Some Random Text')),
  writeFileSync: jest.fn(),
}));

describe('crypt-gen', () => {
    it('generates an encrypted file', () => {
        createEncryptedFile('mountain-lion-cub');
        expect(fs.readFileSync).toHaveBeenCalled();
    });

    it('throws if folder is not provided', () => {
        try {
            createEncryptedFile('');
        } catch(error) {
            expect(error.message).toBe('No folder param specified in createEncryptedFile()');
        }
        expect.assertions(1);
    });
});
