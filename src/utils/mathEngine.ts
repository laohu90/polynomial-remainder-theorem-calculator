/**
 * Robust Mathematical Engine for Polynomial Remainder Theorem,
 * Factor Theorem, Synthetic Division, and Polynomial Long Division.
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

/**
 * Converts float or integer into reduced Fraction
 */
export function createFraction(n: number, d = 1): Fraction {
  if (d === 0) throw new Error("Denominator cannot be zero");
  if (d < 0) {
    n = -n;
    d = -d;
  }

  // Handle floating points precisely using continued fractions / scaling
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

/**
 * Normalizes mathematical characters, superscripts, and operators
 */
function normalizeMathString(input: string): string {
  const superscriptMap: Record<string, string> = {
    '⁰': '^0', '¹': '^1', '²': '^2', '³': '^3', '⁴': '^4',
    '⁵': '^5', '⁶': '^6', '⁷': '^7', '⁸': '^8', '⁹': '^9',
  };

  let str = input.trim();
  for (const [sup, std] of Object.entries(superscriptMap)) {
    str = str.split(sup).join(std);
  }

  return str
    .replace(/\*\*/g, '^') // Convert ** to ^
    .replace(/[−–—]/g, '-')
    .replace(/[·×*]/g, '*')
    .replace(/\s+/g, ' ');
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
 * Robust parser for polynomials like:
 * "2x^3 - 4x^2 + 3x - 5", "x^4 - 16", "3x^2+5x-2", "-x^3 + 4x", "x³ - 8"
 */
export function parsePolynomial(input: string, variable = 'x'): { poly: Polynomial | null; error: string | null } {
  try {
    const clean = normalizeMathString(input).replace(/\s+/g, '');
    if (!clean) return { poly: null, error: "请输入多项式 (Please enter a polynomial)" };

    let s = clean;
    if (s.startsWith('(') && s.endsWith(')') && !s.includes(')(')) {
      s = s.slice(1, -1);
    }

    const varLetter = variable.toLowerCase();
    // Validate allowed characters: digits, variable, +, -, ^, ., /, *, (,)
    const allowed = new RegExp(`^[0-9+\\-^${varLetter}.\\/*()]+$`, 'i');
    if (!allowed.test(s)) {
      return { poly: null, error: `含有非法字符。仅支持数字、变量 ${variable}、+、-、^、/ 与括号` };
    }

    // Split into terms while preserving signs
    const termRegex = /([+-]?[^+-]+)/g;
    const matches = s.match(termRegex);
    if (!matches || matches.length === 0) {
      return { poly: null, error: "无法解析多项式项" };
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
        if (isNaN(val)) return { poly: null, error: `无效常数项: ${term}` };
        powerMap[0] = (powerMap[0] || 0) + val;
      } else {
        // Variable term
        const coeffPart = term.substring(0, vIndex);
        let coeff = 1;
        if (coeffPart === '' || coeffPart === '+') coeff = 1;
        else if (coeffPart === '-') coeff = -1;
        else {
          coeff = parseCoeff(coeffPart);
          if (isNaN(coeff)) return { poly: null, error: `项 ${term} 的系数无效` };
        }

        const afterVar = term.substring(vIndex + 1);
        let power = 1;
        if (afterVar.startsWith('^')) {
          power = parseInt(afterVar.substring(1), 10);
          if (isNaN(power) || power < 0) {
            return { poly: null, error: `项 ${term} 的指数无效` };
          }
        } else if (afterVar !== '') {
          return { poly: null, error: `变量后的非法字符: ${afterVar}` };
        }

        if (power > 25) {
          return { poly: null, error: "最高支持25次多项式" };
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
    };
  } catch {
    return { poly: null, error: "解析多项式失败，请检查输入格式" };
  }
}

/**
 * Format polynomial to display string (e.g. 2x^3 - 4x^2 + 3x - 5)
 */
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

/**
 * Format polynomial to KaTeX LaTeX string
 */
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
  a: number; // coefficient of x
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
 * - "x + 3" => a = 1, b = -3, c = -3
 * - "2x - 1" => a = 2, b = 1, c = 0.5
 * - "2" or "-3" (direct root value c)
 * - "3/2" (direct root fraction)
 * - Higher degree polynomial e.g. "x^2 - 1" for polynomial long division
 */
export function parseDivisor(input: string, variable = 'x'): { divisor: DivisorInfo | null; error: string | null } {
  try {
    let clean = normalizeMathString(input).replace(/[\s()]/g, '');
    clean = clean.replace(/^[xc]=/i, '').replace(/=0$/i, '');
    if (!clean) return { divisor: null, error: "请输入除式 (如 x - 2, 2x - 1 或数值 3)" };

    // 1. Direct number e.g. "2", "-3", "1.5"
    if (/^[+-]?[0-9]+(\.[0-9]+)?$/.test(clean)) {
      const c = parseFloat(clean);
      const frac = createFraction(c);
      const divStr = c >= 0 ? `${variable} - ${formatFraction(frac)}` : `${variable} + ${formatFraction(createFraction(Math.abs(frac.n), frac.d))}`;
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
      };
    }

    // 2. Direct fraction e.g. "3/2", "-1/3"
    if (/^[+-]?[0-9]+\/[0-9]+$/.test(clean)) {
      const parts = clean.split('/');
      const n = parseInt(parts[0], 10);
      const d = parseInt(parts[1], 10);
      const frac = createFraction(n, d);
      const c = frac.n / frac.d;
      const fracLatex = formatFractionLatex(createFraction(Math.abs(frac.n), frac.d));
      const divStr = c >= 0 ? `${variable} - ${formatFraction(frac)}` : `${variable} + ${formatFraction(createFraction(Math.abs(frac.n), frac.d))}`;
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
      };
    }

    // 3. Divisor contains variable
    const polyParsed = parsePolynomial(clean, variable);
    if (polyParsed.error || !polyParsed.poly) {
      return { divisor: null, error: polyParsed.error || "无法解析除式" };
    }

    const poly = polyParsed.poly;
    if (poly.degree === 1) {
      // Linear divisor: a*x + constant = 0 => a*x - b = 0 => b = -constant
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
      };
    } else {
      // Non-linear polynomial divisor (e.g. x^2 - 1)
      return {
        divisor: {
          a: poly.coefficients[0],
          b: 0,
          c: 0,
          cFraction: createFraction(0),
          divisorString: formatPolynomial(poly),
          divisorLatex: formatPolynomialLatex(poly),
          isLinear: false,
          rawPoly: poly,
        },
        error: null,
      };
    }
  } catch {
    return { divisor: null, error: "解析除式失败" };
  }
}

export interface DirectEvaluationStep {
  power: number;
  coeff: number;
  c: number;
  powerVal: number;
  termProduct: number;
  latexTerm: string;
}

export interface RemainderTheoremResult {
  c: number;
  cFraction: Fraction;
  remainder: number;
  remainderFraction: Fraction;
  steps: DirectEvaluationStep[];
  directSubstitutionLatex: string;
  expandedCalculationLatex: string;
  isFactor: boolean;
}

/**
 * Direct evaluation: P(c) = a_n * c^n + ... + a_0
 */
export function evaluateRemainderTheorem(poly: Polynomial, divisor: DivisorInfo): RemainderTheoremResult {
  const c = divisor.c;
  const cFraction = divisor.cFraction;
  const steps: DirectEvaluationStep[] = [];

  let remainder = 0;
  let remainderFraction = createFraction(0);
  const directSubTerms: string[] = [];
  const expandedTerms: string[] = [];

  for (let i = 0; i < poly.coefficients.length; i++) {
    const coeff = poly.coefficients[i];
    const power = poly.degree - i;
    const powerVal = Math.pow(c, power);
    const termProduct = coeff * powerVal;
    remainder += termProduct;

    // Fractional calculation
    const cPowerFrac = createFraction(Math.pow(cFraction.n, power), Math.pow(cFraction.d, power));
    const termFrac = multFractions(createFraction(coeff), cPowerFrac);
    remainderFraction = addFractions(remainderFraction, termFrac);

    const cFormatted = cFraction.d !== 1
      ? `\\left(${formatFractionLatex(cFraction)}\\right)`
      : (c < 0 ? `(${c})` : `${c}`);

    const coeffStr = (coeff === 1 && power > 0) ? "" : (coeff === -1 && power > 0 ? "-" : `${coeff}`);
    let termLatex = "";
    if (power === 0) {
      termLatex = coeff < 0 ? `(${coeff})` : `${coeff}`;
    } else if (power === 1) {
      termLatex = `${coeffStr} \\cdot ${cFormatted}`;
    } else {
      termLatex = `${coeffStr} \\cdot ${cFormatted}^{${power}}`;
    }
    directSubTerms.push(termLatex);

    const termProdStr = Number.isInteger(termProduct) ? termProduct.toString() : termProduct.toFixed(3).replace(/\.?0+$/, '');
    expandedTerms.push(termProduct < 0 ? `(${termProdStr})` : termProdStr);

    steps.push({
      power,
      coeff,
      c,
      powerVal,
      termProduct,
      latexTerm: termLatex,
    });
  }

  const isFactor = Math.abs(remainder) < 1e-7 || remainderFraction.n === 0;

  return {
    c,
    cFraction,
    remainder: Math.round(remainder * 100000) / 100000,
    remainderFraction,
    steps,
    directSubstitutionLatex: directSubTerms.join(" + ").replace(/\+ \(-/g, "- "),
    expandedCalculationLatex: expandedTerms.join(" + ").replace(/\+ \(-/g, "- "),
    isFactor,
  };
}

export interface SyntheticStep {
  index: number;
  power: number;
  topCoeff: number;
  productAdded: number;
  bottomResult: number;
  explanation: string;
}

export interface SyntheticDivisionResult {
  c: number;
  cFraction: Fraction;
  divisorA: number;
  topRow: number[];
  middleRow: number[];
  bottomRow: number[];
  quotientCoefficients: number[];
  quotientPoly: Polynomial;
  remainder: number;
  steps: SyntheticStep[];
  summaryIdentityLatex: string;
  isFactor: boolean;
}

/**
 * Synthetic Division for linear divisor (ax - b)
 */
export function performSyntheticDivision(poly: Polynomial, divisor: DivisorInfo): SyntheticDivisionResult {
  const c = divisor.c;
  const topRow = [...poly.coefficients];
  const middleRow: number[] = [0];
  const bottomRow: number[] = [];
  const steps: SyntheticStep[] = [];

  // Step 0: Bring down first coefficient
  const first = topRow[0];
  bottomRow.push(first);
  steps.push({
    index: 0,
    power: poly.degree,
    topCoeff: first,
    productAdded: 0,
    bottomResult: first,
    explanation: `将最高次项系数 ${first} 直接下移落入底行。`,
  });

  // Step 1 to N
  for (let i = 1; i < topRow.length; i++) {
    const prevBottom = bottomRow[i - 1];
    const product = prevBottom * c;
    middleRow.push(product);
    const sum = topRow[i] + product;
    bottomRow.push(sum);

    const isLast = i === topRow.length - 1;
    const cDisplay = divisor.cFraction.d !== 1 ? formatFraction(divisor.cFraction) : `${c}`;

    steps.push({
      index: i,
      power: poly.degree - i,
      topCoeff: topRow[i],
      productAdded: product,
      bottomResult: sum,
      explanation: isLast
        ? `将前一项结果 ${prevBottom} 乘以根 c = ${cDisplay} 得 ${product}；与常数项 ${topRow[i]} 相加，得到余数 R = ${sum}。`
        : `将前一项结果 ${prevBottom} 乘以根 c = ${cDisplay} 得 ${product}；与系数 ${topRow[i]} 相加，得到 ${sum}。`,
    });
  }

  const remainder = bottomRow[bottomRow.length - 1];
  let rawQuotientCoeffs = bottomRow.slice(0, bottomRow.length - 1);

  // If divisor was (ax - b) where a != 1, divide quotient by a
  if (divisor.a !== 1) {
    rawQuotientCoeffs = rawQuotientCoeffs.map(val => val / divisor.a);
  }

  const quotientPoly: Polynomial = {
    coefficients: rawQuotientCoeffs,
    degree: Math.max(0, poly.degree - 1),
    variable: poly.variable,
  };

  const isFactor = Math.abs(remainder) < 1e-7;

  // Identity: P(x) = (Divisor) * Q(x) + R
  const pLatex = formatPolynomialLatex(poly);
  const qLatex = formatPolynomialLatex(quotientPoly);
  const dLatex = divisor.divisorLatex;

  let summaryIdentityLatex = `${pLatex} = (${dLatex})(${qLatex})`;
  if (Math.abs(remainder) >= 1e-7) {
    if (remainder > 0) summaryIdentityLatex += ` + ${remainder}`;
    else summaryIdentityLatex += ` - ${Math.abs(remainder)}`;
  }

  return {
    c,
    cFraction: divisor.cFraction,
    divisorA: divisor.a,
    topRow,
    middleRow,
    bottomRow,
    quotientCoefficients: rawQuotientCoeffs,
    quotientPoly,
    remainder,
    steps,
    summaryIdentityLatex,
    isFactor,
  };
}

export interface LongDivisionStep {
  stepNumber: number;
  quotientTermLatex: string;
  currentWorkingPolyLatex: string;
  multipliedDivisorLatex: string;
  resultingRemainderLatex: string;
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

/**
 * General Polynomial Long Division
 * Handles degree >= 1 divisors
 */
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

  const dDegree = divisorPoly.degree;
  const leadDivCoeff = divisorPoly.coefficients[0];

  let currentWorkingCoeffs = [...dividend.coefficients];
  let currentDegree = dividend.degree;

  const quotientCoeffs: { power: number; coeff: number }[] = [];
  const steps: LongDivisionStep[] = [];

  let stepCount = 0;
  while (currentDegree >= dDegree && stepCount < 20) {
    // Strip leading zeros
    while (currentWorkingCoeffs.length > 0 && Math.abs(currentWorkingCoeffs[0]) < 1e-9) {
      currentWorkingCoeffs.shift();
      currentDegree--;
    }

    if (currentDegree < dDegree || currentWorkingCoeffs.length === 0) break;

    stepCount++;
    const leadWorkingCoeff = currentWorkingCoeffs[0];
    const qCoeff = leadWorkingCoeff / leadDivCoeff;
    const qPower = currentDegree - dDegree;

    quotientCoeffs.push({ power: qPower, coeff: qCoeff });

    const multFullCoeffs = new Array(currentDegree + 1).fill(0);
    for (let j = 0; j < divisorPoly.coefficients.length; j++) {
      const p = currentDegree - j;
      multFullCoeffs[currentDegree - p] = qCoeff * divisorPoly.coefficients[j];
    }

    const workPoly: Polynomial = {
      coefficients: [...currentWorkingCoeffs],
      degree: currentDegree,
      variable: v,
    };

    const paddedWorking = [...currentWorkingCoeffs];
    while (paddedWorking.length < currentDegree + 1) {
      paddedWorking.push(0);
    }

    const nextWorking: number[] = [];
    for (let j = 1; j <= currentDegree; j++) {
      const diff = (paddedWorking[j] || 0) - (multFullCoeffs[j] || 0);
      nextWorking.push(diff);
    }

    const subPoly: Polynomial = {
      coefficients: multFullCoeffs.slice(0, divisorPoly.coefficients.length),
      degree: currentDegree,
      variable: v,
    };

    const remainderPolyTemp: Polynomial = {
      coefficients: nextWorking.length > 0 ? nextWorking : [0],
      degree: Math.max(0, currentDegree - 1),
      variable: v,
    };

    const qTermSinglePoly: Polynomial = {
      coefficients: [qCoeff],
      degree: qPower,
      variable: v,
    };

    steps.push({
      stepNumber: stepCount,
      quotientTermLatex: formatPolynomialLatex(qTermSinglePoly),
      currentWorkingPolyLatex: formatPolynomialLatex(workPoly),
      multipliedDivisorLatex: formatPolynomialLatex(subPoly),
      resultingRemainderLatex: formatPolynomialLatex(remainderPolyTemp),
      explanation: `将首项 ${leadWorkingCoeff}${v}^${currentDegree} 除以 ${leadDivCoeff}${v}^${dDegree}，得到商项 ${formatPolynomialLatex(qTermSinglePoly)}；乘以除式并相减。`,
    });

    currentWorkingCoeffs = nextWorking;
    currentDegree--;
  }

  const maxQDegree = Math.max(0, dividend.degree - dDegree);
  const finalQCoeffs = new Array(maxQDegree + 1).fill(0);
  for (const item of quotientCoeffs) {
    if (item.power >= 0 && item.power <= maxQDegree) {
      finalQCoeffs[maxQDegree - item.power] = item.coeff;
    }
  }

  const quotientPoly: Polynomial = {
    coefficients: finalQCoeffs,
    degree: maxQDegree,
    variable: v,
  };

  while (currentWorkingCoeffs.length > 1 && Math.abs(currentWorkingCoeffs[0]) < 1e-9) {
    currentWorkingCoeffs.shift();
  }
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

/**
 * Rational Root Theorem: Candidates = +/- (factors of a_0) / (factors of a_n)
 */
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
 * Full polynomial factorization using Rational Roots + synthetic deflation
 */
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

export function generatePolynomialCurvePoints(
  poly: Polynomial,
  cValue: number,
  pointsCount = 120
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
  if (ySpan > 200) {
    const mid = pOfC;
    minY = Math.max(minY, mid - 100);
    maxY = Math.min(maxY, mid + 100);
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
