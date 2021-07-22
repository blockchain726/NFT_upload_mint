
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Image from 'components/UI/Image';
import SectionHeader from 'components/UI/SectionHeader';

const useStyles = makeStyles(theme => ({
  root: {},
  lastGrid: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '0%',
    },
  }
}));

const Roadmap = props => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  
  return (
    <div id='roadmap' className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
            title={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: theme.palette.text.hoverText }}>
                  RoadMap
                  <br />
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                  <Image
                    src="assets/images/MARS.png"
                    alt="Web3 Legal Engineering"
                    height={16}
                    width={16}
                  /> Contests begin: memes, animation, backstories, world-building    
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                  <Image
                    src="assets/images/MARS.png"
                    alt="Web3 Legal Engineering"
                    height={16}
                    width={16}
                  /> K-9 minting on the website commences for 0.02 ETH per NFT.
                  <br />
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                  <Image
                    src="assets/images/MARS.png"
                    alt="Web3 Legal Engineering"
                    height={16}
                    width={16}
                  /> Community begins suggesting dog shelters and charities that focus on caring for animals.
                  <br />
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                  <Image
                    src="assets/images/MARS.png"
                    alt="Web3 Legal Engineering"
                    height={16}
                    width={16}
                  /> Sale ends    
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                  <Image
                    src="assets/images/MARS.png"
                    alt="Web3 Legal Engineering"
                    height={16}
                    width={16}
                  /> Vote to determine winning dog shelters or animal charities as well as the selection of multi-sig wallet holders for community funds.
                  <br />
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                  <Image
                    src="assets/images/MARS.png"
                    alt="Web3 Legal Engineering"
                    height={16}
                    width={16}
                  /> Distribution of funds to chosen dog shelters or animal charities as well funds to contest winners.
                  <br />
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                  <Image
                    src="assets/images/MARS.png"
                    alt="Web3 Legal Engineering"
                    height={16}
                    width={16}
                  /> Airdrop 1.0: 10 special K-9s for 10 existing K-9 holders
                  <br />
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                  <Image
                    src="assets/images/MARS.png"
                    alt="Web3 Legal Engineering"
                    height={16}
                    width={16}
                  /> Airdrop 2.0: Special announcement. We will keep this to our chest for now.
                  <br />
                </span>
                <span style={{ color: theme.palette.text.primary, fontSize: 24, fontWeight: 'normal', textAlign: 'justify', lineHeight: 1.8 }}>
                  <Image
                    src="assets/images/MARS.png"
                    alt="Web3 Legal Engineering"
                    height={16}
                    width={16}
                  /> Roadmap 2.0: Community decides!
                </span>
              </div>
            }
            
            align={'center'}
            disableGutter
            titleVariant="h3"
          />
    </div>
  );
};

Roadmap.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Roadmap;
