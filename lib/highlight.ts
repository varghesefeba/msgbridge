export type Token = { text: string; kind?: TokenKind };
export type TokenKind = "comment" | "string" | "keyword" | "number" | "flag" | "variable" | "punct" | "property";
export type Lang = "shell" | "js" | "python" | "json";

const RULES: Record<Lang, { kind: TokenKind; re: string }[]> = {
  shell: [
    { kind: "comment", re: "#[^\\n]*" },
    { kind: "string", re: "\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'" },
    { kind: "variable", re: "\\$[A-Za-z_][A-Za-z0-9_]*" },
    { kind: "keyword", re: "\\b(?:curl|POST|GET|PUT|DELETE)\\b" },
    { kind: "flag", re: "(?:^|\\s)--?[A-Za-z][A-Za-z-]*" },
    { kind: "punct", re: "[\\\\{}\\[\\]=]" },
  ],
  js: [
    { kind: "comment", re: "//[^\\n]*" },
    { kind: "string", re: "\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`" },
    { kind: "keyword", re: "\\b(?:const|let|var|await|async|function|import|export|from|return|new|if|else|for|of|try|catch|true|false|null|undefined)\\b" },
    { kind: "property", re: "[A-Za-z_$][\\w$]*(?=\\s*:)" },
    { kind: "number", re: "\\b\\d+(?:\\.\\d+)?\\b" },
    { kind: "punct", re: "[{}\\[\\]();,.]" },
  ],
  python: [
    { kind: "comment", re: "#[^\\n]*" },
    { kind: "string", re: "\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'" },
    { kind: "keyword", re: "\\b(?:import|from|def|return|class|if|else|elif|for|in|try|except|with|as|True|False|None)\\b" },
    { kind: "property", re: "[A-Za-z_][\\w]*(?=\\s*=[^=])" },
    { kind: "number", re: "\\b\\d+(?:\\.\\d+)?\\b" },
    { kind: "punct", re: "[{}\\[\\]();,.]" },
  ],
  json: [
    { kind: "property", re: "\"(?:[^\"\\\\]|\\\\.)*\"(?=\\s*:)" },
    { kind: "string", re: "\"(?:[^\"\\\\]|\\\\.)*\"" },
    { kind: "keyword", re: "\\b(?:true|false|null)\\b" },
    { kind: "number", re: "-?\\b\\d+(?:\\.\\d+)?\\b" },
    { kind: "punct", re: "[{}\\[\\]:,]" },
  ],
};

const CACHE = new Map<Lang, RegExp>();

function patternFor(lang: Lang) {
  const cached = CACHE.get(lang);
  if (cached) return cached;
  const re = new RegExp(RULES[lang].map((r, i) => `(?<g${i}>${r.re})`).join("|"), "g");
  CACHE.set(lang, re);
  return re;
}

/** Tokenises source for display. Returns plain data — never HTML — so it is XSS-safe. */
export function tokenize(source: string, lang: Lang): Token[] {
  const rules = RULES[lang];
  const re = patternFor(lang);
  re.lastIndex = 0;

  const tokens: Token[] = [];
  let cursor = 0;

  for (const match of source.matchAll(re)) {
    const index = match.index ?? 0;
    if (index > cursor) tokens.push({ text: source.slice(cursor, index) });

    const groups = match.groups ?? {};
    let kind: TokenKind | undefined;
    for (let i = 0; i < rules.length; i += 1) {
      if (groups[`g${i}`] !== undefined) {
        kind = rules[i].kind;
        break;
      }
    }
    tokens.push({ text: match[0], kind });
    cursor = index + match[0].length;
  }

  if (cursor < source.length) tokens.push({ text: source.slice(cursor) });
  return tokens;
}

export const TOKEN_CLASS: Record<TokenKind, string> = {
  comment: "text-on-dark-6 italic",
  string: "text-[#7FCBEF]",
  keyword: "text-lime font-medium",
  number: "text-ch-voice",
  flag: "text-on-dark-3",
  variable: "text-lime-200",
  punct: "text-on-dark-5",
  property: "text-[#D6DBD0]",
};

export const LANG_OF: Record<string, Lang> = { curl: "shell", node: "js", python: "python", json: "json" };
