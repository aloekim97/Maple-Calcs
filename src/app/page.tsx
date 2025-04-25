// app/page.tsx
import GearCalculator from './components/gearcalc';
import ServiceWorker from './components/ServiceWorker';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gear Diff',
  description: 'Calculate gear differences and optimizations',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <ServiceWorker />
      <GearCalculator />
    </div>
  );
}
