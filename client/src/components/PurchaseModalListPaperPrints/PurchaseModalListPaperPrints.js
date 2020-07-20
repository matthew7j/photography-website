import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Collapse, List, ListItem, ListItemText, styled } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import classes from './PurchaseModalListPaperPrints.module.css';
import circularJson from 'circular-json';

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

const PurchaseModalListPaperPrints = props => {
  const [openStandard, setOpenStandard] = useState(false);
  const [openOther, setOpenOther] = useState(false);
  const [openSquare, setOpenSquare] = useState(false);

  const importAll = r => {
    return r.keys().map(r);
  }
  const printOptions = importAll(require.context('../../../../images', false, /\.(json)$/))[1].paperPrints;

  const standardPrintOptions = printOptions['Standard Sizes'];
  const standardJSX = standardPrintOptions.map(option => {
    return (
      <StyledListItem button key = { option.type } className = { classes.nested } onClick = { () => props.clicked(option.type, option.price) }>
        <StyledListItemText disableTypography className = { classes.nested } primary = { option.type } />
      </StyledListItem>
    )
  });

  const otherPrintOptions = printOptions['Other Sizes'];
  const otherJSX = otherPrintOptions.map(option => {
    return (
      <StyledListItem button key = { option.type } className = { classes.nested } onClick = { () => props.clicked(option.type, option.price) }>
        <StyledListItemText disableTypography className = { classes.nested } primary = { option.type } />
      </StyledListItem>
    )
  });

  const squarePrintOptions = printOptions['Square Sizes'];
  const squareJSX = squarePrintOptions.map(option => {
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
      <ListItem button onClick = { () => setOpenStandard(!openStandard) }>
        <ListItemText primary = 'Standard Sizes' />
        {openStandard ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in = { openStandard } timeout = 'auto' unmountOnExit>
        <List component = 'div' disablePadding>
          { standardJSX }
        </List>
      </Collapse>
      <ListItem button onClick = { () => setOpenOther(!openOther) }>
        <ListItemText primary = 'Other Sizes' />
        {openOther ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in = { openOther } timeout = 'auto' unmountOnExit>
        <List component = 'div' disablePadding>
          { otherJSX }
        </List>
      </Collapse>
      <ListItem button onClick = { () => setOpenSquare(!openSquare) }>
        <ListItemText primary = 'Square Sizes' />
        {openSquare ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in = { openSquare } timeout = 'auto' unmountOnExit>
        <List component = 'div' disablePadding>
          { squareJSX }
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

export default connect(mapStateToProps, null)(PurchaseModalListPaperPrints);