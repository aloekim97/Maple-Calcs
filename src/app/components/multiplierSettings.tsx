// components/MultiplierSettings.tsx
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface MultiplierSettingsProps {
  multipliers: Record<string, number>;
  setMultipliers: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

export function MultiplierSettings({
  multipliers,
  setMultipliers,
}: MultiplierSettingsProps) {
  const handleChange = (key: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMultipliers({
      ...multipliers,
      [key]: numValue,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="max-w-[160px] h-[32px] gap-2"
          aria-label="Customize multipliers"
        >
          <Image
            src="image/Equal_Icon.svg"
            height={16}
            width={16}
            alt=""
            aria-hidden="true"
          />
          <span className="text-black">Customize</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>1 FD Equivalencies</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.entries(multipliers).map(([key, value]) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="col-span-2 text-right">
                {key}
              </Label>
              <Input
                id={key}
                type="number"
                value={value ?? ""}
                onChange={(e) => handleChange(key, e.target.value)}
                className="col-span-2"
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
