import React from 'react';
import {connect} from 'react-redux'

const DumbContentDisplayBlock = ({content}) => {
  return (
    <span>
      {content.data}
    </span>
  );
};

export const ContentDisplayBlock = connect(
  (state, ownProps) => ({content: state.entities.content[ownProps.contentId]} )
)(DumbContentDisplayBlock);