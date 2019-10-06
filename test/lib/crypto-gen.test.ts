import { createEncryptedFile, encryptLine } from '../../lib/crypto-gen';
import fs, { PathLike } from 'fs';

type ReadFileSync = (
  path: PathLike | number,
  options?: { encoding?: null; flag?: string } | null
) => Buffer;

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
    } catch (error) {
      expect(error.message).toBe(
        'No folder param specified in createEncryptedFile()'
      );
    }
    expect.assertions(1);
  });

  it('consistently encrypts with same encrypt map', () => {
    const line = 'SOME KNOWN TEXT';
    const keyMap = {
        E: 'A',
        K: 'N',
        M: 'U',
        N: 'H',
        O: 'V',
        S: 'X',
        T: 'M',
        W: 'Q',
        X: 'F',
    };
    const encryptMap = {
        A: 'E',
        F: 'X',
        H: 'N',
        M: 'T',
        N: 'K',
        Q: 'W',
        U: 'M',
        V: 'O',
        X: 'S',
    };
    const encryptedLine = encryptLine({ line, keyMap, encryptMap });
    expect(encryptedLine).toMatchInlineSnapshot(
      `"X V U A   N H V Q H   M A F M"`
    );
  });
});
