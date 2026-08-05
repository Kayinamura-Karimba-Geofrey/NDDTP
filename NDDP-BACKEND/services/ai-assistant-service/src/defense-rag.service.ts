import { Injectable } from '@nestjs/common';

export interface DefenseSopDocument {
  id: string;
  code: string;
  title: string;
  classification: 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  content: string;
}

const DEFENSE_SOPS: DefenseSopDocument[] = [
  {
    id: 'SOP-001',
    code: 'DEF-ROE-2026',
    title: 'Rules of Engagement - Base Perimeter Defense',
    classification: 'SECRET',
    content: 'In the event of an unauthorized perimeter breach during DEFCON 3 or higher, armed forces are authorized to engage non-compliant hostile actors following three verbal warnings over broadcast speakers.',
  },
  {
    id: 'SOP-002',
    code: 'DEF-CYBER-90',
    title: 'Cyber Intrusion Containment Protocol',
    classification: 'CONFIDENTIAL',
    content: 'Upon detection of unauthorized root access on any microservice host node, immediately isolate the subnet, revoke all JWT bearer tokens, and trigger WORM log seal in audit-service.',
  },
  {
    id: 'SOP-003',
    code: 'DEF-EVAC-12',
    title: 'Tactical Air Evacuation Procedure',
    classification: 'RESTRICTED',
    content: 'Air assets must establish 360 degree security vector prior to touchdown at LZ Bravo. Minimum escort: 2 Armored Gunships.',
  },
];

@Injectable()
export class DefenseRagService {
  querySop(query: string): { matches: DefenseSopDocument[]; generatedResponse: string } {
    const lower = query.toLowerCase();
    const matches = DEFENSE_SOPS.filter(
      (sop) => sop.title.toLowerCase().includes(lower) || sop.content.toLowerCase().includes(lower) || sop.code.toLowerCase().includes(lower)
    );

    if (matches.length === 0) {
      return {
        matches: [],
        generatedResponse: 'No specific military SOP match found in the classified air-gapped database for your query.',
      };
    }

    const primary = matches[0];
    return {
      matches,
      generatedResponse: `[AIR-GAPPED VECTOR RAG ANSWER]\nBased on classified document ${primary.code} (${primary.title}):\n\n"${primary.content}"`,
    };
  }
}
