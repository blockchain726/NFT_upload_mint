
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import Section from 'hoc/Section';
import Hero from './Hero';
import SectionAlternate from 'hoc/SectionAlternate';
import Customization from './Customization';
import TradingViewBoard from './TradingViewBoard';
import Roadmap from './Roadmap';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/assets/images/homeBackground.jpg)'
  },
}));

const Home = () => {
  const classes = useStyles();

  AOS.init({
    once: true,
    delay: 50,
    duration: 500,
    easing: 'ease-in-out',
  });

  return (
    <div className={classes.root}>
      <SectionAlternate>
        <Customization />
      </SectionAlternate>
      <Section >
        <Hero />
      </Section>
      <Section>
        <TradingViewBoard />
      </Section>
      <Section >
        <Roadmap />
      </Section>
    </div >
  );
};

export default Home;
