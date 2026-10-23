import React, { useState } from 'react';
import { Translations } from '../utils/i18n';
import { MathView } from './MathView';
import { BookOpen, ChevronDown, Check, HelpCircle } from 'lucide-react';

interface EducationalGuideSectionProps {
  t: Translations;
}

export const EducationalGuideSection: React.FC<EducationalGuideSectionProps> = ({ t }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "为什么余数定理只适用于线性除式 (x - c)？",
      a: "多项式带余除法保证：被除式 P(x) = 除式 D(x) · Q(x) + R(x)，其中余式 R(x) 的次数严格小于除式 D(x) 的次数。当除式为一阶线性多项式 (x - c) 时（次数为 1），余式 R(x) 的次数必须小于 1，即余数必为常数 R。代入 x = c 使得 (c - c)Q(c) = 0，直接得出 P(c) = R。若除式为二次或更高次多项式，余式将带有 x 项，无法直接通过代入一个常数求出全部余式，此时应使用多项式长除法。",
    },
    {
      q: "如果除式是 (2x - 1) 这种带系数的多项式，该如何使用综合除法？",
      a: "综合除法标准流程要求除式首项系数为 1。当除式为 (ax - b) 时：第一步，令 2x - 1 = 0 得到根 c = 1/2，按 c = 1/2 正常执行综合除法；第二步，注意此时所得的商式对应的是除以 (x - 1/2) 的结果！因为 (2x - 1) = 2(x - 1/2)，所以必须将综合除法底行的所有商式系数统一除以 2，所得才是除以 (2x - 1) 的真正商式 Q(x)；而最终余数 R 保持不变。",
    },
    {
      q: "综合除法中如果有多项式缺项（例如 x³ - 8 缺少 x² 和 x），该怎么处理？",
      a: "必须补 0！必须将多项式严格按照降幂排列：x³ + 0x² + 0x - 8，对应的系数行输入为 [1, 0, 0, -8]。若漏补 0，所有后续乘积累加的项次将会发生错位，导致算出的商式与余数完全错误。本计算器会自动检测并规范补 0 系数。",
    },
    {
      q: "有理根定理 (Rational Root Theorem) 与因式定理是什么关系？",
      a: "有理根定理用于“搜寻候选根”：它证明整系数多项式若存在有理根 p/q，则分子 p 必整除常数项，分母 q 必整除首项系数。因此我们可以列出有限个候选值 ±p/q。接着，因式定理登场用于“验证候选根”：将候选值 c 代入检验是否满足 P(c) = 0。若 P(c) = 0，则 (x - c) 确定为因式，即可利用综合除法降次消元，逐步完成因式分解。",
    },
  ];

  return (
    <div className="space-y-8 mb-8">
      {/* 2-Column Core Theorems Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Theorem 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2.5 text-indigo-700 font-bold mb-3">
            <BookOpen className="w-5 h-5 shrink-0" />
            <h4 className="text-base sm:text-lg text-slate-900">
              {t.guideRemainderThm}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            {t.guideRemainderThmContent}
          </p>
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 text-center font-mono text-sm text-indigo-900 font-semibold">
            <MathView math="P(x) = (x - c)Q(x) + R \implies P(c) = R" />
          </div>
        </div>

        {/* Theorem 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
          <div className="flex items-center gap-2.5 text-emerald-700 font-bold mb-3">
            <BookOpen className="w-5 h-5 shrink-0" />
            <h4 className="text-base sm:text-lg text-slate-900">
              {t.guideFactorThm}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            {t.guideFactorThmContent}
          </p>
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3.5 text-center font-mono text-sm text-emerald-900 font-semibold">
            <MathView math="(x - c) \text{ 整除 } P(x) \iff P(c) = 0" />
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-4">
          {t.guideComparisonTitle}
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 font-semibold bg-slate-50">
                <th className="py-3 px-4">解法</th>
                <th className="py-3 px-4">优点</th>
                <th className="py-3 px-4">局限性</th>
                <th className="py-3 px-4">最佳应用场景</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-3 px-4 font-bold text-indigo-700">代入求值 P(c)</td>
                <td className="py-3 px-4">计算最快、直接得出余数</td>
                <td className="py-3 px-4">无法得到商式 Q(x)</td>
                <td className="py-3 px-4">快速判定是否为因式或单求余数</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-violet-700">综合除法 (Synthetic)</td>
                <td className="py-3 px-4">书写紧凑、步骤极简、同时给出商式和余数</td>
                <td className="py-3 px-4">除式必须为一阶线性项 (ax - b)</td>
                <td className="py-3 px-4">快速因式分解降次、高次方程逐根剥离</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-blue-700">多项式长除法 (Long Div)</td>
                <td className="py-3 px-4">通用性最强，支持任意次数的多项式除式</td>
                <td className="py-3 px-4">书写篇幅大，符号变号容易笔误</td>
                <td className="py-3 px-4">除式为二次及以上多项式（如 x² + 2x + 1）</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h4 className="text-base sm:text-lg font-bold text-slate-900">
            {t.guideFaqTitle}
          </h4>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full py-3.5 px-4 text-left font-semibold text-slate-900 bg-slate-50/60 hover:bg-slate-100 flex items-center justify-between text-xs sm:text-sm transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
