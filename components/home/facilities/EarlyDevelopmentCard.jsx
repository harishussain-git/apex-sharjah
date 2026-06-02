"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate from "./FacilitiesCardTemplate"

export default function EarlyDevelopmentCard() {
  return <FacilitiesCardTemplate data={facilities.earlyDevelopment} />
}
