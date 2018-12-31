import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion._id}
      selected={isHighlighted}
      component="div"
    >
      {suggestion.nome}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ nome: PropTypes.string }).isRequired,
};

function getSuggestions(suggestions, inputValue) {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.nome.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 3;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

function handleSelected(handleSuggestionSelected, suggestion) {
  handleSuggestionSelected(suggestion)
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

function ClienteDownshift(props) {
  const { classes, suggestions, handleSuggestionSelected } = props;

  return (
    <div className={classes.root}>
      <Downshift
        itemToString={item => (item ? item.nome : '')}
        onChange={selectedItem => handleSelected(handleSuggestionSelected, selectedItem)}>
        {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: 'Cliente',
                id: 'downshift',
              }),
            })}
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(suggestions, inputValue).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion }),
                    highlightedIndex,
                    selectedItem,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    </div>
  );
}

ClienteDownshift.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClienteDownshift);
