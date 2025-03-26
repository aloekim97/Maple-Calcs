import Image from "next/image";
import GearCalculator from "./components/gearcalc";

export default function Home() {
  return (
    <div className="flex flex-col">
      <GearCalculator/>
    </div>
  );
}
