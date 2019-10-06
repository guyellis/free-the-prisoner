import { createEncryptedFile } from '../../lib/crypto-gen';
import fs, { PathLike } from 'fs';


type ReadFileSync = (path: PathLike | number, options?: { encoding?: null; flag?: string } | null) => Buffer;

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => new Buffer('Some Random Text')),
  writeFileSync: jest.fn(),
}));

describe('crypt-gen', () => {
    it('works', () => {
        createEncryptedFile({
            inFilePath: 'one',
            outFilePath: 'two',
        });
        expect(fs.readFileSync).toHaveBeenCalled();
    });
});
