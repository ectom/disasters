import React, {Component} from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';

export default class Minimap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [props.long, props.lat],
      zoom: props.zoom
    };
  }
  
  iconDot = new L.Icon({
    iconUrl: require('./redmarker.svg'),
    iconRetinaUrl: require('./redmarker.svg'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(25, 25),
    className: 'dummy',
  });

  render() {
    return (
      <React.Fragment>
      <Map
        style={{width: '130px', height:'130px'}}
        center={this.state.position}
        zoom={this.state.zoom}
        doubleClickZoom={false}
        closePopupOnClick={false}
        dragging={true}
        zoomSnap={false}
        zoomDelta={false}
        zoomControl={false}
        trackResize={false}
        touchZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}>
        <TileLayer
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          // attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <Marker icon={this.iconDot} position={this.state.position}/>
      </Map>
      </React.Fragment>
    );
  }
}
