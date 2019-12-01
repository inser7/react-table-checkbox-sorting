import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData(),
      selectedPaks: []
    };
  }

  togglePakSelected = id => {
    const newPaks = [...this.state.selectedPaks];
    const index = this.state.selectedPaks.indexOf(id);
    if (index > -1) {
      newPaks.splice(index, 1);
      this.setState({ selectedPaks: newPaks });
    } else {
      newPaks.push(id);
      this.setState({ selectedPaks: newPaks });
    }
  };

  downloadSortMethod = (a, b) => {
    if (a[0].props.checkedProxy === b[0].props.checkedProxy) {
      return 0;
    }
    return a[0].props.checkedProxy ? 1 : -1;
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
           onSortedChange={(_, column) => {
            const { selectedPaks, data } = this.state;
            if (column.Header === "Download") {
              data.forEach(d => (d.checked = 0));

              selectedPaks.forEach(item => {
                const d = data.find(d => d.id === item);
                d.checked = 1;
              });

              this.setState({ data });
            }
          }}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  accessor: "lastName"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  accessor: "age"
                }
              ]
            },
            {
              Header: "Download",
              id: "Download",
              width: 105,
              accessor: d => {
                // console.log(d.id);
                return [
                  <input
                    type="checkbox"
                    key={"dl-" + d.id}
                    checked={this.state.selectedPaks.includes(d.id)}
                    disabled={
                      !this.state.selectedPaks.includes(d.id) &&
                      this.state.selectedPaks.length >= 60
                    }
                    onChange={() => this.togglePakSelected(d.id)}
                    checkedProxy={d.checked}
                  />
                ];
              },
              style: {
                justifyContent: "center"
              },
              headerStyle: {
                textAlign: "center"
              },
              sortable: true,
              sortMethod: this.downloadSortMethod
            }
          ]}
          defaultSorted={[
            {
              id: "age",
              desc: true
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
