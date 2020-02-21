export function searchBody( geoConfig, dateRange ) {
  let body = {
    "filter": {
      "type": "AndFilter",
      "config": [
        {
          "type": "GeometryFilter",
          "field_name": "geometry",
          "config": geoConfig
        },
        {
          "type": "OrFilter",
          "config": [
            {
              "type": "AndFilter",
              "config": [
                {
                  "type": "StringInFilter",
                  "field_name": "item_type",
                  "config": [
                    "PSScene4Band"
                  ]
                },
                {
                  "type": "RangeFilter",
                  "field_name": "sun_elevation",
                  "config": {
                    "gte": 0,
                    "lte": 90
                  }
                }
              ]
            },
            {
              "type": "AndFilter",
              "config": [
                {
                  "type": "StringInFilter",
                  "field_name": "item_type",
                  "config": [
                    "REOrthoTile"
                  ]
                },
                {
                  "type": "RangeFilter",
                  "field_name": "sun_elevation",
                  "config": {
                    "gte": 0,
                    "lte": 90
                  }
                }
              ]
            },
            {
              "type": "AndFilter",
              "config": [
                {
                  "type": "StringInFilter",
                  "field_name": "item_type",
                  "config": [
                    "SkySatCollect"
                  ]
                },
                {
                  "type": "RangeFilter",
                  "field_name": "sun_elevation",
                  "config": {
                    "gte": 0,
                    "lte": 90
                  }
                }
              ]
            }
          ]
        },
        {
          "type": "OrFilter",
          "config": [
            {
              "type": "DateRangeFilter",
              "field_name": "acquired",
              "config": {
                "gte": dateRange[0],
                "lte": dateRange[1]
              }
            }
          ]
        }
      ]
    },
    "item_types": [
      "REOrthoTile",
      "PSScene4Band",
      "SkySatCollect"
    ]
  };
  return body
}