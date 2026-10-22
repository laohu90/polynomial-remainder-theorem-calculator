export type Language = 'en' | 'es' | 'fr' | 'pt' | 'zh';

export interface Translations {
  metaTitle: string;
  metaDesc: string;

  appName: string;
  appTagline: string;
  navCalculator: string;
  navCompletingSquare: string;
  navSyntheticDivision: string;
  navRationalRoots: string;
  navPractice: string;
  navFaq: string;
  testYourKnowledge: string;

  heroBadge: string;
  heroFeature1: string;
  heroFeature2: string;
  heroFeature3: string;

  // Tabs
  tabRemainder: string;
  tabCompletingSquare: string;
  tabPractice: string;

  // Views
  viewLabel: string;
  viewAllMethods: string;
  viewDirect: string;
  viewSynthetic: string;
  viewLongDivision: string;

  // Remainder Theorem Calculator
  calcHeading: string;
  calcSubheading: string;
  polyInputLabel: string;
  polyInputPlaceholder: string;
  divisorInputLabel: string;
  divisorInputPlaceholder: string;
  calculateBtn: string;
  clearBtn: string;
  examplesTitle: string;
  example1: string;
  example2: string;
  example3: string;
  example4: string;
  example5: string;

  // Quick Keypad
  keypadTitle: string;

  // Results
  resultsTitle: string;
  remainderBadge: string;
  isFactorBadge: string;
  isNotFactorBadge: string;
  quotientLabel: string;
  method1Title: string;
  method1Desc: string;
  method1Step1: string;
  method1Step2: string;
  method1RemainderVal: string;
  method2Title: string;
  method2Desc: string;
  syntheticTableNote: string;
  bringDownStep: string;
  multiplyAndAdd: string;
  factorTheoremHeading: string;
  factorTheoremTrue: string;
  factorTheoremFalse: string;
  factoredFormLabel: string;
  rationalRootHeading: string;
  rationalRootSubheading: string;
  factorsOfConstant: string;
  factorsOfLeading: string;
  rationalGreenTip: string;
  testRootBtn: string;
  copySteps: string;
  stepsCopied: string;
  copyLatex: string;
  latexCopied: string;
  printOrSave: string;
  shareLink: string;
  linkCopied: string;

  // Synthetic Division Table controls
  synthReset: string;
  synthNext: string;
  synthShowAll: string;
  synthStep: string;
  synthOf: string;
  synthColResult: string;
  synthColPower: string;
  synthColRemainder: string;
  synthDivisionIdentity: string;

  // Long Division
  longDivTitle: string;
  longDivSub: string;
  longDivSubtract: string;
  longDivResult: string;
  longDivFinalRemainder: string;
  longDivConstantNote: string;

  // Completing the Square
  ctsHeading: string;
  ctsSubheading: string;
  ctsModeEquation: string;
  ctsModeCoeffs: string;
  ctsEquationLabel: string;
  ctsEquationPlaceholder: string;
  ctsInputA: string;
  ctsInputB: string;
  ctsInputC: string;
  ctsStandardEqTitle: string;
  ctsSolveBtn: string;
  ctsStep1Title: string;
  ctsStep2Title: string;
  ctsStep3Title: string;
  ctsStep4Title: string;
  ctsStep5Title: string;
  ctsVertexFormTitle: string;
  ctsVertexCoordinates: string;
  ctsDiscriminant: string;
  ctsRootsFound: string;
  ctsTwoReal: string;
  ctsOneDouble: string;
  ctsTwoComplex: string;
  ctsTilesTitle: string;
  ctsTilesDesc: string;
  ctsTilesTotalArea: string;
  ctsTilesAddedCorner: string;
  ctsTilesExpl: string;
  ctsParabolaTitle: string;
  ctsParabolaOpensUp: string;
  ctsParabolaOpensDown: string;

  // Practice & Quiz
  practiceHeading: string;
  practiceSubheading: string;
  practiceProblemN: string;
  practiceExamTag: string;
  practiceSubmit: string;
  practiceCorrect: string;
  practiceIncorrect: string;
  practiceNext: string;
  practiceShowSolution: string;
  practiceHideSolution: string;
  practiceYourAnswer: string;
  practiceAnswerPlaceholder: string;

  // Worked Examples
  workedExHeading: string;
  workedExSub: string;
  ex1Heading: string;
  ex1Problem: string;
  ex1Step1: string;
  ex1Step2: string;
  ex1Conc: string;
  ex2Heading: string;
  ex2Problem: string;
  ex2Step1: string;
  ex2Step2: string;
  ex2Step3: string;
  ex2Step4: string;
  ex2Final: string;
  ex3Heading: string;
  ex3Problem: string;
  ex3Step1: string;
  ex3Step2: string;
  ex3Step3: string;
  ex3Step4: string;
  ex3Step5: string;

  // Educational Content (Below the fold)
  eduTitle: string;
  eduSub: string;
  eduWhatIsRemainderTitle: string;
  eduWhatIsRemainderContent: string;
  eduWhatIsFactorTitle: string;
  eduWhatIsFactorContent: string;
  eduSyntheticVsLongTitle: string;
  eduSyntheticVsLongContent: string;
  eduTableMethod: string;
  eduTablePros: string;
  eduTableBestFor: string;
  eduCommonMistakesTitle: string;
  eduCommonMistakesContent: string;

  // FAQ
  faqTitle: string;
  faqSub: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
  faq3Q: string;
  faq3A: string;
  faq4Q: string;
  faq4A: string;

  // General & Missing labels
  inputSyntaxError: string;
  evaluatedAtRoot: string;
  dividesWithZeroRemainder: string;
  stepByStepProof: string;
  directEvaluation: string;
  footerPledge: string;

  // Completing the square presets & labels
  ctsPreset1: string;
  ctsPreset2: string;
  ctsPreset3: string;
  ctsPreset4: string;
  ctsPreset5: string;
  ctsVertexFormEquation: string;
  ctsVertexLabel: string;

  // Educational guide labels & table & mistake cards
  eduStudyGuideBadge: string;
  eduFormulaLabel: string;
  eduIdentityLabel: string;
  eduProblemLabel: string;
  eduStep1Label: string;
  eduStep2Label: string;
  eduStep3Label: string;
  eduStep4Label: string;
  eduStep5Label: string;
  eduConclusionLabel: string;
  eduTableMethod1Name: string;
  eduTableMethod1Pros: string;
  eduTableMethod1Best: string;
  eduTableMethod2Name: string;
  eduTableMethod2Pros: string;
  eduTableMethod2Best: string;
  eduTableMethod3Name: string;
  eduTableMethod3Pros: string;
  eduTableMethod3Best: string;
  eduMistake1Title: string;
  eduMistake1Desc: string;
  eduMistake2Title: string;
  eduMistake2Desc: string;
  eduMistake3Title: string;
  eduMistake3Desc: string;

  // Practice Quiz Questions
  quizQ1: string;
  quizQ2: string;
  quizQ3: string;
  quizQ4: string;
  quizQ5: string;

  // Footer
  footerDisclaimer: string;
  footerRights: string;
  footerGithubReady: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    metaTitle: "Polynomial Remainder Theorem Calculator with Steps | Factor Theorem & Synthetic Division",
    metaDesc: "Free step-by-step Polynomial Remainder Theorem Calculator, Factor Theorem root verifier, synthetic division scheme, and completing the square walkthrough. Fast, accurate, and 100% free.",

    appName: "Polynomial Remainder Theorem Calculator",
    appTagline: "Step-by-step Remainder Theorem, Factor Theorem verification, synthetic division, long division & completing the square.",
    navCalculator: "Remainder Calculator",
    navCompletingSquare: "Completing the Square",
    navSyntheticDivision: "Synthetic Division",
    navRationalRoots: "Rational Roots",
    navPractice: "Practice Quiz",
    navFaq: "FAQ & Guide",
    testYourKnowledge: "Test Your Knowledge",

    heroBadge: "High School Algebra 2 & Precalculus Math Engine",
    heroFeature1: "Free Step-by-Step Solutions",
    heroFeature2: "Synthetic & Long Division",
    heroFeature3: "Completing the Square Walkthrough",

    tabRemainder: "Remainder & Factor Theorem",
    tabCompletingSquare: "Completing the Square (Decomposition)",
    tabPractice: "Interactive Practice & Quiz",

    viewLabel: "Views:",
    viewAllMethods: "All 3 Methods",
    viewDirect: "Direct P(c)",
    viewSynthetic: "Synthetic Division",
    viewLongDivision: "Long Division",

    calcHeading: "Polynomial Remainder Theorem & Factor Theorem Solver",
    calcSubheading: "Calculate P(c), generate full synthetic & long division tables, and verify polynomial roots with instant step-by-step proofs.",
    polyInputLabel: "Dividend Polynomial P(x)",
    polyInputPlaceholder: "e.g., 2x^3 - 4x^2 + 3x - 5 or x^4 - 16",
    divisorInputLabel: "Divisor D(x) or Value (c)",
    divisorInputPlaceholder: "e.g., x - 2, 2x - 1, or 3",
    calculateBtn: "Calculate Steps",
    clearBtn: "Clear",
    examplesTitle: "High School Algebra Presets:",
    example1: "Algebra 2 Standard (x - 2)",
    example2: "Factor Theorem Zero Remainder",
    example3: "Fractional Divisor (2x - 1)",
    example4: "Missing Powers (x³ - 8)",
    example5: "Higher Degree (x⁴ - 5x² + 4)",

    keypadTitle: "Quick Math Input",

    resultsTitle: "Step-by-Step Solution",
    remainderBadge: "Remainder R",
    isFactorBadge: "IS A FACTOR (P(c) = 0)",
    isNotFactorBadge: "NOT A FACTOR (P(c) ≠ 0)",
    quotientLabel: "Quotient Q(x)",
    method1Title: "Method 1: Direct Substitution (Remainder Theorem)",
    method1Desc: "According to the Remainder Theorem, dividing P(x) by (x - c) yields a remainder equal to P(c). Substitute x = c into the polynomial:",
    method1Step1: "Step 1: Direct Substitution",
    method1Step2: "Step 2: Arithmetic Evaluation of Powers",
    method1RemainderVal: "Remainder Value:",
    method2Title: "Method 2: Synthetic Division Matrix (Ruffini's Scheme)",
    method2Desc: "Step-by-step algorithmic division table showing coefficients, carry-down, multiplication by c, and addition:",
    syntheticTableNote: "Note: When dividing by ax - b (where a ≠ 1), the bottom row values must be divided by a to obtain the true quotient coefficients.",
    bringDownStep: "Bring down leading coefficient",
    multiplyAndAdd: "Multiply by c and add to next coefficient",
    factorTheoremHeading: "Factor Theorem Conclusion",
    factorTheoremTrue: "Since the remainder R = 0, by the Factor Theorem, the linear expression is an exact factor of P(x), and c is a root/zero of the polynomial.",
    factorTheoremFalse: "Since the remainder R ≠ 0, the linear expression is NOT an exact factor of P(x), leaving a remainder of",
    factoredFormLabel: "Factored Expression",
    rationalRootHeading: "Rational Root Theorem Candidate Roots",
    rationalRootSubheading: "All possible rational zeros ±(factors of constant) / (factors of leading coefficient). Click any candidate to test it immediately:",
    factorsOfConstant: "Factors of Constant Term",
    factorsOfLeading: "Factors of Leading Coeff",
    rationalGreenTip: "Green highlighted candidates are confirmed roots (P(c) = 0). Click any value to load it directly into the calculator.",
    testRootBtn: "Test in Remainder Theorem",
    copySteps: "Copy Full Steps",
    stepsCopied: "Steps Copied to Clipboard!",
    copyLatex: "Copy LaTeX",
    latexCopied: "LaTeX Copied!",
    printOrSave: "Print / Save PDF",
    shareLink: "Share Solution",
    linkCopied: "Shareable Link Copied!",

    synthReset: "Reset",
    synthNext: "Next Step",
    synthShowAll: "Show All",
    synthStep: "Step",
    synthOf: "of",
    synthColResult: "Result",
    synthColPower: "Power",
    synthColRemainder: "Remainder",
    synthDivisionIdentity: "Division Algorithm Identity: P(x) = D(x) · Q(x) + R",

    longDivTitle: "Method 3: Polynomial Long Division (Detailed Algebraic Layout)",
    longDivSub: "Standard high school step-by-step long division format with quotient on top, line-by-line subtractions, and remainder.",
    longDivSubtract: "Subtract:",
    longDivResult: "Result:",
    longDivFinalRemainder: "Final Remainder:",
    longDivConstantNote: "Degree of dividend is 0 (constant polynomial). Division complete.",

    ctsHeading: "Completing the Square Walkthrough",
    ctsSubheading: "Step-by-step algebraic decomposition of quadratic equations ax² + bx + c = 0 into perfect square binomials and vertex form.",
    ctsModeEquation: "Equation Input (e.g. x² + 6x + 5 = 0)",
    ctsModeCoeffs: "Separate a, b, c Inputs",
    ctsEquationLabel: "Quadratic Equation",
    ctsEquationPlaceholder: "e.g. x^2 + 6x + 5 = 0 or 2x^2 + 8x - 10 = 0",
    ctsInputA: "Coefficient a (x²)",
    ctsInputB: "Coefficient b (x)",
    ctsInputC: "Constant c",
    ctsStandardEqTitle: "Standard Quadratic Equation",
    ctsSolveBtn: "Complete the Square",
    ctsStep1Title: "Step 1: Ensure Leading Coefficient is 1",
    ctsStep2Title: "Step 2: Isolate Variable Terms",
    ctsStep3Title: "Step 3: Add Magic Square (b / 2a)² to Both Sides",
    ctsStep4Title: "Step 4: Factor into a Binomial Square",
    ctsStep5Title: "Step 5: Square Root & Solve for x",
    ctsVertexFormTitle: "Vertex Form & Parabola Features",
    ctsVertexCoordinates: "Vertex (h, k)",
    ctsDiscriminant: "Discriminant Δ = b² - 4ac",
    ctsRootsFound: "Roots / Solutions",
    ctsTwoReal: "Two Distinct Real Roots",
    ctsOneDouble: "One Repeated Real Root",
    ctsTwoComplex: "Two Complex Conjugate Roots",
    ctsTilesTitle: "Visual Geometric Area Model (Algebra Tiles Concept)",
    ctsTilesDesc: "In US Algebra 2, completing the square is visualized as building a physical square of side length (x + b/2). The missing corner piece that completes the square is exactly (b/2)².",
    ctsTilesTotalArea: "Total Square Area:",
    ctsTilesAddedCorner: "Added Corner Piece (Magic Square):",
    ctsTilesExpl: "Adding this corner tile turns the L-shaped region into a complete square.",
    ctsParabolaTitle: "Parabola Curve & Vertex",
    ctsParabolaOpensUp: "Parabola opens upwards (minimum at vertex).",
    ctsParabolaOpensDown: "Parabola opens downwards (maximum at vertex).",

    practiceHeading: "Interactive Practice & Test Prep",
    practiceSubheading: "Strengthen your Algebra 2 skills. Solve the remainder or factor verification problem, test your answer, and view the full proof.",
    practiceProblemN: "Problem",
    practiceExamTag: "High School Algebra 2 Exam Prep",
    practiceSubmit: "Check Answer",
    practiceCorrect: "Correct! Outstanding job.",
    practiceIncorrect: "Not quite. Check the step-by-step solution below to see why.",
    practiceNext: "Next Problem",
    practiceShowSolution: "Show Full Solution",
    practiceHideSolution: "Hide Solution",
    practiceYourAnswer: "Your Remainder:",
    practiceAnswerPlaceholder: "e.g. 0, 1, or -7/8",

    workedExHeading: "Worked High School Algebra 2 Exam Examples",
    workedExSub: "Detailed step-by-step solutions to typical homework and test problems.",
    ex1Heading: "Example 1: Finding Remainder Without Long Division",
    ex1Problem: "Find the remainder when P(x) = 2x³ - 5x² + 4x - 6 is divided by (x - 3).",
    ex1Step1: "Identify root c = 3 from x - 3 = 0.",
    ex1Step2: "Substitute x = 3 into P(x):",
    ex1Conc: "According to the Remainder Theorem, the remainder is R = 15.",
    ex2Heading: "Example 2: Verifying a Factor and Factoring Completely",
    ex2Problem: "Determine if (x - 2) is a factor of P(x) = x³ - 4x² + x + 6.",
    ex2Step1: "Evaluate P(2) = (2)³ - 4(2)² + (2) + 6 = 8 - 16 + 2 + 6 = 0.",
    ex2Step2: "Since P(2) = 0, by the Factor Theorem, (x - 2) is an exact factor.",
    ex2Step3: "Perform synthetic division to obtain quotient Q(x) = x² - 2x - 3.",
    ex2Step4: "Factor quadratic x² - 2x - 3 = (x - 3)(x + 1).",
    ex2Final: "Final Factored Form:",
    ex3Heading: "Example 3: Completing the Square with Leading Coefficient a ≠ 1",
    ex3Problem: "Solve 2x² + 8x - 10 = 0 by completing the square.",
    ex3Step1: "Divide by 2: x² + 4x - 5 = 0.",
    ex3Step2: "Move constant: x² + 4x = 5.",
    ex3Step3: "Magic number (4/2)² = 2² = 4. Add 4 to both sides: x² + 4x + 4 = 5 + 4 = 9.",
    ex3Step4: "Factor binomial square: (x + 2)² = 9.",
    ex3Step5: "Square root: x + 2 = ±3 => x₁ = 1, x₂ = -5.",

    eduTitle: "Complete Mathematical Guide & Theory",
    eduSub: "Everything high school and college students need to master polynomial factoring, rapid root verification, and quadratic decomposition.",
    eduWhatIsRemainderTitle: "What is the Polynomial Remainder Theorem?",
    eduWhatIsRemainderContent: "The Polynomial Remainder Theorem is a fundamental theorem in algebra. It states that when a polynomial P(x) is divided by a linear divisor of the form (x - c), the remainder R is precisely equal to P(c). By the division algorithm: P(x) = (x - c)Q(x) + R. Substituting x = c eliminates the quotient term (c - c)Q(c) = 0, leaving P(c) = R.",
    eduWhatIsFactorTitle: "How the Factor Theorem Proves Roots",
    eduWhatIsFactorContent: "The Factor Theorem directly follows from the Remainder Theorem: (x - c) is a factor of P(x) if and only if P(c) = 0. In high school algebra, this provides a rapid method to verify roots without performing lengthy polynomial long division.",
    eduSyntheticVsLongTitle: "Synthetic Division vs. Polynomial Long Division",
    eduSyntheticVsLongContent: "Synthetic division is a streamlined shorthand calculation method for dividing polynomials when the divisor is linear (x - c). Instead of writing out variables and powers repeatedly, synthetic division records only numerical coefficients and uses addition instead of subtraction.",
    eduTableMethod: "Method",
    eduTablePros: "Advantages",
    eduTableBestFor: "Best Used For",
    eduCommonMistakesTitle: "Common Student Mistakes to Avoid",
    eduCommonMistakesContent: "1. Forgetting zero coefficients for missing terms (e.g. x³ - 1 requires [1, 0, 0, -1]). 2. Sign errors: for divisor (x + 3), c = -3, not +3. 3. Fractional divisors: when dividing by (2x - 1), c = 1/2, and the resulting quotient coefficients must be divided by 2.",

    faqTitle: "Frequently Asked Questions (FAQ)",
    faqSub: "Common questions about polynomial division, remainder theorem, and completing the square.",
    faq1Q: "Can the Remainder Theorem be used for non-linear divisors like x² + 1?",
    faq1A: "The classical Remainder Theorem applies to linear divisors of degree 1 (ax - b). For quadratic or higher degree divisors, the remainder can be of degree up to d-1 (e.g. Rx + S) and must be found using polynomial long division.",
    faq2Q: "Why do we add instead of subtract in synthetic division?",
    faq2A: "Because synthetic division replaces the divisor (x - c) with the root c itself, effectively negating the sign in advance. This turns the repetitive subtractions of long division into easier and less error-prone additions.",
    faq3Q: "What is the 'magic number' in completing the square?",
    faq3A: "The magic number is (b / 2a)². Adding this exact quantity to both sides transforms the quadratic expression into a perfect square trinomial (x + b/2a)².",
    faq4Q: "How does the Remainder Theorem help in SAT and ACT exams?",
    faq4A: "Standardized math exams frequently ask for the remainder when P(x) is divided by (x - c). Instead of performing long division taking 2 minutes, simply evaluate P(c) in 15 seconds!",

    inputSyntaxError: "Input Syntax Error",
    evaluatedAtRoot: "Evaluated at root",
    dividesWithZeroRemainder: "divides P(x) with zero remainder.",
    stepByStepProof: "Step-by-Step Proof",
    directEvaluation: "Direct Evaluation",
    footerPledge: "100% Free · Step-by-Step Solver · No Paywalls · Mobile Optimized",

    ctsPreset1: "x² + 6x + 5 = 0 (Integer Roots)",
    ctsPreset2: "2x² + 8x - 10 = 0 (Leading a ≠ 1)",
    ctsPreset3: "x² + 5x + 6 = 0 (Fractional Square)",
    ctsPreset4: "x² - 4x + 13 = 0 (Complex Roots)",
    ctsPreset5: "3x² - 12x + 9 = 0 (Factoring First)",
    ctsVertexFormEquation: "Vertex Form Equation:",
    ctsVertexLabel: "Vertex",

    eduStudyGuideBadge: "Algebra 2 & Precalculus Study Guide",
    eduFormulaLabel: "Mathematical Formula:",
    eduIdentityLabel: "Core Identity:",
    eduProblemLabel: "Problem:",
    eduStep1Label: "Step 1:",
    eduStep2Label: "Step 2:",
    eduStep3Label: "Step 3:",
    eduStep4Label: "Step 4:",
    eduStep5Label: "Step 5:",
    eduConclusionLabel: "Conclusion:",
    eduTableMethod1Name: "Remainder Theorem Direct Evaluation",
    eduTableMethod1Pros: "Instant numerical remainder in ~10 seconds. No division table required.",
    eduTableMethod1Best: "SAT / ACT exam questions asking only for remainder or root testing.",
    eduTableMethod2Name: "Synthetic Division (Ruffini Scheme)",
    eduTableMethod2Pros: "Computes quotient Q(x) and remainder R. 3x faster than long division.",
    eduTableMethod2Best: "Factoring higher-degree polynomials when divisor is linear (x - c).",
    eduTableMethod3Name: "Polynomial Long Division",
    eduTableMethod3Pros: "Universal method. Works for divisors of ANY degree (quadratic, cubic, etc.).",
    eduTableMethod3Best: "Non-linear divisors like x² + 2x + 5 where synthetic division cannot be applied.",
    eduMistake1Title: "❌ Error: x³ - 1",
    eduMistake1Desc: "Writing coefficients as [1, -1] instead of [1, 0, 0, -1]. Missing terms must have 0.",
    eduMistake2Title: "❌ Error: Divisor (x + 4)",
    eduMistake2Desc: "Using c = 4 instead of solving x + 4 = 0 ⇒ c = -4. Always flip the sign!",
    eduMistake3Title: "❌ Error: Divisor (3x - 6)",
    eduMistake3Desc: "Forgetting to divide quotient coefficients by leading coefficient 3.",

    quizQ1: "Find the remainder when P(x) = 2x³ - 4x² + 3x - 5 is divided by (x - 2).",
    quizQ2: "Use the Factor Theorem to determine if (x - 3) is a factor of P(x) = x³ - 3x² - 4x + 12. Enter remainder R:",
    quizQ3: "Calculate the remainder of P(x) = x⁴ - 16 divided by (x + 2):",
    quizQ4: "Find the remainder when P(x) = 3x³ + 5x² - 11x + 3 is divided by (2x - 1). (c = 1/2 = 0.5):",
    quizQ5: "Is (x + 1) an exact factor of P(x) = x³ + 2x² - 5x - 6? Enter remainder R:",

    footerDisclaimer: "Designed for high school Algebra 2, Precalculus, and College Algebra students worldwide.",
    footerRights: "All Rights Reserved. Production-Grade Educational Tool.",
    footerGithubReady: "Ready for GitHub & Google Search Indexing.",
  },

  es: {
    metaTitle: "Calculadora del Teorema del Resto de Polinomios | Pasos y Ruffini",
    metaDesc: "Calculadora gratuita del Teorema del Resto, verificación del Teorema del Factor, división sintética de Ruffini y método de completar el cuadrado paso a paso.",

    appName: "Calculadora del Teorema del Resto de Polinomios",
    appTagline: "Paso a paso: Teorema del Resto, Teorema del Factor, división sintética (Ruffini), división larga y completar el cuadrado.",
    navCalculator: "Calculadora del Resto",
    navCompletingSquare: "Completar el Cuadrado",
    navSyntheticDivision: "División Sintética",
    navRationalRoots: "Raíces Racionales",
    navPractice: "Cuestionario de Práctica",
    navFaq: "Preguntas y Guía",
    testYourKnowledge: "Pon a prueba tus conocimientos",

    heroBadge: "Motor Matemático de Álgebra de Secundaria y Bachillerato",
    heroFeature1: "Soluciones Paso a Paso Gratuitas",
    heroFeature2: "División Sintética y Larga",
    heroFeature3: "Completar el Cuadrado Paso a Paso",

    tabRemainder: "Teorema del Resto y del Factor",
    tabCompletingSquare: "Completar el Cuadrado (Descomposición)",
    tabPractice: "Práctica Interactiva",

    viewLabel: "Vistas:",
    viewAllMethods: "Los 3 Métodos",
    viewDirect: "Directo P(c)",
    viewSynthetic: "División Sintética (Ruffini)",
    viewLongDivision: "División Larga",

    calcHeading: "Calculadora del Teorema del Resto y del Factor",
    calcSubheading: "Calcula P(c), genera tablas de división sintética paso a paso y valida raíces polinómicas al instante.",
    polyInputLabel: "Polinomio Dividendo P(x)",
    polyInputPlaceholder: "Ej: 2x^3 - 4x^2 + 3x - 5 o x^4 - 16",
    divisorInputLabel: "Divisor D(x) o Valor (c)",
    divisorInputPlaceholder: "Ej: x - 2, 2x - 1, o 3",
    calculateBtn: "Calcular Pasos",
    clearBtn: "Borrar",
    examplesTitle: "Ejemplos de Álgebra:",
    example1: "Estándar Álgebra 2 (x - 2)",
    example2: "Teorema del Factor (Resto Cero)",
    example3: "Divisor Fraccionario (2x - 1)",
    example4: "Términos Faltantes (x³ - 8)",
    example5: "Grado Mayor (x⁴ - 5x² + 4)",

    keypadTitle: "Entrada Rápida",

    resultsTitle: "Solución Detallada Paso a Paso",
    remainderBadge: "Resto / Residuo R",
    isFactorBadge: "ES UN FACTOR (P(c) = 0)",
    isNotFactorBadge: "NO ES FACTOR (P(c) ≠ 0)",
    quotientLabel: "Cociente Q(x)",
    method1Title: "Método 1: Sustitución Directa (Teorema del Resto)",
    method1Desc: "Según el Teorema del Resto, dividir P(x) entre (x - c) da un resto igual a P(c). Sustituyendo x = c:",
    method1Step1: "Paso 1: Sustitución Directa",
    method1Step2: "Paso 2: Evaluación Aritmética de Potencias",
    method1RemainderVal: "Valor del Resto:",
    method2Title: "Método 2: Esquema de División Sintética (Regla de Ruffini)",
    method2Desc: "Tabla algorítmica detallada con coeficientes, bajada, multiplicación por c y suma continua:",
    syntheticTableNote: "Nota: Al dividir entre ax - b (con a ≠ 1), los valores de la fila inferior deben dividirse entre a para el cociente real.",
    bringDownStep: "Bajar el coeficiente principal",
    multiplyAndAdd: "Multiplicar por c y sumar al siguiente",
    factorTheoremHeading: "Conclusión del Teorema del Factor",
    factorTheoremTrue: "Como el resto R = 0, por el Teorema del Factor, la expresión lineal es un factor exacto de P(x), y c es raíz del polinomio.",
    factorTheoremFalse: "Como el resto R ≠ 0, la expresión lineal NO es un factor exacto de P(x), dejando un resto de",
    factoredFormLabel: "Expresión Factorizada",
    rationalRootHeading: "Teorema de las Raíces Racionales",
    rationalRootSubheading: "Candidatos a raíces racionales ±(factores del término independiente) / (factores del coeficiente principal):",
    factorsOfConstant: "Factores del Término Independiente",
    factorsOfLeading: "Factores del Coeficiente Principal",
    rationalGreenTip: "Los candidatos en verde son raíces confirmadas (P(c) = 0). Haz clic para cargarlas directamente.",
    testRootBtn: "Probar con el Teorema del Resto",
    copySteps: "Copiar Pasos",
    stepsCopied: "¡Pasos copiados al portapapeles!",
    copyLatex: "Copiar LaTeX",
    latexCopied: "¡LaTeX copiado!",
    printOrSave: "Imprimir / Guardar PDF",
    shareLink: "Compartir Solución",
    linkCopied: "¡Enlace copiado!",

    synthReset: "Reiniciar",
    synthNext: "Paso Siguiente",
    synthShowAll: "Mostrar Todo",
    synthStep: "Paso",
    synthOf: "de",
    synthColResult: "Resultado",
    synthColPower: "Grado",
    synthColRemainder: "Resto",
    synthDivisionIdentity: "Identidad del Algoritmo de la División: P(x) = D(x) · Q(x) + R",

    longDivTitle: "Método 3: División Larga de Polinomios (Formato Tradicional)",
    longDivSub: "Formato algebraico clásico con el cociente arriba, restas paso a paso y residuo final.",
    longDivSubtract: "Restar:",
    longDivResult: "Resultado:",
    longDivFinalRemainder: "Resto Final:",
    longDivConstantNote: "El grado del dividendo es 0 (polinomio constante). División concluida.",

    ctsHeading: "Método de Completar el Cuadrado Paso a Paso",
    ctsSubheading: "Descomposición algebraica detallada de ax² + bx + c = 0 en binomios al cuadrado y forma canónica / vértice.",
    ctsModeEquation: "Entrada por Ecuación (Ej: x² + 6x + 5 = 0)",
    ctsModeCoeffs: "Entrada por Coeficientes a, b, c",
    ctsEquationLabel: "Ecuación Cuadrática",
    ctsEquationPlaceholder: "Ej: x^2 + 6x + 5 = 0 o 2x^2 + 8x - 10 = 0",
    ctsInputA: "Coeficiente a (x²)",
    ctsInputB: "Coeficiente b (x)",
    ctsInputC: "Constante c",
    ctsStandardEqTitle: "Ecuación Cuadrática Estándar",
    ctsSolveBtn: "Completar el Cuadrado",
    ctsStep1Title: "Paso 1: Asegurar que el coeficiente principal sea 1",
    ctsStep2Title: "Paso 2: Aislar los términos con variable",
    ctsStep3Title: "Paso 3: Sumar el término clave (b / 2a)² a ambos lados",
    ctsStep4Title: "Paso 4: Factorizar en un binomio al cuadrado",
    ctsStep5Title: "Paso 5: Sacar raíz cuadrada y despejar x",
    ctsVertexFormTitle: "Forma Canónica del Vértice",
    ctsVertexCoordinates: "Vértice (h, k)",
    ctsDiscriminant: "Discriminante Δ = b² - 4ac",
    ctsRootsFound: "Raíces / Soluciones",
    ctsTwoReal: "Dos Raíces Reales Distintas",
    ctsOneDouble: "Una Raíz Real Doble",
    ctsTwoComplex: "Dos Raíces Complejas Conjugadas",
    ctsTilesTitle: "Modelo Geométrico Visual de Áreas (Concepto de Azulejos Algebraicos)",
    ctsTilesDesc: "En álgebra, completar el cuadrado se visualiza como construir un cuadrado físico de lado (x + b/2). La esquina faltante es exactamente (b/2)².",
    ctsTilesTotalArea: "Área Total del Cuadrado:",
    ctsTilesAddedCorner: "Pieza de la Esquina Añadida (Término Mágico):",
    ctsTilesExpl: "Al añadir este azulejo de esquina, la región en L se convierte en un cuadrado completo.",
    ctsParabolaTitle: "Curva y Vértice de la Parábola",
    ctsParabolaOpensUp: "La parábola abre hacia arriba (mínimo en el vértice).",
    ctsParabolaOpensDown: "La parábola abre hacia abajo (máximo en el vértice).",

    practiceHeading: "Práctica Interactiva y Exámenes",
    practiceSubheading: "Pon a prueba tus conocimientos. Resuelve el resto o factor, verifica tu respuesta y revisa la deducción completa.",
    practiceProblemN: "Problema",
    practiceExamTag: "Preparación para Exámenes de Álgebra",
    practiceSubmit: "Comprobar Respuesta",
    practiceCorrect: "¡Correcto! Excelente deducción.",
    practiceIncorrect: "Incorrecto. Revisa los pasos detallados abajo.",
    practiceNext: "Siguiente Problema",
    practiceShowSolution: "Ver Solución Completa",
    practiceHideSolution: "Ocultar Solución",
    practiceYourAnswer: "Tu Resto:",
    practiceAnswerPlaceholder: "Ej: 0, 1 o -7/8",

    workedExHeading: "Ejemplos Típicos Resueltos de Exámenes",
    workedExSub: "Soluciones completas paso a paso de problemas habituales de deberes y exámenes.",
    ex1Heading: "Ejemplo 1: Hallar el Resto sin Hacer División Larga",
    ex1Problem: "Halla el resto al dividir P(x) = 2x³ - 5x² + 4x - 6 entre (x - 3).",
    ex1Step1: "Identificar la raíz c = 3 a partir de x - 3 = 0.",
    ex1Step2: "Sustituir x = 3 en P(x):",
    ex1Conc: "Según el Teorema del Resto, el resto es R = 15.",
    ex2Heading: "Ejemplo 2: Verificar un Factor y Factorizar Totalmente",
    ex2Problem: "Determina si (x - 2) es factor de P(x) = x³ - 4x² + x + 6.",
    ex2Step1: "Evaluar P(2) = (2)³ - 4(2)² + (2) + 6 = 8 - 16 + 2 + 6 = 0.",
    ex2Step2: "Como P(2) = 0, por el Teorema del Factor, (x - 2) es factor exacto.",
    ex2Step3: "Aplicar la regla de Ruffini para obtener el cociente Q(x) = x² - 2x - 3.",
    ex2Step4: "Factorizar el polinomio cuadrático x² - 2x - 3 = (x - 3)(x + 1).",
    ex2Final: "Forma Factorizada Completa:",
    ex3Heading: "Ejemplo 3: Completar el Cuadrado con Coeficiente Principal a ≠ 1",
    ex3Problem: "Resuelve 2x² + 8x - 10 = 0 completando el cuadrado.",
    ex3Step1: "Dividir entre 2: x² + 4x - 5 = 0.",
    ex3Step2: "Aislar la constante: x² + 4x = 5.",
    ex3Step3: "Término clave (4/2)² = 2² = 4. Sumar 4 a ambos lados: x² + 4x + 4 = 5 + 4 = 9.",
    ex3Step4: "Factorizar en binomio al cuadrado: (x + 2)² = 9.",
    ex3Step5: "Extraer raíz: x + 2 = ±3 => x₁ = 1, x₂ = -5.",

    eduTitle: "Guía Teórica y Fundamentos Matemáticos",
    eduSub: "Todo lo que necesitas para dominar la factorización de polinomios, comprobación de raíces y el método de completar el cuadrado.",
    eduWhatIsRemainderTitle: "¿Qué es el Teorema del Resto de Polinomios?",
    eduWhatIsRemainderContent: "El Teorema del Resto establece que al dividir un polinomio P(x) entre un binomio lineal (x - c), el resto R es idénticamente igual a P(c). Por el algoritmo de la división: P(x) = (x - c)Q(x) + R. Al evaluar en x = c, el término (c - c)Q(c) se anula, resultando P(c) = R.",
    eduWhatIsFactorTitle: "Cómo el Teorema del Factor Determina Raíces",
    eduWhatIsFactorContent: "El Teorema del Factor es una consecuencia directa del Teorema del Resto: (x - c) es factor de P(x) si y solo si P(c) = 0. Esto permite validar rápidamente raíces sin necesidad de divisiones largas.",
    eduSyntheticVsLongTitle: "División Sintética (Ruffini) vs. División Larga",
    eduSyntheticVsLongContent: "La división sintética (o Regla de Ruffini) es una técnica abreviada que utiliza solo los coeficientes numéricos y sumas en lugar de restas repetidas.",
    eduTableMethod: "Método",
    eduTablePros: "Ventajas",
    eduTableBestFor: "Recomendado para",
    eduCommonMistakesTitle: "Errores Comunes de los Estudiantes",
    eduCommonMistakesContent: "1. Olvidar coeficientes cero para términos faltantes. 2. Error de signo: para (x + 3), c = -3. 3. Divisores fraccionarios como 2x - 1.",

    faqTitle: "Preguntas Frecuentes (FAQ)",
    faqSub: "Respuestas clave para tus exámenes de álgebra.",
    faq1Q: "¿Se puede aplicar a divisores cuadráticos como x² + 1?",
    faq1A: "El teorema clásico aplica a divisores lineales (grado 1). Para divisores cuadráticos se requiere división polinómica larga.",
    faq2Q: "¿Por qué en división sintética sumamos en vez de restar?",
    faq2A: "Porque se usa la raíz c directamente, lo que invierte el signo con anticipación y convierte las restas en sumas.",
    faq3Q: "¿Qué es el número mágico al completar el cuadrado?",
    faq3A: "Es (b / 2a)², que convierte el trinomio en un cuadrado perfecto (x + b/2a)².",
    faq4Q: "¿Cómo ayuda este teorema en exámenes oficiales como SAT o Selectividad?",
    faq4A: "Permite hallar el resto en segundos evaluando P(c) sin perder minutos en división larga.",

    inputSyntaxError: "Error de Sintaxis de Entrada",
    evaluatedAtRoot: "Evaluado en la raíz",
    dividesWithZeroRemainder: "divide a P(x) con resto cero.",
    stepByStepProof: "Demostración Paso a Paso",
    directEvaluation: "Evaluación Directa",
    footerPledge: "100% Gratuito · Resolución Paso a Paso · Sin Muros de Pago · Móvil Optimizado",

    ctsPreset1: "x² + 6x + 5 = 0 (Raíces Enteras)",
    ctsPreset2: "2x² + 8x - 10 = 0 (Coeficiente a ≠ 1)",
    ctsPreset3: "x² + 5x + 6 = 0 (Fracción en Cuadrado)",
    ctsPreset4: "x² - 4x + 13 = 0 (Raíces Complejas)",
    ctsPreset5: "3x² - 12x + 9 = 0 (Factorizar Primero)",
    ctsVertexFormEquation: "Ecuación en Forma Vértice:",
    ctsVertexLabel: "Vértice",

    eduStudyGuideBadge: "Guía de Estudio de Álgebra y Precálculo",
    eduFormulaLabel: "Fórmula Matemática:",
    eduIdentityLabel: "Identidad Fundamental:",
    eduProblemLabel: "Problema:",
    eduStep1Label: "Paso 1:",
    eduStep2Label: "Paso 2:",
    eduStep3Label: "Paso 3:",
    eduStep4Label: "Paso 4:",
    eduStep5Label: "Paso 5:",
    eduConclusionLabel: "Conclusión:",
    eduTableMethod1Name: "Evaluación Directa por Teorema del Resto",
    eduTableMethod1Pros: "Resto numérico instantáneo en ~10 segundos sin tabla de división.",
    eduTableMethod1Best: "Preguntas de examen donde solo se pide el resto o verificar si c es raíz.",
    eduTableMethod2Name: "División Sintética (Regla de Ruffini)",
    eduTableMethod2Pros: "Calcula cociente Q(x) y resto R. 3 veces más rápida que la división larga.",
    eduTableMethod2Best: "Factorizar polinomios de grado superior cuando el divisor es lineal (x - c).",
    eduTableMethod3Name: "División Larga de Polinomios",
    eduTableMethod3Pros: "Método universal. Válido para divisores de cualquier grado (cuadráticos, etc.).",
    eduTableMethod3Best: "Divisores no lineales como x² + 2x + 5 donde Ruffini no aplica directamente.",
    eduMistake1Title: "❌ Error: x³ - 1",
    eduMistake1Desc: "Poner coeficientes [1, -1] en vez de [1, 0, 0, -1]. Los términos ausentes deben llevar 0.",
    eduMistake2Title: "❌ Error: Divisor (x + 4)",
    eduMistake2Desc: "Usar c = 4 en lugar de x + 4 = 0 ⇒ c = -4. ¡Siempre invierte el signo!",
    eduMistake3Title: "❌ Error: Divisor (3x - 6)",
    eduMistake3Desc: "Olvidar dividir los coeficientes del cociente por el coeficiente principal 3.",

    quizQ1: "Halla el resto al dividir P(x) = 2x³ - 4x² + 3x - 5 entre (x - 2).",
    quizQ2: "Usa el Teorema del Factor para determinar si (x - 3) es factor de P(x) = x³ - 3x² - 4x + 12. Escribe el resto R:",
    quizQ3: "Calcula el resto de P(x) = x⁴ - 16 dividido por (x + 2):",
    quizQ4: "Halla el resto de P(x) = 3x³ + 5x² - 11x + 3 dividido entre (2x - 1). (c = 1/2 = 0.5):",
    quizQ5: "¿Es (x + 1) factor exacto de P(x) = x³ + 2x² - 5x - 6? Escribe el resto R:",

    footerDisclaimer: "Herramienta optimizada para estudiantes de secundaria, preparatoria y universidad.",
    footerRights: "Todos los derechos reservados. Aplicación educativa de alta precisión.",
    footerGithubReady: "Listo para indexación en Google y despliegue en GitHub.",
  },

  fr: {
    metaTitle: "Calculateur du Théorème du Reste Polynomial | Étapes et Horner",
    metaDesc: "Calculateur gratuit du Théorème du Reste, vérification du Théorème du Facteur, division de Horner-Ruffini et complétion du carré pas à pas.",

    appName: "Calculateur du Théorème du Reste Polynomial",
    appTagline: "Résolution pas à pas du théorème du reste, validation du facteur, division synthétique (Horner), division euclidienne et complétion du carré.",
    navCalculator: "Calculateur du Reste",
    navCompletingSquare: "Complétion du Carré",
    navSyntheticDivision: "Division Synthétique",
    navRationalRoots: "Racines Rationnelles",
    navPractice: "Quiz d'Entraînement",
    navFaq: "FAQ & Théorie",
    testYourKnowledge: "Tester vos connaissances",

    heroBadge: "Moteur Mathématique Lycée & Enseignement Supérieur",
    heroFeature1: "Solutions Détaillées Gratuites",
    heroFeature2: "Division Synthétique & Euclidienne",
    heroFeature3: "Complétion du Carré Pas à Pas",

    tabRemainder: "Théorème du Reste & Facteur",
    tabCompletingSquare: "Complétion du Carré",
    tabPractice: "Quiz Interactif",

    viewLabel: "Vues :",
    viewAllMethods: "Les 3 Méthodes",
    viewDirect: "Direct P(c)",
    viewSynthetic: "Horner-Ruffini",
    viewLongDivision: "Division Euclidienne",

    calcHeading: "Calculateur du Théorème du Reste et du Facteur",
    calcSubheading: "Calculez P(c), construisez le tableau de Ruffini et déterminez les racines polynomiales pas à pas.",
    polyInputLabel: "Polynôme Dividende P(x)",
    polyInputPlaceholder: "Ex: 2x^3 - 4x^2 + 3x - 5 ou x^4 - 16",
    divisorInputLabel: "Diviseur D(x) ou Valeur (c)",
    divisorInputPlaceholder: "Ex: x - 2, 2x - 1 ou 3",
    calculateBtn: "Calculer les Étapes",
    clearBtn: "Effacer",
    examplesTitle: "Exemples Prédéfinis:",
    example1: "Standard Algèbre (x - 2)",
    example2: "Théorème du Facteur (Reste 0)",
    example3: "Diviseur Fractionnaire (2x - 1)",
    example4: "Puissances Manquantes (x³ - 8)",
    example5: "Degré Supérieur (x⁴ - 5x² + 4)",

    keypadTitle: "Clavier Mathématique",

    resultsTitle: "Solution Détaillée Pas à Pas",
    remainderBadge: "Reste R",
    isFactorBadge: "EST UN FACTEUR (P(c) = 0)",
    isNotFactorBadge: "N'EST PAS UN FACTEUR (P(c) ≠ 0)",
    quotientLabel: "Quotient Q(x)",
    method1Title: "Méthode 1: Substitution Directe (Théorème du Reste)",
    method1Desc: "Selon le théorème du reste, diviser P(x) par (x - c) donne un reste égal à P(c). On remplace x par c:",
    method1Step1: "Étape 1: Substitution Directe",
    method1Step2: "Étape 2: Évaluation Arithmétique des Puissances",
    method1RemainderVal: "Valeur du Reste :",
    method2Title: "Méthode 2: Schéma de Horner / Ruffini (Division Synthétique)",
    method2Desc: "Tableau d'étapes montrant la descente du coefficient, la multiplication par c et l'addition successive:",
    syntheticTableNote: "Remarque: Lorsque le diviseur est de la forme ax - b (avec a ≠ 1), les coefficients obtenus doivent être divisés par a.",
    bringDownStep: "Descendre le premier coefficient",
    multiplyAndAdd: "Multiplier par c et additionner",
    factorTheoremHeading: "Conclusion du Théorème du Facteur",
    factorTheoremTrue: "Puisque le reste R = 0, d'après le théorème du facteur, (x - c) est un facteur exact de P(x), et c est une racine.",
    factorTheoremFalse: "Puisque le reste R ≠ 0, l'expression linéaire n'est pas un facteur de P(x). Le reste est de",
    factoredFormLabel: "Forme Factorisée",
    rationalRootHeading: "Théorème des Racines Rationnelles",
    rationalRootSubheading: "Candidats aux racines rationnelles ±(facteurs du terme constant) / (facteurs du coefficient dominant):",
    factorsOfConstant: "Facteurs du Terme Constant",
    factorsOfLeading: "Facteurs du Coefficient Dominant",
    rationalGreenTip: "Les valeurs sur fond vert sont des racines confirmées (P(c) = 0). Cliquez pour tester.",
    testRootBtn: "Tester avec le Théorème du Reste",
    copySteps: "Copier les Étapes",
    stepsCopied: "Étapes copiées dans le presse-papier!",
    copyLatex: "Copier LaTeX",
    latexCopied: "LaTeX copié!",
    printOrSave: "Imprimer / Enregistrer PDF",
    shareLink: "Partager la Solution",
    linkCopied: "Lien copié!",

    synthReset: "Réinitialiser",
    synthNext: "Étape Suivante",
    synthShowAll: "Afficher Tout",
    synthStep: "Étape",
    synthOf: "sur",
    synthColResult: "Résultat",
    synthColPower: "Puissance",
    synthColRemainder: "Reste",
    synthDivisionIdentity: "Identité de la Division Euclidienne : P(x) = D(x) · Q(x) + R",

    longDivTitle: "Méthode 3: Division Euclidienne Posée (Format Classique)",
    longDivSub: "Disposition standard avec quotient supérieur, soustractions successives et reste terminal.",
    longDivSubtract: "Soustraire :",
    longDivResult: "Résultat :",
    longDivFinalRemainder: "Reste Final :",
    longDivConstantNote: "Le degré du dividende est 0 (polynôme constant). Division terminée.",

    ctsHeading: "Méthode de Complétion du Carré Pas à Pas",
    ctsSubheading: "Décomposition algébrique complète de ax² + bx + c = 0 sous forme de carré parfait et forme canonique.",
    ctsModeEquation: "Saisie par Équation (Ex: x² + 6x + 5 = 0)",
    ctsModeCoeffs: "Saisie par Coefficients a, b, c",
    ctsEquationLabel: "Équation Quadratique",
    ctsEquationPlaceholder: "Ex: x^2 + 6x + 5 = 0 ou 2x^2 + 8x - 10 = 0",
    ctsInputA: "Coefficient a (x²)",
    ctsInputB: "Coefficient b (x)",
    ctsInputC: "Constante c",
    ctsStandardEqTitle: "Équation Quadratique Standard",
    ctsSolveBtn: "Compléter le Carré",
    ctsStep1Title: "Étape 1: S'assurer que le coefficient dominant vaut 1",
    ctsStep2Title: "Étape 2: Isoler les termes variables",
    ctsStep3Title: "Étape 3: Ajouter le terme (b / 2a)² aux deux membres",
    ctsStep4Title: "Étape 4: Factoriser en carré parfait",
    ctsStep5Title: "Étape 5: Prendre la racine carrée et résoudre pour x",
    ctsVertexFormTitle: "Forme Canonique et Propriétés de la Parabole",
    ctsVertexCoordinates: "Sommet (h, k)",
    ctsDiscriminant: "Discriminant Δ = b² - 4ac",
    ctsRootsFound: "Racines / Solutions",
    ctsTwoReal: "Deux Racines Réelles Distinctes",
    ctsOneDouble: "Une Racine Réelle Double",
    ctsTwoComplex: "Deux Racines Complexes Conjuguées",
    ctsTilesTitle: "Modèle Géométrique des Aires (Tuiles Algébriques)",
    ctsTilesDesc: "En algèbre, compléter le carré revient à assembler un carré de côté (x + b/2). La pièce de coin manquante est exactement (b/2)².",
    ctsTilesTotalArea: "Aire Totale du Carré :",
    ctsTilesAddedCorner: "Coin Ajouté (Nombre Magique) :",
    ctsTilesExpl: "L'ajout de ce coin transforme la région en équerre en un carré parfait.",
    ctsParabolaTitle: "Courbe et Sommet de la Parabole",
    ctsParabolaOpensUp: "La parabole est tournée vers le haut (minimum au sommet).",
    ctsParabolaOpensDown: "La parabole est tournée vers le bas (maximum au sommet).",

    practiceHeading: "Entraînement Interactif & Préparation aux Examens",
    practiceSubheading: "Testez votre compréhension. Calculez le reste, soumettez votre réponse et visualisez les étapes détaillées.",
    practiceProblemN: "Problème",
    practiceExamTag: "Préparation Examens d'Algèbre",
    practiceSubmit: "Vérifier la Réponse",
    practiceCorrect: "Bravo ! Réponse parfaitement exacte.",
    practiceIncorrect: "Pas tout à fait. Consultez la solution complète ci-dessous.",
    practiceNext: "Problème Suivant",
    practiceShowSolution: "Afficher la Solution",
    practiceHideSolution: "Masquer la Solution",
    practiceYourAnswer: "Votre Reste :",
    practiceAnswerPlaceholder: "Ex: 0, 1 ou -7/8",

    workedExHeading: "Exemples Types Résolus d'Examens",
    workedExSub: "Résolutions détaillées des exercices classiques de devoirs et d'évaluations.",
    ex1Heading: "Exemple 1 : Trouver le Reste sans Poser la Division",
    ex1Problem: "Trouvez le reste de la division de P(x) = 2x³ - 5x² + 4x - 6 par (x - 3).",
    ex1Step1: "Identifier la racine c = 3 à partir de x - 3 = 0.",
    ex1Step2: "Remplacer x = 3 dans P(x) :",
    ex1Conc: "Selon le théorème du reste, le reste est R = 15.",
    ex2Heading: "Exemple 2 : Vérifier un Facteur et Factoriser Totalement",
    ex2Problem: "Déterminez si (x - 2) est un facteur de P(x) = x³ - 4x² + x + 6.",
    ex2Step1: "Évaluer P(2) = (2)³ - 4(2)² + (2) + 6 = 8 - 16 + 2 + 6 = 0.",
    ex2Step2: "Puisque P(2) = 0, d'après le théorème du facteur, (x - 2) est un facteur exact.",
    ex2Step3: "Appliquer la méthode de Horner pour trouver le quotient Q(x) = x² - 2x - 3.",
    ex2Step4: "Factoriser le second degré x² - 2x - 3 = (x - 3)(x + 1).",
    ex2Final: "Forme Factorisée Finale :",
    ex3Heading: "Exemple 3 : Compléter le Carré avec un Coefficient a ≠ 1",
    ex3Problem: "Résoudre 2x² + 8x - 10 = 0 par la méthode du carré.",
    ex3Step1: "Diviser par 2 : x² + 4x - 5 = 0.",
    ex3Step2: "Isoler la constante : x² + 4x = 5.",
    ex3Step3: "Terme magique (4/2)² = 4. Ajouter 4 aux deux membres : x² + 4x + 4 = 5 + 4 = 9.",
    ex3Step4: "Écrire le carré : (x + 2)² = 9.",
    ex3Step5: "Racine carrée : x + 2 = ±3 => x₁ = 1, x₂ = -5.",

    eduTitle: "Guide Théorique et Fondements Mathématiques",
    eduSub: "Tout ce qu'il faut savoir sur la factorisation polynomiale, le théorème du reste et la méthode de complétion.",
    eduWhatIsRemainderTitle: "Qu'est-ce que le Théorème du Reste ?",
    eduWhatIsRemainderContent: "Le théorème du reste affirme que lors de la division euclidienne d'un polynôme P(x) par un binôme de premier degré (x - c), le reste est un scalaire R égal à P(c). En effet : P(x) = (x - c)Q(x) + R. En évaluant en x = c, le terme s'annule, donnant P(c) = R.",
    eduWhatIsFactorTitle: "Comment le Théorème du Facteur Détecte les Zéros",
    eduWhatIsFactorContent: "Le théorème du facteur est un corollaire direct : (x - c) divise P(x) si et seulement si P(c) = 0. Cela permet de vérifier instantanément si un nombre est une racine.",
    eduSyntheticVsLongTitle: "Division Synthétique (Horner) vs. Division Euclidienne",
    eduSyntheticVsLongContent: "La division synthétique est une méthode compacte qui manipule uniquement les coefficients numériques et utilise des additions plutôt que des soustractions.",
    eduTableMethod: "Méthode",
    eduTablePros: "Avantages",
    eduTableBestFor: "Utilisation Idéale",
    eduCommonMistakesTitle: "Erreurs Fréquentes à Éviter",
    eduCommonMistakesContent: "1. Oublier les zéros des puissances manquantes. 2. Erreur de signe sur c. 3. Oublier de normaliser le quotient quand le diviseur est ax - b.",

    faqTitle: "Foire Aux Questions (FAQ)",
    faqSub: "Tout comprendre sur le reste polynomial et la factorisation.",
    faq1Q: "Peut-on utiliser le théorème pour des diviseurs non linéaires ?",
    faq1A: "Non, le théorème classique s'applique uniquement aux diviseurs de degré 1 (ax - b).",
    faq2Q: "Pourquoi additionne-t-on dans la division de Horner ?",
    faq2A: "Parce qu'on prend directement la racine c, ce qui intègre le changement de signe dès le départ.",
    faq3Q: "Quel est le rôle du nombre magique dans la complétion du carré ?",
    faq3A: "C'est (b / 2a)², qui permet de reformer l'identité remarquable (x + b/2a)².",
    faq4Q: "Quel est l'intérêt pour les épreuves de mathématiques ?",
    faq4A: "Il permet de trouver le reste en 10 secondes au lieu de poser une division longue.",

    inputSyntaxError: "Erreur de Syntaxe d'Entrée",
    evaluatedAtRoot: "Évalué à la racine",
    dividesWithZeroRemainder: "divise P(x) avec un reste nul.",
    stepByStepProof: "Démonstration Pas à Pas",
    directEvaluation: "Évaluation Directe",
    footerPledge: "100% Gratuit · Résolution Pas à Pas · Sans Mur Payant · Optimisé Mobile",

    ctsPreset1: "x² + 6x + 5 = 0 (Racines Entières)",
    ctsPreset2: "2x² + 8x - 10 = 0 (Coefficient a ≠ 1)",
    ctsPreset3: "x² + 5x + 6 = 0 (Carré Fractionnaire)",
    ctsPreset4: "x² - 4x + 13 = 0 (Racines Complexes)",
    ctsPreset5: "3x² - 12x + 9 = 0 (Factorisation)",
    ctsVertexFormEquation: "Forme Canonique (Sommet) :",
    ctsVertexLabel: "Sommet",

    eduStudyGuideBadge: "Guide d'Étude Algèbre & Analyse",
    eduFormulaLabel: "Formule Mathématique :",
    eduIdentityLabel: "Identité Fondamentale :",
    eduProblemLabel: "Énoncé :",
    eduStep1Label: "Étape 1 :",
    eduStep2Label: "Étape 2 :",
    eduStep3Label: "Étape 3 :",
    eduStep4Label: "Étape 4 :",
    eduStep5Label: "Étape 5 :",
    eduConclusionLabel: "Conclusion :",
    eduTableMethod1Name: "Évaluation Directe du Théorème du Reste",
    eduTableMethod1Pros: "Reste numérique immédiat en ~10 secondes sans poser de tableau.",
    eduTableMethod1Best: "Questions d'épreuves demandant uniquement le reste ou le test de racine.",
    eduTableMethod2Name: "Division Synthétique (Méthode de Horner-Ruffini)",
    eduTableMethod2Pros: "Calcule le quotient Q(x) et le reste R. 3x plus rapide que la division longue.",
    eduTableMethod2Best: "Factorisation de polynômes de degré supérieur avec diviseur linéaire (x - c).",
    eduTableMethod3Name: "Division Euclidienne Longue",
    eduTableMethod3Pros: "Méthode universelle. Valable pour les diviseurs de TOUT degré (quadratique, etc.).",
    eduTableMethod3Best: "Diviseurs non linéaires comme x² + 2x + 5 où Horner ne s'applique pas directement.",
    eduMistake1Title: "❌ Erreur : x³ - 1",
    eduMistake1Desc: "Noter les coefficients [1, -1] au lieu de [1, 0, 0, -1]. Les puissances manquantes exigent 0.",
    eduMistake2Title: "❌ Erreur : Diviseur (x + 4)",
    eduMistake2Desc: "Utiliser c = 4 au lieu de x + 4 = 0 ⇒ c = -4. Pensez à inverser le signe !",
    eduMistake3Title: "❌ Erreur : Diviseur (3x - 6)",
    eduMistake3Desc: "Oublier de diviser les coefficients du quotient par le coefficient dominant 3.",

    quizQ1: "Trouver le reste de la division de P(x) = 2x³ - 4x² + 3x - 5 par (x - 2).",
    quizQ2: "Déterminer si (x - 3) est un facteur de P(x) = x³ - 3x² - 4x + 12. Entrer le reste R :",
    quizQ3: "Calculer le reste de P(x) = x⁴ - 16 divisé par (x + 2) :",
    quizQ4: "Trouver le reste de P(x) = 3x³ + 5x² - 11x + 3 divisé par (2x - 1). (c = 1/2 = 0.5) :",
    quizQ5: "Est-ce que (x + 1) est un facteur exact de P(x) = x³ + 2x² - 5x - 6 ? Entrer le reste R :",

    footerDisclaimer: "Conçu pour les lycéens et étudiants du supérieur.",
    footerRights: "Tous droits réservés. Outil pédagogique haute précision.",
    footerGithubReady: "Prêt pour le référencement Google et GitHub.",
  },

  pt: {
    metaTitle: "Calculadora do Teorema do Resto Polinomial | Briot-Ruffini e Passos",
    metaDesc: "Calculadora gratuita do Teorema do Resto, validação do Teorema do Fator (D'Alembert), dispositivo de Briot-Ruffini e método de completar quadrados.",

    appName: "Calculadora do Teorema do Resto Polinomial",
    appTagline: "Passo a passo do Teorema do Resto, Teorema do Fator, Briot-Ruffini, divisão da chave e completar quadrados.",
    navCalculator: "Calculadora do Resto",
    navCompletingSquare: "Completar Quadrados",
    navSyntheticDivision: "Briot-Ruffini",
    navRationalRoots: "Raízes Racionais",
    navPractice: "Quiz de Treino",
    navFaq: "FAQ e Teoria",
    testYourKnowledge: "Teste seus conhecimentos",

    heroBadge: "Motor Matemático para Ensino Médio e Vestibulares",
    heroFeature1: "Resoluções Passo a Passo Gratuitas",
    heroFeature2: "Briot-Ruffini e Método da Chave",
    heroFeature3: "Completamento de Quadrados",

    tabRemainder: "Teorema do Resto e Fator",
    tabCompletingSquare: "Completar Quadrados",
    tabPractice: "Treino Interativo",

    viewLabel: "Visualizações:",
    viewAllMethods: "Todos os 3 Métodos",
    viewDirect: "Direto P(c)",
    viewSynthetic: "Briot-Ruffini",
    viewLongDivision: "Método da Chave",

    calcHeading: "Calculadora do Teorema do Resto e do Fator",
    calcSubheading: "Calcule P(c), obtenha a tabela de Briot-Ruffini passo a passo e confirme raízes com rapidez.",
    polyInputLabel: "Polinômio Dividendo P(x)",
    polyInputPlaceholder: "Ex: 2x^3 - 4x^2 + 3x - 5 ou x^4 - 16",
    divisorInputLabel: "Divisor D(x) ou Valor (c)",
    divisorInputPlaceholder: "Ex: x - 2, 2x - 1, ou 3",
    calculateBtn: "Calcular Etapas",
    clearBtn: "Limpar",
    examplesTitle: "Exemplos do Ensino Médio:",
    example1: "Padrão Álgebra (x - 2)",
    example2: "Teorema do Fator (Resto Zero)",
    example3: "Divisor Fracionário (2x - 1)",
    example4: "Graus Ausentes (x³ - 8)",
    example5: "Grau Superior (x⁴ - 5x² + 4)",

    keypadTitle: "Teclado Rápido",

    resultsTitle: "Solução Passo a Passo",
    remainderBadge: "Resto R",
    isFactorBadge: "É FATOR EXATO (P(c) = 0)",
    isNotFactorBadge: "NÃO É FATOR (P(c) ≠ 0)",
    quotientLabel: "Quociente Q(x)",
    method1Title: "Método 1: Substituição Direta (Teorema do Resto)",
    method1Desc: "Pelo Teorema do Resto, ao dividir P(x) por (x - c), o resto é igual a P(c). Substituindo x = c:",
    method1Step1: "Passo 1: Substituição Direta",
    method1Step2: "Passo 2: Avaliação Aritmética de Potências",
    method1RemainderVal: "Valor do Resto:",
    method2Title: "Método 2: Dispositivo Prático de Briot-Ruffini",
    method2Desc: "Tabela passo a passo com coeficientes, descida, multiplicação por c e soma sucessiva:",
    syntheticTableNote: "Atenção: Ao dividir por ax - b (com a ≠ 1), os valores da linha inferior devem ser divididos por a para o quociente correto.",
    bringDownStep: "Baixar o primeiro coeficiente",
    multiplyAndAdd: "Multiplicar por c e somar ao seguinte",
    factorTheoremHeading: "Conclusão do Teorema do Fator (D'Alembert)",
    factorTheoremTrue: "Como o resto R = 0, pelo Teorema do Fator, (x - c) é fator de P(x), e c é raiz do polinômio.",
    factorTheoremFalse: "Como o resto R ≠ 0, o binômio linear NÃO é fator de P(x), gerando um resto de",
    factoredFormLabel: "Forma Fatorada",
    rationalRootHeading: "Teorema das Raízes Racionais",
    rationalRootSubheading: "Candidatos a raízes racionais ±(divisores do termo independente) / (divisores do termo líder):",
    factorsOfConstant: "Divisores do Termo Independente",
    factorsOfLeading: "Divisores do Coeficiente Líder",
    rationalGreenTip: "Itens destacados em verde são raízes confirmadas (P(c) = 0). Clique para testar.",
    testRootBtn: "Testar com o Teorema do Resto",
    copySteps: "Copiar Etapas",
    stepsCopied: "Etapas copiadas com sucesso!",
    copyLatex: "Copiar LaTeX",
    latexCopied: "LaTeX copiado!",
    printOrSave: "Imprimir / Salvar PDF",
    shareLink: "Compartilhar Solução",
    linkCopied: "Link copiado!",

    synthReset: "Reiniciar",
    synthNext: "Próximo Passo",
    synthShowAll: "Mostrar Tudo",
    synthStep: "Passo",
    synthOf: "de",
    synthColResult: "Resultado",
    synthColPower: "Grau",
    synthColRemainder: "Resto",
    synthDivisionIdentity: "Identidade Fundamental da Divisão: P(x) = D(x) · Q(x) + R",

    longDivTitle: "Método 3: Divisão de Polinômios pelo Método da Chave",
    longDivSub: "Disposição tradicional da divisão com quociente superior, subtrações sucessivas e resto final.",
    longDivSubtract: "Subtrair:",
    longDivResult: "Resultado:",
    longDivFinalRemainder: "Resto Final:",
    longDivConstantNote: "O grau do dividendo é 0 (polinômio constante). Divisão terminada.",

    ctsHeading: "Método de Completar o Quadrado Passo a Passo",
    ctsSubheading: "Transformação detalhada de equações quadráticas ax² + bx + c = 0 em trinômios quadrados perfeitos e forma canônica.",
    ctsModeEquation: "Entrada por Equação (Ex: x² + 6x + 5 = 0)",
    ctsModeCoeffs: "Entrada por Coeficientes a, b, c",
    ctsEquationLabel: "Equação Quadrática",
    ctsEquationPlaceholder: "Ex: x^2 + 6x + 5 = 0 ou 2x^2 + 8x - 10 = 0",
    ctsInputA: "Coeficiente a (x²)",
    ctsInputB: "Coeficiente b (x)",
    ctsInputC: "Constante c",
    ctsStandardEqTitle: "Equação Quadrática Padrão",
    ctsSolveBtn: "Completar o Quadrado",
    ctsStep1Title: "Passo 1: Garantir coeficiente líder igual a 1",
    ctsStep2Title: "Passo 2: Isolar os termos variáveis",
    ctsStep3Title: "Passo 3: Somar (b / 2a)² em ambos os membros",
    ctsStep4Title: "Passo 4: Fatorar no quadrado da soma/diferença",
    ctsStep5Title: "Passo 5: Extrair a raiz quadrada e isolar x",
    ctsVertexFormTitle: "Forma Canônica e Vértice da Parábola",
    ctsVertexCoordinates: "Vértice (h, k)",
    ctsDiscriminant: "Discriminante Δ = b² - 4ac",
    ctsRootsFound: "Raíces / Soluções",
    ctsTwoReal: "Duas Raízes Reais Distintas",
    ctsOneDouble: "Uma Raiz Real Dupla",
    ctsTwoComplex: "Duas Raízes Complexas Conjugadas",
    ctsTilesTitle: "Modelo Geométrico Visual de Áreas (Conceito de Blocos Algébricos)",
    ctsTilesDesc: "Na álgebra, completar o quadrado é visto como construir um quadrado de lado (x + b/2). O pedaço que falta no canto é exatamente (b/2)².",
    ctsTilesTotalArea: "Área Total do Quadrado:",
    ctsTilesAddedCorner: "Pedaço Adicionado no Canto (Termo Mágico):",
    ctsTilesExpl: "Ao adicionar esta peça, a região em formato de L torna-se um quadrado completo.",
    ctsParabolaTitle: "Curva e Vértice da Parábola",
    ctsParabolaOpensUp: "A parábola tem concavidade para cima (mínimo no vértice).",
    ctsParabolaOpensDown: "A parábola tem concavidade para baixo (máximo no vértice).",

    practiceHeading: "Treino Interativo para Vestibulares e ENEM",
    practiceSubheading: "Pratique o Teorema do Resto. Calcule, envie sua resposta e veja a demonstração completa.",
    practiceProblemN: "Questão",
    practiceExamTag: "Preparatório ENEM & Vestibulares",
    practiceSubmit: "Conferir Resposta",
    practiceCorrect: "Correto! Excelente raciocínio.",
    practiceIncorrect: "Incorreto. Veja a resolução detalhada abaixo.",
    practiceNext: "Próxima Questão",
    practiceShowSolution: "Ver Resolução Completa",
    practiceHideSolution: "Ocultar Resolução",
    practiceYourAnswer: "Seu Resto:",
    practiceAnswerPlaceholder: "Ex: 0, 1 ou -7/8",

    workedExHeading: "Exemplos Típicos Resolvidos de Provas",
    workedExSub: "Resoluções passo a passo de questões clássicas de listas e exames.",
    ex1Heading: "Exemplo 1: Encontrar o Resto sem Usar o Método da Chave",
    ex1Problem: "Determine o resto da divisão de P(x) = 2x³ - 5x² + 4x - 6 por (x - 3).",
    ex1Step1: "Identificar a raiz c = 3 a partir de x - 3 = 0.",
    ex1Step2: "Substituir x = 3 em P(x):",
    ex1Conc: "Pelo Teorema do Resto, o resto é R = 15.",
    ex2Heading: "Exemplo 2: Confirmar um Fator e Fatorar Totalmente",
    ex2Problem: "Verifique se (x - 2) é fator de P(x) = x³ - 4x² + x + 6.",
    ex2Step1: "Calcular P(2) = (2)³ - 4(2)² + (2) + 6 = 8 - 16 + 2 + 6 = 0.",
    ex2Step2: "Como P(2) = 0, pelo Teorema do Fator, (x - 2) é um fator exato.",
    ex2Step3: "Aplicar Briot-Ruffini para encontrar o quociente Q(x) = x² - 2x - 3.",
    ex2Step4: "Fatorar a expressão quadrática x² - 2x - 3 = (x - 3)(x + 1).",
    ex2Final: "Forma Fatorada Completa:",
    ex3Heading: "Exemplo 3: Completar o Quadrado com Coeficiente a ≠ 1",
    ex3Problem: "Resolva 2x² + 8x - 10 = 0 completando o quadrado.",
    ex3Step1: "Dividir por 2: x² + 4x - 5 = 0.",
    ex3Step2: "Isolar a constante: x² + 4x = 5.",
    ex3Step3: "Termo mágico (4/2)² = 2² = 4. Somar 4 dos dois lados: x² + 4x + 4 = 5 + 4 = 9.",
    ex3Step4: "Fatorar no quadrado da soma: (x + 2)² = 9.",
    ex3Step5: "Extrair raiz quadrada: x + 2 = ±3 => x₁ = 1, x₂ = -5.",

    eduTitle: "Guia Teórico Completo de Polinômios",
    eduSub: "Tudo o que você precisa para dominar divisão polinomial, raízes e completamento de quadrados.",
    eduWhatIsRemainderTitle: "O que é o Teorema do Resto?",
    eduWhatIsRemainderContent: "O Teorema do Resto afirma que na divisão de um polinômio P(x) por um binômio linear (x - c), o resto é constante e igual a P(c). Pelo algoritmo da divisão: P(x) = (x - c)Q(x) + R. Ao fazer x = c, tem-se P(c) = R.",
    eduWhatIsFactorTitle: "Como o Teorema de D'Alembert (Fator) Funciona",
    eduWhatIsFactorContent: "Um polinômio P(x) é divisível por (x - c) se e somente se c é raiz de P(x), ou seja, P(c) = 0. Isso possibilita testar raízes em segundos.",
    eduSyntheticVsLongTitle: "Briot-Ruffini vs. Método da Chave",
    eduSyntheticVsLongContent: "O dispositivo de Briot-Ruffini é uma simplificação rápida do método da chave para divisores de grau 1, operando apenas com números.",
    eduTableMethod: "Método",
    eduTablePros: "Vantagens",
    eduTableBestFor: "Melhor Aplicação",
    eduCommonMistakesTitle: "Erros Comuns dos Estudantes",
    eduCommonMistakesContent: "1. Esquecer de preencher termos ausentes com zero. 2. Trocar o sinal da raiz c. 3. Esquecer de dividir o quociente por a quando o divisor for ax - b.",

    faqTitle: "Perguntas Frequentes (FAQ)",
    faqSub: "Dúvidas essenciais sobre divisão polinomial e equações de 2º grau.",
    faq1Q: "Pode ser usado para divisores de 2º grau como x² + 1?",
    faq1A: "O teorema clássico é estrito para divisores lineares (1º grau). Para 2º grau, usa-se o método da chave.",
    faq2Q: "Por que no Briot-Ruffini somamos em vez de subtrair?",
    faq2A: "Porque já utilizamos a raiz c com o sinal invertido, trocando a subtração por adição.",
    faq3Q: "O que é o termo chave ao completar o quadrado?",
    faq3A: "É (b / 2a)², que completa a expressão num trinômio quadrado perfeito.",
    faq4Q: "Como isso ajuda no ENEM e provas de concurso?",
    faq4A: "Permite achar o resto e validar alternativas em menos de 30 segundos.",

    inputSyntaxError: "Erro de Sintaxe na Entrada",
    evaluatedAtRoot: "Avaliado na raiz",
    dividesWithZeroRemainder: "divide P(x) com resto zero.",
    stepByStepProof: "Demonstração Passo a Passo",
    directEvaluation: "Avaliação Direta",
    footerPledge: "100% Gratuito · Resolução Passo a Passo · Sem Muros · Otimizado para Celular",

    ctsPreset1: "x² + 6x + 5 = 0 (Raízes Inteiras)",
    ctsPreset2: "2x² + 8x - 10 = 0 (Coeficiente a ≠ 1)",
    ctsPreset3: "x² + 5x + 6 = 0 (Quadrado Fracionário)",
    ctsPreset4: "x² - 4x + 13 = 0 (Raízes Complexas)",
    ctsPreset5: "3x² - 12x + 9 = 0 (Fatoração Prévia)",
    ctsVertexFormEquation: "Forma Canônica do Vértice:",
    ctsVertexLabel: "Vértice",

    eduStudyGuideBadge: "Guia de Estudos Álgebra & Pré-Cálculo",
    eduFormulaLabel: "Fórmula Matemática:",
    eduIdentityLabel: "Identidade Fundamental:",
    eduProblemLabel: "Problema:",
    eduStep1Label: "Passo 1:",
    eduStep2Label: "Passo 2:",
    eduStep3Label: "Passo 3:",
    eduStep4Label: "Passo 4:",
    eduStep5Label: "Passo 5:",
    eduConclusionLabel: "Conclusão:",
    eduTableMethod1Name: "Avaliação Direta pelo Teorema do Resto",
    eduTableMethod1Pros: "Resto numérico imediato em ~10 segundos sem montar tabela.",
    eduTableMethod1Best: "Questões de vestibular e ENEM que solicitam apenas o resto ou teste de raiz.",
    eduTableMethod2Name: "Dispositivo Prático de Briot-Ruffini",
    eduTableMethod2Pros: "Calcula o quociente Q(x) e resto R. 3x mais rápido que a divisão da chave.",
    eduTableMethod2Best: "Fatorar polinômios de grau elevado quando o divisor é linear (x - c).",
    eduTableMethod3Name: "Divisão Polinomial Longa (Método da Chave)",
    eduTableMethod3Pros: "Método universal. Válido para divisores de QUALQUER grau (quadrático, cúbico, etc.).",
    eduTableMethod3Best: "Divisores de 2º grau como x² + 2x + 5 onde Briot-Ruffini não se aplica diretamente.",
    eduMistake1Title: "❌ Erro: x³ - 1",
    eduMistake1Desc: "Escrever coeficientes [1, -1] em vez de [1, 0, 0, -1]. Termos ausentes exigem 0.",
    eduMistake2Title: "❌ Erro: Divisor (x + 4)",
    eduMistake2Desc: "Usar c = 4 em vez de resolver x + 4 = 0 ⇒ c = -4. Sempre inverta o sinal!",
    eduMistake3Title: "❌ Erro: Divisor (3x - 6)",
    eduMistake3Desc: "Esquecer de dividir os coeficientes do quociente pelo coeficiente líder 3.",

    quizQ1: "Encontre o resto da divisão de P(x) = 2x³ - 4x² + 3x - 5 por (x - 2).",
    quizQ2: "Use o Teorema do Fator (D'Alembert) para testar se (x - 3) divide P(x) = x³ - 3x² - 4x + 12. Digite o resto R:",
    quizQ3: "Calcule o resto de P(x) = x⁴ - 16 dividido por (x + 2):",
    quizQ4: "Encontre o resto de P(x) = 3x³ + 5x² - 11x + 3 dividido por (2x - 1). (c = 1/2 = 0.5):",
    quizQ5: "(x + 1) é um fator exato de P(x) = x³ + 2x² - 5x - 6? Digite o resto R:",

    footerDisclaimer: "Desenvolvido para estudantes de Ensino Médio e Superior.",
    footerRights: "Todos os direitos reservados. Aplicação educacional de alta precisão.",
    footerGithubReady: "Preparado para indexação do Google e GitHub.",
  },

  zh: {
    metaTitle: "多项式余数定理计算器 | 综合除法长除法与配方法详细步骤",
    metaDesc: "免费在线多项式余数定理计算器、因式定理快速验根器、综合除法排列表、多项式长除法竖式推导及五步配方法拆解过程，全流程详尽步骤。",

    appName: "多项式余数定理计算器与因式定理验证器",
    appTagline: "详细解题步骤、配方法拆解过程、综合除法表、长除法竖式与有理根快速验根。",
    navCalculator: "余数定理计算器",
    navCompletingSquare: "配方法拆解过程",
    navSyntheticDivision: "综合除法 (Ruffini)",
    navRationalRoots: "有理根候选检验",
    navPractice: "互动练习题",
    navFaq: "常见问答与知识库",
    testYourKnowledge: "测验你的代数水平",

    heroBadge: "高中代数 2 与预备微积分智能解题引擎",
    heroFeature1: "100% 免费详细推导步骤",
    heroFeature2: "综合除法与长除法双竖式",
    heroFeature3: "五步配方法几何拼图拆解",

    tabRemainder: "余数定理与因式定理",
    tabCompletingSquare: "配方法拆解过程 (高中小专题)",
    tabPractice: "互动练习与自测题",

    viewLabel: "展示视图：",
    viewAllMethods: "全部三种方法",
    viewDirect: "代入求值 P(c)",
    viewSynthetic: "综合除法表",
    viewLongDivision: "多项式长除法",

    calcHeading: "多项式余数定理计算器与因式定理在线验证",
    calcSubheading: "高中多项式因式分解必学，常用于快速验根。支持代入法、综合除法与长除法三重推导，直接输出商式与余数。",
    polyInputLabel: "被除式多项式 P(x)",
    polyInputPlaceholder: "例如：2x^3 - 4x^2 + 3x - 5 或 x^4 - 16",
    divisorInputLabel: "除式 D(x) 或 根 (c)",
    divisorInputPlaceholder: "例如：x - 2、2x - 1 或 3",
    calculateBtn: "生成详细步骤",
    clearBtn: "清空",
    examplesTitle: "高中典型预设题：",
    example1: "标准二次/三次式 (x - 2)",
    example2: "因式定理验证整除 (余数为0)",
    example3: "分数除式 (2x - 1)",
    example4: "缺项补零经典题 (x³ - 8)",
    example5: "高次因式分解 (x⁴ - 5x² + 4)",

    keypadTitle: "常用数学符号输入",

    resultsTitle: "详细解题推导过程",
    remainderBadge: "余数 R",
    isFactorBadge: "是整除因式 (P(c) = 0)",
    isNotFactorBadge: "非因式 (P(c) ≠ 0)",
    quotientLabel: "商式 Q(x)",
    method1Title: "方法一：直接代入求值 (余数定理法)",
    method1Desc: "根据余数定理，当多项式 P(x) 除以线性一次因式 (x - c) 时，所得余数 R 等于将 x = c 代入多项式的结果 P(c)：",
    method1Step1: "第一步：直接代入自变量 x = c",
    method1Step2: "第二步：逐项展开与幂次算术化简",
    method1RemainderVal: "计算所得余数值：",
    method2Title: "方法二：综合除法矩阵排列表 (Ruffini 算法)",
    method2Desc: "展示系数排列、首项下落、乘根累加的规范书写步骤，适合高中作业与考试草稿：",
    syntheticTableNote: "注意：当除式为 ax - b 且 a ≠ 1 时，综合除法底行所得各项系数须除以 a 才能得出正确商式 Q(x)。",
    bringDownStep: "下落首项最高次系数",
    multiplyAndAdd: "乘以根 c 后与下一项系数相加",
    factorTheoremHeading: "因式定理在线验证结论",
    factorTheoremTrue: "因为余数 R = 0，根据因式定理，除式是多项式 P(x) 的一个因式，且 c 是该多项式的一个实数根/零点！",
    factorTheoremFalse: "因为余数 R ≠ 0，除式无法整除多项式 P(x)，计算所得余数为",
    factoredFormLabel: "因式分解恒等式表达",
    rationalRootHeading: "有理根定理候选根快速验算",
    rationalRootSubheading: "候选有理根为 ±(常数项的因子) / (首项最高次系数的因子)。点击任意候选根即可一键验算余数：",
    factorsOfConstant: "常数项的全部整数因子",
    factorsOfLeading: "最高次项系数的全部整数因子",
    rationalGreenTip: "绿色高亮的数值为验证成功的零点根 (P(c) = 0)。点击任意数值即可一键载入计算器。",
    testRootBtn: "一键代入余数定理验算",
    copySteps: "复制完整解题步骤",
    stepsCopied: "已复制解题步骤到剪贴板！",
    copyLatex: "复制 LaTeX 公式",
    latexCopied: "已复制 LaTeX 代码！",
    printOrSave: "打印 / 保存为 PDF",
    shareLink: "分享解题链接",
    linkCopied: "题目链接已复制！",

    synthReset: "重置步骤",
    synthNext: "下一步",
    synthShowAll: "直接看全貌",
    synthStep: "第",
    synthOf: "步，共",
    synthColResult: "计算结果",
    synthColPower: "对应幂次",
    synthColRemainder: "余数项",
    synthDivisionIdentity: "带余除法恒等式：P(x) = D(x) · Q(x) + R",

    longDivTitle: "方法三：多项式长除法完整代数竖式推导",
    longDivSub: "标准高中教材竖式排版，顶部呈现商式，中间展示逐项乘积与做差减法，底部得出余数。",
    longDivSubtract: "做差减去：",
    longDivResult: "差值下落：",
    longDivFinalRemainder: "最终所得余数：",
    longDivConstantNote: "被除式次数为 0（常数项）。除法推导完成。",

    ctsHeading: "一元二次方程配方法拆解过程",
    ctsSubheading: "高中代数标准五步配方法拆解，从 ax² + bx + c = 0 详细转化为完全平方式与抛物线顶点式。",
    ctsModeEquation: "整句方程直接输入 (如 x² + 6x + 5 = 0)",
    ctsModeCoeffs: "分项输入系数 a, b, c",
    ctsEquationLabel: "一元二次方程",
    ctsEquationPlaceholder: "例如：x^2 + 6x + 5 = 0 或 2x^2 + 8x - 10 = 0",
    ctsInputA: "二次项系数 a (x²)",
    ctsInputB: "一次项系数 b (x)",
    ctsInputC: "常数项 c",
    ctsStandardEqTitle: "标准一元二次方程",
    ctsSolveBtn: "配方法完整推导",
    ctsStep1Title: "第一步：二次项系数化为 1 (除以 a)",
    ctsStep2Title: "第二步：移项，将常数项移至等号右侧",
    ctsStep3Title: "第三步：两边同时加上一次项系数一半的平方 (b/2a)²",
    ctsStep4Title: "第四步：左边化为完全平方式 (x + b/2a)²",
    ctsStep5Title: "第五步：开平方求出方程两根",
    ctsVertexFormTitle: "抛物线顶点式与函数性质",
    ctsVertexCoordinates: "顶点坐标 (h, k)",
    ctsDiscriminant: "判别式 Δ = b² - 4ac",
    ctsRootsFound: "解的情况",
    ctsTwoReal: "两个不相等的实数根",
    ctsOneDouble: "两个相等的实数根 (重根)",
    ctsTwoComplex: "一对共轭复数虚根",
    ctsTilesTitle: "几何面积拼图直观模型 (Algebra Tiles 教学模型)",
    ctsTilesDesc: "在高中代数教学中，配方法被形象地理解为拼出一个边长为 (x + b/2) 的大正方形。角上缺的那块小正方形面积正好是 (b/2)²。",
    ctsTilesTotalArea: "拼成的大正方形总面积：",
    ctsTilesAddedCorner: "右下角补足的角落拼块 (配方法关键数)：",
    ctsTilesExpl: "补上这个角块后，原先 L 形区域便精确凑成了一个完整的完全平方几何体。",
    ctsParabolaTitle: "抛物线几何曲线与顶点特征",
    ctsParabolaOpensUp: "抛物线开口向上（顶点为最低极小值点）。",
    ctsParabolaOpensDown: "抛物线开口向下（顶点为最高极大值点）。",

    practiceHeading: "多项式因式定理互动练习题",
    practiceSubheading: "高中经典验根习题，随堂自测巩固余数定理，提交答案后即刻查看分步推导解析。",
    practiceProblemN: "习题",
    practiceExamTag: "高中代数 2 随堂自测",
    practiceSubmit: "提交并验证",
    practiceCorrect: "回答正确！计算非常精准。",
    practiceIncorrect: "回答错误，请查看下方标准推导步骤。",
    practiceNext: "换下一道练习题",
    practiceShowSolution: "查看详细解题解析",
    practiceHideSolution: "收起详细解析",
    practiceYourAnswer: "你计算的余数 R：",
    practiceAnswerPlaceholder: "例如：0、1 或 -7/8",

    workedExHeading: "高中典型考试真题解析库",
    workedExSub: "精选教材常见测试题型与规范解题步骤。",
    ex1Heading: "例题 1：无需长除法快速秒杀求余数",
    ex1Problem: "求多项式 P(x) = 2x³ - 5x² + 4x - 6 除以 (x - 3) 所得的余数。",
    ex1Step1: "令除式 x - 3 = 0，解得根 c = 3。",
    ex1Step2: "将 x = 3 代入多项式 P(x) 求值：",
    ex1Conc: "根据多项式余数定理，所得余数 R = 15。",
    ex2Heading: "例题 2：因式定理快速验根并完全因式分解",
    ex2Problem: "验证 (x - 2) 是否为 P(x) = x³ - 4x² + x + 6 的因式，并将其完全分解。",
    ex2Step1: "代入验算：P(2) = (2)³ - 4(2)² + (2) + 6 = 8 - 16 + 2 + 6 = 0。",
    ex2Step2: "因为 P(2) = 0，根据因式定理，(x - 2) 是其整除因式。",
    ex2Step3: "运用综合除法提取因式，得出商式 Q(x) = x² - 2x - 3。",
    ex2Step4: "继续分解二次因式：x² - 2x - 3 = (x - 3)(x + 1)。",
    ex2Final: "完全因式分解最终结果：",
    ex3Heading: "例题 3：二次项系数 a ≠ 1 的配方法规范推导",
    ex3Problem: "用配方法解一元二次方程 2x² + 8x - 10 = 0。",
    ex3Step1: "两边同时除以 2：x² + 4x - 5 = 0。",
    ex3Step2: "移项：x² + 4x = 5。",
    ex3Step3: "计算配方数 (4/2)² = 2² = 4。两边同时加 4：x² + 4x + 4 = 5 + 4 = 9。",
    ex3Step4: "左边写成完全平方式：(x + 2)² = 9。",
    ex3Step5: "两边开平方：x + 2 = ±3 => x₁ = 1, x₂ = -5。",

    eduTitle: "高中代数核心知识点详解与备考指南",
    eduSub: "帮助高中学生与家长理清余数定理、因式分解与配方法的所有关键点。",
    eduWhatIsRemainderTitle: "什么是多项式余数定理 (Remainder Theorem)？",
    eduWhatIsRemainderContent: "多项式余数定理是高中代数的核心考点。对于任意多项式 P(x)，当它被一次单项式或二项式 (x - c) 相除时，余数一定是一个常数 R，且其数值严格等于 P(c)。根据多项式带余除法原理：P(x) = (x - c)Q(x) + R。只要令 x = c，前项因式 (c - c) 必为 0，从而直接消去未知商式 Q(x)，留下 P(c) = R。",
    eduWhatIsFactorTitle: "余数定理与因式定理 (Factor Theorem) 的关系",
    eduWhatIsFactorContent: "因式定理是余数定理在特殊情况下的直接推论：多项式 P(x) 含有因式 (x - c) 的充要条件是余数 R = P(c) = 0。在高考、AP Calculus、SAT/ACT 等考试中，利用因式定理快速试根验根，是三次及以上高次多项式因式分解最核心的捷径。",
    eduSyntheticVsLongTitle: "综合除法与多项式长除法的对比与取舍",
    eduSyntheticVsLongContent: "综合除法 (Synthetic Division) 是当除式为一次式 (x - c) 时的高效简记算法。它只记录数值系数，略去反复书写的变量 x 与指数，并将长除法中容易出错的逐项减法转化为直观的加法，计算速度比长除法快 3 倍以上。",
    eduTableMethod: "除法方法",
    eduTablePros: "核心优势",
    eduTableBestFor: "适用场景",
    eduCommonMistakesTitle: "高中生做题最容易踩的 3 大坑",
    eduCommonMistakesContent: "1. 缺项未补零：如 x³ - 8 缺少 x² 和 x 项，综合除法系数必须写为 [1, 0, 0, -8]，漏补零直接全错。2. 根的正负号搞反：除式为 (x + 3) 时，根 c 应当为 -3，而非 +3。3. 除式含有系数 a：例如除式为 (2x - 1) 时，底行系数必须除以 2 才是真正的商式。",

    faqTitle: "常见高频疑问解答 (FAQ)",
    faqSub: "帮助高中学生理清多项式除法与二次方程配方法的所有核心疑问。",
    faq1Q: "余数定理可以用来除以二次因式 (例如 x² + 1) 吗？",
    faq1A: "经典余数定理仅针对一次式 (x - c)。若除式为二次式，余数最高可为一次式 (Ax + B)，通常需使用多项式长除法或扩展待定系数法。",
    faq2Q: "为什么综合除法第二行是做加法而不是减法？",
    faq2A: "因为综合除法左侧所取的除数 c 已经自带相反符号 (x - c = 0 即 x = c)，提前反号后使得原长除法的减法操作转换成了更不易出错的加法。",
    faq3Q: "配方法中的“关键数字”是怎么算出来的？",
    faq3A: "将一次项系数除以 2 后平方，即 (b / 2a)²。左右两边同时加上这个数，左侧就能精确凑成完全平方式 (x + b/2a)²。",
    faq4Q: "这个工具对 SAT / ACT / AP 考试有什么提分帮助？",
    faq4A: "标化考试中常出现“若 P(x) 除以 x - 3 余数为 5，求未知参数 k”的高频题型，使用余数定理 P(3) = 5 可在 15 秒内直接列方程秒杀，无需耗时两分钟草稿长除。",

    inputSyntaxError: "输入表达式格式有误",
    evaluatedAtRoot: "在待验根处求值",
    dividesWithZeroRemainder: "能整除 P(x)，余数为零。",
    stepByStepProof: "详细推导证明步骤",
    directEvaluation: "直接代入求值",
    footerPledge: "100% 免费 · 全程详细解题推导 · 无付费墙 · 移动端流畅运行",

    ctsPreset1: "x² + 6x + 5 = 0 (整数根)",
    ctsPreset2: "2x² + 8x - 10 = 0 (二次项系数 a ≠ 1)",
    ctsPreset3: "x² + 5x + 6 = 0 (分数配方法)",
    ctsPreset4: "x² - 4x + 13 = 0 (复数虚数根)",
    ctsPreset5: "3x² - 12x + 9 = 0 (先提公因式)",
    ctsVertexFormEquation: "抛物线顶点式方程：",
    ctsVertexLabel: "顶点",

    eduStudyGuideBadge: "高中代数 2 与预备微积分复习专栏",
    eduFormulaLabel: "核心数学公式：",
    eduIdentityLabel: "因式定理充要条件：",
    eduProblemLabel: "经典例题：",
    eduStep1Label: "步骤 1：",
    eduStep2Label: "步骤 2：",
    eduStep3Label: "步骤 3：",
    eduStep4Label: "步骤 4：",
    eduStep5Label: "步骤 5：",
    eduConclusionLabel: "解题结论：",
    eduTableMethod1Name: "余数定理直接代入法",
    eduTableMethod1Pros: "仅需 10 秒直接算出数值余数，无需书写任何除法竖式或表格。",
    eduTableMethod1Best: "标化考试、高考选择题中仅问余数或验证某个数是否为根的高频考题。",
    eduTableMethod2Name: "综合除法 (Ruffini 算法)",
    eduTableMethod2Pros: "同时求出商式 Q(x) 与余数 R，纯数值加法运算，速度比长除法快 3 倍。",
    eduTableMethod2Best: "除式为一次因式 (x - c) 时的三次及以上高次多项式因式分解降次。",
    eduTableMethod3Name: "多项式代数长除法竖式",
    eduTableMethod3Pros: "通用算法，不受除式次数限制（可除以二次式、三次式等任意多项式）。",
    eduTableMethod3Best: "二次或二次以上非线性除式（如 x² + 2x + 5），综合除法无法直接适用时。",
    eduMistake1Title: "❌ 高频坑点：x³ - 1",
    eduMistake1Desc: "综合除法系数误写为 [1, -1] 而非 [1, 0, 0, -1]。缺失项系数必须严格补 0！",
    eduMistake2Title: "❌ 高频坑点：除式 (x + 4)",
    eduMistake2Desc: "误将 c 算成 4，实际应解方程 x + 4 = 0 得到 c = -4。符号切记取反！",
    eduMistake3Title: "❌ 高频坑点：除式 (3x - 6)",
    eduMistake3Desc: "算出底行商系数后，忘记整体除以一次项系数 3 导致最终商式错误。",

    quizQ1: "求多项式 P(x) = 2x³ - 4x² + 3x - 5 除以一次式 (x - 2) 的余数 R。",
    quizQ2: "利用因式定理判断 (x - 3) 是否为 P(x) = x³ - 3x² - 4x + 12 的因式，请输入余数 R：",
    quizQ3: "计算 P(x) = x⁴ - 16 除以 (x + 2) 的代数余数：",
    quizQ4: "求 P(x) = 3x³ + 5x² - 11x + 3 除以 (2x - 1) 的余数 (对应待验根 c = 1/2 = 0.5)：",
    quizQ5: "(x + 1) 是否为 P(x) = x³ + 2x² - 5x - 6 的整除因式？请输入余数 R：",

    footerDisclaimer: "专为全球高中 Algebra 2、Precalculus、高考代数及标化考试学生研发。",
    footerRights: "保留所有权利。高精度数学教学与在线工具平台。",
    footerGithubReady: "已适配 Google 搜索引擎收录标准与 GitHub 部署。",
  },
};
