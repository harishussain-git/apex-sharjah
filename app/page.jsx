"use client";

// import useSectionSnap from "@/lib/gsap/useSectionSnap";

import Hero from "../components/home/Hero1";
import Features from "../components/home/Features";
import MoreDetails from "../components/home/MoreDetails";
import CtaSection from "../components/home/CtaSection";
import Footer from "../components/home/Footer";
import TextSection from "../components/home/TextSection";
import SchoolFront from "../components/home/SchoolFront";
// import DemoPreviewPage from "./demo1/page";
import DemoPreviewPage from "@/components/DemoPreviewPage";

export default function Page() {
  // useSectionSnap([
  //   "school-front",
  //   "features",
  //   "more-details",
  // ]);

  return (
    <>
      <div className="">
        <DemoPreviewPage/>
      </div>


      {/* <Hero />
      <TextSection />
      <SchoolFront />
      <Features />
      <MoreDetails />
      <CtaSection />
      <Footer /> */}
    </>
  );
}
