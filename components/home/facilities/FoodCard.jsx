"use client"

import facilities from "../../../content/facilities.json"
import FacilitiesCardTemplate from "./FacilitiesCardTemplate"

export default function FoodCard() {
  return <FacilitiesCardTemplate data={facilities.food} />
}
