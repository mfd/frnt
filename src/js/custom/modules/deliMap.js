'use strict';

var mapNode = document.getElementById('deliveryMap');
var custAddr = $('.delivery-customer .orgAddr').text();
var contAddr = $('.delivery-contractor .orgAddr').text();

var myMap;
var init = {
  map: function map() {
    myMap = new ymaps.Map(mapNode, {
      center: [54.734773, 55.957829],
      zoom: 7,
      maxAnimationZoomDifference: 1,
      behaviors: ['drag', 'dblClickZoom'], //'scrollZoom'
      controls: ['fullscreenControl']
    });
    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: 'small',
        float: 'none',
        position: {
          bottom: 145,
          right: 10
        }
      }
    });

    // ymaps.route([custAddr, contAddr], {
    //   mapStateAutoApply: true,
    //   multiRoute: true
    // }).then(function (route) {

    //   route.options.set({
    //     mapStateAutoApply: true
    //   });
    //   // добавляем маршрут на карту
    //   myMap.geoObjects.add(route);

    //   // var points = route.getWayPoints();
    //   var length = route.getHumanLength();
    //   $("#deliveryMap > .length").html(length);
    //   // console.log(route.getHumanLength());

    // });

    var balloonLayout = ymaps.templateLayoutFactory.createClass("<div>", {
      build: function () {
      this.constructor.superclass.build.call(this);
      }
    });

    // Создадим мультимаршрут и добавим его на карту.
    var multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [custAddr, contAddr],
      }, {
        editorDrawOver: false,
        wayPointDraggable: true,
        viaPointDraggable: true,
        // Задаем собственное оформление линий мультимаршрута.
        routeStrokeColor: "000088",
        routeActiveStrokeColor: "ff0000",
        pinIconFillColor: "ff0000",
        boundsAutoApply: true,
        zoomMargin: 100,
        balloonLayout: balloonLayout
      });

    myMap.controls.add(zoomControl);

    myMap.geoObjects.add(multiRoute);
    $('#deliveryMap').addClass('isLoaded');

    // Подпишемся на событие обновления маршрута.
    // При возникновении события подписка удалится.
    multiRoute.events.once('update', function () {
      // Установим первый маршрут, у которого нет перекрытых
      // участков, в качестве активного. Откроем его балун.
      var routes = multiRoute.getRoutes();
      for (var i = 0, l = routes.getLength(); i < l; i++) {
        var route = routes.get(i);
        if (!route.properties.get('blocked')) {
          multiRoute.setActiveRoute(route);
          route.balloon.open();
          break;
        }
      }

      for (var i = 0, l = routes.getLength(); i < l; i++) {
        var route = routes.get(i);
        console.log(route.properties.get('distance'));
      }

    });

    multiRoute.events.add('click', function (e) {
      var routes = multiRoute.getRoutes();
      var active = multiRoute.getActiveRoute();
      //console.log(multiRoute.getRoutes().get(0).properties.get('distance'));
      console.log(multiRoute.getActiveRoute().properties.get('distance'));
    });



  }
};
ymaps.ready(init.map);