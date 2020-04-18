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
      <Map
        style={{width: '130px', height:'130px'}}
        center={this.state.position}
        zoom={this.state.zoom}
        doubleClickZoom={false}
        closePopupOnClick={false}
        dragging={false}
        zoomSnap={false}
        zoomDelta={false}
        trackResize={false}
        touchZoom={false}
        scrollWheelZoom={false}>
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
