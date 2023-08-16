// Initialize the map
function initMap() {

    // Coordinates for Nsukka, Nigeria
    const nsukka = {
        lat: 6.8652, lng: 7.3953
    }

        ;

    // Create the map centered at Nsukka
    const map = new google.maps.Map(document.getElementById("map"), {
        center: nsukka,
        zoom: 13 // Adjust the zoom level as needed
    });

    // Create a marker for Nsukka
    const marker = new google.maps.Marker({
        position: nsukka,
        map: map,
        title: "Nsukka, Nigeria"
    });
}