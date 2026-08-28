import Image from "next/image"
import { connection } from "next/server"

import Countdown from "./Countdown"

const LAUNCH_TIME = Date.parse("2026-08-28T22:00:00+05:30")

export async function PageLiveSoon() {
  await connection()
  // This route is dynamic; capture the server clock for the countdown baseline.
  // eslint-disable-next-line react-hooks/purity
  const initialServerTime = Date.now()

  return (
    <main className="flex min-h-svh flex-col bg-[#a9ccf9] px-6 py-8 text-[#334187] sm:px-10 sm:py-10">

      <section className="m-auto flex max-w-3xl flex-col items-center py-16 text-center">
        <Image
          src="/home/apex-logo-big.webp"
          alt="Apex Vision Model School"
          width={853}
          height={258}
          className="mb-8 h-auto w-32 sm:w-40"
          priority
        />
        {/* <h1 className="font-accent text-5xl leading-[0.95] font-semibold tracking-[-0.04em] sm:text-7xl">
          Site will be live soon
        </h1> */}
      </section>

      <p className="text-center text-xs tracking-[0.12em] text-black/75 uppercase sm:text-left">
        SITE PERFORMANCE OPTIMIZATION - IN PROGRESS...
      </p>
      <Countdown
        initialServerTime={initialServerTime}
        targetTime={LAUNCH_TIME}
      />
    </main>
  )
}

export default function Page() {
  return <PageLiveSoon />
}
