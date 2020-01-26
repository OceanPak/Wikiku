import requests
API_KEY = "AIzaSyCpgI4jKI3vp0T96ZPo5ZnCRkCd9FlLU9s"

#CoordX = 41.8202681
#CoordY = -71.4289196

def findClosestLandmark(CoordX, CoordY):
    URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={}%20{}&radius=100&key={}".format(CoordX, CoordY, API_KEY)
    r = requests.get(url = URL)
    data = r.json()
    result = []
    for i in data["results"]:
        if i["types"] == ['locality', 'political']:
            continue
        else:
            result.append((i["name"],i["types"]))
    return result