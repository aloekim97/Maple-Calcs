export interface Item {
  "Item Name": string;
  Job: string;
  Set: string;
  Type: string;
  "Sub-Type": string;
  Level: number;
  "Main Stat": number;
  "Sub Stat": number;
  "HP": number | string;
  MP: number | string;
  ATK: number | string;
  "M.ATK": string;
  IED: number | string;
  "Boss Damage": string;
  Damage?: string;
  "ADJ Multiplier": number;
  "ADJ Std": number;
  key: string;
  url: string;
  optimize: string;
}