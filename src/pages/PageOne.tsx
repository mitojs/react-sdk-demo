import { useEffect } from 'react'
import { RouterProps } from 'react-router-dom'

export default function PageOne(props: RouterProps) {
  console.log('props', props)
  useEffect(() => {
    console.log('effect')
  }, [])
  return <div>pageone</div>
}
