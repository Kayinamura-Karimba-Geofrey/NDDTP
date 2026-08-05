import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

export interface MerkleNode {
  hash: string;
  left?: MerkleNode;
  right?: MerkleNode;
}

@Injectable()
export class MerkleTreeService {
  /**
   * Builds a Merkle Tree from an array of audit log hashes.
   * Returns the root hash of the tree.
   */
  generateMerkleRoot(hashes: string[]): { root: string; treeDepth: number } {
    if (!hashes || hashes.length === 0) {
      return { root: createHash('sha256').update('EMPTY_BLOCK').digest('hex'), treeDepth: 0 };
    }

    let currentLevel: string[] = [...hashes];
    let depth = 0;

    while (currentLevel.length > 1) {
      const nextLevel: string[] = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = i + 1 < currentLevel.length ? currentLevel[i + 1] : left; // Duplicate if odd number
        const combined = createHash('sha256').update(left + right).digest('hex');
        nextLevel.push(combined);
      }
      currentLevel = nextLevel;
      depth++;
    }

    return { root: currentLevel[0], treeDepth: depth };
  }

  /**
   * Verifies if a given hash is included in a Merkle Root using audit proof path.
   */
  verifyProof(targetHash: string, proofPath: { position: 'left' | 'right'; hash: string }[], expectedRoot: string): boolean {
    let currentHash = targetHash;

    for (const step of proofPath) {
      const combined = step.position === 'left' 
        ? createHash('sha256').update(step.hash + currentHash).digest('hex')
        : createHash('sha256').update(currentHash + step.hash).digest('hex');
      currentHash = combined;
    }

    return currentHash === expectedRoot;
  }
}
