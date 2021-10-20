import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from "highcharts/highcharts-3d";
import cylinder from "highcharts/modules/cylinder";
import variablePie from "highcharts/modules/variable-pie";

highcharts3d(Highcharts);
cylinder(Highcharts);
variablePie(Highcharts);

class Rough extends Component {
  render() {
    const options = {
      chart: {
        type: "cylinder",
        options3d: {
          enabled: true,
          alpha: 15,
          beta: 15,
          depth: 50,
          viewDistance: 25,
        },
      },
      title: {
        text: "Highcharts Cylinder Chart",
      },
      plotOptions: {
        series: {
          depth: 25,
          colorByPoint: true,
        },
      },
      series: [
        {
          data: [
            29.9,
            71.5,
            106.4,
            129.2,
            144.0,
            176.0,
            135.6,
            148.5,
            216.4,
            194.1,
            95.6,
            54.4,
          ],
          name: "Cylinders",
          showInLegend: false,
        },
      ],
      credits: false,
    };

    const variablePieOptions = {
      credits: false,

      chart: {
        type: "variablepie",
      },
      title: {
        text: "Countries compared by population density and total area.",
      },
      tooltip: {
        headerFormat: "",
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          "Area (square km): <b>{point.y}</b><br/>" +
          "Population density (people per square km): <b>{point.z}</b><br/>",
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "20%",
          zMin: 0,
          name: "countries",
          data: [
            {
              name: "Spain",
              y: 505370,
              z: 92.9,
            },
            {
              name: "France",
              y: 551500,
              z: 118.7,
            },
            {
              name: "Poland",
              y: 312685,
              z: 124.6,
            },
            {
              name: "Czech Republic",
              y: 78867,
              z: 137.5,
            },
            {
              name: "Italy",
              y: 301340,
              z: 201.8,
            },
            {
              name: "Switzerland",
              y: 41277,
              z: 214.5,
            },
            {
              name: "Germany",
              y: 357022,
              z: 235.6,
            },
          ],
        },
      ],
    };
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <HighchartsReact highcharts={Highcharts} options={variablePieOptions} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {})(withRouter(Rough));
