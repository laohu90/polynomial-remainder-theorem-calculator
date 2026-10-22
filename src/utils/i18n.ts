export type Language = 'en' | 'es' | 'fr' | 'pt' | 'zh';

export interface Translations {
  appName: string;
  appTagline: string;
  navCalculator: string;
  navCompletingSquare: string;
  navSyntheticDivision: string;
  navRationalRoots: string;
  navPractice: string;
  navFaq: string;

  // Tabs
  tabRemainder: string;
  tabCompletingSquare: string;
  tabPractice: string;

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
  testRootBtn: string;
  copySteps: string;
  stepsCopied: string;
  copyLatex: string;
  latexCopied: string;
  printOrSave: string;
  shareLink: string;
  linkCopied: string;

  // Completing the Square
  ctsHeading: string;
  ctsSubheading: string;
  ctsInputA: string;
  ctsInputB: string;
  ctsInputC: string;
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

  // Practice & Quiz
  practiceHeading: string;
  practiceSubheading: string;
  practiceSubmit: string;
  practiceCorrect: string;
  practiceIncorrect: string;
  practiceNext: string;
  practiceShowSolution: string;
  practiceYourAnswer: string;

  // Educational Content (Below the fold)
  eduTitle: string;
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

  // Footer
  footerDisclaimer: string;
  footerRights: string;
  footerGithubReady: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "Polynomial Remainder Theorem Calculator",
    appTagline: "Step-by-step Remainder Theorem, Factor Theorem verification, synthetic division & completing the square.",
    navCalculator: "Remainder Calculator",
    navCompletingSquare: "Completing the Square",
    navSyntheticDivision: "Synthetic Division",
    navRationalRoots: "Rational Roots",
    navPractice: "Practice Quiz",
    navFaq: "FAQ & Guide",

    tabRemainder: "Remainder & Factor Theorem",
    tabCompletingSquare: "Completing the Square (Decomposition)",
    tabPractice: "Interactive Practice & Quiz",

    calcHeading: "Polynomial Remainder Theorem & Factor Theorem Solver",
    calcSubheading: "Calculate P(c), generate full synthetic division tables, and verify polynomial roots with instant step-by-step proofs.",
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
    testRootBtn: "Test in Remainder Theorem",
    copySteps: "Copy Full Steps",
    stepsCopied: "Steps Copied to Clipboard!",
    copyLatex: "Copy LaTeX",
    latexCopied: "LaTeX Copied!",
    printOrSave: "Print / Save PDF",
    shareLink: "Share Solution",
    linkCopied: "Shareable Link Copied!",

    ctsHeading: "Completing the Square Walkthrough",
    ctsSubheading: "Step-by-step algebraic decomposition of quadratic equations ax² + bx + c = 0 into perfect square binomials and vertex form.",
    ctsInputA: "Coefficient a (x²)",
    ctsInputB: "Coefficient b (x)",
    ctsInputC: "Constant c",
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

    practiceHeading: "Interactive Practice & Test Prep",
    practiceSubheading: "Strengthen your Algebra 2 skills. Solve the remainder or factor verification problem, test your answer, and view the full proof.",
    practiceSubmit: "Check Answer",
    practiceCorrect: "Correct! Outstanding job.",
    practiceIncorrect: "Not quite. Check the step-by-step solution below to see why.",
    practiceNext: "Next Problem",
    practiceShowSolution: "Show Full Solution",
    practiceYourAnswer: "Your Remainder:",

    eduTitle: "Complete Mathematical Guide & Theory",
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

    footerDisclaimer: "Designed for high school Algebra 2, Precalculus, and College Algebra students worldwide.",
    footerRights: "All Rights Reserved. Production-Grade Educational Tool.",
    footerGithubReady: "Ready for GitHub & Google Search Indexing.",
  },

  es: {
    appName: "Calculadora del Teorema del Resto de Polinomios",
    appTagline: "Paso a paso: Teorema del Resto, Teorema del Factor, división sintética y método de completar el cuadrado.",
    navCalculator: "Calculadora del Resto",
    navCompletingSquare: "Completar el Cuadrado",
    navSyntheticDivision: "División Sintética",
    navRationalRoots: "Raíces Racionales",
    navPractice: "Cuestionario de Práctica",
    navFaq: "Preguntas y Guía",

    tabRemainder: "Teorema del Resto y del Factor",
    tabCompletingSquare: "Completar el Cuadrado (Descomposición)",
    tabPractice: "Práctica Interactiva",

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
    testRootBtn: "Probar con el Teorema del Resto",
    copySteps: "Copiar Pasos",
    stepsCopied: "¡Pasos copiados al portapapeles!",
    copyLatex: "Copiar LaTeX",
    latexCopied: "¡LaTeX copiado!",
    printOrSave: "Imprimir / Guardar PDF",
    shareLink: "Compartir Solución",
    linkCopied: "¡Enlace copiado!",

    ctsHeading: "Método de Completar el Cuadrado Paso a Paso",
    ctsSubheading: "Descomposición algebraica detallada de ax² + bx + c = 0 en binomios al cuadrado y forma canónica / vértice.",
    ctsInputA: "Coeficiente a (x²)",
    ctsInputB: "Coeficiente b (x)",
    ctsInputC: "Constante c",
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

    practiceHeading: "Práctica Interactiva y Exámenes",
    practiceSubheading: "Pon a prueba tus conocimientos. Resuelve el resto o factor, verifica tu respuesta y revisa la deducción completa.",
    practiceSubmit: "Comprobar Respuesta",
    practiceCorrect: "¡Correcto! Excelente deducción.",
    practiceIncorrect: "Incorrecto. Revisa los pasos detallados abajo.",
    practiceNext: "Siguiente Problema",
    practiceShowSolution: "Ver Solución Completa",
    practiceYourAnswer: "Tu Resto:",

    eduTitle: "Guía Teórica y Fundamentos Matemáticos",
    eduWhatIsRemainderTitle: "¿Qué es el Teorema del Resto de Polinomios?",
    eduWhatIsRemainderContent: "El Teorema del Resto establece que al dividir un polinomio P(x) entre un binomio lineal (x - c), el resto R es idénticamente igual a P(c). Por el algoritmo de la división: P(x) = (x - c)Q(x) + R. Al evaluar en x = c, el término (c - c)Q(c) se anula, resultando P(c) = R.",
    eduWhatIsFactorTitle: "Cómo el Teorema del Factor Determina Raíces",
    eduWhatIsFactorContent: "El Teorema del Factor es una consecuencia directa del Teorema del Resto: (x - c) es factor de P(x) si y solo si P(c) = 0. Esto permite validar rápidamente raíces sin necesidad de divisiones largas.",
    eduSyntheticVsLongTitle: "División Sintética vs. División Larga",
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

    footerDisclaimer: "Herramienta optimizada para estudiantes de secundaria, preparatoria y universidad.",
    footerRights: "Todos los derechos reservados. Aplicación educativa de alta precisión.",
    footerGithubReady: "Listo para indexación en Google y despliegue en GitHub.",
  },

  fr: {
    appName: "Calculateur du Théorème du Reste Polynomial",
    appTagline: "Résolution pas à pas du théorème du reste, validation du théorème du facteur, division synthétique et complétion du carré.",
    navCalculator: "Calculateur du Reste",
    navCompletingSquare: "Complétion du Carré",
    navSyntheticDivision: "Division Synthétique",
    navRationalRoots: "Racines Rationnelles",
    navPractice: "Quiz d'Entraînement",
    navFaq: "FAQ & Théorie",

    tabRemainder: "Théorème du Reste & Facteur",
    tabCompletingSquare: "Complétion du Carré",
    tabPractice: "Quiz Interactif",

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
    testRootBtn: "Tester avec le Théorème du Reste",
    copySteps: "Copier les Étapes",
    stepsCopied: "Étapes copiées dans le presse-papier!",
    copyLatex: "Copier LaTeX",
    latexCopied: "LaTeX copié!",
    printOrSave: "Imprimer / Enregistrer PDF",
    shareLink: "Partager la Solution",
    linkCopied: "Lien copié!",

    ctsHeading: "Méthode de Complétion du Carré Pas à Pas",
    ctsSubheading: "Décomposition algébrique complète de ax² + bx + c = 0 sous forme de carré parfait et forme canonique.",
    ctsInputA: "Coefficient a (x²)",
    ctsInputB: "Coefficient b (x)",
    ctsInputC: "Constante c",
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

    practiceHeading: "Entraînement Interactif & Préparation aux Examens",
    practiceSubheading: "Testez votre compréhension. Calculez le reste, soumettez votre réponse et visualisez les étapes détaillées.",
    practiceSubmit: "Vérifier la Réponse",
    practiceCorrect: "Bravo ! Réponse parfaitement exacte.",
    practiceIncorrect: "Pas tout à fait. Consultez la solution complète ci-dessous.",
    practiceNext: "Problème Suivant",
    practiceShowSolution: "Afficher la Solution",
    practiceYourAnswer: "Votre Reste :",

    eduTitle: "Guide Théorique et Fondements Mathématiques",
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

    footerDisclaimer: "Conçu pour les lycéens et étudiants du supérieur.",
    footerRights: "Tous droits réservés. Outil pédagogique haute précision.",
    footerGithubReady: "Prêt pour le référencement Google et GitHub.",
  },

  pt: {
    appName: "Calculadora do Teorema do Resto Polinomial",
    appTagline: "Passo a passo do Teorema do Resto, Teorema do Fator, divisão sintética (Briot-Ruffini) e método de completar quadrados.",
    navCalculator: "Calculadora do Resto",
    navCompletingSquare: "Completar Quadrados",
    navSyntheticDivision: "Briot-Ruffini",
    navRationalRoots: "Raízes Racionais",
    navPractice: "Quiz de Treino",
    navFaq: "FAQ e Teoria",

    tabRemainder: "Teorema do Resto e Fator",
    tabCompletingSquare: "Completar Quadrados",
    tabPractice: "Treino Interativo",

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
    testRootBtn: "Testar com o Teorema do Resto",
    copySteps: "Copiar Etapas",
    stepsCopied: "Etapas copiadas com sucesso!",
    copyLatex: "Copiar LaTeX",
    latexCopied: "LaTeX copiado!",
    printOrSave: "Imprimir / Salvar PDF",
    shareLink: "Compartilhar Solução",
    linkCopied: "Link copiado!",

    ctsHeading: "Método de Completar o Quadrado Passo a Passo",
    ctsSubheading: "Transformação detalhada de equações quadráticas ax² + bx + c = 0 em trinômios quadrados perfeitos e forma canônica.",
    ctsInputA: "Coeficiente a (x²)",
    ctsInputB: "Coeficiente b (x)",
    ctsInputC: "Constante c",
    ctsSolveBtn: "Completar o Quadrado",
    ctsStep1Title: "Passo 1: Garantir coeficiente líder igual a 1",
    ctsStep2Title: "Passo 2: Isolar os termos variáveis",
    ctsStep3Title: "Passo 3: Somar (b / 2a)² em ambos os membros",
    ctsStep4Title: "Passo 4: Fatorar no quadrado da soma/diferença",
    ctsStep5Title: "Passo 5: Extrair a raiz quadrada e isolar x",
    ctsVertexFormTitle: "Forma Canônica e Vértice da Parábola",
    ctsVertexCoordinates: "Vértice (h, k)",
    ctsDiscriminant: "Discriminante Δ = b² - 4ac",
    ctsRootsFound: "Raízes / Soluções",
    ctsTwoReal: "Duas Raízes Reais Distintas",
    ctsOneDouble: "Uma Raiz Real Dupla",
    ctsTwoComplex: "Duas Raízes Complexas Conjugadas",

    practiceHeading: "Treino Interativo para Vestibulares e ENEM",
    practiceSubheading: "Pratique o Teorema do Resto. Calcule, envie sua resposta e veja a demonstração completa.",
    practiceSubmit: "Conferir Resposta",
    practiceCorrect: "Correto! Excelente raciocínio.",
    practiceIncorrect: "Incorreto. Veja a resolução detalhada abaixo.",
    practiceNext: "Próxima Questão",
    practiceShowSolution: "Ver Resolução Completa",
    practiceYourAnswer: "Seu Resto:",

    eduTitle: "Guia Teórico Completo de Polinômios",
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

    footerDisclaimer: "Desenvolvido para estudantes de Ensino Médio e Superior.",
    footerRights: "Todos os direitos reservados. Aplicação educacional de alta precisão.",
    footerGithubReady: "Preparado para indexação do Google e GitHub.",
  },

  zh: {
    appName: "多项式余数定理计算器与因式定理验证器",
    appTagline: "详细解题步骤、配方法拆解过程、综合除法表与有理根快速验根。",
    navCalculator: "余数定理计算器",
    navCompletingSquare: "配方法拆解过程",
    navSyntheticDivision: "综合除法 (Ruffini)",
    navRationalRoots: "有理根候选检验",
    navPractice: "互动练习题",
    navFaq: "常见问答与知识库",

    tabRemainder: "余数定理与因式定理",
    tabCompletingSquare: "配方法拆解过程 (高中小专题)",
    tabPractice: "互动练习与自测题",

    calcHeading: "多项式余数定理计算器与因式定理在线验证",
    calcSubheading: "高中多项式因式分解必学，常用于快速验根。支持代入法与综合除法双步骤推导，直接输出商式与余数。",
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
    testRootBtn: "一键代入余数定理验算",
    copySteps: "复制完整解题步骤",
    stepsCopied: "已复制解题步骤到剪贴板！",
    copyLatex: "复制 LaTeX 公式",
    latexCopied: "已复制 LaTeX 代码！",
    printOrSave: "打印 / 保存为 PDF",
    shareLink: "分享解题链接",
    linkCopied: "题目链接已复制！",

    ctsHeading: "一元二次方程配方法拆解过程",
    ctsSubheading: "高中代数标准五步配方法拆解，从 ax² + bx + c = 0 详细转化为完全平方式与抛物线顶点式。",
    ctsInputA: "二次项系数 a (x²)",
    ctsInputB: "一次项系数 b (x)",
    ctsInputC: "常数项 c",
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

    practiceHeading: "多项式因式定理互动练习题",
    practiceSubheading: "高中经典验根习题，随堂自测巩固余数定理，提交答案后即刻查看分步推导解析。",
    practiceSubmit: "提交并验证",
    practiceCorrect: "回答正确！计算非常精准。",
    practiceIncorrect: "回答错误，请查看下方标准推导步骤。",
    practiceNext: "换下一道练习题",
    practiceShowSolution: "查看详细解题解析",
    practiceYourAnswer: "你计算的余数 R：",

    eduTitle: "高中代数核心知识点详解与备考指南",
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
    faqSub: "帮助高中学生与家长理清余数定理与配方法的所有关键点。",
    faq1Q: "余数定理可以用来除以二次因式 (例如 x² + 1) 吗？",
    faq1A: "经典余数定理仅针对一次式 (x - c)。若除式为二次式，余数最高可为一次式 (Ax + B)，通常需使用多项式长除法或扩展待定系数法。",
    faq2Q: "为什么综合除法第二行是做加法而不是减法？",
    faq2A: "因为综合除法左侧所取的除数 c 已经自带相反符号 (x - c = 0 即 x = c)，提前反号后使得原长除法的减法操作转换成了更不易出错的加法。",
    faq3Q: "配方法中的“关键数字”是怎么算出来的？",
    faq3A: "将一次项系数除以 2 后平方，即 (b / 2a)²。左右两边同时加上这个数，左侧就能精确凑成完全平方式 (x + b/2a)²。",
    faq4Q: "这个工具对 SAT / ACT / AP 考试有什么提分帮助？",
    faq4A: "标化考试中常出现“若 P(x) 除以 x - 3 余数为 5，求未知参数 k”的高频题型，使用余数定理 P(3) = 5 可在 15 秒内直接列方程秒杀，无需耗时两分钟草稿长除。",

    footerDisclaimer: "专为全球高中 Algebra 2、Precalculus、高考代数及标化考试学生研发。",
    footerRights: "保留所有权利。高精度数学教学与在线工具平台。",
    footerGithubReady: "已适配 Google 搜索引擎收录标准与 GitHub 部署。",
  },
};
