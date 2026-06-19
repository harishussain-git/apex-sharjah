"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate2 from "./FacilitiesCardTemplate2"

export default function KidsPoolSwimmingCard() {
  return <FacilitiesCardTemplate2 data={facilities.kidsPoolSwimming} />
}
