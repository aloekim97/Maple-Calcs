// components/MultiplierSettings.tsx
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface MultiplierSettingsProps {
  multipliers: Record<string, number>;
  onMultipliersChange: (newMultipliers: Record<string, number>) => void;
}

export function MultiplierSettings({ multipliers, onMultipliersChange }: MultiplierSettingsProps) {
  const handleChange = (key: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    onMultipliersChange({
      ...multipliers,
      [key]: numValue,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="max-w-[160px] h-[32px]">
          <Image
            src='image/Equal_Icon.svg'
            height={16}
            width={16}
            alt='Customize'
          />
          <p className="text-black">Customize</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <h3>1 FD Equivalencies</h3>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.entries(multipliers).map(([key, value]) => (
            <div key={key} className="grid grid-cols-2 items-center gap-4 w-full justify-between">
              <Label htmlFor={key} className="text-right w-full">
                {key}
              </Label>
              <Input
                id={key}
                type="number"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className=""
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}