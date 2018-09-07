ymaps.ready(init);

function init() {
  var custAddr = $('.delivery-customer .orgAddr').text() || 'Уфа';
  var contAddr = $('.delivery-contractor .orgAddr').text() || 'Екатеринбург';
  // Стоимость за километр.
  var DELIVERY_TARIFF = 20,
  // Минимальная стоимость.
    MINIMUM_COST = 500,
    myMap = new ymaps.Map('deliveryMap', {
      center: [54.7, 56],
      zoom: 9,
      controls: ['fullscreenControl']
    }),
  // Создадим панель маршрутизации.
    routePanelControl = new ymaps.control.RoutePanel({
      options: {
        // Добавим заголовок панели.
        showHeader: true,
        title: 'Расчёт доставки'
      }
    }),
    zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: 'small',
        float: 'none',
        position: {
          bottom: 145,
          right: 10
        }
      }
    });
  // Пользователь сможет построить только автомобильный маршрут.
  routePanelControl.routePanel.options.set({
    types: {auto: true}
  });

  // Если вы хотите задать неизменяемую точку "откуда", раскомментируйте код ниже.
  routePanelControl.routePanel.state.set({
    fromEnabled: false,
    from: custAddr,
    toEnabled: false,
    to: contAddr
   });

  myMap.controls.add(routePanelControl).add(zoomControl);

  // Получим ссылку на маршрут.
  routePanelControl.routePanel.getRouteAsync().then(function (route) {

    // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
    route.model.setParams(
      {
        results: 1
      },
      true
      );

    // multiRoute.model.events.add("requestsuccess", function (event) {

    //     console.log(multiRoute.getRoutes().get(0).properties.get('distance'));

    // });
    //
    // Повесим обработчик на событие построения маршрута.
    route.model.events.add('requestsuccess', function () {

      var activeRoute = route.getActiveRoute();
      if (activeRoute) {
        // Получим протяженность маршрута.
        var length = route.getActiveRoute().properties.get("distance"),
        // Вычислим стоимость доставки.
        price = calculate(Math.round(length.value / 1000)),
        // Создадим макет содержимого балуна маршрута.
        balloonContentLayout = ymaps.templateLayoutFactory.createClass('' +
          '<span>Расстояние: '+length.text+'</span><br/>' +
          '<span style="font-weight: bold; font-style: italic; font-size: 90%;">Стоимость доставки: '+price+'рублей ('+DELIVERY_TARIFF+'₽/км)</span>'+
        '');
        // Зададим этот макет для содержимого балуна.
        route.options.set('routeBalloonContentLayout', balloonContentLayout);

        // Откроем балун.
        activeRoute.balloon.open();
        route.options.set('boundsAutoApply',true);
        route.options.set('zoomMargin', '100');
        $('#deliveryMap').addClass('isLoaded');
      }



    });

  });
  // Функция, вычисляющая стоимость доставки.
  function calculate(routeLength) {
    return Math.max(routeLength * DELIVERY_TARIFF, MINIMUM_COST);
  }
}