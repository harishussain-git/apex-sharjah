"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate from "./FacilitiesCardTemplate"

export default function InnovationLabsCard() {
  return <FacilitiesCardTemplate data={facilities.innovationLabs} />
}
