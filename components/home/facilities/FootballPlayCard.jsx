"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate from "./FacilitiesCardTemplate"

export default function FootballPlayCard() {
  return <FacilitiesCardTemplate data={facilities.football} />
}
