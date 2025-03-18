import { useCost } from "../formulas/starforce";


export default function StarForce() {
  const cost = useCost(0, 150)

  return (
    <div>{cost}</div>
  )
}