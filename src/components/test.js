import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';

const { auth, items, filter } = require( '@planet/client/api' );

export default class Test extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      item_id: undefined,
      item_url: undefined,
      earthquake: {}
    };
    this.key = process.env.REACT_APP_API_KEY;
    this.search4Band();
    this.getUSGS();
  }
  
  useKey() {
    const key = process.env.REACT_APP_API_KEY;
    auth.setKey( key );
  }
  
  search4Band() {
    const geo = {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -122.52811431884767,
            37.665342132088284
          ],
          [
            -122.34683990478516,
            37.665342132088284
          ],
          [
            -122.34683990478516,
            37.81493737606794
          ],
          [
            -122.52811431884767,
            37.81493737606794
          ],
          [
            -122.52811431884767,
            37.665342132088284
          ]
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
  
  buildURL(){
    let time = this.state.earthquake.time;
    time = time.split(' ');
    let month;
    switch (time[1]){
      case 'Jan': month = '01'; break;
      case 'Feb': month = '02'; break;
      case 'Mar': month = '03'; break;
      case 'Apr': month = '04'; break;
      case 'May': month = '05'; break;
      case 'Jun': month = '06'; break;
      case 'Jul': month = '07'; break;
      case 'Aug': month = '08'; break;
      case 'Sept': month = '09'; break;
      case 'Oct': month = '10'; break;
      case 'Nov': month = '11'; break;
      default: month = '12'; break;
    }
    const date = time[2];
    const year = time[3];
    // url does not work
    console.log(`https://www.planet.com/explorer/#/center/${this.state.earthquake.point[0]},${this.state.earthquake.point[0]}/dates/${year}-${month}-${date-2}T00:00:00.000Z..${year}-${month}-${date+2}T23:59:59.999Z/geometry/POLYGON((${this.state.earthquake.bbox.topLeft[0]}+${this.state.earthquake.bbox.topLeft[1]},${this.state.earthquake.bbox.bottomLeft[0]}+${this.state.earthquake.bbox.bottomLeft[1]},${this.state.earthquake.bbox.bottomRight[0]}+${this.state.earthquake.bbox.bottomRight[0]},${this.state.earthquake.bbox.topRight[0]}+${this.state.earthquake.bbox.topRight[1]},${this.state.earthquake.bbox.topLeft[0]}+${this.state.earthquake.bbox.topLeft[1]}))`)
  }
  
  pointToBBOX(lon, lat){
    return {
      topLeft: [lon-0.2, lat+0.2],
      topRight: [lon+0.2, lat+0.2],
      bottomLeft: [lon-0.2, lat-0.2],
      bottomRight: [lon+0.2, lat-0.2]
    };
  }
  
  getUSGS(){
    fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=5&limit=10`, {
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
      let earthquake = {
        time: Date(res.features[0].properties.time),
        magnitude: res.features[0].properties.mag,
        place: res.features[0].properties.place,
        point: [res.features[0].geometry.coordinates[0], res.features[0].geometry.coordinates[1]],
        bbox: this.pointToBBOX(res.features[0].geometry.coordinates[0], res.features[0].geometry.coordinates[1]),
        type: res.features[0].properties.earthquake
      };
      this.setState({earthquake: earthquake}, () => {
        console.log(this.state.earthquake, res);
        this.buildURL()
      });
    })
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