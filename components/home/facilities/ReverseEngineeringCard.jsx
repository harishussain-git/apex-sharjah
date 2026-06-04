"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate from "./FacilitiesCardTemplate"

export default function ReverseEngineeringCard() {
  return <FacilitiesCardTemplate data={facilities.reverseEngineering} />
}
