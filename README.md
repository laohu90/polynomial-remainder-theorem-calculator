# Polynomial Remainder Theorem & Factor Theorem Calculator

A modern, high-precision, production-grade educational web application designed for High School Algebra 2, Precalculus, and College Algebra students. Provides step-by-step solutions for the **Polynomial Remainder Theorem**, **Factor Theorem verification**, **Synthetic Division (Ruffini's Scheme)**, and **Completing the Square quadratic decomposition**.

Live Application: [RemainderTheorem.pro](https://github.com/laohu90/polynomial-remainder-theorem-calculator)

---

## 🌟 Key Features

1. **Polynomial Remainder Theorem Solver**
   - Direct substitution evaluation of $P(c) = a_n c^n + \dots + a_0 = R$.
   - Full arithmetic expansion and step-by-step powers calculation.
   - Handles standard integer and exact fractional division.

2. **Interactive Synthetic Division Table**
   - Visual Ruffini scheme table showing the root $c$, top row coefficients, multiplication products, and addition results.
   - Interactive step slider: walk through column-by-column or view all steps at once.
   - Automatic adjustment for non-monic divisors $(ax - b)$ by dividing quotient coefficients by $a$.

3. **Factor Theorem Online Verification**
   - Instant root verification ($P(c) = 0 \iff (x - c)$ is a factor).
   - Generates the complete division identity: $P(x) = D(x) \cdot Q(x) + R$.
   - Automatic quadratic decomposition when quotient $Q(x)$ is degree 2 to find all remaining roots.

4. **Rational Root Theorem Candidate Generator**
   - Automatically computes all factors of constant term $p$ and leading coefficient $q$.
   - Generates all unique candidates $\pm \frac{p}{q}$.
   - One-click testing: click any candidate root to immediately run the Remainder Theorem!

5. **Completing the Square Walkthrough (配方法拆解)**
   - Standard 5-step US High School Algebra 2 pedagogical sequence:
     - Step 1: Ensure leading coefficient $a = 1$
     - Step 2: Isolate variable terms on the left
     - Step 3: Add magic square $(\frac{b}{2a})^2$ to both sides
     - Step 4: Factor into a binomial square $(x + \frac{b}{2a})^2$
     - Step 5: Square root both sides and solve for $x$ (real, repeated, or complex conjugate roots)
   - Parabola vertex form $y = a(x - h)^2 + k$ with dynamic SVG curve visualization.

6. **Interactive Practice & Exam Prep**
   - Curated high school exam problems with immediate validation.
   - "Show Full Solution" reveals complete proofs.

7. **Multilingual Architecture**
   - English (Default, US High School & College curriculum)
   - Spanish (Español)
   - French (Français)
   - Portuguese (Português)
   - Chinese (简体中文)

8. **SEO & Google Search Optimized**
   - Full OpenGraph & Twitter Cards.
   - Structured JSON-LD schemas (`WebApplication`, `FAQPage`, `HowTo`).
   - Clean, lightweight, high Core Web Vitals performance with zero third-party telemetry.

---

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4 (Clean academic white canvas design)
- **Math Rendering**: KaTeX
- **Build Tool**: Vite
- **Icons**: Lucide React

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/laohu90/polynomial-remainder-theorem-calculator.git
cd polynomial-remainder-theorem-calculator

# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

Apache-2.0 License. Free for educational and commercial use.
