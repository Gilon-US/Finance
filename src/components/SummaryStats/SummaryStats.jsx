import React from 'react';
import './SummaryStats.css'

const SummaryStats = ({ investments }) => {
  const totalInvested = investments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
  const avgInvestment =
    investments.length > 0 ? Math.round(totalInvested / investments.length) : 0;
  const totalDocs = investments.reduce((sum, inv) => sum + (inv.documents || 0), 0);

  const stats = [
    { label: 'TOTAL INVESTED', value: totalInvested },
    { label: 'COMPANIES', value: investments.length },
    { label: 'AVG INVESTMENT', value: avgInvestment },
    { label: 'TOTAL DOCS', value: totalDocs }
  ];

  return (
    <div className='summaryStats'>
      {stats.map((stat, index) => (
        <div key={index} className="border border-gray-300 p-3">
          <div className="text-xs text-gray-500">[{stat.label}]</div>
          <div className="text-lg font-bold">{stat.value.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};

export default SummaryStats;
