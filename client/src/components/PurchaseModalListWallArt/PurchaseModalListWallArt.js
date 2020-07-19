import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Collapse, List, ListItem, ListItemText, styled } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import classes from './PurchaseModalListWallArt.module.css';

const StyledListItemText = styled(ListItemText)({
  fontSize: 'small'
});

const StyledListItem = styled(ListItem)({
  margin: '0',
  padding: '0',
  paddingLeft: '15px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, .1)'
  }
});

const PurchaseModalListWallArt = props => {
  const [openCanvas, setOpenCanvas] = useState(false);
  const [openMetal, setOpenMetal] = useState(false);
  const [openAcrylic, setOpenAcrylic] = useState(false);

  return (
    <List
      component = 'nav'
      aria-labelledby = 'nested-list-subheader'
      className = { classes.root }
    >
      <ListItem button onClick = { () => setOpenCanvas(!openCanvas) }>
        <ListItemText primary = 'Traditional Canvas' />
        { openCanvas ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in = { openCanvas } timeout = 'auto' unmountOnExit>
        <List component = 'div' disablePadding>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '16 x 24 Traditional Canvas' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '20 x 30 Traditional Canvas' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '24 x 36 Traditional Canvas' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '30 x 45 Traditional Canvas' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '36 x 36 Traditional Canvas' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '40 x 60 Traditional Canvas' />
          </StyledListItem>
        </List>
      </Collapse>
      <ListItem button onClick = { () => setOpenMetal(!openMetal) }>
        <ListItemText primary = 'Metal' />
        {openMetal ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in = { openMetal } timeout = 'auto' unmountOnExit>
        <List component = 'div' disablePadding>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '12 x 18 Float Mounted MetalPrint' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '16 x 24 Float Mounted MetalPrint' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '20 x 30 Float Mounted MetalPrint' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '24 x 36 Float Mounted MetalPrint' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '30 x 45 Float Mounted MetalPrint' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '40 x 60 Float Mounted MetalPrint' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '40 x 90 Float Mounted MetalPrint' />
          </StyledListItem>
        </List>
      </Collapse>
      <ListItem button onClick = { () => setOpenAcrylic(!openAcrylic) }>
        <ListItemText primary = 'Acrylic Metal' />
        {openAcrylic ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in = { openAcrylic } timeout = 'auto' unmountOnExit>
        <List component = 'div' disablePadding>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '20 x 30 Acrylic Metal Print' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '24 x 36 Acrylic Metal Print' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '30 x 45 Acrylic Metal Print' />
          </StyledListItem>
        </List>
      </Collapse>
    </List>
  );
};

const mapStateToProps = (state) => {
  return {
    image: state.image
  };
};

export default connect(mapStateToProps, null)(PurchaseModalListWallArt);