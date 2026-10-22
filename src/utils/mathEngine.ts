/**
 * Fraction utility to maintain exact fractions whenever possible
 */
export interface Fraction {
  n: number; // numerator
  d: number; // denominator (always > 0)
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function createFraction(n: number, d = 1): Fraction {
  if (d === 0) throw new Error("Denominator cannot be zero");
  if (d < 0) {
    n = -n;
    d = -d;
  }
  // Check if n is a float
  if (!Number.isInteger(n) || !Number.isInteger(d)) {
    const precision = 100000;
    n = Math.round(n * precision);
    d = Math.round(d * precision);
  }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
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
  if (b.n === 0) throw new Error("Division by zero fraction");
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

/**
 * Polynomial representation: array of coefficients [a_n, a_{n-1}, ..., a_1, a_0]
 * degree is coefficients.length - 1
 */
export interface Polynomial {
  coefficients: number[]; // From highest power down to constant
  degree: number;
  variable: string;
}

/**
 * Parse polynomial string like:
 * "2x^3 - 4x^2 + 3x - 5" or "x^4 + 2x^2 - 1" or "3x^2+5x-2"
 */
export function parsePolynomial(input: string, variable = 'x'): { poly: Polynomial | null; error: string | null } {
  try {
    const raw = input.trim().replace(/\s+/g, '');
    if (!raw) return { poly: null, error: "Please enter a polynomial" };

    // Replace unicode minus with standard minus
    const clean = raw.replace(/−/g, '-').replace(/\*/g, '');

    // Check valid characters
    const allowed = new RegExp(`^[0-9+\\-^${variable}.\\/]+$`, 'i');
    if (!allowed.test(clean)) {
      return { poly: null, error: `Invalid characters found. Use only numbers, '${variable}', +, -, and ^` };
    }

    // Split into terms preserving signs
    const termRegex = new RegExp(`([+\\-]?[^+\\-]+)`, 'g');
    const matches = clean.match(termRegex);
    if (!matches) return { poly: null, error: "Unable to parse polynomial terms" };

    const powerMap: { [pow: number]: number } = {};
    let maxDegree = 0;

    for (const match of matches) {
      if (!match) continue;
      const term = match;
      const vIndex = term.toLowerCase().indexOf(variable.toLowerCase());

      if (vIndex === -1) {
        // Constant term
        const val = parseFloat(term);
        if (isNaN(val)) return { poly: null, error: `Invalid constant term: ${term}` };
        powerMap[0] = (powerMap[0] || 0) + val;
      } else {
        // Term contains variable
        const coeffPart = term.substring(0, vIndex);
        let coeff = 1;
        if (coeffPart === '' || coeffPart === '+') coeff = 1;
        else if (coeffPart === '-') coeff = -1;
        else {
          coeff = parseFloat(coeffPart);
          if (isNaN(coeff)) return { poly: null, error: `Invalid coefficient in term: ${term}` };
        }

        const afterVar = term.substring(vIndex + variable.length);
        let power = 1;
        if (afterVar.startsWith('^')) {
          power = parseInt(afterVar.substring(1), 10);
          if (isNaN(power) || power < 0) {
            return { poly: null, error: `Invalid exponent in term: ${term}` };
          }
        } else if (afterVar !== '') {
          return { poly: null, error: `Unexpected character after '${variable}': ${afterVar}` };
        }

        if (power > 20) {
          return { poly: null, error: "Degree is too high (maximum degree 20 supported)" };
        }

        maxDegree = Math.max(maxDegree, power);
        powerMap[power] = (powerMap[power] || 0) + coeff;
      }
    }

    // Check if leading coefficient became 0
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
    return { poly: null, error: "Failed to parse polynomial" };
  }
}

/**
 * Format polynomial to display string (e.g. 2x^3 - 4x^2 + 3x - 5)
 */
export function formatPolynomial(poly: Polynomial): string {
  const { coefficients, degree, variable } = poly;
  if (coefficients.length === 0) return "0";

  const terms: string[] = [];
  for (let i = 0; i < coefficients.length; i++) {
    const c = coefficients[i];
    const power = degree - i;
    if (Math.abs(c) < 1e-9 && terms.length > 0 && i < coefficients.length - 1) continue;
    if (Math.abs(c) < 1e-9 && terms.length === 0 && i === coefficients.length - 1) {
      terms.push("0");
      continue;
    }

    let sign = c < 0 ? "-" : (terms.length > 0 ? "+" : "");
    const absC = Math.abs(c);
    const absCStr = Number.isInteger(absC) ? absC.toString() : absC.toFixed(2).replace(/\.?0+$/, '');

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
      terms.push(terms.length === 0 ? `-${termStr}` : `- ${termStr}`);
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
  if (coefficients.length === 0) return "0";

  const terms: string[] = [];
  for (let i = 0; i < coefficients.length; i++) {
    const c = coefficients[i];
    const power = degree - i;
    if (Math.abs(c) < 1e-9 && terms.length > 0 && i < coefficients.length - 1) continue;
    if (Math.abs(c) < 1e-9 && terms.length === 0 && i === coefficients.length - 1) {
      terms.push("0");
      continue;
    }

    const isFirst = terms.length === 0;
    const sign = c < 0 ? "-" : (isFirst ? "" : "+");
    const absC = Math.abs(c);
    const absCStr = Number.isInteger(absC) ? absC.toString() : absC.toFixed(2).replace(/\.?0+$/, '');

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

/**
 * Parse divisor string:
 * - "x - 2" => c = 2, a = 1, b = 2
 * - "x + 3" => c = -3, a = 1, b = -3
 * - "2x - 1" => c = 0.5, a = 2, b = 1
 * - "3" (user directly entered c = 3)
 */
export interface DivisorInfo {
  a: number; // coefficient of x
  b: number; // constant subtracted: ax - b = 0 => x = b/a
  c: number; // root value: b / a
  cFraction: Fraction;
  divisorString: string;
  divisorLatex: string;
}

export function parseDivisor(input: string, variable = 'x'): { divisor: DivisorInfo | null; error: string | null } {
  try {
    const clean = input.trim().replace(/\s+/g, '').replace(/−/g, '-').replace(/\*/g, '');
    if (!clean) return { divisor: null, error: "Please enter a divisor (e.g., x - 2, 2x + 1, or a number)" };

    // Check if it's just a raw number (c)
    if (/^[+\-]?[0-9]+(\.[0-9]+)?$/.test(clean)) {
      const c = parseFloat(clean);
      const frac = createFraction(c);
      return {
        divisor: {
          a: 1,
          b: c,
          c,
          cFraction: frac,
          divisorString: c >= 0 ? `${variable} - ${c}` : `${variable} + ${Math.abs(c)}`,
          divisorLatex: c >= 0 ? `${variable} - ${c}` : `${variable} + ${Math.abs(c)}`,
        },
        error: null,
      };
    }

    // Check fraction like "3/2"
    if (/^[+\-]?[0-9]+\/[0-9]+$/.test(clean)) {
      const parts = clean.split('/');
      const n = parseInt(parts[0], 10);
      const d = parseInt(parts[1], 10);
      const frac = createFraction(n, d);
      const c = n / d;
      return {
        divisor: {
          a: 1,
          b: c,
          c,
          cFraction: frac,
          divisorString: c >= 0 ? `${variable} - ${formatFraction(frac)}` : `${variable} + ${formatFraction(createFraction(Math.abs(frac.n), frac.d))}`,
          divisorLatex: c >= 0 ? `${variable} - ${formatFractionLatex(frac)}` : `${variable} + ${formatFractionLatex(createFraction(Math.abs(frac.n), frac.d))}`,
        },
        error: null,
      };
    }

    // Divisor contains variable
    const vIndex = clean.toLowerCase().indexOf(variable.toLowerCase());
    if (vIndex === -1) {
      return { divisor: null, error: `Divisor must contain variable '${variable}' (e.g. ${variable} - 2) or be a number.` };
    }

    // Leading part before variable: ax
    const beforeVar = clean.substring(0, vIndex);
    let a = 1;
    if (beforeVar === '' || beforeVar === '+') a = 1;
    else if (beforeVar === '-') a = -1;
    else {
      a = parseFloat(beforeVar);
      if (isNaN(a) || a === 0) return { divisor: null, error: `Invalid coefficient for '${variable}'` };
    }

    // After variable: could be +/- b or empty (i.e. x => x - 0)
    const afterVar = clean.substring(vIndex + variable.length);
    let constant = 0;
    if (afterVar !== '') {
      constant = parseFloat(afterVar);
      if (isNaN(constant)) return { divisor: null, error: `Invalid constant in divisor: ${afterVar}` };
    }

    // ax + constant = 0 => ax = -constant => x = -constant / a
    // If format is ax - b = 0 => b = -constant
    const b = -constant;
    const c = b / a;
    const cFraction = createFraction(b, a);

    const aStr = a === 1 ? '' : (a === -1 ? '-' : `${a}`);
    const constStr = constant > 0 ? `+ ${constant}` : (constant < 0 ? `- ${Math.abs(constant)}` : '');
    const divStr = `${aStr}${variable} ${constStr}`.trim();

    return {
      divisor: {
        a,
        b,
        c,
        cFraction,
        divisorString: divStr,
        divisorLatex: divStr,
      },
      error: null,
    };
  } catch {
    return { divisor: null, error: "Failed to parse divisor" };
  }
}

/**
 * Direct evaluation step for Remainder Theorem:
 * P(c) = a_n * c^n + ... + a_0
 */
export interface EvaluationStep {
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
  steps: EvaluationStep[];
  directSubstitutionLatex: string;
  expandedCalculationLatex: string;
  isFactor: boolean;
}

export function evaluateRemainderTheorem(poly: Polynomial, divisor: DivisorInfo): RemainderTheoremResult {
  const c = divisor.c;
  const cFraction = divisor.cFraction;
  const steps: EvaluationStep[] = [];
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

    // Fractional evaluation
    const cPowerFraction = createFraction(Math.pow(cFraction.n, power), Math.pow(cFraction.d, power));
    const termFraction = multFractions(createFraction(coeff), cPowerFraction);
    remainderFraction = addFractions(remainderFraction, termFraction);

    const cFormatted = divisor.cFraction.d !== 1 
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

  const isFactor = Math.abs(remainder) < 1e-9 || remainderFraction.n === 0;

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

/**
 * Synthetic Division (综合除法) calculation
 * For (x - c):
 * Top row: [a_n, a_{n-1}, ..., a_0]
 * Middle row: [0, m_1, m_2, ..., m_n]
 * Bottom row: [b_n, b_{n-1}, ..., b_1, R]
 */
export interface SyntheticStep {
  index: number;
  power: number;
  topCoeff: number;
  productAdded: number; // c * previous bottom
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
    explanation: `Bring down the leading coefficient ${first}.`,
  });

  // Subsequent steps
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
        ? `Multiply ${prevBottom} by ${cDisplay} = ${product}. Add to constant term ${topRow[i]} = remainder ${sum}.`
        : `Multiply ${prevBottom} by ${cDisplay} = ${product}. Add to coefficient ${topRow[i]} = ${sum}.`,
    });
  }

  const remainder = bottomRow[bottomRow.length - 1];
  let rawQuotientCoeffs = bottomRow.slice(0, bottomRow.length - 1);

  // If divisor was ax - b, actual quotient Q(x) must be divided by a!
  if (divisor.a !== 1) {
    rawQuotientCoeffs = rawQuotientCoeffs.map(val => val / divisor.a);
  }

  const quotientPoly: Polynomial = {
    coefficients: rawQuotientCoeffs,
    degree: Math.max(0, poly.degree - 1),
    variable: poly.variable,
  };

  const isFactor = Math.abs(remainder) < 1e-9;

  // Identity: P(x) = D(x) * Q(x) + R
  const pLatex = formatPolynomialLatex(poly);
  const qLatex = formatPolynomialLatex(quotientPoly);
  const dLatex = divisor.divisorLatex;

  let summaryIdentityLatex = `${pLatex} = (${dLatex})(${qLatex})`;
  if (Math.abs(remainder) >= 1e-9) {
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

/**
 * Rational Root Theorem (有理根定理):
 * For P(x) = a_n * x^n + ... + a_0
 * Possible rational roots = +/- (factors of a_0) / (factors of a_n)
 */
export interface RationalCandidate {
  p: number; // factor of constant
  q: number; // factor of leading
  value: number;
  fraction: Fraction;
  display: string;
  isRoot: boolean;
  remainder: number;
}

function getIntegerFactors(num: number): number[] {
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
} {
  const leadingCoeff = poly.coefficients[0];
  const constantTerm = poly.coefficients[poly.coefficients.length - 1];

  const pFactors = getIntegerFactors(constantTerm);
  const qFactors = getIntegerFactors(leadingCoeff);

  const seen = new Set<string>();
  const candidates: RationalCandidate[] = [];

  for (const sign of [1, -1]) {
    for (const p of pFactors) {
      for (const q of qFactors) {
        const val = (sign * p) / q;
        const frac = createFraction(sign * p, q);
        const key = `${frac.n}/${frac.d}`;
        if (!seen.has(key)) {
          seen.add(key);

          // Test candidate in poly
          let rem = 0;
          for (let i = 0; i < poly.coefficients.length; i++) {
            const power = poly.degree - i;
            rem += poly.coefficients[i] * Math.pow(val, power);
          }
          const isRoot = Math.abs(rem) < 1e-7;

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

  // Sort candidates from negative to positive
  candidates.sort((a, b) => a.value - b.value);

  return {
    constantTerm,
    leadingCoeff,
    pFactors,
    qFactors,
    candidates,
  };
}

/**
 * Completing the Square Solver ("配方法拆解过程"):
 * ax^2 + bx + c = 0
 * Standard 5-step American High School Algebra 2 pedagogical sequence:
 * Step 1: Divide by a: x^2 + (b/a)x + c/a = 0
 * Step 2: Move constant term: x^2 + (b/a)x = -c/a
 * Step 3: Magic number: (b / 2a)^2 added to both sides
 * Step 4: Binomial square: (x + b/2a)^2 = (b^2 - 4ac) / 4a^2
 * Step 5: Solve for x: x = -b/2a +/- sqrt(discriminant) / 2a
 * Step 6: Vertex form: y = a(x - h)^2 + k with vertex (h, k)
 */
export interface CompletingSquareStep {
  stepNumber: number;
  titleKey: string;
  explanation: string;
  mathLatex: string;
  notes?: string;
}

export interface CompletingSquareResult {
  a: number;
  b: number;
  c: number;
  bOverA: Fraction;
  cOverA: Fraction;
  halfBOverA: Fraction; // h = -b/2a
  magicSquare: Fraction; // (b / 2a)^2
  rhsAfterAdd: Fraction; // -c/a + (b/2a)^2 = (b^2 - 4ac)/4a^2
  discriminant: number; // b^2 - 4ac
  vertexH: number;
  vertexK: number;
  vertexHFrac: Fraction;
  vertexKFrac: Fraction;
  roots: {
    type: 'two_real' | 'one_double' | 'two_complex';
    root1Str: string;
    root2Str: string;
    root1Latex: string;
    root2Latex: string;
    val1?: number;
    val2?: number;
  };
  steps: CompletingSquareStep[];
  vertexFormLatex: string;
}

export function solveCompletingTheSquare(a: number, b: number, c: number): CompletingSquareResult {
  if (Math.abs(a) < 1e-9) {
    throw new Error("Coefficient 'a' cannot be 0 in a quadratic equation");
  }

  const bOverA = createFraction(b, a);
  const cOverA = createFraction(c, a);
  const halfBOverA = createFraction(b, 2 * a);
  const magicSquare = multFractions(halfBOverA, halfBOverA);
  const negCOverA = createFraction(-cOverA.n, cOverA.d);
  const rhsAfterAdd = addFractions(negCOverA, magicSquare);
  const discriminant = b * b - 4 * a * c;

  // Vertex (h, k): h = -b / (2a), k = c - b^2 / (4a)
  const vertexH = -b / (2 * a);
  const vertexK = c - (b * b) / (4 * a);
  const vertexHFrac = createFraction(-halfBOverA.n, halfBOverA.d);
  const vertexKFrac = subFractions(createFraction(c), createFraction(b * b, 4 * a));

  const steps: CompletingSquareStep[] = [];

  // Step 1: Write equation & Divide by a if a != 1
  if (a !== 1) {
    steps.push({
      stepNumber: 1,
      titleKey: "step1_title",
      explanation: `Divide the entire equation by the leading coefficient a = ${a} so the coefficient of x² becomes 1.`,
      mathLatex: `x^2 + ${formatFractionLatex(bOverA)}x + ${formatFractionLatex(cOverA)} = 0`,
    });
  } else {
    steps.push({
      stepNumber: 1,
      titleKey: "step1_title",
      explanation: `The leading coefficient a is already 1. The equation is in standard form.`,
      mathLatex: `x^2 ${b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x ${c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0`,
    });
  }

  // Step 2: Move constant term to RHS
  steps.push({
    stepNumber: 2,
    titleKey: "step2_title",
    explanation: `Subtract the constant term ${formatFraction(cOverA)} from both sides to isolate the variable terms on the left.`,
    mathLatex: `x^2 + ${formatFractionLatex(bOverA)}x = ${formatFractionLatex(negCOverA)}`,
  });

  // Step 3: Find (b / 2a)^2 and add to both sides
  steps.push({
    stepNumber: 3,
    titleKey: "step3_title",
    explanation: `Calculate half the coefficient of x: \\frac{1}{2} \\cdot \\left(${formatFraction(bOverA)}\\right) = ${formatFraction(halfBOverA)}. Square it: \\left(${formatFraction(halfBOverA)}\\right)^2 = ${formatFraction(magicSquare)}. Add ${formatFraction(magicSquare)} to both sides.`,
    mathLatex: `x^2 + ${formatFractionLatex(bOverA)}x + ${formatFractionLatex(magicSquare)} = ${formatFractionLatex(negCOverA)} + ${formatFractionLatex(magicSquare)}`,
    notes: `Adding ${formatFraction(magicSquare)} completes the perfect square trinomial on the left.`,
  });

  // Step 4: Factor left into binomial square & simplify right side
  const signStr = halfBOverA.n >= 0 ? "+" : "-";
  const absHalfFrac = createFraction(Math.abs(halfBOverA.n), halfBOverA.d);
  steps.push({
    stepNumber: 4,
    titleKey: "step4_title",
    explanation: `Factor the left side as a perfect square: \\left(x + \\frac{b}{2a}\\right)^2. Combine the terms on the right side.`,
    mathLatex: `\\left(x ${signStr} ${formatFractionLatex(absHalfFrac)}\\right)^2 = ${formatFractionLatex(rhsAfterAdd)}`,
  });

  // Step 5: Square root of both sides & solve for x
  let rootType: 'two_real' | 'one_double' | 'two_complex' = 'two_real';
  let r1Str = "";
  let r2Str = "";
  let r1Latex = "";
  let r2Latex = "";
  let val1: number | undefined;
  let val2: number | undefined;

  const hSign = halfBOverA.n > 0 ? "-" : "+";
  const absHFrac = createFraction(Math.abs(halfBOverA.n), halfBOverA.d);
  const baseHStr = halfBOverA.n === 0 ? "" : (halfBOverA.n > 0 ? `-${formatFraction(absHFrac)}` : `${formatFraction(absHFrac)}`);
  const baseHLatex = halfBOverA.n === 0 ? "" : (halfBOverA.n > 0 ? `-${formatFractionLatex(absHFrac)}` : `${formatFractionLatex(absHFrac)}`);

  if (discriminant > 0) {
    rootType = 'two_real';
    const sqrtD = Math.sqrt(discriminant);
    val1 = (-b + sqrtD) / (2 * a);
    val2 = (-b - sqrtD) / (2 * a);

    const isPerfectSquare = Number.isInteger(sqrtD);
    if (isPerfectSquare) {
      const frac1 = createFraction(-b + sqrtD, 2 * a);
      const frac2 = createFraction(-b - sqrtD, 2 * a);
      r1Str = formatFraction(frac1);
      r2Str = formatFraction(frac2);
      r1Latex = formatFractionLatex(frac1);
      r2Latex = formatFractionLatex(frac2);
    } else {
      r1Str = `${val1.toFixed(4)}`;
      r2Str = `${val2.toFixed(4)}`;
      r1Latex = `${baseHLatex} + \\frac{\\sqrt{${discriminant}}}{${2 * a}} \\approx ${val1.toFixed(4)}`;
      r2Latex = `${baseHLatex} - \\frac{\\sqrt{${discriminant}}}{${2 * a}} \\approx ${val2.toFixed(4)}`;
    }

    steps.push({
      stepNumber: 5,
      titleKey: "step5_title",
      explanation: `Take the square root of both sides: x ${signStr} ${formatFraction(absHalfFrac)} = \\pm \\sqrt{${formatFraction(rhsAfterAdd)}}. Then solve for x.`,
      mathLatex: `x = ${baseHLatex} \\pm \\sqrt{${formatFractionLatex(rhsAfterAdd)}} \\implies x_1 = ${r1Latex},\\; x_2 = ${r2Latex}`,
      notes: `Discriminant \\Delta = ${discriminant} > 0: two distinct real roots.`,
    });
  } else if (discriminant === 0) {
    rootType = 'one_double';
    val1 = -b / (2 * a);
    val2 = val1;
    const frac = createFraction(-b, 2 * a);
    r1Str = formatFraction(frac);
    r2Str = r1Str;
    r1Latex = formatFractionLatex(frac);
    r2Latex = r1Latex;

    steps.push({
      stepNumber: 5,
      titleKey: "step5_title",
      explanation: `Take the square root of 0 on both sides. Solve for the single repeated root.`,
      mathLatex: `x ${signStr} ${formatFractionLatex(absHalfFrac)} = 0 \\implies x = ${r1Latex}`,
      notes: `Discriminant \\Delta = 0: one repeated real root (vertex touches x-axis).`,
    });
  } else {
    rootType = 'two_complex';
    const absD = Math.abs(discriminant);
    const sqrtAbsD = Math.sqrt(absD);
    const isPerfSquare = Number.isInteger(sqrtAbsD);

    if (isPerfSquare) {
      const imagFrac = createFraction(sqrtAbsD, 2 * a);
      r1Str = `${baseHStr} + ${formatFraction(imagFrac)}i`;
      r2Str = `${baseHStr} - ${formatFraction(imagFrac)}i`;
      r1Latex = `${baseHLatex} + ${formatFractionLatex(imagFrac)}i`;
      r2Latex = `${baseHLatex} - ${formatFractionLatex(imagFrac)}i`;
    } else {
      r1Latex = `${baseHLatex} + \\frac{i\\sqrt{${absD}}}{${2 * a}}`;
      r2Latex = `${baseHLatex} - \\frac{i\\sqrt{${absD}}}{${2 * a}}`;
      r1Str = `${baseHStr} + ${(sqrtAbsD / (2 * a)).toFixed(3)}i`;
      r2Str = `${baseHStr} - ${(sqrtAbsD / (2 * a)).toFixed(3)}i`;
    }

    steps.push({
      stepNumber: 5,
      titleKey: "step5_title",
      explanation: `Because the right side is negative (${formatFraction(rhsAfterAdd)} < 0), taking the square root produces imaginary unit i = \\sqrt{-1}.`,
      mathLatex: `x = ${baseHLatex} \\pm i\\sqrt{${formatFractionLatex(createFraction(Math.abs(rhsAfterAdd.n), rhsAfterAdd.d))}} \\implies x_1 = ${r1Latex},\\; x_2 = ${r2Latex}`,
      notes: `Discriminant \\Delta = ${discriminant} < 0: two complex conjugate roots.`,
    });
  }

  // Vertex Form: y = a(x - h)^2 + k
  const vHSign = vertexH >= 0 ? "-" : "+";
  const absHVal = Math.abs(vertexH);
  const absHFracVal = createFraction(Math.abs(vertexHFrac.n), vertexHFrac.d);
  const vKSign = vertexK >= 0 ? "+" : "-";
  const absKFracVal = createFraction(Math.abs(vertexKFrac.n), vertexKFrac.d);

  const aPrefix = a === 1 ? "" : (a === -1 ? "-" : `${a}`);
  const vertexFormLatex = `y = ${aPrefix}\\left(x ${vHSign} ${formatFractionLatex(absHFracVal)}\\right)^2 ${vKSign} ${formatFractionLatex(absKFracVal)}`;

  return {
    a,
    b,
    c,
    bOverA,
    cOverA,
    halfBOverA,
    magicSquare,
    rhsAfterAdd,
    discriminant,
    vertexH,
    vertexK,
    vertexHFrac,
    vertexKFrac,
    roots: {
      type: rootType,
      root1Str: r1Str,
      root2Str: r2Str,
      root1Latex: r1Latex,
      root2Latex: r2Latex,
      val1,
      val2,
    },
    steps,
    vertexFormLatex,
  };
}
