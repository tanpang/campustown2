(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  function HomeController() {
    var vm = this;

    vm.invite = function () {

    };

    vm.friends = [
      {
        name: "박준하",
        phone: "010-3030-2811",
        invited: false
      },
      {
        name: "김지섭",
        phone: "010-4030-2811",
        invited: false
      },
      {
        name: "유오성",
        phone: "010-9030-2811",
        invited: false
      },
      {
        name: "최필준",
        phone: "010-5530-2811",
        invited: false
      },
      {
        name: "박영선",
        phone: "010-8830-2811",
        invited: false
      },
      {
        name: "박준하",
        phone: "010-3030-2811",
        invited: false
      },
      {
        name: "김지섭",
        phone: "010-4030-2811",
        invited: false
      },
      {
        name: "유오성",
        phone: "010-9030-2811",
        invited: false
      },
      {
        name: "최필준",
        phone: "010-5530-2811",
        invited: false
      },
      {
        name: "박영선",
        phone: "010-8830-2811",
        invited: false
      },
      {
        name: "박준하",
        phone: "010-3030-2811",
        invited: false
      },
      {
        name: "김지섭",
        phone: "010-4030-2811",
        invited: false
      },
      {
        name: "유오성",
        phone: "010-9030-2811",
        invited: false
      },
      {
        name: "최필준",
        phone: "010-5530-2811",
        invited: false
      },
      {
        name: "박영선",
        phone: "010-8830-2811",
        invited: false
      },
      {
        name: "박준하",
        phone: "010-3030-2811",
        invited: false
      },
      {
        name: "김지섭",
        phone: "010-4030-2811",
        invited: false
      },
      {
        name: "유오성",
        phone: "010-9030-2811",
        invited: false
      },
      {
        name: "최필준",
        phone: "010-5530-2811",
        invited: false
      },
      {
        name: "박영선",
        phone: "010-8830-2811",
        invited: false
      }
    ]

    console.log('hihi')
    var locations = [
      ['박윤태', 37.55998, 126.98582959999999, 4],
      ['안헤린', 37.5662860, 126.9926170, 5],
      ['강수진', 37.5683723, 127.00869250000005, 3],
      ['박준하', 37.5716555, 126.9862326, 2],
      ['우수근', 37.570263 , 126.97657290000006, 1]
    ];

    var arrive = [false, false, false, false, false];
    var markers = [];


    var dist_margin = []

    for(i=0; i<locations.length; i++) {
      var dist_x = locations[1][1] - locations[i][1];
      var dist_y = locations[1][2] - locations[i][2];
      dist_margin[i] = [dist_x, dist_y]
    }



    var map = new google.maps.Map(document.getElementById('map2'), {
      zoom: 14,
      center: new google.maps.LatLng(37.5662860, 126.9926170),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
      markers.push(marker);
    }

    var o_index = 1;
    var delta = 0.002;

    var refresh_markers = setInterval(function() {

      for(i = 0; i < locations.length; i++) {

        if(i==1)	continue;
        markers[i].setMap(null);

        var dist_x;
        var dist_y;

        if(arrive[i]) {
          dist_x = locations[1][1]
          dist_y = locations[1][2]
        }
        else {
          if(i==0) {
            dist_x = locations[i][1]+delta*o_index*dist_margin[i][0]
            dist_y = locations[i][2]+delta*o_index*dist_margin[i][1]
          }
          if(i==2) {
            dist_x = locations[i][1]+(delta+0.003)*o_index*dist_margin[i][0]
            dist_y = locations[i][2]+(delta+0.003)*o_index*dist_margin[i][1]
          }
          if(i==3) {
            dist_x = locations[i][1]+0.0005*o_index*dist_margin[i][0]
            dist_y = locations[i][2]+0.0005*o_index*dist_margin[i][1]
          }
          if(i==4) {
            dist_x = locations[i][1]+(delta+0.01)*o_index*dist_margin[i][0]
            dist_y = locations[i][2]+(delta+0.01)*o_index*dist_margin[i][1]
          }
        }


        if(Math.abs(dist_x -locations[1][1]) < 0.0005 && Math.abs(dist_y -locations[1][2]) < 0.0005 )
          arrive[i] = true

        marker = new google.maps.Marker({
          position: new google.maps.LatLng(dist_x, dist_y),
          map: map
        });
        markers[i] = marker
        o_index = o_index + 1;
      }
    }, 3000);

  }
}());
