import React from 'react';
import {connect} from 'react-redux'

const DumbContentDisplayBlock = ({block}) => {
  return (
    <div dangerouslySetInnerHTML={{__html: block.preview}} />
  )
};

export const ContentDisplayBlock = connect(
  (state, ownProps) => ({block: state.entities.content.blocks[ownProps.blockId]} )
)(DumbContentDisplayBlock);