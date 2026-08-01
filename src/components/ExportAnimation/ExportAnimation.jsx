import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ExportAnimation.css';
import { Cloud, Bird, Tractor, Farmer, Harvester, Truck, Factory, Crane, CargoShip, Airplane, Globe } from './ExportSVGs';

const ExportAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Master timeline, loops infinitely
    const master = gsap.timeline({ repeat: -1 });

    const q = gsap.utils.selector(containerRef);

    // Initial setup: ensure elements are hidden/reset
    gsap.set(q('.tractor'), { x: -50, opacity: 1 });
    gsap.set(q('.farmer'), { x: -50, opacity: 0 });
    gsap.set(q('.harvester'), { x: -100, opacity: 1 });
    gsap.set(q('.truck'), { x: 0, opacity: 0 });
    gsap.set(q('.cargo-ship'), { x: 0 });
    gsap.set(q('.airplane'), { x: 0, opacity: 0 });
    gsap.set(q('.plane-trail'), { width: 0, opacity: 1 });
    gsap.set(q('.crop-stem'), { height: 0 });
    gsap.set(q('.crop-head'), { opacity: 0, y: 0, scale: 1 });
    gsap.set(q('.crop-leaf'), { opacity: 0, scale: 0 });
    gsap.set(q('.crop-leaf-2'), { opacity: 0, scale: 0 });
    gsap.set(q('.globe'), { opacity: 0, scale: 0.8 });
    gsap.set(q('.globe-line'), { strokeDashoffset: 300 });
    gsap.set(q('.globe-dot'), { opacity: 0 });
    gsap.set(q('.final-text'), { opacity: 0, y: 30, scale: 0.9 });
    gsap.set(q('.box'), { opacity: 0, y: -40 });

    /* =========================================================
       STAGE 1: (0-5s) Tractor enters & ploughs
       ========================================================= */
    const tl1 = gsap.timeline();
    tl1.to(q('.tractor'), { x: 450, duration: 4, ease: 'power1.inOut' })
       .to(q('.tractor .wheel'), { rotation: 360, transformOrigin: 'center', duration: 4, ease: 'none' }, '<')
       .to(q('.tractor'), { opacity: 0, duration: 1 }, '+=0'); 
    master.add(tl1, 0);

    /* =========================================================
       STAGE 2: (5-10s) Seedlings grow
       ========================================================= */
    const tl2 = gsap.timeline();
    tl2.to(q('.crop-stem'), { height: 40, duration: 2, ease: 'power1.out', stagger: 0.1 }, 0)
       .to(q('.crop-leaf'), { opacity: 1, scale: 1, duration: 1, stagger: 0.1 }, 1)
       .to(q('.crop-leaf-2'), { opacity: 1, scale: 1, duration: 1, stagger: 0.1 }, 1.5)
       .to(q('.crop-head'), { opacity: 1, duration: 1, stagger: 0.1 }, 2);
    master.add(tl2, 5);

    /* =========================================================
       STAGE 3: (10-15s) Farmer sprays
       ========================================================= */
    const tl3 = gsap.timeline();
    tl3.to(q('.farmer'), { opacity: 1, duration: 0.5 }, 0)
       .to(q('.farmer'), { x: 400, duration: 4, ease: 'linear' }, 0)
       // walking wobble & leg movement
       .to(q('.farmer'), { y: -5, duration: 0.25, yoyo: true, repeat: 15 }, 0)
       .to(q('.left-leg'), { rotation: 25, transformOrigin: 'top', duration: 0.25, yoyo: true, repeat: 15 }, 0)
       .to(q('.right-leg'), { rotation: -25, transformOrigin: 'top', duration: 0.25, yoyo: true, repeat: 15 }, 0)
       // subtle wind on crops
       .to(q('.crop-stem'), { rotation: 8, transformOrigin: 'bottom', duration: 1, yoyo: true, repeat: 3, stagger: 0.1 }, 0)
       .to(q('.farmer'), { opacity: 0, duration: 0.5 }, 4.5);
    master.add(tl3, 10);

    /* =========================================================
       STAGE 4: (15-20s) Crops grow tall & golden
       ========================================================= */
    const tl4 = gsap.timeline();
    tl4.to(q('.crop-stem'), { height: 100, duration: 3, ease: 'power1.inOut' }, 0)
       .to(q('.crop-head'), { y: -65, scale: 1.4, duration: 3, ease: 'power1.inOut' }, 0)
       .to(q('.crop-leaf'), { y: -30, duration: 3, ease: 'power1.inOut' }, 0)
       .to(q('.crop-leaf-2'), { y: -45, duration: 3, ease: 'power1.inOut' }, 0)
       // Transition to gold
       .to(q('.crop-stem, .crop-leaf, .crop-leaf-2'), { background: 'linear-gradient(90deg, #b45309 0%, #eab308 100%)', duration: 2 }, 2)
       .to(q('.crop-head'), { background: 'radial-gradient(circle at 30% 30%, #fde047 0%, #ca8a04 100%)', duration: 2 }, 2);
    master.add(tl4, 15);

    /* =========================================================
       STAGE 5: (20-25s) Harvester cuts crops
       ========================================================= */
    const tl5 = gsap.timeline();
    tl5.to(q('.harvester'), { x: 500, duration: 4, ease: 'power1.inOut' }, 0)
       .to(q('.harvester .wheel'), { rotation: 360, transformOrigin: 'center', duration: 4, ease: 'none' }, 0)
       .to(q('.harvester .blade'), { rotation: 1080, transformOrigin: 'center', duration: 4, ease: 'none' }, 0)
       // crop cut effect
       .to(q('.crop-stem'), { height: 15, duration: 0.2, stagger: 0.1 }, 1)
       .to(q('.crop-head, .crop-leaf, .crop-leaf-2'), { opacity: 0, scale: 0, duration: 0.2, stagger: 0.1 }, 1)
       .to(q('.harvester'), { opacity: 0, duration: 1 }, 4);
    master.add(tl5, 20);

    /* =========================================================
       STAGE 6: (25-30s) Truck arrives & drives
       ========================================================= */
    const tl6 = gsap.timeline();
    tl6.to(q('.truck'), { opacity: 1, duration: 0.5 }, 0)
       .to(q('.truck'), { x: 100, duration: 2, ease: 'power1.inOut' }, 0) // move to middle
       .to(q('.truck .wheel'), { rotation: 180, transformOrigin: 'center', duration: 2 }, 0)
       .to(q('.truck'), { x: 600, duration: 2, ease: 'power1.in' }, 3) // drive away to factory
       .to(q('.truck .wheel'), { rotation: 540, transformOrigin: 'center', duration: 2 }, 3)
       .to(q('.truck'), { opacity: 0, duration: 0.5 }, 4.5);
    master.add(tl6, 25);

    /* =========================================================
       STAGE 7: (30-35s) Factory processing
       ========================================================= */
    const tl7 = gsap.timeline();
    tl7.to(q('.box'), { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'bounce.out' }, 0)
       .to(q('.box'), { opacity: 0, x: 80, duration: 1, stagger: 0.1 }, 4);
    master.add(tl7, 30);

    /* =========================================================
       STAGE 8: (35-40s) Port Crane & Cargo Ship
       ========================================================= */
    const tl8 = gsap.timeline();
    tl8.to(q('.hook-block'), { y: 60, duration: 1.5, yoyo: true, repeat: 1, ease: 'power2.inOut' }, 0)
       .to(q('.hook-line'), { scaleY: 1.8, duration: 1.5, yoyo: true, repeat: 1, transformOrigin: 'top' }, 0)
       .to(q('.cargo-ship'), { x: 300, duration: 4, ease: 'power1.inOut' }, 1)
       .to(q('.cargo-ship'), { opacity: 0, duration: 1 }, 4);
    master.add(tl8, 35);

    /* =========================================================
       STAGE 9: (40-45s) Airplane, Globe & Final Text
       ========================================================= */
    const tl9 = gsap.timeline();
    // ping animation for globe dots
    gsap.to(q('.ping'), { scale: 2.5, opacity: 0, duration: 1.5, repeat: -1, transformOrigin: 'center' });
    
    tl9.to(q('.airplane'), { opacity: 1, duration: 0.5 }, 0)
       .to(q('.airplane'), { x: 800, y: -40, duration: 4, ease: 'power2.out' }, 0)
       .to(q('.plane-trail'), { width: 400, duration: 4, ease: 'power2.out' }, 0)
       .to(q('.globe'), { opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }, 0.5)
       .to(q('.globe-line'), { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' }, 1.5)
       .to(q('.globe-dot'), { opacity: 1, duration: 0.5, stagger: 0.5 }, 1.5)
       .to(q('.final-text'), { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.7)' }, 2)
       .to(q('.airplane, .plane-trail'), { opacity: 0, duration: 1 }, 4)
       .to(q('.globe, .final-text'), { opacity: 0, duration: 1 }, 4.5);
    master.add(tl9, 40);

    return () => {
      master.kill();
    };
  }, []);

  const renderCrops = () => {
    let crops = [];
    for (let i = 0; i < 12; i++) {
      crops.push(
        <div key={i} className="crop-container" style={{ position: 'relative' }}>
          <div className="crop-stem">
            <div className="crop-leaf"></div>
            <div className="crop-leaf-2"></div>
            <div className="crop-head"></div>
          </div>
        </div>
      );
    }
    return crops;
  };

  const renderBoxes = () => {
    return Array.from({ length: 4 }).map((_, i) => <div key={i} className="box"></div>);
  };

  return (
    <div className="export-animation-wrapper" ref={containerRef}>
      
      {/* Cinematic Lighting Overlays */}
      <div className="sky-gradient"></div>
      <div className="sun-rays"></div>

      {/* Atmospheric Background Elements */}
      <div className="anim-bg-elements">
        <Cloud x="5%" y="5px" width={180} className="cloud-anim" />
        <Cloud x="35%" y="20px" width={240} className="cloud-anim-2" />
        <Cloud x="70%" y="10px" width={150} className="cloud-anim" style={{ animationDelay: '-10s' }} />
        <Bird x="15%" y="15px" width={40} className="bird-anim" />
        <Bird x="55%" y="30px" width={30} className="bird-anim" style={{ animationDelay: '1s' }} />
      </div>

      {/* Realistic Ground Sections */}
      <div className="anim-ground">
        <div className="ground-farm">
          {/* Soil texture layer */}
          <div className="soil-texture"></div>
        </div>
        <div className="ground-road">
          <div className="road-line"></div>
          <div className="road-texture"></div>
        </div>
        <div className="ground-port">
          <div className="port-texture"></div>
        </div>
        <div className="ground-ocean">
          <div className="wave-layer"></div>
          <div className="water-reflection"></div>
        </div>
      </div>

      {/* Farm Crops Layer */}
      <div className="crop-group">
        {renderCrops()}
      </div>

      {/* Factory Conveyor Boxes Layer */}
      <div className="box-stack">
        {renderBoxes()}
      </div>

      {/* Factory Smoke Overlay */}
      <div className="smoke-anim" style={{ position: 'absolute', bottom: '210px', left: '50%', width: '30px', height: '30px', zIndex: 5 }}>
        <Cloud width={60} x={0} y={0} style={{ opacity: 0.6 }} />
      </div>

      {/* Dynamic SVG Object Layer */}
      <div className="anim-layer">
        <Tractor />
        <Farmer />
        <Harvester />
        <Truck />
        <Factory />
        <Crane />
        <CargoShip />
        <div className="airplane-container">
           <div className="plane-trail"></div>
           <Airplane />
        </div>
        <Globe />
      </div>

      {/* Premium Typography Layer */}
      <div className="final-text">FROM FARMS TO GLOBAL MARKETS</div>
      
      {/* Ambient Vignette for Depth */}
      <div className="vignette-overlay"></div>
    </div>
  );
};

export default ExportAnimation;
