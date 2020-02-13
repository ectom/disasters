import React, { Component } from 'react';
import { Paper, Typography } from '@material-ui/core';
const { auth, items, filter } = require('@planet/client/api');

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: undefined
    };
    this.item = undefined;
    this.search4Band();
  }
  
  useKey(){
    const key = process.env.REACT_APP_API_KEY
    auth.setKey(key);
  }
  
  search4Band(){
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
      filter: filter.geometry('geometry', geo ),
      limit: 10
    }
    this.useKey()
    items.search( options ).then( response  => {
      console.log(response)
      this.setState({ items: response[0].id })
      this.item = response[0]
    } );
  }
  
  render() {
    return(
      <Paper>
        <Typography>{this.state.items}</Typography>
      </Paper>
    )
  }
}