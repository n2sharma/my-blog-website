// lib/blocks.ts
export interface BlockTag {
  name: string;
  image?: string;
  products?: string[];
}

const BLOCK_RE = /\{\{block\s+([^}]+)}}/g; // global
const ATTR_RE = /(\w+)=\"([^\"]+)\"/g;

export function parseBlocks(raw: string) {
  const parts: (string | BlockTag)[] = [];
  let lastIndex = 0;

  raw.replace(BLOCK_RE, (match, attrs, index) => {
    // push text chunk before tag
    if (index > lastIndex) parts.push(raw.slice(lastIndex, index));
    const obj: Record<string, string> = {};
    attrs.replace(ATTR_RE, (_m: string, key: string, val: string) => {
      obj[key] = val;
      return '';
    });
    parts.push({
      name: obj.name ?? 'Untitled',
      image: obj.image,
      products: obj.products?.split(',') ?? [],
    });
    lastIndex = index + match.length;
    return '';
  });
  if (lastIndex < raw.length) parts.push(raw.slice(lastIndex));
  return parts;
}