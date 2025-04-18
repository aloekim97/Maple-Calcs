// FdRes.tsx
import { SetData } from '../../../types/set';
import { Item } from '../../../types/item';
import { useState, useEffect, useMemo, useCallback } from 'react';
import itemStats from '../formulas/sf/itemstats';

interface FdResProps {
  setStats: SetData | null;
  selectedGear: Item | null;
  sfStats: any;
  potLines: any;
}

interface SFResults {
  hp?: number;
  endStar?: number;
  difference: {
    stat: number;
    att: number;
  };
}

const MULTIPLIERS = {
  ALLSTAT: 92,
  ATK: 30,
  DAMAGE: 10,
  BOSS_DAMAGE: 10,
  CRIT_DAMAGE: 3,
  MAINSTAT: 100,
  SUBSTAT: 1200,
  PERCENTALLSTAT: 10,
  PERCENTMAINSTAT: 12,
  PERCENTATK: 3,
};

const toNumber = (value: string | number | undefined): number => {
  if (value === undefined) return 0;
  return typeof value === 'string' ? parseFloat(value) || 0 : value;
};

export default function FdRes({ 
  setStats, 
  selectedGear, 
  sfStats,
  potLines,
}: FdResProps) {
  const [sfResults, setSfResults] = useState<SFResults | null>(null);

  useEffect(() => {
    // console.log("SFResults updated:", sfResults);
  }, [sfResults])

  useEffect(() => {
    if (!selectedGear) {
      setSfResults(sfStats || null);
      return;
    }
    
    const rawAtt = selectedGear.ATK === '' ? selectedGear['M.ATK'] : selectedGear.ATK;
    const att = toNumber(rawAtt);
    
    if (selectedGear.Set === 'Genesis') {
      const gene = itemStats(0, 22, 200, att, selectedGear.Type);
      setSfResults(gene);
    } else {
      setSfResults(sfStats ? {...sfStats} : null);
    }
  }, [selectedGear, sfStats]);

  const calculateSetFD = () => {
    if (!setStats) return 0;

    const stat = toNumber(setStats.Stat);
    const atk = toNumber(setStats.Att);
    const bossDamage = toNumber(setStats["Boss Damage"]);
    const critDamage = toNumber(setStats["Crit Damage"]);

    return (stat / MULTIPLIERS.ALLSTAT) +
           (atk / MULTIPLIERS.ATK) +
           (bossDamage / MULTIPLIERS.BOSS_DAMAGE) +
           (critDamage / MULTIPLIERS.CRIT_DAMAGE);
  };

  const calculateItemFD = useCallback(() => {
    if (!selectedGear) return 0;
  
    // Base stats
    const mainStatBase = toNumber(selectedGear['Main Stat']);
    const subStatBase = toNumber(selectedGear['Sub Stat']);
    const attackStat = selectedGear.ATK === '' ? selectedGear['M.ATK'] : selectedGear.ATK;
    const atkBase = toNumber(attackStat);

    // Starforce bonuses
    const statBonus = sfResults?.difference.stat || 0;
    const attBonus = sfResults?.difference.att || 0;

    // Total stats with bonuses
    const mainStatTotal = mainStatBase + statBonus;
    const subStatTotal = subStatBase + statBonus;  // Assuming same bonus for sub stat
    const atkTotal = atkBase + attBonus;

    // FD calculations
    return (mainStatTotal / MULTIPLIERS.MAINSTAT) +
           (subStatTotal / MULTIPLIERS.SUBSTAT) +
           (atkTotal / MULTIPLIERS.ATK);
  }, [selectedGear, sfResults]);

  const calculatePotFD = useCallback(() => {
    if (!potLines) return 0;
  
    let potFD = 0;
  
    // Process each potential line
    const processLine = (line: any) => {
      if (!line) return 0;
      
      try {
        const parsed = typeof line === 'string' ? JSON.parse(line) : line;
        
        if (parsed.stat) {
          potFD += parsed.stat / MULTIPLIERS.PERCENTMAINSTAT;
          // console.log('parsed stat:', parsed.stat)
          // console.log('potFDfuck:', potFD)
        }
        if (parsed.att) {
          potFD += parsed.att / MULTIPLIERS.PERCENTATK;
        }
        if (parsed.boss) {
          potFD += parsed.boss / MULTIPLIERS.BOSS_DAMAGE;
        }
        if (parsed.cd) {
          potFD += parsed.cd / MULTIPLIERS.CRIT_DAMAGE;
        }
      } catch (error) {
        console.error('Error parsing potential line:', error);
      }
    };
  
    // Process all three lines
    processLine(potLines.first);
    processLine(potLines.second);
    processLine(potLines.third);
  
    return potFD;
  }, [potLines]);
  
    const potFD = useMemo(() => calculatePotFD(), [calculatePotFD]);
    const itemFD = useMemo(() => calculateItemFD(), [calculateItemFD]);
    const setFD = useMemo(() => calculateSetFD(), [setStats]);
    const totalFD = useMemo(() => itemFD + setFD + potFD, [itemFD, setFD, potFD]);

  return (
    <div className="flex w-full border rounded-[8px] p-[12px] gap-[16px] justify-between border-blue-500 bg-blue-50 ">
      <div className="flex flex-col justify-between h-full w-full">
        <h5 className="opacity-60">Item FD</h5>
        <div className='flex'>
          <h3 className="flex font-bold w-full justify-end items-end">
            ~{itemFD.toFixed(2)}
          </h3>
          <h4 className='h-full flex justify-end items-end ml-[4px] pb-[4px]'>%</h4>
        </div>
      </div>
      
      <div className='h-full w-[1px] opacity-20 bg-black'/>
      
      <div className="flex flex-col justify-between h-full w-full">
        <h5 className="opacity-60">Set FD</h5>
        <div className='flex'>
          <h3 className="flex font-bold w-full justify-end items-end">
            ~{setFD.toFixed(2)}
          </h3>
          <h4 className='h-full flex justify-end items-end ml-[4px] pb-[4px]'>%</h4>
        </div>
      </div>
      
      <div className='h-full w-[1px] opacity-20 bg-black'/>
      
      <div className="flex flex-col justify-between h-full w-full">
        <h5 className="opacity-60">Pot FD</h5>
        <div className='flex'>
          <h3 className="flex font-bold w-full justify-end items-end">
            ~{potFD.toFixed(2)}
          </h3>
          <h4 className='h-full flex justify-end items-end ml-[4px] pb-[4px]'>%</h4>
        </div>
      </div>

      <div className='h-full w-[1px] opacity-20 bg-black'/>
      
      <div className="flex flex-col justify-between h-full w-full">
        <h5 className="opacity-60">Total FD</h5>
        <div className='flex'>
          <h2 className="flex font-bold w-full justify-end items-end">
            ~{totalFD.toFixed(2)}
          </h2>
          <h4 className='h-full flex justify-end items-end ml-[4px] pb-[4px]'>%</h4>
        </div>
      </div>
    </div>
  );
}