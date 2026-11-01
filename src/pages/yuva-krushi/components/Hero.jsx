import headerImage from '../assets/yuvakrushiheader.png'
import { LeafSprig, SmallLeaf } from './icons.jsx'

export default function Hero() {
  return (
    <div className="yk-hero">
      <div className="yk-hero__text">
        <h1 id="brand-title" className="yk-brand">
          <span className="yk-brand__word">
            YUVA
            <LeafSprig className="yk-brand__leaves" />
          </span>
          <span className="yk-brand__word">KRUSHI</span>
        </h1>

        <p className="yk-tagline">
          <span className="yk-tagline__today">Ideas Today.</span>{' '}
          <span className="yk-tagline__tomorrow">Greener Tomorrow.</span>
          <SmallLeaf className="yk-tagline__leaf" />
        </p>

        <p className="yk-hero__subtitle">
          A pathway for young professionals
          <br />
          to become agripreneurs.
        </p>
      </div>

      <figure className="yk-hero__frame">
        <img
          src={headerImage}
          alt="Young farmer using a tablet among drones, solar panels and smart-farming data overlays"
        />
      </figure>
    </div>
  )
}
