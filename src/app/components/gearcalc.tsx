'use client';
import StarForce from './starforce';
import Cube from './pots';

export default function GearCalculator() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">MapleStory Gear Calculator</h1>
      <div className="flex gap-4">
        <div className="flex-1 border p-4">
          <StarForce />
        </div>
        <div className="flex-1 border p-4">
          <Cube />
        </div>
      </div>
    </div>
  );
}
