const GeoJsonLookup = require('geojson-geometries-lookup');
const getMap = require('@geo-maps/earth-seas-1m');


export default function isSea(lat, lng) {
  const map = getMap();
  const lookup = new GeoJsonLookup(map);
  return lookup.hasContainers({type: 'Point', coordinates: [lng, lat]});
}
