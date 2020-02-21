import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { searchBody } from '../actions/search';

const { auth, items, filter } = require( '@planet/client/api' );

export default class Earthquake extends Component {
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
    this.useKey();
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
    let time = this.state.earthquake.time;
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
    const date = time[2];
    const year = time[3];
    const dateRange = [`${year}-${month}-${date - 2}T00:00:00.000Z`, `${year}-${month}-${date + 2}T23:59:59.999Z`];
    // url does not work without item types and ids
    // console.log(`https://www.planet.com/explorer/#/center/${this.state.earthquake.point[0]},${this.state.earthquake.point[0]}/dates/${year}-${month}-${date - 2}T00:00:00.000Z..${year}-${month}-${date + 2}T23:59:59.999Z/geometry/POLYGON((${this.state.earthquake.bbox[0][0]}+${this.state.earthquake.bbox[0][1]},${this.state.earthquake.bbox[1][0]}+${this.state.earthquake.bbox[1][1]},${this.state.earthquake.bbox[2][0]}+${this.state.earthquake.bbox[2][1]},${this.state.earthquake.bbox[3][0]}+${this.state.earthquake.bbox[3][1]},${this.state.earthquake.bbox[0][0]}+${this.state.earthquake.bbox[0][1]}))` )
    return dateRange
  }

  pointToBBOX( lon, lat ) {
    return [
      [lon - 0.2, lat + 0.2],
      [lon + 0.2, lat + 0.2],
      [lon - 0.2, lat - 0.2],
      [lon + 0.2, lat - 0.2]
    ];
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
      console.log( res )
      const quakes = res.features;
      let earthquakes = [];
      for ( let i = 0; i < quakes.length; i++ ) {
        let earthquake = {
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
        console.log( this.state )
        // this.getExplorerSites();
      } );
    } )
  }
  
  getExplorerSites() {
    // constructing search body
    const geoConfig = {
      "type": "Polygon",
      "coordinates": this.pointToBBOX( this.state.point[0], this.state.point[1] )
    };
    const dateRange = this.getDate();
    const { search_filter, item_types } = searchBody( geoConfig, dateRange );
    console.log( search_filter, item_types )
    this.useKey();
    items.search( { 'filter': search_filter, 'types': item_types, 'limit': 5 } );
    // fetch( `https://api.planet.com/data/v1/quick-search?_sort=acquired%20desc&_page_size=5`, {
    //   method: 'POST',
    //   mode: 'cors',
    //   cache: 'no-cache',
    //   // credentials: 'same-origin',
    //   headers: {
    //     'Access-Control-Allow-Headers': 'Accept',
    //     'Access-Control-Allow-Credentials': true,
    //     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    //     'x-api-key': this.getKey(),
    //     'Content-Type': 'application/json'
    //   },
    //   redirect: 'follow',
    //   referrerPolicy: 'no-referrer',
    //   body: {'filter': search_filter, 'types': item_types}
    // } )
  }
  
  render() {
    return (
      <Paper>
        <Typography>{this.state.item_id}</Typography>
        <img src={this.state.item_url} alt=""/>
      </Paper>
    )
  }
}