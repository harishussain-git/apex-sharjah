"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate from "./FacilitiesCardTemplate"

export default function SmartTransportSafeConnectivityCard() {
  return <FacilitiesCardTemplate data={facilities.smartTransportSafeConnectivity} />
}
