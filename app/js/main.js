$('.main__filtration-inner').click(function () {
    $(this).next('.main__filtration-hidden').toggleClass('active');
});

$('.reset-button').click(function () {
    $(this)
        .closest('.main__filtration-hidden')
        .find('.main__filtration-hidden-list-label-hidden')
        .prop('checked', false);
});

let placemarks = [];
let geoObjects = [];


function init(){
    let map = new ymaps.Map('map', {
        center: [43.026060, 44.691290],
        zoom: 13,
        controls: ['zoomControl'],
    });
    for (let index = 0; index < placemarks.length; index++) {
        const item = placemarks[index];
        geoObjects[index] = new ymaps.Placemark([item.latitude, item.longitude], {
            balloonContentHeader: "Балун метки",
            balloonContentBody: "Содержимое <em>балуна</em> метки",
            balloonContentFooter: "Подвал",
            hintContent: "Согу",
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/map-placemark.png',
            iconImageSeize: [46, 57],
            iconImageOffset: [-23, -20],
        })
    }
    let clusterer = new ymaps.Clusterer({});
    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
    $('.main__block-button').click(function() {
        map.setZoom(16);
        map.panTo([$(this).data('latitude'), $(this).data('longitude')], {flying: 1});
    });
}

function placemarksInit() {
    geoObjects = [];
    placemarks = [];
    $('.main__block-button').each(function(index, item) {
        placemarks.push({
            latitude: $(this).data('latitude'),
            longitude: $(this).data('longitude'),
        })
    })
    init();
}

ymaps.ready(placemarksInit);