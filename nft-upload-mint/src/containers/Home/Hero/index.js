import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';

import Image from 'components/UI/Image';
import SectionHeader from 'components/UI/SectionHeader';

const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    boxShadow:
      '25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)',
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      maxWidth: 500,
      marginBottom: 60
    },
  },
  mobileImageContainer: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute', left: 0, marginTop: 80,
    },
    position: 'absolute', right: 0, marginTop: 80,
  },
  buyMarsButton: {
    backgroundColor: theme.palette.error.light
  }
}));

const Hero = props => {
  const { setIsSwapDialog, account, className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div id='prologue' className={clsx(classes.root, className)} {...rest}>
      <Grid
        container
        justify="space-between"
        spacing={4}
        direction={isMd ? 'row' : 'column-reverse'}
      >
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={6}
          data-aos={'fade-up'}
        >
          <SectionHeader
            title={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: theme.palette.text.hoverText }}>
                  PROLOGUE
                  <br />
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 18, fontWeight: '300', textAlign: 'justify', lineHeight: 1.8 }}>
                  Long ago in an alternate Earth, legend has it that ancient aliens from hallowed antiquity abducted dogs in their macabre spaceships and took them to a faraway exoplanet. There, on one of its moons, torturous experiments were carried out, forever transforming the nature of these mutts.
                  <br />
                  <br />
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 18, fontWeight: '300', textAlign: 'justify', lineHeight: 1.8 }}>
                Months turned to years, and then to centuries and after, eons until at last, these subjugated canines mustered up the courage and led a rebellion against their captors. For what seemed like an eternity, these dogs were locked in guerilla warfare on that barren moon until at last, they struck a decisive blow against their abductors.
                  <br />
                  <br />
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 18, fontWeight: '300', textAlign: 'justify', lineHeight: 1.8 }}>
                With the rest of the alien horde driven from their moon base, the enhanced canines retrofitted landing gears and made for the planet, a new home now known in their common tongue as Planet K-9.
                </span>
              </div>
            }
            
            align={isMd ? "left" : 'center'}
            disableGutter
            titleVariant="h3"
          />
        </Grid>
        <Grid
          item
          container
          justify="flex-start"
          alignItems="center"
          xs={12}
          md={6}
          data-aos={'fade-up'}
        >
          <Image
            src="assets/images/dog4.jpg"
            alt="Web3 Legal Engineering"
            className={classes.image}
            data-aos="fade-right"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
        </Grid>
      </Grid>
    </div>
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Hero;
