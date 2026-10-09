import React from 'react';
import { FinanceIcon } from './FinanceIcon';

// The `lf-*` classes are small utility classes defined in pages/LoansFinance.css.
export const SectionHeader = ({ number, title, icon, subtitle, rightElement }) => {
  return (
    <div className="lf-flex lf-flex-col lf-md-flex-row lf-md-items-center lf-justify-between lf-mb-6 lf-gap-4">
      <div className="lf-flex lf-items-center lf-gap-3">
        {icon && (
          <div className="lf-text-orange">
            <FinanceIcon name={icon} size={28} />
          </div>
        )}
        <div>
          <h2 className="lf-text-2xl lf-font-bold lf-text-navy lf-flex lf-items-center lf-gap-2">
            <span className="lf-text-primary">{number}.</span> {title}
          </h2>
          {subtitle && (
            <p className="lf-text-sm lf-font-medium lf-text-body lf-mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      {rightElement && (
        <div className="lf-flex-shrink-0">
          {rightElement}
        </div>
      )}
    </div>
  );
};
