import React from 'react';
import './App.css';
import Grid from "./Grid";
import {ModalRoot} from "./modal/ModalRoot";
import {AddContentTypeForm} from "./modal/AddContentTypeModal";


class GridContainer extends React.Component {
  render() {
    return (
      <div>
        <AddContentTypeForm contentTypes ={["button block"]}/>
          <ModalRoot />
        <Grid/>
      </div>
    )
  }
}

export default GridContainer;
