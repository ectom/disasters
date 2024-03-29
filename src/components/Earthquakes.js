import React, { Component } from "react";
import {
  Paper,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { searchBody } from "../actions/search";
import Minimap from "./Minimap/Minimap";
import isSea from "../actions/isSea";
import { store } from "../store";

const { auth, items, filter } = require("@planet/client/api");

export default class Earthquakes extends Component {
  constructor(props) {
    super(props);
    this.d = new Date();

    this.state = {
      item_id: undefined,
      item_url: undefined,
      earthquakes: [],
      dateFrom: new Date(
        `${this.d.getFullYear()}-${this.twoDigits(
          this.d.getMonth() + 1
        )}-${this.twoDigits(this.d.getDate() - 1)}T${this.twoDigits(
          this.d.getHours()
        )}:${this.twoDigits(this.d.getMinutes())}:${this.twoDigits(
          this.d.getSeconds()
        )}`
      ),
      dateTo: new Date(
        `${this.d.getFullYear()}-${this.twoDigits(
          this.d.getMonth() + 1
        )}-${this.twoDigits(this.d.getDate())}T${this.twoDigits(
          this.d.getHours()
        )}:${this.twoDigits(this.d.getMinutes())}:${this.twoDigits(
          this.d.getSeconds()
        )}`
      ),
      magnitude: 5,
    };
    this.key = process.env.REACT_APP_API_KEY;
    this.getUSGS();
  }

  twoDigits(func) {
    return (func < 10 ? "0" : "") + func;
  }

  getDate() {
    let time = this.state.earthquakes[0].time;
    time = time.split(" ");
    let month;
    switch (time[1]) {
      case "Jan":
        month = "01";
        break;
      case "Feb":
        month = "02";
        break;
      case "Mar":
        month = "03";
        break;
      case "Apr":
        month = "04";
        break;
      case "May":
        month = "05";
        break;
      case "Jun":
        month = "06";
        break;
      case "Jul":
        month = "07";
        break;
      case "Aug":
        month = "08";
        break;
      case "Sept" || "Sep":
        month = "09";
        break;
      case "Oct":
        month = "10";
        break;
      case "Nov":
        month = "11";
        break;
      default:
        month = "12";
        break;
    }
    const date = parseInt(time[2]);
    const year = time[3];
    return [
      `${year}-${month}-${date - 2}T00:00:00.000Z`,
      `${year}-${month}-${date + 2}T23:59:59.999Z`,
    ];
  }

  pointToBBOX(lon, lat) {
    return [
      [
        [lon - 0.2, lat + 0.2],
        [lon + 0.2, lat + 0.2],
        [lon - 0.2, lat - 0.2],
        [lon + 0.2, lat - 0.2],
        [lon - 0.2, lat + 0.2],
      ],
    ];
  }

  getUSGS() {
    let { year, month, date } = this.getDateTwoDaysAgo();
    console.log("today", year, month, date);
    const start = `${this.state.dateFrom.getFullYear()}-${this.state.dateFrom.getMonth()}-${this.state.dateFrom.getDate()}`;
    const end = `${this.state.dateTo.getFullYear()}-${this.state.dateTo.getMonth()}-${this.state.dateTo.getDate()}`;

    fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?minmagnitude=${this.state.magnitude}&format=geojson&limit=10&starttime=${start}&endtime=${end}`,
      {
        // fetch( `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=5&limit=10`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("USGS", res);
        const quakes = res.features;
        if (quakes === []) {
        } else {
          let earthquakes = [];
          for (let i = 0; i < quakes.length; i++) {
            console.log(
              "coord",
              quakes[i].geometry.coordinates[0],
              quakes[i].geometry.coordinates[1]
            );
            let milliseconds = new Date(quakes[i].properties.time);
            let earthquake = {
              // TODO store image(s) and link to explorer
              id: i,
              time: milliseconds.toDateString(),
              magnitude: quakes[i].properties.mag,
              title: quakes[i].properties.title,
              place: quakes[i].properties.place,
              point: [
                quakes[i].geometry.coordinates[1],
                quakes[i].geometry.coordinates[0],
              ],
              bbox: this.pointToBBOX(
                quakes[i].geometry.coordinates[0],
                quakes[i].geometry.coordinates[1]
              ),
              type: quakes[i].properties.earthquake,
            };
            earthquakes.push(earthquake);
            console.log("time", earthquake.time);
          }
          this.setState({ earthquakes: earthquakes }, () => {
            console.log(this.state);
            this.getExplorerSites();
          });
        }
      });
  }

  getExplorerSites() {
    // constructing search body
    if (this.state.earthquakes.length > 0) {
      const geoConfig = {
        type: "Polygon",
        coordinates: this.pointToBBOX(
          this.state.earthquakes[0].point[0],
          this.state.earthquakes[0].point[1]
        ),
      };
      const dateRange = this.getDate();
      const { search_filter, item_types } = searchBody(geoConfig, dateRange);
    }
  }

  getDateTwoDaysAgo() {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate() - 2;
    return { year, month, date };
  }

  handleDateChange = (date) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    this.setState({ dateFrom: date, dateTo: newDate }, () => {
      this.getUSGS();
    });
  };

  handleMagnitudeChange = (event) => {
    this.setState({ magnitude: event.target.value }, () => {
      this.getUSGS();
    });
  };

  Earthquake = (quake) => {
    console.log(quake);
    const locationType = isSea(quake.point[1], quake.point[0]) ? "Sea" : "Land";
    return (
      <React.Fragment key={quake.id}>
        <Paper
          style={{
            padding: "2%",
            paddingBottom: "-2%",
            margin: "5%",
            overflow: "hidden",
            minWidth: "750px",
          }}
        >
          <Minimap
            key={`${quake.point[1]}/${quake.point[0]}`}
            lat={quake.point[1]}
            long={quake.point[0]}
            zoom={3}
          />
          <div
            style={{
              display: "inline-block",
              marginLeft: "5%",
              verticalAlign: "top",
            }}
          >
            <Typography variant={"h5"}>{quake.title}</Typography>
            <Typography variant={"body1"}>
              <strong>Magnitude:</strong> {quake.magnitude}
            </Typography>
            <Typography variant={"body1"}>
              <strong>Place:</strong> {quake.place}
            </Typography>
            <Typography variant={"body1"}>
              <strong>Time of earthquake:</strong> {quake.time}
            </Typography>
            <Typography variant={"body1"}>
              <strong>Coordinates of earthquake:</strong> {quake.point[0]}°N,{" "}
              {quake.point[1]}°E
            </Typography>
            <Typography variant={"body1"}>
              <strong>Land or Sea:</strong> {locationType}
            </Typography>
          </div>
        </Paper>
      </React.Fragment>
    );
  };

  render() {
    let earthquakes = this.state.earthquakes.map((quake) =>
      this.Earthquake(quake)
    );
    if (earthquakes.length === 0) {
      earthquakes = (
        <p style={{ textAlign: "center", marginTop: "20%" }}>No Results</p>
      );
    }

    return (
      <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div style={{ height: "64px" }} />
          <div
            style={{
              margin: "0% 5% 0% 5%",
            }}
          >
            <KeyboardDatePicker
              margin="normal"
              variant="inline"
              id="date-picker-dialog"
              label="Select a Date"
              format="MM/dd/yyyy"
              value={this.state.dateFrom}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <FormControl style={{ margin: "15px" }}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                Magnitude
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={this.state.magnitude}
                onChange={this.handleMagnitudeChange}
                displayEmpty
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7+</MenuItem>
              </Select>
              {/* <Button onClick={() => console.log('user', store.getState())}>State</Button> */}
            </FormControl>
          </div>
          {/*<Paper>*/}
          {/*  <Typography>{this.state.item_id}</Typography>*/}
          {/*  <img src={this.state.item_url} alt=""/>*/}
          {/*</Paper>*/}
          {earthquakes}
        </MuiPickersUtilsProvider>
      </>
    );
  }
}
