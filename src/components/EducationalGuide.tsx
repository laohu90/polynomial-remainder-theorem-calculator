import React, { useState } from 'react';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import { ChevronDown, BookOpen, AlertTriangle, Layers, HelpCircle, CheckCircle2, BookmarkCheck } from 'lucide-react';

interface EducationalGuideProps {
  t: Translations;
}

export const EducationalGuide: React.FC<EducationalGuideProps> = ({ t }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
  ];

  return (
    <section className="mt-16 pt-12 border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-indigo-700 tracking-wider uppercase mb-1 block">
            Algebra 2 & Precalculus Study Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.eduTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2 max-w-2xl mx-auto">
            Everything high school and college students need to master polynomial factoring, rapid root verification, and quadratic decomposition.
          </p>
        </div>

        {/* 2-Column Educational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: What is Remainder Theorem */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 text-indigo-700 font-bold">
              <BookOpen className="w-5 h-5 shrink-0" />
              <h3 className="text-xl text-slate-900">{t.eduWhatIsRemainderTitle}</h3>
            </div>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              {t.eduWhatIsRemainderContent}
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <span className="text-xs text-slate-500 font-semibold block mb-1">Mathematical Formula:</span>
              <MathView math="P(x) = (x - c)Q(x) + R \implies P(c) = R" block={true} className="text-lg font-bold text-slate-900" />
            </div>
          </div>

          {/* Card 2: What is Factor Theorem */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3 text-indigo-700 font-bold">
              <Layers className="w-5 h-5 shrink-0" />
              <h3 className="text-xl text-slate-900">{t.eduWhatIsFactorTitle}</h3>
            </div>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              {t.eduWhatIsFactorContent}
            </p>
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-center">
              <span className="text-xs text-emerald-800 font-semibold block mb-1">Core Identity:</span>
              <MathView math="(x - c) \text{ divides } P(x) \iff P(c) = 0" block={true} className="text-lg font-bold text-emerald-950" />
            </div>
          </div>
        </div>

        {/* Worked Textbook Examples Section for Google Ranking */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-indigo-700">
            <BookmarkCheck className="w-6 h-6" />
            <h3 className="text-2xl font-extrabold text-slate-900">
              Worked High School Algebra 2 Exam Examples
            </h3>
          </div>
          <p className="text-base text-slate-600 mb-6">
            Detailed step-by-step solutions to typical homework and test problems.
          </p>

          <div className="space-y-6">
            {/* Example 1 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="font-bold text-indigo-900 text-base mb-1">
                Example 1: Finding Remainder Without Long Division
              </div>
              <p className="text-sm text-slate-700 mb-2">
                <strong>Problem:</strong> Find the remainder when <MathView math="P(x) = 2x^3 - 5x^2 + 4x - 6" /> is divided by <MathView math="(x - 3)" />.
              </p>
              <div className="text-sm text-slate-800 bg-white p-3.5 rounded-lg border border-slate-200 font-sans space-y-1">
                <p><strong>Step 1:</strong> Identify root <MathView math="c = 3" /> from <MathView math="x - 3 = 0" />.</p>
                <p><strong>Step 2:</strong> Substitute <MathView math="x = 3" /> into <MathView math="P(x)" />:</p>
                <div className="pl-4 font-mono text-slate-900">
                  <MathView math="P(3) = 2(3)^3 - 5(3)^2 + 4(3) - 6 = 2(27) - 5(9) + 12 - 6 = 54 - 45 + 12 - 6 = 15" block={true} />
                </div>
                <p><strong>Conclusion:</strong> According to the Remainder Theorem, the remainder is <span className="font-bold font-mono text-emerald-700">R = 15</span>.</p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="font-bold text-indigo-900 text-base mb-1">
                Example 2: Verifying a Factor and Factoring Completely
              </div>
              <p className="text-sm text-slate-700 mb-2">
                <strong>Problem:</strong> Determine if <MathView math="(x - 2)" /> is a factor of <MathView math="P(x) = x^3 - 4x^2 + x + 6" />.
              </p>
              <div className="text-sm text-slate-800 bg-white p-3.5 rounded-lg border border-slate-200 font-sans space-y-1">
                <p><strong>Step 1:</strong> Evaluate <MathView math="P(2) = (2)^3 - 4(2)^2 + (2) + 6 = 8 - 16 + 2 + 6 = 0" />.</p>
                <p><strong>Step 2:</strong> Since <MathView math="P(2) = 0" />, by the Factor Theorem, <MathView math="(x - 2)" /> is an exact factor.</p>
                <p><strong>Step 3:</strong> Perform synthetic division to obtain quotient <MathView math="Q(x) = x^2 - 2x - 3" />.</p>
                <p><strong>Step 4:</strong> Factor quadratic <MathView math="x^2 - 2x - 3 = (x - 3)(x + 1)" />.</p>
                <p><strong>Final Factored Form:</strong> <MathView math="P(x) = (x - 2)(x - 3)(x + 1)" /></p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <div className="font-bold text-indigo-900 text-base mb-1">
                Example 3: Completing the Square with Leading Coefficient a ≠ 1
              </div>
              <p className="text-sm text-slate-700 mb-2">
                <strong>Problem:</strong> Solve <MathView math="2x^2 + 8x - 10 = 0" /> by completing the square.
              </p>
              <div className="text-sm text-slate-800 bg-white p-3.5 rounded-lg border border-slate-200 font-sans space-y-1">
                <p><strong>Step 1:</strong> Divide by 2: <MathView math="x^2 + 4x - 5 = 0" />.</p>
                <p><strong>Step 2:</strong> Move constant: <MathView math="x^2 + 4x = 5" />.</p>
                <p><strong>Step 3:</strong> Magic number <MathView math="(4/2)^2 = 2^2 = 4" />. Add 4 to both sides: <MathView math="x^2 + 4x + 4 = 5 + 4 = 9" />.</p>
                <p><strong>Step 4:</strong> Factor binomial square: <MathView math="(x + 2)^2 = 9" />.</p>
                <p><strong>Step 5:</strong> Square root: <MathView math="x + 2 = \pm 3 \implies x_1 = 1,\; x_2 = -5" />.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.eduSyntheticVsLongTitle}</h3>
          <p className="text-base text-slate-600 mb-5 leading-relaxed">{t.eduSyntheticVsLongContent}</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm sm:text-base border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 font-semibold text-slate-800">{t.eduTableMethod}</th>
                  <th className="py-3 px-4 font-semibold text-slate-800">{t.eduTablePros}</th>
                  <th className="py-3 px-4 font-semibold text-slate-800">{t.eduTableBestFor}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-indigo-700">Remainder Theorem Direct Evaluation</td>
                  <td className="py-3.5 px-4">Instant numerical remainder in ~10 seconds. No division table required.</td>
                  <td className="py-3.5 px-4">SAT / ACT exam questions asking only for the remainder or testing if c is a root.</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-indigo-700">Synthetic Division (Ruffini Scheme)</td>
                  <td className="py-3.5 px-4">Computes both quotient Q(x) and remainder R. 3x faster than long division using additions.</td>
                  <td className="py-3.5 px-4">Factoring higher-degree polynomials when divisor is linear (x - c).</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-indigo-700">Polynomial Long Division</td>
                  <td className="py-3.5 px-4">Universal method. Works for divisors of ANY degree (quadratic, cubic, etc.).</td>
                  <td className="py-3.5 px-4">Non-linear divisors such as x² + 2x + 5 where synthetic division cannot be applied directly.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Common Student Mistakes Card */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 md:p-8 mb-12">
          <div className="flex items-center gap-2.5 mb-3 text-amber-900 font-bold">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            <h3 className="text-xl sm:text-2xl text-amber-950">{t.eduCommonMistakesTitle}</h3>
          </div>
          <p className="text-base text-amber-900 leading-relaxed mb-4">
            {t.eduCommonMistakesContent}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm font-medium text-amber-950">
            <div className="bg-white/90 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
              <span className="font-bold block mb-1 text-red-600">❌ Error: x³ - 1</span>
              <span>Writing coefficients as [1, -1] instead of [1, 0, 0, -1]. Missing terms must have 0.</span>
            </div>
            <div className="bg-white/90 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
              <span className="font-bold block mb-1 text-red-600">❌ Error: Divisor (x + 4)</span>
              <span>Using c = 4 instead of solving x + 4 = 0 ⇒ c = -4. Always flip the sign!</span>
            </div>
            <div className="bg-white/90 p-4 rounded-xl border border-amber-200/80 shadow-2xs">
              <span className="font-bold block mb-1 text-red-600">❌ Error: Divisor (3x - 6)</span>
              <span>Forgetting to divide quotient coefficients by leading coefficient 3.</span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 mb-12 shadow-xs">
          <div className="flex items-center gap-2 mb-2 text-indigo-700">
            <HelpCircle className="w-6 h-6" />
            <h3 className="text-2xl font-bold text-slate-900">{t.faqTitle}</h3>
          </div>
          <p className="text-base text-slate-600 mb-6">{t.faqSub}</p>

          <div className="divide-y divide-slate-200">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left text-base sm:text-lg font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 ml-3 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-base text-slate-600 leading-relaxed pr-6">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
