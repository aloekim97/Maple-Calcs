// app/about/StatTable.tsx
'use client';

const stats = [
  { name: 'Flat Main Stat:', value: '100' },
  { name: 'Flat Sub Stat:', value: '1200' },
  { name: 'Flat All Stat:', value: '92' },
  { name: '% Main Stat:', value: '12' },
  { name: '% All Stat:', value: '10' },
  { name: 'Flat ATT/M.ATT:', value: '30' },
  { name: 'Boss Damage:', value: '10' },
  { name: 'Damage:', value: '10' },
  { name: 'Crit Damage:', value: '3' }
];

export default function StatTable() {
  return (
    <div className="flex flex-col gap-[16px] h-full w-[75%] items-center justify-center">
      <div className="flex justify-between w-full py-[8px] px-[16px] rounded-full">
        <h4>Stat Equivalencies</h4>
        <h4>(Value = 1 Final Damage)</h4>
      </div>
      {stats.map((stat, index) => (
        <div key={index} className="flex justify-between w-full py-[8px] px-[16px] rounded-full bg-blue-100">
          <h4>{stat.name}</h4>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}