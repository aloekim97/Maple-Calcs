// app/page.tsx
import GearCalculator from './components/gearcalc';
import ServiceWorker from './components/ServiceWorker';

export default function Home() {
  
  return (
    <div className="flex flex-col">
      <ServiceWorker />
      <GearCalculator />
    </div>
  );
}