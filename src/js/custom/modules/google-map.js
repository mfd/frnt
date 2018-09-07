//import 'whatwg-fetch'

const mapNode = document.getElementById('deliveryMap')

// const getScriptTag = (key) => {
//   let tag = document.createElement('script')
//   tag.setAttribute('async', '')
//   tag.setAttribute('defer', '')
//   tag.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`)
//   return tag
// }

// if (mapNode) {
//   fetch('/map-config.json')
//     .then(response => response.json())
//     .then(config => {
//       let { key, options, marker: position } = config;
//       const init = {
//         map: () => new google.maps.Map(mapNode, options),
//         marker: (map) => new google.maps.Marker({
//           position,
//           map,
//           //icon: 'https://raw.githubusercontent.com/udyux/llb-cpa-2017/1b8c570a/assets/media/logo/llb-map.png'
//         })
//       }

//       window.initMap = () => {
//         init.marker(init.map())
//       }

//       document.body.appendChild(getScriptTag(key))


//     })
//     .catch(function(ex) {
//       console.log('parsing failed', ex)
//     })
// }
//
//
const getScriptTag = (key) => {
  let tag = document.createElement('script')
  tag.setAttribute('async', '')
  tag.setAttribute('defer', '')
  tag.setAttribute('src', `https://api-maps.yandex.ru/2.1/?lang=ru_RU`)
  return tag
}

if (mapNode) {
  fetch('/map-config.json')
    .then(response => response.json())
    .then(config => {
      let { key, options, marker: position } = config;
      // const init = {
      //   map: () => new google.maps.Map(mapNode, options),
      //   marker: (map) => new google.maps.Marker({
      //     position,
      //     map,
      //     //icon: 'https://raw.githubusercontent.com/udyux/llb-cpa-2017/1b8c570a/assets/media/logo/llb-map.png'
      //   })
      // }

      const init = {
        map: () => new ymaps.Map(mapNode, {
              center: position,
              //bounds: c,
              maxAnimationZoomDifference: 1,
              behaviors: ["drag", "dblClickZoom"],
              controls: ["zoomControl", "typeSelector", "fullscreenControl"]
          })
        // marker: (map) => new google.maps.Marker({
        //   position,
        //   map,
        //   //icon: 'https://raw.githubusercontent.com/udyux/llb-cpa-2017/1b8c570a/assets/media/logo/llb-map.png'
        // })
      }



      let waitYaMap = window.setInterval(() => {
        if (window.ymaps) {
          window.clearInterval(waitYaMap);

          window.ymaps.ready = () => {
            init.marker(init.map())
          }

        }
      }, 300);


      // window.initMap = () => {
      //   init.marker(init.map())
      // }

      document.body.appendChild(getScriptTag(key))


    })
    .catch(function(ex) {
      console.log('parsing failed', ex)
    })
}