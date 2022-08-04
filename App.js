import Map from 'ol/Map';
import View from 'ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Draw, Modify, Snap} from 'ol/interaction';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {addCoordinateTransforms, fromLonLat, get} from 'ol/proj';
/*
const raster = new TileLayer({
  source: new OSM(),
});

const source = new VectorSource();
const vector = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: '#ffcc33',
      width: 2,
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: '#ffcc33',
      }),
    }),
  }),
});
*/
const x = 5 
var template = '<div class="bg-modal" id="popup">\
<div class="modal-content">\
  <div class="content">\
    <img class="content_img" src="belsis.jpg">\
    <h1 class="popup_h1">Parseli Kaydet</h1>\
  </div>\
  <div>\
   <p>İl</p>\
   <input type="text" value="Şehri Giriniz">\
   <P>İlçe</P>\
   <input type="text" value="İlçeyi Giriniz">\
   <p>Mahalle</p>\
   <input type="text" value="Mahalleyi Giriniz">\
   <button onclick="closePopup()" class="button_kaydet"é>Parseli kaydet</button>\
  </div>\
  </div>\
  </div>';

var raster = new ol.layer.Tile({ // TileLayer({
  source: new ol.source.OSM(),
});

var source = new ol.source.Vector({ // VectorSource({
  wrapX: false
});


var vector = new ol.layer.Vector({ // VectorLayer({
  source: source,
});



var map = new ol.Map({
  layers: [raster, vector],
  target: 'map',
  view: new ol.View({
    center: [3653513.4069509646, 4854938.676458226],
    zoom: 3,
  }),
});

map.on('click', function (e) {
  console.log(e.coordinate)

})


var typeSelect = document.getElementById('type');
let kayitEdilecekFeature 
var draw;
function addInteraction(element) {
  var value = element.value;
  if (value !== 'None') {
    draw = new ol.interaction.Draw({
      source: source,
      type: value,
      
    });

    draw.on('drawend', function (e) {
    kayitEdilecekFeature = e.feature;
    openPopup()
    })

    map.addInteraction(draw);

    
  }
  

}

var popupKaydet = document.getElementById("buttonKaydet")
popupKaydet.onclick = ()=>{
debugger
closePopup()
}; 

let popup = document.getElementById("popup");
  function openPopup() {
    popup.classList.add("open_popup"); 
  }
  function closePopup () {
    popup.classList.remove("open_popup");
  }




function handleBtnClick() {
  var element = this;
  map.removeInteraction(draw);
  addInteraction(element);
 
};
document.getElementById("Point").addEventListener('click', handleBtnClick);
document.getElementById("Polygon").addEventListener('click', handleBtnClick);
document.getElementById("LineString").addEventListener('click', handleBtnClick);
document.getElementById("None").addEventListener('click', handleBtnClick);

addInteraction(document.getElementById('None'));