import Banner from '@/components/Banner'
import CardPanel from '@/components/CardPanel'

export default function Home() {
  return (
    <main>
      <Banner />
      <div className="py-8 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Featured Venues</h2>
        <CardPanel />
      </div>
    </main>
  )
}