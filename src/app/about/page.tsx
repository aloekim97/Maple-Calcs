import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-top w-full max-w-[1440px] h-screen min-h-[946px] px-[64px] py-[16px] gap-[16px] grow scale-on-medium-about">
      <div className="flex gap-[8px] min-h-[64px] w-full justify-between items-center">
        <div className="w-[196px]" />
        <Link href={'/'}>
          <Image
            src="image/geardiff.svg"
            width={172}
            height={32}
            alt="geardiff"
            role="img"
            style={{
              width: 'auto',
              height: 'auto',
            }}
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
      <div className="flex grow w-full h-full gap-[32px]">
        <div className="flex flex-col w-full h-full justify-center gap-[16px]">
          <h3>About</h3>
          <p>
            Gear diff is a small project aimed at giving guidance to players in
            confusing decisions. We realized that we often found ourselves
            unsure what decisions to make when it came to progression of items.
            With the infinite micro variations that can be made when it comes to
            gear, we realized we were often unsure if going one way or the other
            was better.
          </p>
          <p>
            {`Want to swap Eternal shoulder? Sure it should be ~0.5 FD though, so it's really not a priority. When new content came out, making decisions like these was a far easier task. Most of the people who even had access to such gear already had something near bis to swap off from, but what if your current shoulder is fake three line and 21? It's not as clear what the FD to meso efficiency is anymore without pulling up multiple websites and using them in unison. (Shout out to MathBro)`}
          </p>
          <p>
            New players can actually make better decisions in terms of investing
            their meso now that their options in progression are laid out
            already. This is what we hope to ease with gear diff.
          </p>
          <p>
            {` Now a word of caution, Maplestory is a far more complicated game than the 2D aspect would imply, and we found ourselves struggling to keep this app simple and intuitive for new users without making too many comprimises on accuracy. Every character's stats and place in the game is extremely unique, we found that the hard way (seriously this game is a real mess of old systems built upon each other). So our approximations on FD are just that, an approximation. The <b>table</b> to the right shows these assumptions we made.`}
          </p>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col gap-[16px] h-full w-[75%] items-center justify-center">
            <div className="flex justify-between w-full py-[8px] px-[16px] rounded-full">
              <h4>Stat Equivalencies</h4>
              <h4>(Value = 1 Final Damage)</h4>
            </div>
            <div className="flex justify-between w-full py-[8px] px-[16px] rounded-full bg-blue-100">
              <h4>Flat Main Stat:</h4>
              <p>100</p>
            </div>
            <div className="flex justify-between w-full py-[8px] px-[16px]  rounded-full bg-blue-100">
              <h4>Flat Sub Stat:</h4>
              <p>1200</p>
            </div>
            <div className="flex justify-between w-full py-[8px] px-[16px]  rounded-full bg-blue-100">
              <h4>Flat All Stat:</h4>
              <p>92</p>
            </div>
            <div className="flex justify-between w-full py-[8px] px-[16px]  rounded-full bg-blue-100">
              <h4>% Main Stat:</h4>
              <p>12</p>
            </div>
            <div className="flex justify-between w-full py-[8px] px-[16px]  rounded-full bg-blue-100">
              <h4>% All Stat:</h4>
              <p>10</p>
            </div>
            <div className="flex justify-between w-full py-[8px] px-[16px]  rounded-full bg-blue-100">
              <h4>Flat ATT/M.ATT:</h4>
              <p>30</p>
            </div>
            <div className="flex justify-between w-full py-[8px] px-[16px]  rounded-full bg-blue-100">
              <h4>Boss Damage:</h4>
              <p>10</p>
            </div>
            <div className="flex justify-between w-full py-[8px] px-[16px]  rounded-full bg-blue-100">
              <h4>Damage:</h4>
              <p>10</p>
            </div>
            <div className="flex justify-between w-full py-[8px] px-[16px]  rounded-full bg-blue-100">
              <h4>Crit Damage:</h4>
              <p>3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
