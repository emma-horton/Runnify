mapboxgl.accessToken = "pk.eyJ1IjoicGhpbGtvbGxpbmciLCJhIjoiY2x0dmo0ZjNsMW41NTJpbzNoc2UxbHl3OCJ9.gEa1CLRvnfd_uL5Ttzgm9g"

// add a layer with the route and markers to the map 
const plotMap = (map, geojson, coordinatesArray) => {
	// console.log(coordinatesArray)
	for (let i = 0; i < coordinatesArray.length; i++) {
		const coordinate = coordinatesArray[i]
		let markerCoordinate = [coordinate[1], coordinate[0]]

		const marker = new mapboxgl.Marker()
			.setLngLat(coordinate)
			.addTo(map);
		const popup = new mapboxgl.Popup().setText(`Coordinate: ${markerCoordinate}`);
		marker.setPopup(popup);
		if (i > 0) {
			marker.getElement().id = 'waypoint';
		}
		else{
			marker.getElement().id = "startpoint"
		}
	}

	if (map.getSource('route')) {
		map.getSource('route').setData(geojson);
	} else {
		map.addLayer({
			id: 'route',
			type: 'line',
			source: {
				type: 'geojson',
				data: geojson
			},
			layout: {
				'line-join': 'round',
				'line-cap': 'round'
			},
			paint: {
				'line-color': '#3887be',
				'line-width': 5,
				'line-opacity': 0.75
			}
		});
	}
}