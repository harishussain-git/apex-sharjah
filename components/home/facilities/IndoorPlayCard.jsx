"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate from "./FacilitiesCardTemplate"

export default function IndoorPlayCard() {
  return <FacilitiesCardTemplate data={facilities.indoorSportsHall} />
}
