import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { AppBar, Box, styled, Tab, Tabs, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import PurchaseModalListPaperPrints from '../PurchaseModalListPaperPrints/PurchaseModalListPaperPrints';
import PurchaseModalListWallArt from '../PurchaseModalListWallArt/PurchaseModalListWallArt';
import classes from './PurchaseModalTabPanel.module.css';

const StyledTab = styled(Tab)({
  backgroundColor: '#1F1F1F',
  width: '50%',
  maxWidth: '1000px',
  '&:hover': {
    backgroundColor: '#333333'
  }
});

const StyledTabs = styled(Tabs)({
  backgroundColor: '#383737',
  margin: '0 auto',
  width: '100%'
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role = 'tabpanel'
      hidden = { value !== index }
      id = { `simple-tabpanel-${index}` }
      aria-labelledby = { `simple-tab-${index}` }
      { ...other }
    >
      {value === index && (
        <Box p = { 2 }>
          <Typography> { children } </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PurchaseModalTabPanel = props => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <div className = { classes.root }>
        <AppBar position = 'static'>
          <StyledTabs value = { value } onChange = { handleChange } aria-label = 'simple tabs example'>
            <StyledTab label = 'Paper Prints' { ...a11yProps(0) } />
            <StyledTab label = 'Wall Art' { ...a11yProps(1) } />
          </StyledTabs>
        </AppBar>
        <TabPanel value = { value } index = { 0 }>
          <PurchaseModalListPaperPrints/>
        </TabPanel>
        <TabPanel value = { value } index = { 1 }>
          <PurchaseModalListWallArt/>
        </TabPanel>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps, null)(PurchaseModalTabPanel);