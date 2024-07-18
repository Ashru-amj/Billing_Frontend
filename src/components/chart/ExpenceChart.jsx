import React from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import { connect, useSelector } from "react-redux";
import { dataFetch, dateToSeconds, getHalfYearDate } from "../../utils";
import NoDataAvailable from "../../assets/image.png";

class ExpenceChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: this.props.expence,
        },
      ],
      options: {
        chart: {
          id: "area-datetime",
          type: "area",
          height: 350,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        annotations: {
          yaxis: [
            {
              y: 30,
              borderColor: "#999",
              label: {
                show: true,
                text: "Support",
                style: {
                  color: "#fff",
                  background: "#00E396",
                },
              },
            },
          ],
          xaxis: [
            {
              x: new Date("01 Jan 2024").getTime(),
              borderColor: "#999",
              yAxisIndex: 0,
              label: {
                show: true,
                text: "Rally",
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
              },
            },
          ],
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        xaxis: {
          type: "datetime",
          min: new Date("01 Jan 2024").getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      },

      selection: "one_year",
    };
  }

  updateData(timeline) {
    this.setState({
      selection: timeline,
    });
    const currentDate = new Date();
    let previousMonth = currentDate.getMonth();
    let previousYear = currentDate.getFullYear();

    switch (timeline) {
      case "one_month":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("02 May 2024").getTime(),

          new Date(currentDate).getTime()
        );
        break;
      case "six_months":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2024").getTime(),
          new Date(currentDate).getTime()
        );
        break;
      case "one_year":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date(
            currentDate.getFullYear() - 1,
            currentDate.getMonth(),
            currentDate.getDate()
          ).getTime(),

          // new Date("27 Feb 2012").getTime(),
          // new Date("27 Feb 2013").getTime(),
          new Date(currentDate).getTime()
          // new Date("27 Feb 2012").getTime(),
          // new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(), ).getTime()
        );
        break;
      case "ytd":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date(currentDate.getFullYear(), 0, 1).getTime(),

          new Date(currentDate).getTime()
        );
        break;
      case "all":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2024").getTime(),
          new Date(currentDate).getTime()
        );
        break;
      default:
    }
  }

  render() {
    return (
      <div className="w-full ">
        {this.state.series[0] ? (
          <div className="w-full">
            <div id="chart">
              <div className="toolbar flex justify-center items-center gap-10">
                <button
                  id="one_month"
                  onClick={() => this.updateData("one_month")}
                  className={
                    this.state.selection === "one_month" ? "active" : ""
                  }
                >
                  1M
                </button>

                <button
                  id="six_months"
                  onClick={() => this.updateData("six_months")}
                  className={
                    this.state.selection === "six_months" ? "active" : ""
                  }
                >
                  6M
                </button>

                <button
                  id="one_year"
                  onClick={() => this.updateData("one_year")}
                  className={
                    this.state.selection === "one_year" ? "active" : ""
                  }
                >
                  1Y
                </button>

                <button
                  id="ytd"
                  onClick={() => this.updateData("ytd")}
                  className={this.state.selection === "ytd" ? "active" : ""}
                >
                  YTD
                </button>

                <button
                  id="all"
                  onClick={() => this.updateData("all")}
                  className={this.state.selection === "all" ? "active" : ""}
                >
                  ALL
                </button>
              </div>

              <div id="chart-timeline">
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.series}
                  type="area"
                  height={350}
                />
              </div>
            </div>
            <div id="html-dist"></div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center py-20">
            <img src={NoDataAvailable} alt="No Data Avilavble to show" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const expence = dataFetch(useSelector((state) => state.expence.expence));
  console.log(expence)

  return {
    expence: expence,
  };
};

export default connect(mapStateToProps)(ExpenceChart);
