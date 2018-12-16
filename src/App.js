import React from 'react';
import './App.css';
import Grid from "./Grid";
import {ModalRoot} from "./modal/ModalRoot";
import {BtnBlockPreview} from "./rendering/ButtonBlockPreview";


class GridContainer extends React.Component {
  render() {
    return (
      <div>
          <ModalRoot />
        <Grid/>
      </div>
    )
  }
}

export default GridContainer;
