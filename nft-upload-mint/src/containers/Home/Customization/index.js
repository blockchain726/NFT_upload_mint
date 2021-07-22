
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Image from 'components/UI/Image';

const useStyles = makeStyles(theme => ({
  root: {},
  image: {
    borderRadius: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      maxWidth: 500,
    },
  },
  lastGrid: {
    [theme.breakpoints.up('sm')]: {
      marginTop: '0%',
    },
  },
}));

const Customization = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}> 
      <Grid container justif="center" alignItems="center">
        <Image
          src="assets/images/mainImage.png"
          alt="A Funding Portal"
          className={classes.image}
          data-aos="fade-up"
        />
      </Grid>
    </div>
  );
};

Customization.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Customization;
