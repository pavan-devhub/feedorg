import heroPhoto from '../assets/home/hero-1672.webp'
import heroPhoto2x from '../assets/home/hero-3344.webp'
import CategoryCards from '../components/CategoryCards.jsx'
import './HomePage.css'

export default function HomePage() {
  return (
    <main className="mt-home">
      <section className="home-hero">
        {/* the header photo edge to edge, with the heading centred below it */}
        <img
          className="home-hero__photo"
          src={heroPhoto}
          srcSet={`${heroPhoto} 1672w, ${heroPhoto2x} 3344w`}
          sizes="100vw"
          width="1672"
          height="510"
          alt="A farmer using a tablet in his field beside a laptop showing a farm calculator, with crop, cost, market price, export, logistics and compliance calculators, and a container port with fresh produce"
        />
        <div className="home-hero__text">
          <h1 className="home-hero__title">
            My Tools &amp; <span>Services</span>
          </h1>
          <span className="home-hero__rule" aria-hidden="true" />
        </div>
      </section>

      <CategoryCards />
    </main>
  )
}
