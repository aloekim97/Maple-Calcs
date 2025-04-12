// FdRes.tsx
import { SetData } from '../../../../types/set';
import { Item } from '../../../../types/item';
import StarForceResults from './inputs/starforceInputs'

interface FdResProps {
  setStats: SetData | null;
  selectedGear: Item | null;
  sfResults: any;
}

const MULTIPLIERS = {
  ALLSTAT: 92,
  ATK: 30,
  DAMAGE: 10,
  BOSS_DAMAGE: 10,
  CRIT_DAMAGE: 3,
  MAINSTAT: 100,
  SUBSTAT: 1200,
};

const toNumber = (value: string | number | undefined): number => {
  if (value === undefined) return 0;
  return typeof value === 'string' ? parseFloat(value) || 0 : value;
};

export default function FdRes({ setStats, selectedGear, sfResults }: FdResProps) {

  const calculateSetFD = () => {
    if (!setStats) return 0;

    const stat = setStats.Stat || 0;
    const atk = setStats.Att || 0;
    const damage = setStats.Damage || 0;
    const bossDamage = setStats["Boss Damage"] || 0;
    const critDamage = setStats["Crit Damage"] || 0;

    const statValue = stat / MULTIPLIERS.ALLSTAT;
    const atkValue = atk / MULTIPLIERS.ATK;
    const damageValue = damage / MULTIPLIERS.DAMAGE;
    const bossDamageValue = bossDamage / MULTIPLIERS.BOSS_DAMAGE;
    const critDamageValue = critDamage / MULTIPLIERS.CRIT_DAMAGE;

    const setSum = statValue + atkValue + damageValue + bossDamageValue + critDamageValue;
    return setSum
  };

  const calculateItemFD = () => {
    // Get base values
    const mainStatBase = toNumber(selectedGear?.['Main Stat'] || 0);
    const subStatBase = toNumber(selectedGear?.['Sub Stat'] || 0);
    const atkBase = toNumber(
      (selectedGear?.ATK === '' ? selectedGear?.['M.ATK'] : selectedGear?.ATK) || 0
    );
    const damageBase = toNumber(selectedGear?.DAMAGE || 0);
    const bossDamageBase = toNumber(selectedGear?.['Boss Damage'] || 0);
    const critDamageBase = toNumber(selectedGear?.['Crit Damage'] || 0);

    // Add starforce bonuses
    const mainStatTotal = mainStatBase + (sfResults?.difference?.stat || 0);
    const subStatTotal = subStatBase + (sfResults?.difference?.stat || 0);
    const atkTotal = atkBase + (sfResults?.difference?.att || 0);

    // Calculate individual values
    const mainStatValue = mainStatTotal / MULTIPLIERS.MAINSTAT;
    const subStatValue = subStatTotal / MULTIPLIERS.SUBSTAT;
    const atkValue = atkTotal / MULTIPLIERS.ATK;
    const damageValue = damageBase / MULTIPLIERS.DAMAGE;
    const bossDamageValue = bossDamageBase / MULTIPLIERS.BOSS_DAMAGE;
    const critDamageValue = critDamageBase / MULTIPLIERS.CRIT_DAMAGE;

    const itemSum = mainStatValue + subStatValue + atkValue + damageValue + bossDamageValue + critDamageValue;
    return itemSum
  };

  const itemFD = calculateItemFD();
  const setFD = calculateSetFD();
  const totalFD = itemFD + setFD;

  return (
    <div className="flex w-full border rounded-[8px] p-[12px] gap-[16px] justify-between">
      <div className="flex flex-col justify-between h-full w-full">
        <h5 className="opacity-60">Item FD</h5>
        <div className='flex'>
          <h2 className="flex font-bold w-full justify-end items-end">
          ~{itemFD.toFixed(2)}
          </h2>
          <h4 className='h-full flex justify-end items-end ml-[4px] pb-[4px]'>%</h4>
        </div>
      </div>
      
      <div className='h-full w-[1px] opacity-20 bg-black'/>
      
      <div className="flex flex-col justify-between h-full w-full">
        <h5 className="opacity-60">Set FD</h5>
        <div className='flex'>
          <h2 className="flex font-bold w-full justify-end items-end">
            ~{setFD.toFixed(2)}
          </h2>
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