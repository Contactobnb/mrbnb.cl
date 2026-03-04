import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Services from '@/components/home/Services'
import ProblemSolution from '@/components/home/ProblemSolution'
import Process from '@/components/home/Process'
import Benefits from '@/components/home/Benefits'
import PropertyGallery from '@/components/home/PropertyGallery'
import Testimonials from '@/components/home/Testimonials'
import CTA from '@/components/home/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ProblemSolution />
      <Services />
      <Process />
      <Benefits />
      <PropertyGallery />
      <Testimonials />
      <CTA />
    </>
  )
}
