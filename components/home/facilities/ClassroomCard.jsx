"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate from "./FacilitiesCardTemplate"

export default function ClassroomCard() {
  return <FacilitiesCardTemplate data={facilities.classroom} />
}
