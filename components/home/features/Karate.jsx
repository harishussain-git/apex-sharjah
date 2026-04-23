import FeaturesCard from "./FeaturesCard"
import features from "../../../content/features.json"

export default function Karate() {
  return <FeaturesCard data={features.karate} />
}
