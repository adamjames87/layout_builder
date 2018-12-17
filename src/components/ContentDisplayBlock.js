import React from 'react';
import {connect} from 'react-redux'

const DumbContentDisplayBlock = ({block}) => {
  return (
    <div className="border-2 border-solid border-grey-lightest">
      <div dangerouslySetInnerHTML={{__html: block.preview}} />
    </div>
  )
};

export const ContentDisplayBlock = connect(
  (state, ownProps) => ({block: state.entities.content.blocks[ownProps.blockId]} )
)(DumbContentDisplayBlock);