"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate from "./FacilitiesCardTemplate"

export default function PrayerRoomMosqueCard() {
  return <FacilitiesCardTemplate data={facilities.prayerRoomMosque} />
}
