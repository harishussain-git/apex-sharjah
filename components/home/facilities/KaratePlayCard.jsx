"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate from "./FacilitiesCardTemplate"

export default function KaratePlayCard() {
  return <FacilitiesCardTemplate data={facilities.karate} />
}
