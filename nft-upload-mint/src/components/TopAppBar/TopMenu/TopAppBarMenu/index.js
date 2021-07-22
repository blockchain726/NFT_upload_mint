
import { memo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ScrollTo } from 'react-scroll-to';

import OutlinedButton from 'components/UI/Buttons/OutlinedButton';

const useStyles = makeStyles(theme => ({
  menuItem: {
    flexDirection: 'row',
    width: 'fit-content',
    minHeight: '100%',
    padding: 0
  }
}));

const TopAppBarMenu = () => {
  const classes = useStyles();
    
  return (
    <>
      <ListItem className={classes.menuItem}>
        <ScrollTo>
          {({ scroll }) => (
            <OutlinedButton onClick={() => scroll({ x: 0, y: 870, smooth: true })} style={{ border: 'none' }}>
              <Typography variant='body2' style={{ fontFamily: 'LULO' }}>PROLOGUE</Typography>
            </OutlinedButton>)
          }
        </ScrollTo>
        <ScrollTo>
          {({ scroll }) => (
            <OutlinedButton onClick={() => scroll({ x: 0, y: 1570, smooth: true })} style={{ border: 'none' }}>
              <Typography variant='body2' style={{ fontFamily: 'LULO' }}>K9NITE MINTING</Typography>
            </OutlinedButton>)
          }
        </ScrollTo>
        <ScrollTo>
          {({ scroll }) => (
            <OutlinedButton onClick={() => scroll({ x: 0, y: 2670, smooth: true })} style={{ border: 'none' }}>
              <Typography variant='body2' style={{ fontFamily: 'LULO' }}>ROADMAP</Typography>
            </OutlinedButton>)
          }
        </ScrollTo>
      </ListItem>
    </>
  );
};

export default memo(TopAppBarMenu);
