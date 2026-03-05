import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Services from '@/components/home/Services'
import ProblemSolution from '@/components/home/ProblemSolution'
import Process from '@/components/home/Process'
import Benefits from '@/components/home/Benefits'
import PropertyGallery from '@/components/home/PropertyGallery'
import Testimonials from '@/components/home/Testimonials'
import CTA from '@/components/home/CTA'
import FadeIn from '@/components/ui/FadeIn'

export default function Home() {
  return (
    <>
      <Hero />
      <FadeIn><Stats /></FadeIn>
      <FadeIn><ProblemSolution /></FadeIn>
      <FadeIn><Services /></FadeIn>
      <FadeIn><Process /></FadeIn>
      <FadeIn><Benefits /></FadeIn>
      <FadeIn><PropertyGallery /></FadeIn>
      <FadeIn><Testimonials /></FadeIn>
      <FadeIn><CTA /></FadeIn>
    </>
  )
}
