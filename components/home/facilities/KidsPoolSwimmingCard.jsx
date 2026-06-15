"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate from "./FacilitiesCardTemplate"

export default function KidsPoolSwimmingCard() {
  return <FacilitiesCardTemplate data={facilities.kidsPoolSwimming} />
}
