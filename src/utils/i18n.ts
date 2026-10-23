export type Language = 'zh' | 'en' | 'es' | 'fr';

export interface Translations {
  appName: string;
  appSubtitle: string;
  badge: string;

  // Tabs
  tabCalculator: string;
  tabFactor: string;
  tabGraph: string;
  tabQuiz: string;
  tabGuide: string;

  // Input labels
  polyLabel: string;
  polyPlaceholder: string;
  divisorLabel: string;
  divisorPlaceholder: string;
  presetsTitle: string;
  clear: string;
  calculate: string;

  // Presets
  presetStandard: string;
  presetFactor: string;
  presetFraction: string;
  presetMissingTerm: string;
  presetQuartic: string;
  presetNegativeRoot: string;
  presetQuadDivisor: string;

  // Results summary
  resultSummaryTitle: string;
  remainderLabel: string;
  quotientLabel: string;
  factorVerdict: string;
  isFactorYes: string;
  isFactorNo: string;
  divisionIdentity: string;
  copySteps: string;
  copyLatex: string;
  copied: string;
  share: string;
  print: string;

  // Method view toggles
  viewAll: string;
  viewDirect: string;
  viewSynthetic: string;
  viewLongDivision: string;

  // Method 1: Direct evaluation
  method1Title: string;
  method1Desc: string;
  evalFormula: string;
  subStep: string;
  powerTerm: string;
  calculatedValue: string;

  // Method 2: Synthetic division
  method2Title: string;
  method2Desc: string;
  synthStep: string;
  synthOf: string;
  synthNext: string;
  synthReset: string;
  synthShowAll: string;
  synthRoot: string;
  synthRemainder: string;
  synthQuotient: string;
  synthNonMonicNote: string;

  // Method 3: Long division
  method3Title: string;
  method3Desc: string;
  longDivStep: string;
  longDivDivide: string;
  longDivMultiply: string;
  longDivSubtract: string;
  longDivRemainder: string;

  // Factor & Roots
  factorTitle: string;
  factorDesc: string;
  rationalRootHeading: string;
  constantFactors: string;
  leadingFactors: string;
  candidateList: string;
  actualRootsFound: string;
  noRationalRoots: string;
  factorizationHeading: string;

  // Graph
  graphTitle: string;
  graphDesc: string;
  graphPointC: string;
  graphRootNote: string;
  graphRemainderHeight: string;

  // Quiz
  quizTitle: string;
  quizDesc: string;
  quizQuestion: string;
  quizYourAnswer: string;
  quizSubmit: string;
  quizNext: string;
  quizScore: string;
  quizCorrect: string;
  quizIncorrect: string;
  quizExplanation: string;

  // Guide
  guideTitle: string;
  guideRemainderThm: string;
  guideRemainderThmContent: string;
  guideFactorThm: string;
  guideFactorThmContent: string;
  guideComparisonTitle: string;
  guideFaqTitle: string;
}

export const translations: Record<Language, Translations> = {
  zh: {
    appName: "多项式余数定理计算器",
    appSubtitle: "余数定理 · 综合除法 · 长除法竖式 · 因式定理验根 · 几何曲线可视化",
    badge: "代数与预备微积分教学解题工具",

    tabCalculator: "余数与除法计算",
    tabFactor: "因式定理与有理根",
    tabGraph: "函数曲线可视化",
    tabQuiz: "互动习题自测",
    tabGuide: "定理原理与速查",

    polyLabel: "被除式多项式 P(x)",
    polyPlaceholder: "例如：2x^3 - 4x^2 + 3x - 5 或 x^4 - 16",
    divisorLabel: "除式 D(x) 或 根 c",
    divisorPlaceholder: "例如：x - 2、2x - 1 或数值 3",
    presetsTitle: "常见精选例题：",
    clear: "清空",
    calculate: "立即计算",

    presetStandard: "经典三次多项式 (x - 2)",
    presetFactor: "因式整除例题 (R = 0)",
    presetFraction: "非首一分数除式 (2x - 1)",
    presetMissingTerm: "缺项多项式 (x³ - 8)",
    presetQuartic: "四次双二次多项式",
    presetNegativeRoot: "负根测试 (x + 2)",
    presetQuadDivisor: "二次除式长除法 (x² - 1)",

    resultSummaryTitle: "核心计算结果",
    remainderLabel: "余数 R",
    quotientLabel: "商式 Q(x)",
    factorVerdict: "因式定理判定",
    isFactorYes: "是因式！(余数 R = 0，能被整除)",
    isFactorNo: "不是因式 (余数 R ≠ 0，有剩余)",
    divisionIdentity: "多项式除法恒等式",
    copySteps: "复制解题过程",
    copyLatex: "复制 LaTeX 公式",
    copied: "已复制！",
    share: "分享链接",
    print: "打印 / 导出 PDF",

    viewAll: "全部三种推导方法",
    viewDirect: "方法一：代入求值 P(c)",
    viewSynthetic: "方法二：综合除法表",
    viewLongDivision: "方法三：长除法竖式",

    method1Title: "方法一：多项式余数定理（直接代入法）",
    method1Desc: "根据余数定理：多项式 P(x) 除以 (x - c) 的余数等于 P(c)。只需将 x = c 代入原多项式直接求值。",
    evalFormula: "计算公式：",
    subStep: "代入步骤",
    powerTerm: "项次计算",
    calculatedValue: "计算求和",

    method2Title: "方法二：综合除法表 (Synthetic Division / Ruffini's Rule)",
    method2Desc: "综合除法是一种精简系数计算的快速除法算法，通过累加乘积依次求出商式系数与最终余数。",
    synthStep: "第",
    synthOf: "步，共",
    synthNext: "下一步",
    synthReset: "重置步骤",
    synthShowAll: "一键展开全部",
    synthRoot: "除式根 c",
    synthRemainder: "余数 R",
    synthQuotient: "商式系数",
    synthNonMonicNote: "提示：除式为 ax - b 且 a ≠ 1 时，综合除法底行系数需除以 a 方为最终商式 Q(x)。",

    method3Title: "方法三：多项式长除法竖式 (Polynomial Long Division)",
    method3Desc: "经典多项式长除法竖式推导，逐步相除、乘回除式、变号相减，适用于任意次数的除式。",
    longDivStep: "竖式计算步骤",
    longDivDivide: "相除得商项：",
    longDivMultiply: "乘以除式：",
    longDivSubtract: "变号相减得余项：",
    longDivRemainder: "最终余数：",

    factorTitle: "因式定理与有理根判定",
    factorDesc: "利用因式定理判定 (x - c) 是否为 P(x) 的因式，并应用有理根定理 (Rational Root Theorem) 列出所有潜在根 ±p/q。",
    rationalRootHeading: "有理根候选集 (Rational Root Candidates)",
    constantFactors: "常数项因数 (p)：",
    leadingFactors: "首项系数因数 (q)：",
    candidateList: "所有可能候选值 ±(p/q)：",
    actualRootsFound: "经检验为真根的候选值 (P(c) = 0)：",
    noRationalRoots: "未发现有理根（可能为无理根或复数根）。",
    factorizationHeading: "实数因式分解与根",

    graphTitle: "函数曲线与余数几何意义",
    graphDesc: "函数 y = P(x) 在 x = c 处的函数值即为余数 R = P(c)。当 R = 0 时，该点恰为曲线与 x 轴的交点（实根）。",
    graphPointC: "目标点 (c, P(c))：",
    graphRootNote: "交点重合：P(c) = 0，说明 x = c 为函数零点！",
    graphRemainderHeight: "余数纵坐标高度：",

    quizTitle: "互动练习与知识自测",
    quizDesc: "检验你对多项式余数定理、因式定理和综合除法的掌握程度。",
    quizQuestion: "题目：",
    quizYourAnswer: "你的答案：",
    quizSubmit: "提交回答",
    quizNext: "下一题",
    quizScore: "得分：",
    quizCorrect: "回答正确！",
    quizIncorrect: "回答错误，再想想看？",
    quizExplanation: "详细解析：",

    guideTitle: "余数定理与因式定理知识速查",
    guideRemainderThm: "1. 什么是多项式余数定理？",
    guideRemainderThmContent: "设 P(x) 为一实系数多项式，除以一阶线性多项式 (x - c)，则所得的余数 R 等于常数 P(c)。即：P(x) = (x - c)Q(x) + R，当代入 x = c 时，(c - c)Q(c) = 0，故 P(c) = R。",
    guideFactorThm: "2. 什么是因式定理？",
    guideFactorThmContent: "因式定理是余数定理的一个直接推论：线性多项式 (x - c) 是多项式 P(x) 的因式，当且仅当 P(c) = 0（即余数 R = 0）。它在多项式因式分解和求解代数方程时极其重要。",
    guideComparisonTitle: "3. 代入法 vs 综合除法 vs 长除法对比",
    guideFaqTitle: "4. 常见疑问与解答 (FAQ)",
  },

  en: {
    appName: "Polynomial Remainder Theorem Calculator",
    appSubtitle: "Remainder Theorem · Synthetic Division · Long Division · Factor Theorem · Curve Plot",
    badge: "Algebra & Precalculus Problem Solver",

    tabCalculator: "Remainder & Division",
    tabFactor: "Factor Theorem & Roots",
    tabGraph: "Curve & Geometry",
    tabQuiz: "Interactive Quiz",
    tabGuide: "Concepts & Guide",

    polyLabel: "Dividend Polynomial P(x)",
    polyPlaceholder: "e.g., 2x^3 - 4x^2 + 3x - 5 or x^4 - 16",
    divisorLabel: "Divisor D(x) or Root c",
    divisorPlaceholder: "e.g., x - 2, 2x - 1, or 3",
    presetsTitle: "Quick Examples:",
    clear: "Clear",
    calculate: "Calculate",

    presetStandard: "Cubic Polynomial (x - 2)",
    presetFactor: "Factor Theorem (R = 0)",
    presetFraction: "Fractional Root (2x - 1)",
    presetMissingTerm: "Missing Terms (x³ - 8)",
    presetQuartic: "Quartic Polynomial",
    presetNegativeRoot: "Negative Root (x + 2)",
    presetQuadDivisor: "Quadratic Divisor (x² - 1)",

    resultSummaryTitle: "Core Results",
    remainderLabel: "Remainder R",
    quotientLabel: "Quotient Q(x)",
    factorVerdict: "Factor Theorem Verdict",
    isFactorYes: "IS A FACTOR! (Remainder R = 0)",
    isFactorNo: "NOT A FACTOR (Remainder R ≠ 0)",
    divisionIdentity: "Polynomial Division Identity",
    copySteps: "Copy Solution Steps",
    copyLatex: "Copy LaTeX",
    copied: "Copied!",
    share: "Share Link",
    print: "Print / PDF",

    viewAll: "All 3 Methods",
    viewDirect: "Method 1: Direct P(c)",
    viewSynthetic: "Method 2: Synthetic Table",
    viewLongDivision: "Method 3: Long Division",

    method1Title: "Method 1: Polynomial Remainder Theorem (Direct Substitution)",
    method1Desc: "By the Remainder Theorem, the remainder of P(x) divided by (x - c) is simply P(c). Substitute x = c into the polynomial.",
    evalFormula: "Formula:",
    subStep: "Substitution",
    powerTerm: "Term Products",
    calculatedValue: "Summation",

    method2Title: "Method 2: Synthetic Division Table (Ruffini's Rule)",
    method2Desc: "Synthetic division is an efficient shortcut for dividing by linear factors (x - c).",
    synthStep: "Step",
    synthOf: "of",
    synthNext: "Next Step",
    synthReset: "Reset",
    synthShowAll: "Show All",
    synthRoot: "Root c",
    synthRemainder: "Remainder R",
    synthQuotient: "Quotient Coefficients",
    synthNonMonicNote: "Note: When divisor is ax - b with a ≠ 1, divide the bottom row quotient coefficients by a.",

    method3Title: "Method 3: Polynomial Long Division",
    method3Desc: "Step-by-step standard long division showing division brackets, term multiplication, and subtraction.",
    longDivStep: "Long Division Step",
    longDivDivide: "Divide leading term:",
    longDivMultiply: "Multiply by divisor:",
    longDivSubtract: "Subtract to get remainder:",
    longDivRemainder: "Final Remainder:",

    factorTitle: "Factor Theorem & Rational Roots",
    factorDesc: "Check if (x - c) is a factor of P(x) and use the Rational Root Theorem to discover candidate roots ±p/q.",
    rationalRootHeading: "Rational Root Theorem Candidates",
    constantFactors: "Factors of Constant (p):",
    leadingFactors: "Factors of Leading Coeff (q):",
    candidateList: "Possible Candidates ±(p/q):",
    actualRootsFound: "Confirmed Rational Roots (P(c) = 0):",
    noRationalRoots: "No rational roots found.",
    factorizationHeading: "Real Roots & Linear Factorization",

    graphTitle: "Function Plot & Geometric Meaning",
    graphDesc: "The remainder R is the y-coordinate at x = c on y = P(x). If R = 0, (c, 0) is an x-intercept.",
    graphPointC: "Evaluated Point (c, P(c)):",
    graphRootNote: "Point lies on the x-axis: x = c is a real root!",
    graphRemainderHeight: "Remainder Height y = R:",

    quizTitle: "Interactive Quiz & Self-Check",
    quizDesc: "Test your skills on Remainder Theorem and Synthetic Division.",
    quizQuestion: "Problem:",
    quizYourAnswer: "Your Answer:",
    quizSubmit: "Submit Answer",
    quizNext: "Next Question",
    quizScore: "Score:",
    quizCorrect: "Correct!",
    quizIncorrect: "Incorrect. Try reviewing the step below.",
    quizExplanation: "Step-by-step Solution:",

    guideTitle: "Key Theorems & Quick Reference",
    guideRemainderThm: "1. What is the Polynomial Remainder Theorem?",
    guideRemainderThmContent: "When a polynomial P(x) is divided by a linear divisor (x - c), the remainder is equal to P(c). In formula form: P(x) = (x - c)Q(x) + R. Substituting x = c yields P(c) = R.",
    guideFactorThm: "2. What is the Factor Theorem?",
    guideFactorThmContent: "A linear expression (x - c) is a factor of polynomial P(x) if and only if P(c) = 0. This is the cornerstone of polynomial factoring.",
    guideComparisonTitle: "3. Comparing Methods",
    guideFaqTitle: "4. Frequently Asked Questions (FAQ)",
  },

  es: {
    appName: "Calculadora del Teorema del Resto de Polinomios",
    appSubtitle: "Teorema del Resto · División Sintética (Ruffini) · División Larga · Teorema del Factor",
    badge: "Solucionador de Álgebra y Precálculo",
    tabCalculator: "Resto y División",
    tabFactor: "Teorema del Factor",
    tabGraph: "Gráfica y Geometría",
    tabQuiz: "Cuestionario",
    tabGuide: "Guía y Conceptos",
    polyLabel: "Polinomio Dividendo P(x)",
    polyPlaceholder: "ej.: 2x^3 - 4x^2 + 3x - 5",
    divisorLabel: "Divisor D(x) o Raíz c",
    divisorPlaceholder: "ej.: x - 2, 2x - 1, o 3",
    presetsTitle: "Ejemplos rápidos:",
    clear: "Limpiar",
    calculate: "Calcular",
    presetStandard: "Polinomio cúbico (x - 2)",
    presetFactor: "Teorema del Factor (R = 0)",
    presetFraction: "Raíz fraccionaria (2x - 1)",
    presetMissingTerm: "Términos faltantes (x³ - 8)",
    presetQuartic: "Polinomio de 4to grado",
    presetNegativeRoot: "Raíz negativa (x + 2)",
    presetQuadDivisor: "Divisor cuadrático (x² - 1)",
    resultSummaryTitle: "Resultados Principales",
    remainderLabel: "Resto R",
    quotientLabel: "Cociente Q(x)",
    factorVerdict: "Veredicto del Factor",
    isFactorYes: "¡ES UN FACTOR! (Resto R = 0)",
    isFactorNo: "NO ES UN FACTOR (Resto R ≠ 0)",
    divisionIdentity: "Identidad de la División",
    copySteps: "Copiar Pasos",
    copyLatex: "Copiar LaTeX",
    copied: "¡Copiado!",
    share: "Compartir",
    print: "Imprimir / PDF",
    viewAll: "Los 3 Métodos",
    viewDirect: "Método 1: P(c)",
    viewSynthetic: "Método 2: Ruffini",
    viewLongDivision: "Método 3: División Larga",
    method1Title: "Método 1: Teorema del Resto (Sustitución Directa)",
    method1Desc: "El resto de dividir P(x) entre (x - c) es P(c).",
    evalFormula: "Fórmula:",
    subStep: "Paso de Sustitución",
    powerTerm: "Términos",
    calculatedValue: "Suma",
    method2Title: "Método 2: División Sintética (Regla de Ruffini)",
    method2Desc: "Algoritmo rápido y compacto para dividir entre factores lineales (x - c).",
    synthStep: "Paso",
    synthOf: "de",
    synthNext: "Siguiente",
    synthReset: "Reiniciar",
    synthShowAll: "Mostrar Todo",
    synthRoot: "Raíz c",
    synthRemainder: "Resto R",
    synthQuotient: "Coeficientes del Cociente",
    synthNonMonicNote: "Nota: Si el divisor es ax - b con a ≠ 1, divide la fila inferior entre a.",
    method3Title: "Método 3: División Larga Polinomial",
    method3Desc: "División algebraica paso a paso.",
    longDivStep: "Paso de División",
    longDivDivide: "Dividir término líder:",
    longDivMultiply: "Multiplicar por divisor:",
    longDivSubtract: "Restar para obtener resto:",
    longDivRemainder: "Resto Final:",
    factorTitle: "Teorema del Factor y Raíces Racionales",
    factorDesc: "Verifica si (x - c) es un factor y encuentra candidatos racionales ±p/q.",
    rationalRootHeading: "Candidatos por Teorema de la Raíz Racional",
    constantFactors: "Factores del término independiente (p):",
    leadingFactors: "Factores del coeficiente principal (q):",
    candidateList: "Candidatos posibles ±(p/q):",
    actualRootsFound: "Raíces racionales confirmadas:",
    noRationalRoots: "No se encontraron raíces racionales.",
    factorizationHeading: "Factorización Lineal y Raíces Reales",
    graphTitle: "Gráfica de la Función y Sentido Geométrico",
    graphDesc: "El valor y en x = c es exactamente el resto R = P(c).",
    graphPointC: "Punto Evaluado (c, P(c)):",
    graphRootNote: "El punto está en el eje X: ¡x = c es una raíz!",
    graphRemainderHeight: "Altura del resto y = R:",
    quizTitle: "Cuestionario Interactivo",
    quizDesc: "Practica problemas del Teorema del Resto y la Regla de Ruffini.",
    quizQuestion: "Pregunta:",
    quizYourAnswer: "Tu respuesta:",
    quizSubmit: "Enviar",
    quizNext: "Siguiente",
    quizScore: "Puntuación:",
    quizCorrect: "¡Correcto!",
    quizIncorrect: "Incorrecto, revisa la solución.",
    quizExplanation: "Solución explicada:",
    guideTitle: "Guía Teórica Rápida",
    guideRemainderThm: "1. ¿Qué es el Teorema del Resto?",
    guideRemainderThmContent: "Al dividir un polinomio P(x) entre (x - c), el resto resultante es igual al valor P(c).",
    guideFactorThm: "2. ¿Qué es el Teorema del Factor?",
    guideFactorThmContent: "(x - c) es factor de P(x) si y solo si P(c) = 0.",
    guideComparisonTitle: "3. Comparación de Métodos",
    guideFaqTitle: "4. Preguntas Frecuentes",
  },

  fr: {
    appName: "Calculateur du Théorème du Reste Polynomial",
    appSubtitle: "Théorème du Reste · Division Synthétique · Division Longue · Théorème du Facteur",
    badge: "Outil de Résolution Algébrique & Précalcul",
    tabCalculator: "Reste & Division",
    tabFactor: "Théorème du Facteur",
    tabGraph: "Courbe & Géométrie",
    tabQuiz: "Quiz Interactif",
    tabGuide: "Guide & Théorèmes",
    polyLabel: "Polynôme Dividende P(x)",
    polyPlaceholder: "ex.: 2x^3 - 4x^2 + 3x - 5",
    divisorLabel: "Diviseur D(x) ou Racine c",
    divisorPlaceholder: "ex.: x - 2, 2x - 1, ou 3",
    presetsTitle: "Exemples rapides :",
    clear: "Effacer",
    calculate: "Calculer",
    presetStandard: "Polynôme cubique (x - 2)",
    presetFactor: "Théorème du Facteur (R = 0)",
    presetFraction: "Racine fractionnaire (2x - 1)",
    presetMissingTerm: "Termes manquants (x³ - 8)",
    presetQuartic: "Polynôme de degré 4",
    presetNegativeRoot: "Racine négative (x + 2)",
    presetQuadDivisor: "Diviseur quadratique (x² - 1)",
    resultSummaryTitle: "Résultats Principaux",
    remainderLabel: "Reste R",
    quotientLabel: "Quotient Q(x)",
    factorVerdict: "Verdict du Facteur",
    isFactorYes: "EST UN FACTEUR ! (Reste R = 0)",
    isFactorNo: "N'EST PAS UN FACTEUR (Reste R ≠ 0)",
    divisionIdentity: "Identité de la Division",
    copySteps: "Copier la Démarche",
    copyLatex: "Copier LaTeX",
    copied: "Copié !",
    share: "Partager",
    print: "Imprimer / PDF",
    viewAll: "Les 3 Méthodes",
    viewDirect: "Méthode 1: P(c)",
    viewSynthetic: "Méthode 2: Synthétique",
    viewLongDivision: "Méthode 3: Division Longue",
    method1Title: "Méthode 1: Théorème du Reste (Substitution Directe)",
    method1Desc: "Le reste de P(x) divisé par (x - c) est simplement P(c).",
    evalFormula: "Formule :",
    subStep: "Substitution",
    powerTerm: "Termes",
    calculatedValue: "Somme",
    method2Title: "Méthode 2: Division Synthétique (Règle de Ruffini)",
    method2Desc: "Méthode rapide et compacte pour diviser par (x - c).",
    synthStep: "Étape",
    synthOf: "sur",
    synthNext: "Suivant",
    synthReset: "Réinitialiser",
    synthShowAll: "Tout Afficher",
    synthRoot: "Racine c",
    synthRemainder: "Reste R",
    synthQuotient: "Coefficients du Quotient",
    synthNonMonicNote: "Remarque : Si le diviseur est ax - b avec a ≠ 1, divisez le quotient par a.",
    method3Title: "Méthode 3: Division Longue de Polynômes",
    method3Desc: "Division euclidienne détaillée étape par étape.",
    longDivStep: "Étape de Division",
    longDivDivide: "Division du terme dominant :",
    longDivMultiply: "Multiplication par le diviseur :",
    longDivSubtract: "Soustraction pour le reste :",
    longDivRemainder: "Reste Final :",
    factorTitle: "Théorème du Facteur & Racines Rationnelles",
    factorDesc: "Vérifiez si (x - c) est un facteur et découvrez les racines rationnelles possibles ±p/q.",
    rationalRootHeading: "Candidats du Théorème des Racines Rationnelles",
    constantFactors: "Facteurs de la constante (p) :",
    leadingFactors: "Facteurs du coefficient dominant (q) :",
    candidateList: "Candidats possibles ±(p/q) :",
    actualRootsFound: "Racines rationnelles confirmées :",
    noRationalRoots: "Aucune racine rationnelle trouvée.",
    factorizationHeading: "Factorisation Linéaire & Racines Réelles",
    graphTitle: "Graphique & Sens Géométrique",
    graphDesc: "La valeur y en x = c est le reste R = P(c).",
    graphPointC: "Point Évalué (c, P(c)) :",
    graphRootNote: "Le point est sur l'axe des abscisses : x = c est une racine !",
    graphRemainderHeight: "Hauteur du reste y = R :",
    quizTitle: "Quiz Interactif",
    quizDesc: "Entraînez-vous avec des problèmes interactifs.",
    quizQuestion: "Question :",
    quizYourAnswer: "Votre réponse :",
    quizSubmit: "Valider",
    quizNext: "Question Suivante",
    quizScore: "Score :",
    quizCorrect: "Correct !",
    quizIncorrect: "Incorrect. Voyez la solution ci-dessous.",
    quizExplanation: "Solution détaillée :",
    guideTitle: "Guide Théorique & Fiches Mémo",
    guideRemainderThm: "1. Qu'est-ce que le Théorème du Reste ?",
    guideRemainderThmContent: "La division d'un polynôme P(x) par (x - c) donne un reste constant R = P(c).",
    guideFactorThm: "2. Qu'est-ce que le Théorème du Facteur ?",
    guideFactorThmContent: "(x - c) est un facteur de P(x) si et seulement si P(c) = 0.",
    guideComparisonTitle: "3. Comparatif des Méthodes",
    guideFaqTitle: "4. Questions Fréquentes",
  },
};
