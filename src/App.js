import React, {Component} from 'react';
import './App.css';
import {fromJS, getIn, setIn, Map} from "immutable";
import {generateUUID} from "./utils";
import {handleAction} from "./reducers";
import {addColumn} from "./actions"


var originalData = {
  id: generateUUID(),
  colSpan: 12,
  rows: [

    // First row
    {
      id: 2,
      columns: [
        {
          // A single column
          id: generateUUID(),
          colSpan: 6,
          rows: [],
          content: "First Column"
        },

        {
          // A single column
          id: generateUUID(),
          colSpan: 6,
          rows: [],
          content: "Second Column"
        }

      ]
    },

    // Second row
    {
      id: generateUUID(),
      columns: [
        {
          // A single column
          id: generateUUID(),
          colSpan: 6,
          rows: [],
          content: "Another Column"
        },

        {
          // A single column
          id: generateUUID(),
          colSpan: 6,
          rows: [],
          content: "and another Column"
        }

      ]
    }
  ]
};

//
var originalState = {
  entities: {
    rows: {
      byId: {
        "row1" : {
          id: "row1",
          columns: ["column1", "column2"]
        },
        "row2" : {
          id: "row2",
          columns: ["column3", "column4"]
        }
      },
      allIds : ["row1", "row2"]
    },
    columns: {
      byId: {
        "column1" : {
          id: "column1",
          colSpan: 6,
          content: "First Column"
        },
        "column2" : {
          id: "column2",
          colspan: 6,
          content: "Second Column"
        },
        "column3" : {
          id: "column3",
          colSpan: 4,
          content: "Third Column"
        },
        "column4" : {
          id: "column4",
          colSpan: 8,
          content: "Fourth Column"
        }
      },
      allIds: ["column1", "column2", "column3", "column4"]
    }
  }
};









// Run a simple test to check I'm sane
const result =  handleAction( originalState, addColumn(null,null,));
console.log(result);



// what is the likely structure of a row
// row {
// id:
// columns
//}

// what is the likely structure of a column
// col {
// id:
// col-span:
// parent: points to a parent row
// rows: if rows then show rows
// content: if content then shows content type
//}

// What can be reused:
// A whole row
// Or the contents of a column

// What does content look like
// ultimately: a renderable content block =>
// but usually with metadata


// Row expects a row passed in
class Row extends React.Component {

  renderColumns() {
    const row = this.props.row;
    return row.columns.map(
      col => {
        return (
          <Column key={col.id} column={col}/>
        );
      });
  }

  render() {
    return (
      <div className="row">
        {this.renderColumns()}
      </div>
    )
  }
}


class NewRow extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12 font-sans text-center border-2 border-solid border-black">
          <div className="p-2">
            <i className="far fa-plus-square mr-2"></i>
            Add New Row
          </div>
        </div>
      </div>
    )
  }
}


// Column expects the following props:
// column
// isContainer
class Column extends React.Component {

  static renderRows(column) {
    if (column.rows == null || column.rows.length == 0) {
      return (
        <span>{column.content}</span>
      );

    } else {
      return column.rows.map(
        row => {
          return (
            <Row key={row.id} id={row.id} row={row}/>
          );
        });
    }
  }

  static colClasses() {
    return "border-2 border-solid border-black p-2"
  }

  render() {
    const column = this.props.column;
    const classNames = Column.colClasses() + " col-md-" + column.colSpan;
    return (
      <div className={classNames}>
        {Column.renderRows(column)}
      </div>
    )
  }
}

class Grid extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      root: {
        id: generateUUID(),
        colSpan: 12,
        rows: [

          // First row
          {
            id: 2,
            columns: [
              {
                // A single column
                id: generateUUID(),
                colSpan: 6,
                rows: [],
                content: "First Column"
              },

              {
                // A single column
                id: generateUUID(),
                colSpan: 6,
                rows: [],
                content: "Second Column"
              }

            ]
          },

          // Second row
          {
            id: generateUUID(),
            columns: [
              {
                // A single column
                id: generateUUID(),
                colSpan: 6,
                rows: [],
                content: "Another Column"
              },

              {
                // A single column
                id: generateUUID(),
                colSpan: 6,
                rows: [],
                content: "and another Column"
              }

            ]
          }

        ]
      }
    }
  }


  renderRoot() {
    return Column.renderRows(this.state.root);
  }

  render() {
    return (
      <div>
        <NewRow/>
        {this.renderRoot()}
        <NewRow/>
      </div>
    );
  }
}


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square"
              onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }

}

class Board extends React.Component {


  constructor(props, context) {
    super(props, context);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    return (
      <div>
        <div className="status">
          {status}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });


  }
}

class Game extends React.Component {
  render() {
    return (
      <div>
        <Grid/>
      </div>
    )
  }
}

export default Game;
