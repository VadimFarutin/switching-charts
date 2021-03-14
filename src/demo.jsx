import React from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts";
import drilldown from "highcharts/modules/drilldown.js";
import HighchartsReact from "highcharts-react-official";

drilldown(Highcharts);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.allowChartUpdate = true;
    this.state = {};
  }
  componentDidMount() {
    const chart = this.refs.chartComponent.chart;
  }

  categoryClicked() {
    this.allowChartUpdate = false;
    this.setState({
      value: 2
    });
  }

  render() {
    return (
      <HighchartsReact
        allowChartUpdate={this.allowChartUpdate}
        ref={"chartComponent"}
        highcharts={Highcharts}
        options={{
          chart: {
            type: "column"
          },

          series: [
            {
              events: {
                click: e => {
                  this.categoryClicked(e);
                }
              },
              data: [
                {
                  name: "Chrome",
                  y: 62.74,
                  drilldown: "Chrome"
                },
                {
                  name: "Firefox",
                  y: 10.57,
                  drilldown: "Firefox"
                }
              ]
            }
          ],
          drilldown: {
            series: [
              {
                name: "Chrome",
                id: "Chrome",
                data: [["v65.0", 0.1], ["v64.0", 1.3]]
              },
              {
                name: "Firefox",
                id: "Firefox",
                data: [["v58.0", 1.02], ["v57.0", 7.36]]
              }
            ]
          }
        }}
      />
    );
  }
}

render(<App />, document.getElementById("root"));
