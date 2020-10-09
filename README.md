# Disasters

Welcome to the Disaster web app. This currently shows earthquakes around the world, filtered by date and magnitude, 
with relevant data. Will improve to show more types of disasters


### Steps to run in development
`1) Clone this repository`\
`2) npm install`\
`3) npm run start`

### Technologies
- React
- Redux
- Material UI
- USGS API
- Planet Labs API
- React Leaflet
- Github Pages
- Git / Github

### Known Issues
- Date IO must use version 1.x in order to work with Material UI Pickers
- Login dialog allows user to only download one character at a time, then loses focus.
- Redux store clears on page refresh
- Login button doesn't rerender when user is logged in
- Planet search query not setup properly