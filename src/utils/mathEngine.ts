/**
 * Robust Mathematical Engine for Polynomial Remainder Theorem,
 * Factor Theorem, Synthetic Division, Ruffini's Rule, and Polynomial Long Division.
 * Includes character-precise syntax diagnostics, parametric variable support,
 * batch candidate evaluation, and comparative analytics.
 */

export interface Fraction {
  n: number; // numerator
  d: number; // denominator (always > 0)
}

export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

export function createFraction(n: number, d = 1): Fraction {
  if (d === 0) throw new Error("Denominator cannot be zero");
  if (d < 0) {
    n = -n;
    d = -d;
  }

  if (!Number.isInteger(n) || !Number.isInteger(d)) {
    const val = n / d;
    if (Math.abs(val) < 1e-12) return { n: 0, d: 1 };

    let bestN = Math.round(val);
    let bestD = 1;
    let minErr = Math.abs(val - bestN);

    for (let den = 1; den <= 1000; den++) {
      const num = Math.round(val * den);
      const err = Math.abs(val - num / den);
      if (err < minErr) {
        minErr = err;
        bestN = num;
        bestD = den;
        if (err < 1e-7) break;
      }
    }
    const g = gcd(bestN, bestD);
    return { n: Math.round(bestN / g), d: Math.round(bestD / g) };
  }

  const g = gcd(n, d);
  return { n: Math.round(n / g), d: Math.round(d / g) };
}

export function addFractions(a: Fraction, b: Fraction): Fraction {
  return createFraction(a.n * b.d + b.n * a.d, a.d * b.d);
}

export function subFractions(a: Fraction, b: Fraction): Fraction {
  return createFraction(a.n * b.d - b.n * a.d, a.d * b.d);
}

export function multFractions(a: Fraction, b: Fraction): Fraction {
  return createFraction(a.n * b.n, a.d * b.d);
}

export function divFractions(a: Fraction, b: Fraction): Fraction {
  if (b.n === 0) throw new Error("Division by zero");
  return createFraction(a.n * b.d, a.d * b.n);
}

export function fractionToDecimal(f: Fraction): number {
  return f.n / f.d;
}

export function formatFraction(f: Fraction): string {
  if (f.d === 1) return `${f.n}`;
  return `${f.n}/${f.d}`;
}

export function formatFractionLatex(f: Fraction): string {
  if (f.d === 1) return `${f.n}`;
  if (f.n < 0) return `-\\frac{${Math.abs(f.n)}}{${f.d}}`;
  return `\\frac{${f.n}}{${f.d}}`;
}

export interface Polynomial {
  coefficients: number[]; // From highest power down to x^0 [a_n, a_{n-1}, ..., a_0]
  degree: number;
  variable: string;
}

export interface ParseDiagnostic {
  isError: boolean;
  code: string;
  message: string;
  detail?: string;
  position?: number; // 0-based character index
  length?: number;
  caretSnippet?: string; // Formatted visual pointer
  highlightSnippet?: string;
  suggestion?: string;
  quickFix?: string; // Proposed automatic correction
}

/**
 * Normalizes mathematical characters, superscripts, and operators while preserving length/indices when possible.
 */
export function normalizeMathString(input: string): string {
  const superscriptMap: Record<string, string> = {
    '⁰': '^0', '¹': '^1', '²': '^2', '³': '^3', '⁴': '^4',
    '⁵': '^5', '⁶': '^6', '⁷': '^7', '⁸': '^8', '⁹': '^9',
  };

  let str = input;
  for (const [sup, std] of Object.entries(superscriptMap)) {
    str = str.split(sup).join(std);
  }

  return str
    .replace(/\*\*/g, '^')
    .replace(/[−–—]/g, '-')
    .replace(/[·×*]/g, '*');
}

/**
 * Generates an ASCII caret string pointing to an error position
 */
export function createCaretSnippet(input: string, position: number, length = 1): string {
  const line = input;
  const clampedPos = Math.max(0, Math.min(position, input.length));
  const pointer = ' '.repeat(clampedPos) + '^'.repeat(Math.max(1, length));
  return `${line}\n${pointer}`;
}

/**
 * Analyzes string syntax and returns detailed diagnostics with caret pointers
 */
export function diagnoseExpressionSyntax(input: string, variable = 'x'): ParseDiagnostic | null {
  const raw = input.trim();
  if (!raw) {
    return {
      isError: true,
      code: 'EMPTY_INPUT',
      message: '输入为空 (Input expression is empty)',
      detail: `请输入关于变量 ${variable} 的多项式，例如: 2${variable}^3 - 4${variable}^2 + 3${variable} - 5`,
    };
  }

  const normalized = normalizeMathString(raw);
  const varLower = variable.toLowerCase();

  // 1. Check for unexpected symbols
  const validCharRegex = /^[0-9a-zA-Z+\-^./*()\sθ]+$/;
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (!validCharRegex.test(ch)) {
      return {
        isError: true,
        code: 'ILLEGAL_CHARACTER',
        message: `包含非法字符 '${ch}' (Unexpected character)`,
        detail: `位置 ${i + 1} 发现符号 '${ch}'。多项式仅支持数字、变量 ${variable}、算术运算符 (+, -, *, /, ^) 与括号。`,
        position: i,
        length: 1,
        caretSnippet: createCaretSnippet(normalized, i, 1),
        quickFix: normalized.replace(new RegExp(`\\${ch}`, 'g'), ''),
      };
    }
  }

  // 2. Check for unmatched parentheses
  let parenDepth = 0;
  const parenStack: number[] = [];
  for (let i = 0; i < normalized.length; i++) {
    if (normalized[i] === '(') {
      parenDepth++;
      parenStack.push(i);
    } else if (normalized[i] === ')') {
      if (parenDepth === 0) {
        return {
          isError: true,
          code: 'UNMATCHED_CLOSE_PAREN',
          message: '多余的闭括号 \')\' (Unmatched closing parenthesis)',
          detail: `位置 ${i + 1} 出现未匹配的 ')'，前面没有对应的 '('。`,
          position: i,
          length: 1,
          caretSnippet: createCaretSnippet(normalized, i, 1),
          quickFix: normalized.slice(0, i) + normalized.slice(i + 1),
        };
      }
      parenDepth--;
      parenStack.pop();
    }
  }
  if (parenDepth > 0) {
    const openIdx = parenStack[parenStack.length - 1];
    return {
      isError: true,
      code: 'UNCLOSED_PAREN',
      message: '缺少闭括号 \')\' (Unclosed opening parenthesis)',
      detail: `位置 ${openIdx + 1} 打开的 '(' 未正确闭合。`,
      position: openIdx,
      length: 1,
      caretSnippet: createCaretSnippet(normalized, openIdx, 1),
      quickFix: normalized + ')'.repeat(parenDepth),
    };
  }

  // 3. Consecutive operators check (e.g. ^^, ++, **, --)
  const consecMatch = normalized.match(/(\^{2,}|\*{2,}|\+{2,}|--|\+\-|\-\+|\/\*|\*\/)/);
  if (consecMatch && consecMatch.index !== undefined) {
    const idx = consecMatch.index;
    const seq = consecMatch[0];
    let fix = '';
    if (seq.startsWith('^')) fix = '^';
    else if (seq === '--') fix = '+';
    else if (seq === '+-') fix = '-';
    else if (seq === '++') fix = '+';
    else fix = seq[0];

    return {
      isError: true,
      code: 'CONSECUTIVE_OPERATORS',
      message: `连续多余运算符 '${seq}' (Consecutive arithmetic operators)`,
      detail: `位置 ${idx + 1} 出现连续运算符 '${seq}'，请删除重复符号或用括号分组。`,
      position: idx,
      length: seq.length,
      caretSnippet: createCaretSnippet(normalized, idx, seq.length),
      quickFix: normalized.slice(0, idx) + fix + normalized.slice(idx + seq.length),
    };
  }

  // 4. Trailing operator check (e.g. "3x +")
  const trailingMatch = normalized.match(/[+\-*^/]\s*$/);
  if (trailingMatch && trailingMatch.index !== undefined) {
    const idx = trailingMatch.index;
    const op = normalized[idx];
    return {
      isError: true,
      code: 'DANGLING_OPERATOR',
      message: `末尾遗漏操作数 (Dangling trailing operator '${op}')`,
      detail: `多项式末尾发现未完成的运算符 '${op}'，请补充后续数值、项或删除此符号。`,
      position: idx,
      length: 1,
      caretSnippet: createCaretSnippet(normalized, idx, 1),
      quickFix: normalized.slice(0, idx).trimEnd(),
    };
  }

  // 5. Dangling exponent check (e.g. "3x^ - 2" or "x^")
  const dangExpMatch = normalized.match(/\^\s*([+\-*/()])/);
  if (dangExpMatch && dangExpMatch.index !== undefined) {
    const idx = dangExpMatch.index;
    return {
      isError: true,
      code: 'DANGLING_EXPONENT',
      message: "指数符 '^' 后缺少数字 (Incomplete exponent after '^')",
      detail: `位置 ${idx + 1} 的 '^' 后面没有具体的整数指数。例如: 应书写为 3${variable}^2 而非 3${variable}^`,
      position: idx,
      length: 1,
      caretSnippet: createCaretSnippet(normalized, idx, 1),
      suggestion: `3${variable}^2`,
      quickFix: normalized.slice(0, idx + 1) + '2' + normalized.slice(idx + 1),
    };
  }

  // 6. Variable mismatch check (e.g. user typed 'y' when active variable is 'x')
  const letterMatches = normalized.match(/[a-zA-Zθ]/g) || [];
  const foreignLetters = Array.from(new Set(letterMatches.filter(l => l.toLowerCase() !== varLower)));
  if (foreignLetters.length > 0) {
    const foreign = foreignLetters[0];
    const pos = normalized.indexOf(foreign);
    return {
      isError: true,
      code: 'VARIABLE_MISMATCH',
      message: `检测到不同变量 '${foreign}' (Variable mismatch)`,
      detail: `当前计算设定的自变量为 '${variable}'，但输入中发现了变量 '${foreign}'。您可以一键切换自变量为 '${foreign}'，或将 '${foreign}' 替换为 '${variable}'。`,
      position: pos,
      length: 1,
      caretSnippet: createCaretSnippet(normalized, pos, 1),
      suggestion: foreign,
      quickFix: normalized.replace(new RegExp(foreign, 'g'), variable),
    };
  }

  return null;
}

function parseCoeff(str: string): number {
  str = str.trim();
  if (str.includes('/')) {
    const parts = str.split('/');
    if (parts.length === 2) {
      const n = parseFloat(parts[0]);
      const d = parseFloat(parts[1]);
      if (!isNaN(n) && !isNaN(d) && d !== 0) return n / d;
    }
  }
  return parseFloat(str);
}

/**
 * Robust parser for polynomials with detailed syntax diagnostics
 */
export function parsePolynomial(
  input: string,
  variable = 'x'
): { poly: Polynomial | null; error: string | null; diagnostic: ParseDiagnostic | null } {
  try {
    const diag = diagnoseExpressionSyntax(input, variable);
    if (diag && diag.isError) {
      return { poly: null, error: diag.message, diagnostic: diag };
    }

    const clean = normalizeMathString(input).replace(/\s+/g, '');
    let s = clean;
    if (s.startsWith('(') && s.endsWith(')') && !s.includes(')(')) {
      s = s.slice(1, -1);
    }

    const varLetter = variable.toLowerCase();

    // Split into terms while preserving signs: 2x^3 - 4x^2 + 3x - 5
    const termRegex = /([+-]?[^+-]+)/g;
    const matches = s.match(termRegex);
    if (!matches || matches.length === 0) {
      return {
        poly: null,
        error: "无法解析多项式项 (Unable to parse terms)",
        diagnostic: {
          isError: true,
          code: 'NO_TERMS',
          message: '无法解析有效多项式项',
          detail: '请检查输入的各项符号与系数',
        },
      };
    }

    const powerMap: { [pow: number]: number } = {};
    let maxDegree = 0;

    for (const rawTerm of matches) {
      if (!rawTerm) continue;
      const term = rawTerm.replace(/\*/g, '');
      const vIndex = term.toLowerCase().indexOf(varLetter);

      if (vIndex === -1) {
        // Constant term
        const val = parseCoeff(term);
        if (isNaN(val)) {
          return {
            poly: null,
            error: `无效常数项: ${term}`,
            diagnostic: {
              isError: true,
              code: 'INVALID_CONSTANT',
              message: `无效常数项: '${term}'`,
              detail: `无法将 '${term}' 解析为有效实数或分数`,
            },
          };
        }
        powerMap[0] = (powerMap[0] || 0) + val;
      } else {
        // Variable term
        const coeffPart = term.substring(0, vIndex);
        let coeff = 1;
        if (coeffPart === '' || coeffPart === '+') coeff = 1;
        else if (coeffPart === '-') coeff = -1;
        else {
          coeff = parseCoeff(coeffPart);
          if (isNaN(coeff)) {
            return {
              poly: null,
              error: `项 '${term}' 的系数无效`,
              diagnostic: {
                isError: true,
                code: 'INVALID_COEFF',
                message: `项 '${term}' 的系数格式不正确`,
                detail: `系数部分 '${coeffPart}' 无法转换为数值`,
              },
            };
          }
        }

        const afterVar = term.substring(vIndex + 1);
        let power = 1;
        if (afterVar.startsWith('^')) {
          const powStr = afterVar.substring(1);
          if (powStr.includes('.') || powStr.includes('/')) {
            return {
              poly: null,
              error: `多项式指数必须是非负整数，不能是小数或分数: ${powStr}`,
              diagnostic: {
                isError: true,
                code: 'NON_INTEGER_POWER',
                message: `指数 '${powStr}' 非整数`,
                detail: '多项式的幂次严格要求为非负整数 (0, 1, 2, ...)',
              },
            };
          }
          power = parseInt(powStr, 10);
          if (isNaN(power) || power < 0) {
            return {
              poly: null,
              error: `项 '${term}' 的指数无效`,
              diagnostic: {
                isError: true,
                code: 'INVALID_EXPONENT',
                message: `指数 '${powStr}' 无效`,
                detail: '多项式各幂次必须为正整数或 0',
              },
            };
          }
        } else if (afterVar !== '') {
          return {
            poly: null,
            error: `变量 '${variable}' 后的字符无效: '${afterVar}'`,
            diagnostic: {
              isError: true,
              code: 'EXTRA_CHARS_AFTER_VAR',
              message: `变量后出现异常字符 '${afterVar}'`,
              detail: `若表示指数请加 '^'，例如 '${variable}^2'`,
              quickFix: input.replace(term, `${coeffPart}${variable}^${afterVar}`),
            },
          };
        }

        if (power > 30) {
          return {
            poly: null,
            error: "最高支持 30 次多项式 (Maximum supported degree is 30)",
            diagnostic: {
              isError: true,
              code: 'DEGREE_EXCEEDED',
              message: '多项式次数过高 (最高支持 30 次)',
              detail: `检测到 ${power} 次项。为保证浏览器计算精度与图表渲染速度，请使用不超过 30 次的多项式。`,
            },
          };
        }

        maxDegree = Math.max(maxDegree, power);
        powerMap[power] = (powerMap[power] || 0) + coeff;
      }
    }

    // Strip leading zero coefficients
    while (maxDegree > 0 && Math.abs(powerMap[maxDegree] || 0) < 1e-9) {
      maxDegree--;
    }

    const coefficients: number[] = [];
    for (let p = maxDegree; p >= 0; p--) {
      coefficients.push(powerMap[p] || 0);
    }

    return {
      poly: {
        coefficients,
        degree: maxDegree,
        variable,
      },
      error: null,
      diagnostic: null,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      poly: null,
      error: `多项式解析错误: ${msg}`,
      diagnostic: {
        isError: true,
        code: 'PARSER_EXCEPTION',
        message: '解析多项式出现异常，请检查语法格式',
        detail: msg,
      },
    };
  }
}

export function formatPolynomial(poly: Polynomial): string {
  const { coefficients, degree, variable } = poly;
  if (!coefficients || coefficients.length === 0) return "0";

  const terms: string[] = [];
  for (let i = 0; i < coefficients.length; i++) {
    const c = coefficients[i];
    const power = degree - i;

    if (Math.abs(c) < 1e-9) {
      if (terms.length === 0 && i === coefficients.length - 1) {
        terms.push("0");
      }
      continue;
    }

    const isFirst = terms.length === 0;
    const sign = c < 0 ? "-" : (isFirst ? "" : "+");
    const absC = Math.abs(c);
    const frac = createFraction(absC);
    const absCStr = frac.d === 1 ? `${frac.n}` : `${frac.n}/${frac.d}`;

    let termStr = "";
    if (power === 0) {
      termStr = `${absCStr}`;
    } else if (power === 1) {
      termStr = absC === 1 ? `${variable}` : `${absCStr}${variable}`;
    } else {
      termStr = absC === 1 ? `${variable}^${power}` : `${absCStr}${variable}^${power}`;
    }

    if (sign === "+") {
      terms.push(`+ ${termStr}`);
    } else if (sign === "-") {
      terms.push(isFirst ? `-${termStr}` : `- ${termStr}`);
    } else {
      terms.push(termStr);
    }
  }

  return terms.join(" ") || "0";
}

export function formatPolynomialLatex(poly: Polynomial): string {
  const { coefficients, degree, variable } = poly;
  if (!coefficients || coefficients.length === 0) return "0";

  const terms: string[] = [];
  for (let i = 0; i < coefficients.length; i++) {
    const c = coefficients[i];
    const power = degree - i;

    if (Math.abs(c) < 1e-9) {
      if (terms.length === 0 && i === coefficients.length - 1) {
        terms.push("0");
      }
      continue;
    }

    const isFirst = terms.length === 0;
    const sign = c < 0 ? "-" : (isFirst ? "" : "+");
    const absC = Math.abs(c);
    const frac = createFraction(absC);
    const absCStr = frac.d === 1 ? `${frac.n}` : `\\frac{${frac.n}}{${frac.d}}`;

    let termStr = "";
    if (power === 0) {
      termStr = `${absCStr}`;
    } else if (power === 1) {
      termStr = absC === 1 ? `${variable}` : `${absCStr}${variable}`;
    } else {
      termStr = absC === 1 ? `${variable}^{${power}}` : `${absCStr}${variable}^{${power}}`;
    }

    if (sign === "+") {
      terms.push(`+ ${termStr}`);
    } else if (sign === "-") {
      terms.push(isFirst ? `-${termStr}` : `- ${termStr}`);
    } else {
      terms.push(termStr);
    }
  }

  return terms.join(" ") || "0";
}

export interface DivisorInfo {
  a: number; // coefficient of variable
  b: number; // ax - b = 0 => x = b/a
  c: number; // root c = b / a
  cFraction: Fraction;
  divisorString: string;
  divisorLatex: string;
  isLinear: boolean;
  rawPoly?: Polynomial;
}

/**
 * Parse divisor string:
 * - "x - 2" => a = 1, b = 2, c = 2
 * - "2x - 1" => a = 2, b = 1, c = 0.5
 * - "2" (direct root c = 2)
 * - "3/2" (direct fraction root c = 1.5)
 * - Higher degree polynomial e.g. "x^2 - 1" for polynomial long division
 */
export function parseDivisor(
  input: string,
  variable = 'x'
): { divisor: DivisorInfo | null; error: string | null; diagnostic: ParseDiagnostic | null } {
  try {
    const diag = diagnoseExpressionSyntax(input, variable);
    if (diag && diag.isError) {
      return { divisor: null, error: diag.message, diagnostic: diag };
    }

    let clean = normalizeMathString(input).replace(/[\s()]/g, '');
    clean = clean.replace(new RegExp(`^[${variable}c]=`, 'i'), '').replace(/=0$/i, '');
    if (!clean) {
      return {
        divisor: null,
        error: `请输入除式 (如 ${variable} - 2, 2${variable} - 1 或数值 3)`,
        diagnostic: {
          isError: true,
          code: 'EMPTY_DIVISOR',
          message: '除式为空',
          detail: `请输入形如 ${variable} - c 的一次除式，或用于长除法的高次多项式。`,
        },
      };
    }

    // Check for division by zero
    if (clean === '0') {
      return {
        divisor: null,
        error: "除式不能为零 (Division by zero polynomial is undefined)",
        diagnostic: {
          isError: true,
          code: 'ZERO_DIVISOR',
          message: '除式不能为 0',
          detail: '根据代数基本定理与除法算式，除式必须为非零多项式。',
        },
      };
    }

    // 1. Direct number e.g. "2", "-3", "1.5"
    if (/^[+-]?[0-9]+(\.[0-9]+)?$/.test(clean)) {
      const c = parseFloat(clean);
      const frac = createFraction(c);
      const divStr = c >= 0
        ? `${variable} - ${formatFraction(frac)}`
        : `${variable} + ${formatFraction(createFraction(Math.abs(frac.n), frac.d))}`;
      return {
        divisor: {
          a: 1,
          b: c,
          c,
          cFraction: frac,
          divisorString: divStr,
          divisorLatex: divStr,
          isLinear: true,
        },
        error: null,
        diagnostic: null,
      };
    }

    // 2. Direct fraction e.g. "3/2", "-1/3"
    if (/^[+-]?[0-9]+\/[0-9]+$/.test(clean)) {
      const parts = clean.split('/');
      const n = parseInt(parts[0], 10);
      const d = parseInt(parts[1], 10);
      if (d === 0) {
        return {
          divisor: null,
          error: "分母不能为 0",
          diagnostic: { isError: true, code: 'ZERO_DENOMINATOR', message: '分母不能为 0' },
        };
      }
      const frac = createFraction(n, d);
      const c = frac.n / frac.d;
      const fracLatex = formatFractionLatex(createFraction(Math.abs(frac.n), frac.d));
      const divStr = c >= 0
        ? `${variable} - ${formatFraction(frac)}`
        : `${variable} + ${formatFraction(createFraction(Math.abs(frac.n), frac.d))}`;
      const divLatex = c >= 0 ? `${variable} - ${fracLatex}` : `${variable} + ${fracLatex}`;
      return {
        divisor: {
          a: 1,
          b: c,
          c,
          cFraction: frac,
          divisorString: divStr,
          divisorLatex: divLatex,
          isLinear: true,
        },
        error: null,
        diagnostic: null,
      };
    }

    // 3. Divisor contains variable
    const polyParsed = parsePolynomial(clean, variable);
    if (polyParsed.error || !polyParsed.poly) {
      return { divisor: null, error: polyParsed.error || "无法解析除式", diagnostic: polyParsed.diagnostic };
    }

    const poly = polyParsed.poly;
    if (poly.degree === 0 && Math.abs(poly.coefficients[0]) < 1e-9) {
      return {
        divisor: null,
        error: "除式不能为零 (Divisor cannot be zero polynomial)",
        diagnostic: { isError: true, code: 'ZERO_DIVISOR', message: '除式不能为 0' },
      };
    }

    if (poly.degree === 1) {
      const a = poly.coefficients[0];
      const constant = poly.coefficients[1] || 0;
      const b = -constant;
      const c = b / a;
      const cFraction = createFraction(b, a);

      const divStr = formatPolynomial(poly);
      const divLatex = formatPolynomialLatex(poly);

      return {
        divisor: {
          a,
          b,
          c,
          cFraction,
          divisorString: divStr,
          divisorLatex: divLatex,
          isLinear: true,
          rawPoly: poly,
        },
        error: null,
        diagnostic: null,
      };
    }

    // Degree 2 or higher (Linear for Remainder Theorem, but fully valid for Polynomial Long Division)
    const divStr = formatPolynomial(poly);
    const divLatex = formatPolynomialLatex(poly);
    return {
      divisor: {
        a: poly.coefficients[0],
        b: 0,
        c: 0,
        cFraction: createFraction(0, 1),
        divisorString: divStr,
        divisorLatex: divLatex,
        isLinear: false,
        rawPoly: poly,
      },
      error: null,
      diagnostic: null,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      divisor: null,
      error: `除式解析错误: ${msg}`,
      diagnostic: {
        isError: true,
        code: 'DIVISOR_EXCEPTION',
        message: '除式解析异常，请检查格式',
        detail: msg,
      },
    };
  }
}

export interface RemainderTheoremResult {
  c: number;
  cFraction: Fraction;
  remainder: number;
  remainderFraction: Fraction;
  steps: {
    power: number;
    coeff: number;
    cPowerVal: number;
    cPowerFraction: Fraction;
    termVal: number;
    termFraction: Fraction;
    latex: string;
  }[];
  directSubstitutionLatex: string;
  expandedCalculationLatex: string;
  isFactor: boolean;
}

export function evaluateRemainderTheorem(poly: Polynomial, divisor: DivisorInfo): RemainderTheoremResult {
  const { coefficients, degree, variable } = poly;
  const c = divisor.c;
  const cFrac = divisor.cFraction;

  const steps = [];
  let totalFraction = createFraction(0, 1);
  const subTermsLatex: string[] = [];
  const calcTermsLatex: string[] = [];

  for (let i = 0; i < coefficients.length; i++) {
    const coeff = coefficients[i];
    const power = degree - i;

    if (Math.abs(coeff) < 1e-9) continue;

    let cPowerFraction = createFraction(1, 1);
    for (let p = 0; p < power; p++) {
      cPowerFraction = multFractions(cPowerFraction, cFrac);
    }
    const cPowerVal = fractionToDecimal(cPowerFraction);

    const coeffFraction = createFraction(coeff);
    const termFraction = multFractions(coeffFraction, cPowerFraction);
    const termVal = fractionToDecimal(termFraction);

    totalFraction = addFractions(totalFraction, termFraction);

    const cDisplay = cFrac.d === 1 ? `${cFrac.n}` : `\\left(${formatFractionLatex(cFrac)}\\right)`;
    let subLatex = '';
    if (power === 0) {
      subLatex = coeff < 0 ? `(${coeff})` : `${coeff}`;
    } else if (power === 1) {
      subLatex = coeff === 1 ? `${cDisplay}` : coeff === -1 ? `-${cDisplay}` : `${coeff}(${cDisplay})`;
    } else {
      subLatex = coeff === 1 ? `${cDisplay}^{${power}}` : coeff === -1 ? `-${cDisplay}^{${power}}` : `${coeff}${cDisplay}^{${power}}`;
    }
    subTermsLatex.push(subLatex);

    const termDisplayLatex = formatFractionLatex(termFraction);
    calcTermsLatex.push(termFraction.n < 0 ? `(${termDisplayLatex})` : termDisplayLatex);

    steps.push({
      power,
      coeff,
      cPowerVal,
      cPowerFraction,
      termVal,
      termFraction,
      latex: subLatex,
    });
  }

  const remainder = fractionToDecimal(totalFraction);
  const isFactor = Math.abs(remainder) < 1e-7;

  let directSubstitutionLatex = subTermsLatex.join(" + ").replace(/\+\s*\-/g, "- ");
  let expandedCalculationLatex = calcTermsLatex.join(" + ").replace(/\+\s*\-/g, "- ");

  return {
    c,
    cFraction: cFrac,
    remainder,
    remainderFraction: totalFraction,
    steps,
    directSubstitutionLatex,
    expandedCalculationLatex,
    isFactor,
  };
}

export interface SyntheticStep {
  columnIndex: number;
  degree: number;
  coeff: number;
  carriedDown: number;
  carriedFraction: Fraction;
  product: number;
  productFraction: Fraction;
  sum: number;
  sumFraction: Fraction;
}

export interface SyntheticDivisionResult {
  c: number;
  cFraction: Fraction;
  aCoeff: number;
  steps: SyntheticStep[];
  topRow: number[];
  middleRow: number[];
  middleRowFractions: Fraction[];
  bottomRow: number[];
  bottomRowFractions: Fraction[];
  quotientCoeffs: number[];
  quotientCoeffsFractions: Fraction[];
  quotientPoly: Polynomial;
  remainder: number;
  remainderFraction: Fraction;
  isFactor: boolean;
  nonMonicDivisor: boolean;
  summaryIdentityLatex: string;
}

export function performSyntheticDivision(poly: Polynomial, divisor: DivisorInfo): SyntheticDivisionResult {
  const { coefficients, degree, variable } = poly;
  const cFrac = divisor.cFraction;
  const a = divisor.a;
  const isNonMonic = Math.abs(a - 1) > 1e-9;

  const topRow = [...coefficients];
  const middleRow: number[] = [0];
  const middleRowFractions: Fraction[] = [createFraction(0, 1)];
  const bottomRow: number[] = [];
  const bottomRowFractions: Fraction[] = [];
  const steps: SyntheticStep[] = [];

  let currentBottomFrac = createFraction(topRow[0]);
  bottomRow.push(fractionToDecimal(currentBottomFrac));
  bottomRowFractions.push(currentBottomFrac);

  steps.push({
    columnIndex: 0,
    degree: degree,
    coeff: topRow[0],
    carriedDown: topRow[0],
    carriedFraction: currentBottomFrac,
    product: 0,
    productFraction: createFraction(0, 1),
    sum: topRow[0],
    sumFraction: currentBottomFrac,
  });

  for (let i = 1; i < topRow.length; i++) {
    const productFrac = multFractions(currentBottomFrac, cFrac);
    middleRow.push(fractionToDecimal(productFrac));
    middleRowFractions.push(productFrac);

    const coeffFrac = createFraction(topRow[i]);
    const sumFrac = addFractions(coeffFrac, productFrac);
    bottomRow.push(fractionToDecimal(sumFrac));
    bottomRowFractions.push(sumFrac);

    steps.push({
      columnIndex: i,
      degree: degree - i,
      coeff: topRow[i],
      carriedDown: topRow[i],
      carriedFraction: coeffFrac,
      product: fractionToDecimal(productFrac),
      productFraction: productFrac,
      sum: fractionToDecimal(sumFrac),
      sumFraction: sumFrac,
    });

    currentBottomFrac = sumFrac;
  }

  const rawQuotientFractions = bottomRowFractions.slice(0, -1);
  const rawQuotient = bottomRow.slice(0, -1);
  const remainderFraction = bottomRowFractions[bottomRowFractions.length - 1];
  const remainder = fractionToDecimal(remainderFraction);

  const quotientCoeffsFractions: Fraction[] = [];
  const quotientCoeffs: number[] = [];

  for (const qf of rawQuotientFractions) {
    const adjusted = divFractions(qf, createFraction(a));
    quotientCoeffsFractions.push(adjusted);
    quotientCoeffs.push(fractionToDecimal(adjusted));
  }

  const quotientPoly: Polynomial = {
    coefficients: quotientCoeffs,
    degree: Math.max(0, degree - 1),
    variable,
  };

  const isFactor = Math.abs(remainder) < 1e-7;

  const pLatex = formatPolynomialLatex(poly);
  const dLatex = divisor.divisorLatex;
  const qLatex = formatPolynomialLatex(quotientPoly);
  const rLatex = remainderFraction.d === 1 ? `${remainderFraction.n}` : formatFractionLatex(remainderFraction);

  let summaryIdentityLatex = `${pLatex} = (${dLatex})(${qLatex})`;
  if (!isFactor) {
    if (remainder > 0) {
      summaryIdentityLatex += ` + ${rLatex}`;
    } else {
      summaryIdentityLatex += ` - ${formatFractionLatex(createFraction(Math.abs(remainderFraction.n), remainderFraction.d))}`;
    }
  }

  return {
    c: divisor.c,
    cFraction: cFrac,
    aCoeff: a,
    steps,
    topRow,
    middleRow,
    middleRowFractions,
    bottomRow,
    bottomRowFractions,
    quotientCoeffs,
    quotientCoeffsFractions,
    quotientPoly,
    remainder,
    remainderFraction,
    isFactor,
    nonMonicDivisor: isNonMonic,
    summaryIdentityLatex,
  };
}

export interface LongDivisionStep {
  stepIndex: number;
  quotientTermCoeff: number;
  quotientTermDegree: number;
  quotientTermLatex: string;
  multipliedPoly: Polynomial;
  subtractionResultPoly: Polynomial;
  broughtDownTerm?: string;
  explanation: string;
}

export interface PolynomialLongDivisionResult {
  dividendPoly: Polynomial;
  divisorPoly: Polynomial;
  quotientPoly: Polynomial;
  remainderPoly: Polynomial;
  remainderVal: number;
  steps: LongDivisionStep[];
  isFactor: boolean;
  identityLatex: string;
}

export function performPolynomialLongDivision(
  dividend: Polynomial,
  divisor: DivisorInfo
): PolynomialLongDivisionResult {
  const v = dividend.variable;
  const divisorPoly: Polynomial = divisor.rawPoly || {
    coefficients: [divisor.a, -divisor.b],
    degree: 1,
    variable: v,
  };

  const divCoeffs = divisorPoly.coefficients;
  const divDeg = divisorPoly.degree;
  const divLead = divCoeffs[0];

  const steps: LongDivisionStep[] = [];
  let currentWorkingCoeffs = [...dividend.coefficients];
  const quotientCoeffs: number[] = [];

  const initialQuotientDeg = dividend.degree - divDeg;
  if (initialQuotientDeg < 0) {
    return {
      dividendPoly: dividend,
      divisorPoly,
      quotientPoly: { coefficients: [0], degree: 0, variable: v },
      remainderPoly: dividend,
      remainderVal: dividend.coefficients[dividend.coefficients.length - 1] || 0,
      steps: [],
      isFactor: false,
      identityLatex: `${formatPolynomialLatex(dividend)} = (${formatPolynomialLatex(divisorPoly)})(0) + (${formatPolynomialLatex(dividend)})`,
    };
  }

  let stepCount = 0;
  while (currentWorkingCoeffs.length >= divCoeffs.length && stepCount < 20) {
    stepCount++;
    const currentLead = currentWorkingCoeffs[0];
    const currentDeg = currentWorkingCoeffs.length - 1;
    const termDegree = currentDeg - divDeg;

    if (Math.abs(currentLead) < 1e-9) {
      currentWorkingCoeffs.shift();
      quotientCoeffs.push(0);
      continue;
    }

    const termCoeff = currentLead / divLead;
    quotientCoeffs.push(termCoeff);

    const multCoeffs: number[] = [];
    for (const c of divCoeffs) {
      multCoeffs.push(c * termCoeff);
    }

    const nextWorkingCoeffs: number[] = [];
    for (let i = 0; i < divCoeffs.length; i++) {
      const diff = currentWorkingCoeffs[i] - multCoeffs[i];
      if (i > 0) nextWorkingCoeffs.push(diff);
    }
    for (let i = divCoeffs.length; i < currentWorkingCoeffs.length; i++) {
      nextWorkingCoeffs.push(currentWorkingCoeffs[i]);
    }

    const termPoly: Polynomial = {
      coefficients: [termCoeff],
      degree: termDegree,
      variable: v,
    };
    const multPoly: Polynomial = {
      coefficients: multCoeffs,
      degree: currentDeg,
      variable: v,
    };
    const subPoly: Polynomial = {
      coefficients: nextWorkingCoeffs.length > 0 ? nextWorkingCoeffs : [0],
      degree: Math.max(0, nextWorkingCoeffs.length - 1),
      variable: v,
    };

    steps.push({
      stepIndex: stepCount,
      quotientTermCoeff: termCoeff,
      quotientTermDegree: termDegree,
      quotientTermLatex: formatPolynomialLatex(termPoly),
      multipliedPoly: multPoly,
      subtractionResultPoly: subPoly,
      explanation: `首项相除: (${formatPolynomialLatex({ coefficients: [currentLead], degree: currentDeg, variable: v })}) ÷ (${formatPolynomialLatex({ coefficients: [divLead], degree: divDeg, variable: v })}) = ${formatPolynomialLatex(termPoly)}`,
    });

    currentWorkingCoeffs = nextWorkingCoeffs;
    while (currentWorkingCoeffs.length > 0 && Math.abs(currentWorkingCoeffs[0]) < 1e-9) {
      currentWorkingCoeffs.shift();
    }
  }

  const quotientPoly: Polynomial = {
    coefficients: quotientCoeffs.length > 0 ? quotientCoeffs : [0],
    degree: Math.max(0, dividend.degree - divDeg),
    variable: v,
  };

  const remDegree = Math.max(0, currentWorkingCoeffs.length - 1);
  const remainderPoly: Polynomial = {
    coefficients: currentWorkingCoeffs.length > 0 ? currentWorkingCoeffs : [0],
    degree: remDegree,
    variable: v,
  };

  const remainderVal = remainderPoly.coefficients[remainderPoly.coefficients.length - 1] || 0;
  const isFactor = remainderPoly.coefficients.every(c => Math.abs(c) < 1e-7);

  const pLatex = formatPolynomialLatex(dividend);
  const dLatex = formatPolynomialLatex(divisorPoly);
  const qLatex = formatPolynomialLatex(quotientPoly);
  const rLatex = formatPolynomialLatex(remainderPoly);

  let identityLatex = `${pLatex} = (${dLatex})(${qLatex})`;
  if (!isFactor) {
    identityLatex += ` + (${rLatex})`;
  }

  return {
    dividendPoly: dividend,
    divisorPoly,
    quotientPoly,
    remainderPoly,
    remainderVal,
    steps,
    isFactor,
    identityLatex,
  };
}

export interface RationalCandidate {
  p: number;
  q: number;
  value: number;
  fraction: Fraction;
  display: string;
  isRoot: boolean;
  remainder: number;
}

export function getIntegerFactors(num: number): number[] {
  const n = Math.abs(Math.round(num));
  if (n === 0) return [1];
  const factors: number[] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) factors.push(n / i);
    }
  }
  return factors.sort((a, b) => a - b);
}

export function computeRationalRootCandidates(poly: Polynomial): {
  constantTerm: number;
  leadingCoeff: number;
  pFactors: number[];
  qFactors: number[];
  candidates: RationalCandidate[];
  actualRoots: RationalCandidate[];
} {
  const leadingCoeff = poly.coefficients[0];
  const constantTerm = poly.coefficients[poly.coefficients.length - 1];
  const pFactors = getIntegerFactors(constantTerm);
  const qFactors = getIntegerFactors(leadingCoeff);

  const seen = new Set<string>();
  const candidates: RationalCandidate[] = [];

  if (Math.abs(constantTerm) < 1e-9) {
    candidates.push({
      p: 0,
      q: 1,
      value: 0,
      fraction: createFraction(0, 1),
      display: "0",
      isRoot: true,
      remainder: 0,
    });
    seen.add("0/1");
  }

  for (const sign of [1, -1]) {
    for (const p of pFactors) {
      for (const q of qFactors) {
        const frac = createFraction(sign * p, q);
        const key = `${frac.n}/${frac.d}`;
        if (!seen.has(key)) {
          seen.add(key);
          const val = frac.n / frac.d;
          let rem = 0;
          for (let i = 0; i < poly.coefficients.length; i++) {
            const power = poly.degree - i;
            rem += poly.coefficients[i] * Math.pow(val, power);
          }
          const isRoot = Math.abs(rem) < 1e-6;
          candidates.push({
            p,
            q,
            value: val,
            fraction: frac,
            display: formatFraction(frac),
            isRoot,
            remainder: Math.round(rem * 1000) / 1000,
          });
        }
      }
    }
  }

  candidates.sort((a, b) => a.value - b.value);
  const actualRoots = candidates.filter(c => c.isRoot);

  return {
    constantTerm,
    leadingCoeff,
    pFactors,
    qFactors,
    candidates,
    actualRoots,
  };
}

/**
 * Batch Evaluation: Evaluates polynomial remainders for an array of test points
 */
export interface BatchEvaluationRow {
  c: number;
  cFraction: Fraction;
  divisorString: string;
  divisorLatex: string;
  remainder: number;
  remainderFraction: Fraction;
  isFactor: boolean;
  quotientPoly: Polynomial;
  quotientLatex: string;
}

export function evaluateBatchRemainder(
  poly: Polynomial,
  points: number[]
): BatchEvaluationRow[] {
  const rows: BatchEvaluationRow[] = [];
  const v = poly.variable;

  for (const c of points) {
    const cFraction = createFraction(c);
    const divInfo: DivisorInfo = {
      a: 1,
      b: c,
      c,
      cFraction,
      divisorString: c >= 0 ? `${v} - ${formatFraction(cFraction)}` : `${v} + ${formatFraction(createFraction(Math.abs(cFraction.n), cFraction.d))}`,
      divisorLatex: c >= 0 ? `${v} - ${formatFractionLatex(cFraction)}` : `${v} + ${formatFractionLatex(createFraction(Math.abs(cFraction.n), cFraction.d))}`,
      isLinear: true,
    };

    const remResult = evaluateRemainderTheorem(poly, divInfo);
    const synthResult = performSyntheticDivision(poly, divInfo);

    rows.push({
      c,
      cFraction,
      divisorString: divInfo.divisorString,
      divisorLatex: divInfo.divisorLatex,
      remainder: remResult.remainder,
      remainderFraction: remResult.remainderFraction,
      isFactor: remResult.isFactor,
      quotientPoly: synthResult.quotientPoly,
      quotientLatex: formatPolynomialLatex(synthResult.quotientPoly),
    });
  }

  return rows;
}

/**
 * Curve point generation for SVG visualizer
 */
export function generatePolynomialCurvePoints(
  poly: Polynomial,
  cValue: number,
  pointsCount = 140
): { points: { x: number; y: number }[]; minX: number; maxX: number; minY: number; maxY: number; pOfC: number } {
  const span = Math.max(4, Math.abs(cValue) + 3);
  const minX = cValue - span;
  const maxX = cValue + span;
  const step = (maxX - minX) / pointsCount;
  const points: { x: number; y: number }[] = [];

  let pOfC = 0;
  for (let i = 0; i <= pointsCount; i++) {
    const x = minX + i * step;
    let y = 0;
    for (let j = 0; j < poly.coefficients.length; j++) {
      const power = poly.degree - j;
      y += poly.coefficients[j] * Math.pow(x, power);
    }
    points.push({ x, y });
  }

  for (let j = 0; j < poly.coefficients.length; j++) {
    const power = poly.degree - j;
    pOfC += poly.coefficients[j] * Math.pow(cValue, power);
  }

  const validYs = points.map(p => p.y).filter(y => !isNaN(y) && isFinite(y));
  let minY = Math.min(...validYs, pOfC, 0);
  let maxY = Math.max(...validYs, pOfC, 0);

  const ySpan = maxY - minY;
  if (ySpan > 240) {
    const mid = pOfC;
    minY = Math.max(minY, mid - 120);
    maxY = Math.min(maxY, mid + 120);
  }

  const paddingY = Math.max(2, (maxY - minY) * 0.15);
  minY -= paddingY;
  maxY += paddingY;

  return {
    points,
    minX,
    maxX,
    minY,
    maxY,
    pOfC,
  };
}

export interface CompleteFactorizationResult {
  roots: { value: number; display: string; multiplicity: number }[];
  linearFactorsLatex: string;
  hasComplexRoots: boolean;
  notes: string;
}

export function findFullPolynomialFactorization(poly: Polynomial): CompleteFactorizationResult {
  if (poly.degree < 1) {
    return {
      roots: [],
      linearFactorsLatex: formatPolynomialLatex(poly),
      hasComplexRoots: false,
      notes: "常数多项式无根",
    };
  }

  const v = poly.variable;
  const leading = poly.coefficients[0];
  const rootsFound: { value: number; display: string; multiplicity: number }[] = [];
  let currentCoeffs = [...poly.coefficients];
  let currentDegree = poly.degree;
  let iterations = 0;

  while (currentDegree > 2 && iterations < 12) {
    iterations++;
    const currentPoly: Polynomial = {
      coefficients: currentCoeffs,
      degree: currentDegree,
      variable: v,
    };
    const candResult = computeRationalRootCandidates(currentPoly);
    const confirmed = candResult.actualRoots[0];
    if (!confirmed) break;

    const rootVal = confirmed.value;
    const deflatedCoeffs: number[] = [currentCoeffs[0]];
    for (let i = 1; i < currentCoeffs.length - 1; i++) {
      deflatedCoeffs.push(currentCoeffs[i] + deflatedCoeffs[i - 1] * rootVal);
    }

    const existing = rootsFound.find(r => Math.abs(r.value - rootVal) < 1e-6);
    if (existing) {
      existing.multiplicity++;
    } else {
      rootsFound.push({
        value: rootVal,
        display: confirmed.display,
        multiplicity: 1,
      });
    }

    currentCoeffs = deflatedCoeffs;
    currentDegree--;
  }

  let hasComplex = false;
  if (currentDegree === 2) {
    const [qa, qb, qc] = currentCoeffs;
    const disc = qb * qb - 4 * qa * qc;
    if (disc >= 0) {
      const r1 = (-qb + Math.sqrt(disc)) / (2 * qa);
      const r2 = (-qb - Math.sqrt(disc)) / (2 * qa);
      const frac1 = createFraction(r1);
      const frac2 = createFraction(r2);

      const e1 = rootsFound.find(r => Math.abs(r.value - r1) < 1e-6);
      if (e1) e1.multiplicity++;
      else rootsFound.push({ value: r1, display: formatFraction(frac1), multiplicity: 1 });

      if (Math.abs(r1 - r2) > 1e-6) {
        const e2 = rootsFound.find(r => Math.abs(r.value - r2) < 1e-6);
        if (e2) e2.multiplicity++;
        else rootsFound.push({ value: r2, display: formatFraction(frac2), multiplicity: 1 });
      }
    } else {
      hasComplex = true;
    }
  }

  let remainingLeading = leading;
  const factorTerms: string[] = [];

  for (const r of rootsFound) {
    const frac = createFraction(r.value);
    let term = "";
    if (frac.d === 1) {
      if (r.value === 0) term = `${v}`;
      else if (r.value > 0) term = `(${v} - ${r.value})`;
      else term = `(${v} + ${Math.abs(r.value)})`;
    } else {
      const n = frac.n;
      const d = frac.d;
      term = n > 0 ? `(${d}${v} - ${n})` : `(${d}${v} + ${Math.abs(n)})`;
      remainingLeading = remainingLeading / Math.pow(d, r.multiplicity);
    }
    if (r.multiplicity > 1) {
      term = `${term}^{${r.multiplicity}}`;
    }
    factorTerms.push(term);
  }

  const roundedLead = Math.round(remainingLeading * 1000) / 1000;
  let leadStr = "";
  if (Math.abs(roundedLead - 1) < 1e-6) leadStr = "";
  else if (Math.abs(roundedLead + 1) < 1e-6) leadStr = "-";
  else leadStr = `${roundedLead}`;

  let linearFactorsLatex = `${leadStr}${factorTerms.join('')}`;
  if (factorTerms.length === 0) {
    linearFactorsLatex = formatPolynomialLatex(poly);
  }

  return {
    roots: rootsFound,
    linearFactorsLatex,
    hasComplexRoots: hasComplex,
    notes: hasComplex ? "包含复数（非实数）根" : "所有分解根均为实数",
  };
}
