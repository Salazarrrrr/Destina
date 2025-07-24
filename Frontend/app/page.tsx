import { SearchSection } from "@/components/search-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { Categories } from "@/components/categories"
import { HowItWorks } from "@/components/how-it-works"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <SearchSection />
        <Categories />
        <FeaturedProperties />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
