import { RouterProps } from 'react-router-dom'
import BtnContainer from './BtnContainer'
import Count from './Count'

export default function PageOne(props: RouterProps) {
  return (
    <>
      <Count></Count>
      <BtnContainer></BtnContainer>
    </>
  )
}
