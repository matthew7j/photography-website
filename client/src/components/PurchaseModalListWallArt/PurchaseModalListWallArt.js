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

  const importAll = r => {
    return r.keys().map(r);
  }
  const printOptions = importAll(require.context('../../../../images', false, /\.(json)$/))[1].wallArt;

  const canvasPrintOptions = printOptions['Traditional Canvas'];
  const canvasJSX = canvasPrintOptions.map(option => {
    return (
      <StyledListItem button key = { option.type } className = { classes.nested } onClick = { () => props.clicked(option.type, option.price) }>
        <StyledListItemText disableTypography className = { classes.nested } primary = { option.type } />
      </StyledListItem>
    )
  });

  const metalPrintOptions = printOptions['Metal'];
  const metalJSX = metalPrintOptions.map(option => {
    return (
      <StyledListItem button key = { option.type } className = { classes.nested } onClick = { () => props.clicked(option.type, option.price) }>
        <StyledListItemText disableTypography className = { classes.nested } primary = { option.type } />
      </StyledListItem>
    )
  });

  const acrylicPrintOptions = printOptions['Acrylic Metal'];
  const acrylicJSX = acrylicPrintOptions.map(option => {
    return (
      <StyledListItem button key = { option.type } className = { classes.nested } onClick = { () => props.clicked(option.type, option.price) }>
        <StyledListItemText disableTypography className = { classes.nested } primary = { option.type } />
      </StyledListItem>
    )
  });

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
          { canvasJSX }
        </List>
      </Collapse>
      <ListItem button onClick = { () => setOpenMetal(!openMetal) }>
        <ListItemText primary = 'Metal' />
        {openMetal ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in = { openMetal } timeout = 'auto' unmountOnExit>
        <List component = 'div' disablePadding>
          { metalJSX }
        </List>
      </Collapse>
      <ListItem button onClick = { () => setOpenAcrylic(!openAcrylic) }>
        <ListItemText primary = 'Acrylic Metal' />
        {openAcrylic ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in = { openAcrylic } timeout = 'auto' unmountOnExit>
        <List component = 'div' disablePadding>
          { acrylicJSX }
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