import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Collapse, List, ListItem, ListItemText, styled } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

import classes from './PurchaseModalListPaperPrints.module.css';

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
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '8 x 10 Print (Lustre)' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '8 x 10 Print (Metallic)' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '12 x 18 Print (Lustre)' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '12 x 18 Print (Metallic)' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '16 x 24 Print (Lustre)' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested } >
            <StyledListItemText disableTypography className = { classes.nested } primary = '16 x 24 Print (Metallic)' />
          </StyledListItem>
        </List>
      </Collapse>
      <ListItem button onClick = { () => setOpenOther(!openOther) }>
        <ListItemText primary = 'Other Sizes' />
        {openOther ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in = { openOther } timeout = 'auto' unmountOnExit>
        <List component = 'div' disablePadding>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '30 x 45 Print (Lustre)' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '30 x 45 Print (Metallic)' />
          </StyledListItem>
        </List>
      </Collapse>
      <ListItem button onClick = { () => setOpenSquare(!openSquare) }>
        <ListItemText primary = 'Square Sizes' />
        {openSquare ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in = { openSquare } timeout = 'auto' unmountOnExit>
        <List component = 'div' disablePadding>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '12 x 12 Print' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '24 x 24 Print (Lustre)' />
          </StyledListItem>
          <StyledListItem button className = { classes.nested }>
            <StyledListItemText disableTypography className = { classes.nested } primary = '24 x 24 Print (Metallic)' />
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

export default connect(mapStateToProps, null)(PurchaseModalListPaperPrints);