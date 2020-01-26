import googlemaps

gmaps = googlemaps.Client(key='AIzaSyCpgI4jKI3vp0T96ZPo5ZnCRkCd9FlLU9s')

places_result = gmaps.places_nearby(location= '-33.8670522,151.1957362', radius = 40000, open_now = False, type = 'cafe')

print(places_result)