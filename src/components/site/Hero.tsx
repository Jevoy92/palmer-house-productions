import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";
import founder from "@/assets/work/NonProfit-poster.jpg";
import community from "@/assets/work/FarmersMarket-poster.jpg";
import "./public-home.css";

/** The service stays readable while the real work supplies the personality. */
export function Hero() {
  const reduce = useHydratedReducedMotion();
  return (
    <section className="ph-home-hero" aria-labelledby="home-title">
      <div className="ph-home-intro">
        <p className="ph-kicker">
          <span />
          Video for your business
        </p>
        <h1 id="home-title">
          Good work.
          <br />
          Ready to be seen.
        </h1>
        <p className="ph-home-lede">
          We plan, film, and edit videos for your business. Prefer to make your own? Start with our
          Studio tools or get expert help before you shoot.
        </p>
        <div className="ph-actions">
          <a href="#ways-to-work" className="primary-action">
            Find the right help <ArrowDown size={17} />
          </a>
          <Link to="/work" className="secondary-action">
            See our work <ArrowUpRight size={17} />
          </Link>
        </div>
        <p className="ph-home-location">
          Pacific Northwest production. Creative tools wherever you work.
        </p>
      </div>
      <motion.div
        className="ph-work-window"
        initial={reduce ? false : { y: 14 }}
        animate={{ y: 0 }}
        transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="ph-window-caption">
          <span>Made with Palmer House</span>
          <span>People · places · stories</span>
        </div>
        <Link
          to="/work"
          className="ph-work-pair"
          aria-label="See Palmer House founder and community films"
        >
          <figure className="ph-portrait-film">
            <img
              src={founder}
              alt="A nonprofit founder sharing her story on camera"
              width={960}
              height={540}
              fetchPriority="high"
            />
            <figcaption>A voice people trust.</figcaption>
          </figure>
          <figure className="ph-portrait-film">
            <img
              src={community}
              alt="A busy Pacific Northwest farmers market filmed from above"
              width={960}
              height={540}
            />
            <figcaption>A place worth knowing.</figcaption>
          </figure>
          <span className="ph-work-link">
            <ArrowUpRight size={20} />
            <span className="sr-only">View selected work</span>
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
