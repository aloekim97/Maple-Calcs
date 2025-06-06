// FdRes.tsx
import { SetData } from '../../../types/set';
import { Item } from '../../../types/item';
import { useState, useEffect, useMemo, useCallback } from 'react';
import itemStats from '../formulas/sf/itemstats';
import { PotLines } from './gearcalc';

interface FdResProps {
  setStats: SetData | null;
  selectedGear: Item | null;
  sfStats: {
    finalStats?: { stat: number; att: number };
    difference: { stat: number; att: number };
  };
  potLines: PotLines;
  multipliers: Record<string, number>;
}

export interface SFResults {
  hp?: number;
  endStar?: number;
  difference: {
    stat: number;
    att: number;
  };
}

const toNumber = (value: string | number | undefined): number => {
  if (value === undefined) return 0;
  return typeof value === 'string' ? parseFloat(value) || 0 : value;
};

export default function FdRes({
  setStats,
  selectedGear,
  sfStats,
  potLines,
  multipliers,
}: FdResProps) {
  const [sfResults, setSfResults] = useState<SFResults | null>(null);
  useEffect(() => {
  }, [sfResults]);

  useEffect(() => {
    if (!selectedGear) {
      setSfResults(sfStats || null);
      return;
    }

    const rawAtt =
      selectedGear.ATK === '' ? selectedGear['M.ATK'] : selectedGear.ATK;
    const att = toNumber(rawAtt);

    if (selectedGear.Set === 'Genesis') {
      const gene = itemStats(0, 22, 200, att, selectedGear.Type);
      setSfResults(gene);
    } else {
      setSfResults(sfStats ? { ...sfStats } : null);
    }
  }, [selectedGear, sfStats]);

  const calculateSetFD = () => {
    if (!setStats) return 0;

    const stat = toNumber(setStats.Stat);
    const atk = toNumber(setStats.Att);
    const bossDamage = toNumber(setStats['Boss Damage']);
    const critDamage = toNumber(setStats['Crit Damage']);

    return (
      stat / multipliers.ALLSTAT +
      atk / multipliers.ATK +
      bossDamage / multipliers.BOSS_DAMAGE +
      critDamage / multipliers.CRIT_DAMAGE
    );
  };

  const calculateItemFD = useCallback(() => {
    if (!selectedGear) return 0;

    // Base stats
    const mainStatBase = toNumber(selectedGear['Main Stat']);
    const subStatBase = toNumber(selectedGear['Sub Stat']);
    const attackStat =
      selectedGear.ATK === '' ? selectedGear['M.ATK'] : selectedGear.ATK;
    const atkBase = toNumber(attackStat);
    const bossdamageBase = toNumber(selectedGear['Boss Damage']);

    // Starforce bonuses
    const statBonus = sfResults?.difference.stat || 0;
    const attBonus = sfResults?.difference.att || 0;

    // Total stats with bonuses
    const mainStatTotal = mainStatBase + statBonus;
    const subStatTotal = subStatBase + statBonus; // Assuming same bonus for sub stat
    const atkTotal = atkBase + attBonus;

    if (selectedGear.Set === 'Genesis') {
      // Genesis calculations
      return (
        mainStatTotal / multipliers.MAINSTAT +
        subStatTotal / multipliers.SUBSTAT +
        (atkTotal / multipliers.ATK) * toNumber(selectedGear['ADJ Std']) +
        bossdamageBase / multipliers.BOSS_DAMAGE +
        10
      );
    } else {
      // FD calculations
      return (
        mainStatTotal / multipliers.MAINSTAT +
        subStatTotal / multipliers.SUBSTAT +
        (atkTotal / multipliers.ATK) * toNumber(selectedGear['ADJ Std']) +
        bossdamageBase / multipliers.BOSS_DAMAGE
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGear, sfResults]);

  const calculatePotFD = useCallback(() => {
    if (!potLines) return 0;

    let potFD = 0;

    // Process each potential line
    const processLine = (potLines: PotLines) => {
      if (!potLines) return 0;

      try {
        const parsed =
          typeof potLines === 'string' ? JSON.parse(potLines) : potLines;

        if (parsed.stat) {
          potFD += parsed.stat / multipliers.PERCENTMAINSTAT;
        }
        if (parsed.att) {
          potFD += parsed.att / multipliers.PERCENTATK;
        }
        if (parsed.boss) {
          potFD += parsed.boss / multipliers.BOSS_DAMAGE;
        }
        if (parsed.cd) {
          potFD += parsed.cd / multipliers.CRIT_DAMAGE;
        }
      } catch (error) {
        console.error('Error parsing potential line:', error);
      }
    };

    // Process all three lines
    processLine(potLines.line1);
    processLine(potLines.line2);
    processLine(potLines.line3);

    return potFD;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [potLines]);

  const potFD = useMemo(() => calculatePotFD(), [calculatePotFD]);
  const itemFD = useMemo(() => calculateItemFD(), [calculateItemFD]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setFD = useMemo(() => calculateSetFD(), [setStats]);
  const totalFD = useMemo(() => itemFD + setFD + potFD, [itemFD, setFD, potFD]);

  return (
    <div className="flex w-full border rounded-[8px] p-[12px] gap-[16px] justify-between border-blue-500 bg-blue-50 ">
      <div className="flex flex-col justify-between h-full w-full">
        <h5 className="opacity-60">Item FD</h5>
        <div className="flex">
          <h3 className="flex font-bold w-full justify-end items-end">
            ~{itemFD.toFixed(2)}
          </h3>
          <h4 className="h-full flex justify-end items-end ml-[4px] pb-[4px]">
            %
          </h4>
        </div>
      </div>

      <div className="h-full w-[1px] opacity-20 bg-black" />

      <div className="flex flex-col justify-between h-full w-full">
        <h5 className="opacity-60">Set FD</h5>
        <div className="flex">
          <h3 className="flex font-bold w-full justify-end items-end">
            ~{setFD.toFixed(2)}
          </h3>
          <h4 className="h-full flex justify-end items-end ml-[4px] pb-[4px]">
            %
          </h4>
        </div>
      </div>

      <div className="h-full w-[1px] opacity-20 bg-black" />

      <div className="flex flex-col justify-between h-full w-full">
        <h5 className="opacity-60">Pot FD</h5>
        <div className="flex">
          <h3 className="flex font-bold w-full justify-end items-end">
            ~{potFD.toFixed(2)}
          </h3>
          <h4 className="h-full flex justify-end items-end ml-[4px] pb-[4px]">
            %
          </h4>
        </div>
      </div>

      <div className="h-full w-[1px] opacity-20 bg-black" />

      <div className="flex flex-col justify-between h-full w-full">
        <h5 className="opacity-60">Total FD</h5>
        <div className="flex">
          <h3 className="flex font-bold w-full justify-end items-end">
            ~{totalFD.toFixed(2)}
          </h3>
          <h4 className="h-full flex justify-end items-end ml-[4px] pb-[4px]">
            %
          </h4>
        </div>
      </div>
    </div>
  );
}
