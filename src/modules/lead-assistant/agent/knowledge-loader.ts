import { readFile } from 'node:fs/promises';
import path from 'node:path';

const KNOWLEDGE_FILES = [
  'services.md',
  'business-types.md',
  'qualification.md',
  'objections.md',
  'handoff.md',
  'limits.md',
] as const;

const KNOWLEDGE_DIR = path.join(process.cwd(), 'src/modules/lead-assistant/knowledge');

export async function loadSalesKnowledge() {
  const chunks = await Promise.all(
    KNOWLEDGE_FILES.map(async (file) => {
      const content = await readFile(path.join(KNOWLEDGE_DIR, file), 'utf8').catch(() => '');
      return content.trim() ? `## ${file}\n${content.trim()}` : '';
    }),
  );

  return chunks.filter(Boolean).join('\n\n');
}
