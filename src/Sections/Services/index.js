import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import artistData from "../../data/artistData"; // Import the artist data

import TextBlock from "../../components/TextBlock";
import SvgBlock from "../../components/SvgBlock";

const ServiceSection = styled.section`
  width: 100vw;
  /* background-color: #0a0b10; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 20rem;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 85vh;
  z-index: -1;
  background-color: #0a0b10;
  background-size: auto 100vh;
  background-repeat: no-repeat;
`;

const Title = styled.h1`
  color: var(--white);
  display: inline-block;
  font-size: 2rem;
  /* margin-top: 4rem; */
  margin-top: 1rem;
  position: relative;
  &::before {
    content: "";
    height: 1px;
    width: 50%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0.5rem);
    /* or 100px */
    border-bottom: 2px solid var(--pink);
  }
`;

const Line = styled.span`
  border-left: 4px solid var(--background);
  height: 15rem;
  margin-top: 2rem;
  border-radius: 20px 20px 0 0;
`;

const Triangle = styled.span`
  width: 0;
  height: 0;
  border-left: 1.2rem solid transparent;
  border-right: 1.2rem solid transparent;
  border-top: 2rem solid var(--background);
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10rem 10rem;
  /* margin-bottom: 10rem; */
  position: relative;
  @media only Screen and (max-width: 64em) {
    margin: 10rem calc(4rem + 5vw);
  }
  @media only Screen and (max-width: 48em) {
    display: block;
    &:last-child {
      margin-bottom: 2rem;
    }
  }
  @media only Screen and (max-width: 40em) {
    margin: 10rem calc(2rem + 3vw);
    &:last-child {
      margin-bottom: 1rem;
    }
  }
`;

const Services = () => {
  const ref = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  const revealRefs = useRef([]);
  revealRefs.current = [];

  useEffect(() => {
    const element = ref.current;
    const mq = window.matchMedia("(max-width: 48em)");
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: document.getElementById("artists"),
        start: "top top+=180",
        end: "bottom bottom",
        pin: element,
        pinReparent: true,
      },
    });
    t1.fromTo(
      document.getElementById("line"),

      {
        height: "15rem",
      },
      {
        height: "3rem",
        duration: 2,
        scrollTrigger: {
          trigger: document.getElementById("line"),
          start: "top top+=200",
          end: "bottom top+=220",
          scrub: true,
        },
      }
    );

    const commonTrigger = {
      scrub: true,
      snap: true,
    };

    revealRefs.current.forEach((el, index) => {
      const trigger = {
        ...commonTrigger,
        id: `section-${index + 1}`,
        trigger: el,
        start: "top center+=50",
        end: "bottom bottom-=200",
      };

      t1.from(el.childNodes[0], {
        x: -300,
        opacity: 0,
        duration: 2,
        ease: "power2",
        scrollTrigger: trigger,
      });
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };
  return (
    <ServiceSection id="artists">
      <Background ref={ref}>
        <Title className="title">Our Artists</Title>
        <Line id="line" />
        <Triangle id="triangle" />
      </Background>

      {artistData.map((artist, index) => (
        <Content key={index} ref={addToRefs}>
          <TextBlock
            topic={artist.topic}
            title={<h1>{artist.title}</h1>}
            subText={<h5>{artist.subText}</h5>}
            links={artist.links}
          />
          <SvgBlock svg={artist.svg} />
        </Content>
      ))}
    </ServiceSection>
  );
};

export default Services;
