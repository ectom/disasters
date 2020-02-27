import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { searchBody } from '../actions/search';

const { auth, items, filter } = require( '@planet/client/api' );

export default class Earthquakes extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      item_id: undefined,
      item_url: undefined,
      earthquakes: []
    };
    this.key = process.env.REACT_APP_API_KEY;
    this.search4Band();
    this.getUSGS();
  }
  
  useKey() {
    const key = process.env.REACT_APP_API_KEY;
    auth.setKey( key );
  }
  
  getKey() {
    return process.env.REACT_APP_API_KEY;
  }
  
  search4Band() {
    const geo = {
      "type": "Polygon",
      "coordinates": [
        [
          [-122.52811431884767, 37.665342132088284],
          [-122.34683990478516, 37.665342132088284],
          [-122.34683990478516, 37.81493737606794],
          [-122.52811431884767, 37.81493737606794],
          [-122.52811431884767, 37.665342132088284]
        ]
      ]
    };
    const options = {
      types: ['PSScene4Band'],
      filter: filter.geometry( 'geometry', geo ),
      limit: 10
    };
    // this.useKey();
    items.search( options ).then( response => {
      console.log( response );
      const tileThumb = `${response[0]._links.thumbnail}?api_key=${this.key}`;
      this.setState( {
        item_id: response[0].id,
        item_url: tileThumb
      } );
    } );
  }
  
  getDate() {
    let time = this.state.earthquakes[0].time;
    time = time.split( ' ' );
    let month;
    switch (time[1]) {
      case 'Jan':
        month = '01';
        break;
      case 'Feb':
        month = '02';
        break;
      case 'Mar':
        month = '03';
        break;
      case 'Apr':
        month = '04';
        break;
      case 'May':
        month = '05';
        break;
      case 'Jun':
        month = '06';
        break;
      case 'Jul':
        month = '07';
        break;
      case 'Aug':
        month = '08';
        break;
      case 'Sept' || 'Sep':
        month = '09';
        break;
      case 'Oct':
        month = '10';
        break;
      case 'Nov':
        month = '11';
        break;
      default:
        month = '12';
        break;
    }
    const date = parseInt(time[2]);
    const year = time[3];
    return [`${year}-${month}-${date - 2}T00:00:00.000Z`, `${year}-${month}-${date + 2}T23:59:59.999Z`];
    // TODO move this url somewhere else. url does not work without item types and ids (supposed to bring user to explorer
    //  console.log(`https://www.planet.com/explorer/#/center/${this.state.earthquake.point[0]},${this.state.earthquake.point[0]}/dates/${year}-${month}-${date - 2}T00:00:00.000Z..${year}-${month}-${date + 2}T23:59:59.999Z/geometry/POLYGON((${this.state.earthquake.bbox[0][0]}+${this.state.earthquake.bbox[0][1]},${this.state.earthquake.bbox[1][0]}+${this.state.earthquake.bbox[1][1]},${this.state.earthquake.bbox[2][0]}+${this.state.earthquake.bbox[2][1]},${this.state.earthquake.bbox[3][0]}+${this.state.earthquake.bbox[3][1]},${this.state.earthquake.bbox[0][0]}+${this.state.earthquake.bbox[0][1]}))` )
  }

  pointToBBOX( lon, lat ) {
    return [[
      [lon - 0.2, lat + 0.2],
      [lon + 0.2, lat + 0.2],
      [lon - 0.2, lat - 0.2],
      [lon + 0.2, lat - 0.2],
      [lon - 0.2, lat + 0.2]
    ]];
  }
  
  getUSGS() {
    fetch( `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=5&limit=10`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }).then((res) => {
      return res.json();
    }).then(res => {
      console.log( res );
      const quakes = res.features;
      let earthquakes = [];
      for ( let i = 0; i < quakes.length; i++ ) {
        let earthquake = {          // TODO store image(s) and link to explorer
          time: Date( quakes[i].properties.time ),
          magnitude: quakes[i].properties.mag,
          title: quakes[i].properties.title,
          place: quakes[i].properties.place,
          point: [quakes[i].geometry.coordinates[0], quakes[i].geometry.coordinates[1]],
          bbox: this.pointToBBOX( quakes[i].geometry.coordinates[0], quakes[i].geometry.coordinates[1] ),
          type: quakes[i].properties.earthquake
        };
        earthquakes.push( earthquake );
      }
      this.setState( { earthquakes: earthquakes }, () => {
        console.log( this.state );
         this.getExplorerSites();
      } );
    } )
  }
  
  getExplorerSites() {
    // constructing search body
    const geoConfig = {
      "type": "Polygon",
      "coordinates": this.pointToBBOX( this.state.earthquakes[0].point[0], this.state.earthquakes[0].point[1] )
    };
    const dateRange = this.getDate();
    const { search_filter, item_types } = searchBody( geoConfig, dateRange );
    console.log( search_filter, item_types );
    // this.useKey();
    items.search( { filter: search_filter, types: item_types} ).then( response => {
      console.log( 'hey', response );
    } );
  }
  
  Earthquake = ( quake ) => {
    // console.log( quake );
    return (
      <Paper style={{ 'margin': '5%' }}>
        <Typography variant={'h5'}>{quake.title}</Typography>
        <Typography variant={'body1'}><strong>Magnitude:</strong> {quake.magnitude}</Typography>
        <Typography variant={'body1'}><strong>Place:</strong> {quake.place}</Typography>
        <Typography variant={'body1'}><strong>Time of earthquake:</strong> {quake.time}</Typography>
        <Typography variant={'body1'}><strong>Coordinates of earthquake:</strong> {quake.point[0]}°W, {quake.point[1]}°N</Typography>
      </Paper>
    )
  };
  
  render() {
    return (
      <>
        <Paper>
          <Typography>{this.state.item_id}</Typography>
          <img src={this.state.item_url} alt=""/>
        </Paper>
        <Paper>
          {this.state.earthquakes.map( quake => this.Earthquake( quake ) )}
        </Paper>
      </>
    )
  }
}