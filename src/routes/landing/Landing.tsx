import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeroVideo from "../../assets/images/landing-images/hero-video.mp4";
import "./landing.css";
import { resetLocation } from "../../helpers/reset-location";

const Landing = () => {
  useEffect(() => {
    document.title = "Shopping Time";
  }, []);
  return (
    <main className='landing'>
      <article className='hero'>
        <h2>
          Building a better <span>you!</span>
        </h2>
        <video autoPlay loop muted playsInline>
          <source src={HeroVideo} type='video/mp4' />
        </video>
      </article>
      <article className='grid'>
        <section className='grid-one'>
          <Link
            to={`/store/blouses`}
            className='custom-btn grid-button'
            onClick={() => {
              resetLocation();
            }}>
            <span>Blouses</span>
          </Link>
        </section>
        <section className='grid-two'>
          <Link
            to={`/store/jeans`}
            onClick={() => {
              resetLocation();
            }}
            className='custom-btn grid-button'>
            <span> Jeans</span>
          </Link>
        </section>
        <section className='grid-three'>
          <Link
            to={`/store/shoes`}
            onClick={() => {
              resetLocation();
            }}
            className=' custom-btn grid-button'>
            <span> Shoes</span>
          </Link>
        </section>
        <section className='grid-four'>
          <Link
            to={`/store/dresses`}
            onClick={() => {
              resetLocation();
            }}
            className='custom-btn grid-button'>
            <span>Dresses</span>
          </Link>
        </section>
        <section className='grid-five'>
          <Link
            to={`/store/all`}
            onClick={() => {
              resetLocation();
            }}
            className='custom-btn grid-button'>
            <span>Store</span>
          </Link>
        </section>
      </article>
    </main>
  );
};

export default Landing;
