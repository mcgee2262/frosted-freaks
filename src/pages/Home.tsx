import { CtaBand } from '../components/CtaBand'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { ServiceAreaSection } from '../components/ServiceAreaSection'
import { ServicePoints } from '../components/ServicePoints'
import { YardPicker } from '../components/YardPicker'
import { usePageMeta } from '../lib/usePageMeta'

export default function Home() {
  usePageMeta(
    'Frosted Freaks Services | Snow shoveling in Reston, Herndon and Great Falls, VA',
    'Frosted Freaks Services shovels driveways, walkways, steps and entryways for homeowners in Reston, Herndon and Great Falls, Virginia. Request a quote.',
  )
  return (
    <>
      <Hero />
      <ServicePoints />
      <YardPicker />
      <HowItWorks />
      <ServiceAreaSection />
      <CtaBand />
    </>
  )
}
