import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Lazy load the StatTable component to reduce initial bundle size
const StatTable = dynamic(() => import('./StatTable'), {
  loading: () => <div className="flex h-full w-[75%] items-center justify-center bg-gray-200 animate-pulse rounded-lg" />
});

export default function About() {
  return (
    <div className="flex flex-col items-center justify-top w-full max-w-[1440px] h-screen min-h-[946px] px-[64px] py-[16px] gap-[16px] grow scale-on-medium-about">
      {/* Header Section */}
      <div className="flex gap-[8px] min-h-[64px] w-full justify-between items-center">
        <div className="w-[196px]" />
        
        <Link href={'/'}>
          <Image
            src="https://5pd8q9yvpv.ufs.sh/f/8nGwjuDDSJXHACoDMprTLW4BhN1zuUS7DEpgGnjdv6aKerOM"
            width={172}
            height={32}
            alt="geardiff"
            priority
            style={{ width: '172px', height: '32px' }}
          />
        </Link>
        
        <div className="flex gap-[4px]">
          <Link
            href={'/about'}
            className="flex h-[40px] w-[96px] items-center justify-center opacity-60 hover:opacity-80 hover:cursor-pointer hover:bg-[#00000010] px-[24px] rounded-full"
          >
            <p className="leading-[16px] text-[16px] font-semibold">About</p>
          </Link>
          <Link
            href={'/about'}
            className="flex h-[40px] w-[96px] items-center justify-center opacity-60 hover:opacity-80 hover:cursor-pointer hover:bg-[#00000010] px-[24px] rounded-full"
          >
            <p className="leading-[16px] text-[16px] font-semibold">Donate</p>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex grow w-full h-full gap-[32px]">
        {/* Left Column - Text Content */}
        <div className="flex flex-col w-full h-full justify-center gap-[16px]">
          <h3>About</h3>
          <p>
            Gear diff is a small project aimed at giving guidance to players in
            confusing decisions. We realized that we often found ourselves
            unsure what decisions to make when it came to progression of items.
          </p>
          <p>
            With the infinite micro variations that can be made when it comes to
            gear, we realized we were often unsure if going one way or the other
            was better. Want to swap Eternal shoulder? Sure it should be ~0.5 FD though, so it&apos;s really not a priority.
          </p>
          <p>
            New players can actually make better decisions in terms of investing
            their meso now that their options in progression are laid out
            already. This is what we hope to ease with gear diff.
          </p>
          <p>
            Now a word of caution, Maplestory is a far more complicated game than the 2D aspect would imply, and we found ourselves struggling to keep this app simple and intuitive for new users without making too many comprimises on accuracy.
          </p>
        </div>

        {/* Right Column - Stat Table */}
        <div className="flex h-full w-full items-center justify-center">
          <StatTable />
        </div>
      </div>
    </div>
  );
}