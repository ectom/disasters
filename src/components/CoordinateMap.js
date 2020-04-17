import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

export default class CoordinateMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [props.long, props.lat],
      zoom: props.zoom
    };
  }
  
  render() {
    return (
      <React.Fragment>
      <Map style={{width: '50px', height:'50px'}} center={this.state.position} zoom={this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker position={this.state.position}>
          <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
      </Map>
      </React.Fragment>
    );
  }
}