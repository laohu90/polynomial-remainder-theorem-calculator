/**
 * Academic Citation & Rigorous Mathematical Documentation Module
 * Provides formal proofs, curriculum standards alignment, and multi-format academic citations.
 */

export interface AcademicCitation {
  format: 'bibtex' | 'apa' | 'mla' | 'chicago';
  label: string;
  citationText: string;
}

export function generateAcademicCitations(currentUrl: string): AcademicCitation[] {
  const currentYear = new Date().getFullYear();
  const accessDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return [
    {
      format: 'bibtex',
      label: 'BibTeX',
      citationText: `@software{polynomial_algebra_lab_${currentYear},
  author = {{Polynomial Algebra & Symbolic Computation Working Group}},
  title = {Polynomial Remainder Theorem & Algebraic Division Laboratory: Rigorous Algorithmic Solver and Curricular Workbench},
  year = {${currentYear}},
  url = {${currentUrl}},
  note = {Accessed: ${accessDate}}
}`,
    },
    {
      format: 'apa',
      label: 'APA 7th Edition',
      citationText: `Polynomial Algebra & Symbolic Computation Working Group. (${currentYear}). Polynomial Remainder Theorem & Algebraic Division Laboratory [Web application]. Retrieved ${accessDate}, from ${currentUrl}`,
    },
    {
      format: 'mla',
      label: 'MLA 9th Edition',
      citationText: `"Polynomial Remainder Theorem & Algebraic Division Laboratory." Polynomial Algebra & Symbolic Computation Working Group, ${currentYear}, ${currentUrl}. Accessed ${accessDate}.`,
    },
    {
      format: 'chicago',
      label: 'Chicago 17th Edition',
      citationText: `Polynomial Algebra & Symbolic Computation Working Group. "${currentYear}." Polynomial Remainder Theorem & Algebraic Division Laboratory. Accessed ${accessDate}. ${currentUrl}.`,
    },
  ];
}

export interface CurriculumStandard {
  authority: string;
  code: string;
  topic: string;
  description: string;
}

export const CURRICULUM_STANDARDS: CurriculumStandard[] = [
  {
    authority: 'Common Core (USA)',
    code: 'CCSS.MATH.CONTENT.HSA.APR.B.2',
    topic: 'Arithmetic with Polynomials & Rational Expressions',
    description: 'Know and apply the Remainder Theorem: For a polynomial P(x) and a number a, the remainder on division by x - a is P(a), so P(a) = 0 if and only if (x - a) is a factor of P(x).',
  },
  {
    authority: 'Common Core (USA)',
    code: 'CCSS.MATH.CONTENT.HSA.APR.B.3',
    topic: 'Roots & Graphical Intercepts',
    description: 'Identify zeros of polynomials when suitable factorizations are available, and use the zeros to construct a rough graph of the function defined by the polynomial.',
  },
  {
    authority: 'College Board (USA)',
    code: 'AP Precalculus Topic 1.4 & 1.5',
    topic: 'Polynomial Functions & Linear Factors',
    description: 'Relate the real roots of polynomial functions to the algebraic factors of the polynomial and algebraic division algorithm.',
  },
  {
    authority: 'International Baccalaureate (IB)',
    code: 'DP Mathematics AA SL/HL Topic 2.5',
    topic: 'Polynomial Division & Factor Theorem',
    description: 'The factor and remainder theorems. Factorization of polynomials and solution of polynomial equations.',
  },
  {
    authority: 'Cambridge International / Edexcel',
    code: 'GCE A-Level Pure Mathematics P1 / P3',
    topic: 'Polynomial Remainder & Ruffini Algorithm',
    description: 'Use the factor theorem and remainder theorem to factorize polynomials and determine unknown coefficients.',
  },
];

export interface FormalProofSection {
  id: string;
  title: string;
  statementLatex: string;
  proofSteps: { step: string; justification: string }[];
  historicalContext: string;
}

export const FORMAL_THEOREMS_AND_PROOFS: FormalProofSection[] = [
  {
    id: 'remainder-theorem',
    title: 'The Polynomial Remainder Theorem (Little Bézout\'s Theorem)',
    statementLatex: 'P(x) \\in F[x], \\quad D(x) = x - c \\implies P(x) = (x - c)Q(x) + P(c)',
    proofSteps: [
      {
        step: '1. By the Euclidean Division Algorithm for polynomials over a field F, there exist unique polynomials Q(x) and R(x) such that P(x) = (x - c)Q(x) + R(x), where either R(x) = 0 or deg(R) < deg(x - c).',
        justification: 'Euclidean Polynomial Division Algorithm in F[x]',
      },
      {
        step: '2. Since deg(x - c) = 1, any remainder R(x) must have degree strictly less than 1. The only polynomials with degree < 1 are constant polynomials (degree 0 or zero polynomial). Hence, R(x) = R \\in F.',
        justification: 'Degree constraint: deg(R) < 1 implies R is a scalar constant.',
      },
      {
        step: '3. Substitute x = c into the identity P(x) = (x - c)Q(x) + R:',
        justification: 'Evaluation homomorphism at x = c',
      },
      {
        step: '4. P(c) = (c - c)Q(c) + R = 0 \\cdot Q(c) + R = R.',
        justification: 'Ring identity: 0 multiplied by any ring element is 0.',
      },
      {
        step: '5. Therefore, the numerical value of the remainder R on division by (x - c) is identically equal to P(c). Q.E.D.',
        justification: 'Conclusion',
      },
    ],
    historicalContext: 'Formulated by French mathematician Étienne Bézout (1730–1783) and often referred to as Little Bézout\'s Theorem to distinguish it from Bézout\'s Theorem on algebraic curves.',
  },
  {
    id: 'factor-theorem',
    title: 'The Factor Theorem',
    statementLatex: '(x - c) \\mid P(x) \\iff P(c) = 0',
    proofSteps: [
      {
        step: '1. (\\Rightarrow Direction): Suppose (x - c) is a factor of P(x). Then by definition, P(x) = (x - c)Q(x) with remainder R = 0. Evaluating at x = c yields P(c) = (c - c)Q(c) = 0.',
        justification: 'Direct substitution from divisibility definition.',
      },
      {
        step: '2. (\\Leftarrow Direction): Conversely, suppose P(c) = 0. By the Polynomial Remainder Theorem, P(x) = (x - c)Q(x) + R where R = P(c).',
        justification: 'Application of Polynomial Remainder Theorem.',
      },
      {
        step: '3. Since P(c) = 0, we have R = 0, which immediately yields P(x) = (x - c)Q(x). Hence (x - c) divides P(x) without remainder. Q.E.D.',
        justification: 'Zero remainder proves exact algebraic divisibility.',
      },
    ],
    historicalContext: 'Direct corollary of the Remainder Theorem, foundational for factoring polynomials into linear factors over algebraically closed fields (Fundamental Theorem of Algebra).',
  },
  {
    id: 'ruffini-rule',
    title: 'Horner\'s Scheme & Ruffini\'s Algorithmic Equivalence',
    statementLatex: 'b_{n-1} = a_n, \\quad b_{k-1} = a_k + c \\cdot b_k \\quad (k = n-1, \\dots, 1), \\quad R = a_0 + c \\cdot b_0',
    proofSteps: [
      {
        step: '1. Let P(x) = \\sum_{k=0}^{n} a_k x^k and let Q(x) = \\sum_{k=0}^{n-1} b_k x^k. We seek coefficients b_k and remainder R such that P(x) = (x - c)Q(x) + R.',
        justification: 'Coefficient matching in polynomial ring.',
      },
      {
        step: '2. Expanding (x - c)Q(x) + R gives b_{n-1}x^n + \\sum_{k=1}^{n-1}(b_{k-1} - c b_k)x^k + (R - c b_0).',
        justification: 'Polynomial expansion and term collection.',
      },
      {
        step: '3. Equating coefficients of like powers of x gives: a_n = b_{n-1}, a_k = b_{k-1} - c b_k for 1 \\le k \\le n-1, and a_0 = R - c b_0.',
        justification: 'Uniqueness of polynomial coefficients.',
      },
      {
        step: '4. Rearranging yields the synthetic division recurrence: b_{n-1} = a_n, b_{k-1} = a_k + c \\cdot b_k, and R = a_0 + c \\cdot b_0. This exactly replicates the row-by-row synthetic division tableau.',
        justification: 'Algorithmic equivalence established.',
      },
    ],
    historicalContext: 'Discovered by Paolo Ruffini in 1809 and independently by William George Horner in 1819. Reduces the arithmetic operation count from O(n^2) in long division to exactly n multiplications and n additions.',
  },
];
