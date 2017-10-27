$('document').ready(function () {
  $('input').on('keyup', function (e) {

    var valCity = document.getElementById(e.target.id).value;
    var suggestDiv = e.target.id;

    $('#suggest-' + suggestDiv).show();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        document.getElementById('suggest-' + suggestDiv).innerHTML = this.responseText;
      }
    };
    xmlhttp.open('GET', 'find_city.php?city=' + valCity + '&cont=' + suggestDiv, true);
    xmlhttp.send();
  });

  //function to add eventListeners to not existing (yet) elements
  $('body').on('click', '.span-city', function (e) {
    if (e.target.classList.contains('span-city')) {
      //decide which input should be a target
      var aim = e.target.getAttribute('aim');
      var getCity = e.target.getAttribute('value');
      document.getElementById(aim).value = getCity;
      $('#suggest-' + aim).toggle();

      addValue(aim, getCity);
    }
  });

  var arr = [[0,0], [0,0], [0,0], [0,0], [0,0]];

  function addValue(aim, city) {
    $.getJSON('cities.json', function(data) {
      var val = 0;
      switch (aim) {
        case 'one':
          val = 0;
          break;
        case 'two':
          val = 1;
          break;
        case 'three':
          val = 2;
          break;
        case 'four':
          val = 3;
          break;
        case 'five':
          val = 4;
          break;
        default:
          val = 0;
      }

      arr[val][1] = data[city].lat;
      arr[val][2] = data[city].lng;
      arr[val][0] = city;

      var tempArr;
      if (tempArr = checkDistance(arr)) {
        document.getElementById('show-distance').value = showDistance(tempArr);
      }
    })
  }

  function checkDistance(thisArr) {
    var counter = 0;
    var returnArr = [];
    $.each(thisArr, function (val, key) {
      $.each(key, function (a, b) {
        if (b !== 0) {
          returnArr.push(b);
          counter++;
        }
      });
    });
    if (counter >= 6) {
      return returnArr;
    }
    return false;
  }

  function showDistance(thisArr) {
    var distance = 0;
    var iterator = 0;
    while (thisArr[iterator+3]) {

        //that was fun to write :) just one mistake.
        var result = Math.sqrt(Math.pow((thisArr[iterator+4]-thisArr[iterator+1]),2) + Math.pow((thisArr[iterator+5]-thisArr[iterator+2]) * Math.cos((thisArr[iterator+1] * Math.PI)/180),2)) * 40075.704 / 360;
        distance += result;
      
      iterator += 3;
    }
    return (distance.toFixed(2) + 'km');
  }

});
