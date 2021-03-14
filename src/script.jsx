import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { combineReducers } from "redux";
import { Provider, connect } from "react-redux";

import Highcharts from "highcharts";
import drilldown from "highcharts/modules/drilldown.js";
import HighchartsReact from "highcharts-react-official";

drilldown(Highcharts);

// Reducers
const init_state = {
  chart_type: "PIE",
  count_clicked1: 0,
  count_clicked2: 0,
  points1: [],
  points2: []
};

const charts_reducer = (state = init_state, action) => {
  let count_clicked1 = state.count_clicked1;
  let count_clicked2 = state.count_clicked2;

  switch (action.type) {
    case "SWITCH_CHART_1":
      count_clicked1++;
      break;
    case "SWITCH_CHART_2":
      count_clicked2++;
      break;
    default:
      break;
  }

  return {
    chart_type: action.chart_type,
    count_clicked1: count_clicked1,
    count_clicked2: count_clicked2,
    points1: [...state.points1, count_clicked1],
    points2: [...state.points2, count_clicked2]
  };
};

const chartsApp = combineReducers({
  charts_reducer
});

// Actions
const switchType = (id) => {
  let action_types = ["SWITCH_CHART_1", "SWITCH_CHART_2"];
  let chart_types = ["PIE", "LINE"];

  return {
    chart_type: chart_types[id],
    type: action_types[id]
  };
};

// Buttons
let SwitchType = ({ dispatch }) => {
  return (
    <div>
      <button
        onClick={() => {
          dispatch(switchType(0));
        }}
      >
        Switch to Pie
      </button>
      <button
        onClick={() => {
          dispatch(switchType(1));
        }}
      >
        Switch to Line
      </button>
    </div>
  );
};
SwitchType = connect()(SwitchType);

// Charts
let Charts = (points) => {
  if (points.chart_type === "PIE") {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: "pie"
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>: {point.percentage:.1f} %"
              }
            }
          },
          title: {
            text: "Buttons clicks"
          },
          series: [
            {
              data: [
                {
                  name: "Left",
                  y: points.count_clicked1
                },
                {
                  name: "Right",
                  y: points.count_clicked2
                }
              ]
            }
          ]
        }}
      />
    );
  } else {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: "line"
          },
          title: {
            text: "Buttons clicks"
          },
          series: [
            {
              name: "Left",
              data: points.points1
            },
            {
              name: "Right",
              data: points.points2
            }
          ]
        }}
      />
    );
  }
};
const mapStateToProps = (state) => {
  return {
    chart_type: state.charts_reducer.chart_type,
    count_clicked1: state.charts_reducer.count_clicked1,
    count_clicked2: state.charts_reducer.count_clicked2,
    points1: state.charts_reducer.points1,
    points2: state.charts_reducer.points2
  };
};
Charts = connect(mapStateToProps)(Charts);

const ChartsApp = () => (
  <div>
    <Charts />
    <SwitchType />
  </div>
);

ReactDOM.render(
  <Provider store={createStore(chartsApp)}>
    <ChartsApp />
  </Provider>,
  document.getElementById("root")
);
