import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';

const { auth, items, filter } = require( '@planet/client/api' );

export default class Test extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      item_id: undefined,
      item_url: undefined,
      fema: undefined
    };
    this.key = process.env.REACT_APP_API_KEY
    this.search4Band();
    this.getUSGS();
  }
  
  useKey() {
    const key = process.env.REACT_APP_API_KEY
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
    }
    const options = {
      types: ['PSScene4Band'],
      filter: filter.geometry( 'geometry', geo ),
      limit: 10
    }
    this.useKey()
    items.search( options ).then( response => {
      console.log( response )
      const tileThumb = `${response[0]._links.thumbnail}?api_key=${this.key}`;
      this.setState( {
        item_id: response[0].id,
        item_url: tileThumb
      } );
    } );
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
    }).then( res => console.log(res))
  }
  
  render() {
    return (
      <Paper>
        <Typography>{this.state.item_id}</Typography>
        <img src={this.state.item_url} alt=""/>
        {/*<Typography>{this.state.fema}</Typography>*/}
      </Paper>
    )
  }
}