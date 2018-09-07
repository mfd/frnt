'use strict';

var myMap;
var mapNode = document.getElementById('contrMap');

var init = {
  map: function map() {
    myMap = new ymaps.Map(mapNode, {
      center: [54.734773, 55.957829],
      zoom: 7,
      maxAnimationZoomDifference: 1,
      behaviors: ['drag','dblClickZoom'], //'scrollZoom'
      controls: ['zoomControl','fullscreenControl', 'geolocationControl'] //'typeSelector',
    },
    {
      maxZoom: 16,
      minZoom: 0
    });
    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: 'medium',
        //float: 'none',
        position: {
          bottom: 145,
          right: 10
        }
      }
    });

    var clusterer = new ymaps.Clusterer({
      preset: 'islands#invertedDarkBlueClusterIcons',
      groupByCoordinates: false,
      clusterDisableClickZoom: false,
      clusterHideIconOnBalloonOpen: false,
      geoObjectHideIconOnBalloonOpen: false
    });

    var geoObjects = [];
    var points = Liferay.Portlet.orgMap;

    var getPointData = function (index) {
      return {
          balloonContentHeader: '<h5 class="ymapContractor__header">' + points[index].orgName + '</h5>',
          balloonContentBody: '<div class="ymapContractor__content" style="display:flex;">'
          + '<div class="ymapContractor__addr">'
            + '<p>' + points[index].orgAddr + '</p>'
            //+ '<p style="font-size: 90%">' + points[index].orgPhones.join(',<br/> ') + '</p>'
          + '</div>'
          + '<figure class="ymapContractor__logo"><img class="img-responsive" src="' + points[index].orgLogo + '" alt=""  /></figure>'+
          '</div>',
          balloonContentFooter: '<small><a href="'+points[index].orgUrl+'" target="_blank">Перейти на страницу компании</a></small>',
          clusterCaption: '<strong style="font-size: 80%">' + points[index].orgName + '</strong>'
      }
    };
    var getPointOptions = function () {
      return {
          preset: 'islands#darkBlueIcon'
      };
    };
    var pfScrollbar = function() {
      $(".mapList-contractors").height($("#contrMap").height());
      new PerfectScrollbar(
        $(".mapList-contractors")[0], {
          wheelSpeed: 2,
          wheelPropagation: true,
          minScrollbarLength: 10,
          suppressScrollX: true,
          useBothWheelAxes: true
        });
    };
    //debugger
    pfScrollbar();

    for(var i = 0, len = points.length; i < len; i++) {
        geoObjects[i] = new ymaps.Placemark(points[i].orgCoords, getPointData(i), getPointOptions());
    }

    // clusterer.options.set({
    //     gridSize: 80,
    //     clusterDisableClickZoom: false
    // });

    $('.mapList-contractors .list-item').on('click', function() {
       var indx= $(this).index();
       //console.log(indx)
       //console.log(geoObjects[0].properties._data)
       //позиционируемся на точке, задаем максимальный масштаб = 15

        $(this).toggleClass('isActive');
        myMap.setCenter(geoObjects[indx].geometry.getBounds()[0], 15, {
          checkZoomRange: true, //контролируем доступность масштаба

        })
        //https://yandex.ru/blog/mapsapi/yandex-maps-api-setzoom-callback
        .then(function () {
            //debugger
            // Откроем балун
            var objectState = clusterer.getObjectState(geoObjects[indx]);
            if (objectState.isClustered) {
              // Если метка находится в кластере, выставим ее в качестве активного объекта.
              // Тогда она будет "выбрана" в открытом балуне кластера.
              objectState.cluster.state.set('activeObject', geoObjects[indx]);
              clusterer.balloon.open(objectState.cluster);

              myMap.setBounds(clusterer[indx].getBounds(), {
                checkZoomRange:true,
                preciseZoom:true,
                zoomMargin:100
              }).then(function(){
                  myMap.setZoom(myMap.getZoom()-1);
              });

            } else if (objectState.isShown) {
              // Если метка не попала в кластер и видна на карте, откроем ее балун.
              geoObjects[indx].balloon.open();
            }



          //alert('Callback is alive!');
        });
    });



    clusterer.createCluster = function(center, geoObjects) {
        var cluster = ymaps.Clusterer.prototype.createCluster.call(this, center, geoObjects) ;
        cluster.events.add('click', function(e){
            //console.log('Кликнут кластер') ;
            return cluster;
        }) ;
        return cluster;
    };




    clusterer.add(geoObjects);
    myMap.geoObjects.add(clusterer);



        myMap.geoObjects.add(new ymaps.GeoObject(
        {
            geometry: {
                type: "Point",
                coordinates: [
                  +document.querySelector('.current_company_latitude').value,
                  +document.querySelector('.current_company_longitude').value
                ]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Моя Компания',
                //hintContent: 'Моя Компания'
            },
            balloonContent: 'цвет <strong>фэйсбука</strong>'
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#greenStretchyIcon',
            //preset: 'islands#circleIcon',
            //iconColor: '#3caa3c'
        }));


    // clusterer.events.add('click', function (e) {
    //   // Метка, на которой сработало событие
    //   var target = e.get('target');
    //   console.log(target)
    // });

    //Спозиционируем карту так, чтобы на ней были видны все объекты.
      myMap.setBounds(clusterer.getBounds(), {
        checkZoomRange:true
      }
      ).then(function(){
        //debugger;
        myMap.setZoom(myMap.getZoom()-1);
        // if(myMap.getZoom() > 10)
        //   myMap.setZoom(10);
      });


    setTimeout(function(){
      $(mapNode).addClass('isLoaded');
    }, 1000);


  }
};


ymaps.ready(init.map);