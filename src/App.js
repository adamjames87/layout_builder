import React from 'react';
import './App.css';
import Grid from "./Grid";
import {ModalLauncher} from "./modal/ModalLauncher";
import {ModalRoot} from "./modal/ModalRoot";
import {showModal} from "./actions";


class GridContainer extends React.Component {
  render() {
    return (
      <div>
          <button className="btn btn-secondary">
              <ModalLauncher title="Launch Modal"
                             modalAction={showModal({modalType: 'ALERT',
                                 modalProps: {title: "This is title", message: "This is the content"}})}/>
          </button>
          <ModalRoot />
        <Grid/>
      </div>
    )
  }
}

export default GridContainer;
