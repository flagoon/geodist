$('document').ready(function () {

  $('#button').on('click', function () {
    countDistance(arr);
    paintCities(arr);
  });

  function paintCities(thisArr) {
    var helpArr = ['one', 'two', 'three', 'four', 'five'];
    for (var i = 0; i < thisArr.length; i++) {
      if (typeof thisArr[i][0] === 'string') {
        var posX = (((thisArr[i][2] * 100) - 1392) * 0.46);
        var posY = (((thisArr[i][1] * 100) - 5497) * (-0.74));
        var styleDot = {
          top: posY + 'px',
          left: posX + 'px'
        };
        var stylePet = {
          top: posY + 'px',
          left: parseFloat(posX + 5) + 'px'
        };
        var dot = $('#dot-' + helpArr[i]);
        var pet = $('#p-' + helpArr[i]);
        dot.css(styleDot);
        pet.css(stylePet);
        pet.text(thisArr[i][0]);
        dot.removeClass('hide-dot');
        pet.removeClass('hide-dot');
      } else {
        break;
      }
    }
    console.log(thisArr);
  }

  function listCities(arr) {
    var arrow = ' => ',
        cityList = '';
    for (var i = 0; i <= arr.length; i += 3) {
      if (i === arr.length - 3) {
        arrow = '';
      } if (arr[i] === undefined) {
        return cityList;
      } else {
        cityList += arr[i] + arrow;
      }

    }
  }

  function countDistance(cityArr) {
    $('#mega-box').removeClass('hide-dot');
    var latArr = [...cityArr];
    var lngArr = [...cityArr];

    latArr = sortArray(latArr, 1);
    lngArr = sortArray(lngArr, 2);

    //paintCities(latArr, lngArr);

    latArr = remadeArray(latArr);
    lngArr = remadeArray(lngArr);

    if (latArr > lngArr) {
      alert('Najkrótsza trasa prowadzi przez: ' + listCities(lngArr) + ' i wynosi: ' + showDistance(lngArr));
    } else {
      alert('Najkrótsza trasa prowadzi przez: ' + listCities(latArr) + ' i wynosi: ' + showDistance(lngArr));
    }
  }

  function sortArray(arr, by) {
    for (var i in arr) {
      arr.sort(function (a, b) {
        if (a[by] > b[by]) {
          return 1;
        } else if (a[by] < b[by]) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    return arr;
  }

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
      $('#mega-box').addClass('hide-dot');
    }
  });

  function checkCity() {
    var inputs = document.getElementsByClassName('input-content');
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value === '') {
        return false;
      }
    }
    return true;
  }

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
      if (tempArr = remadeArray(arr)) {
        document.getElementById('show-distance').value = showDistance(tempArr);
      }
    })
  }

  function remadeArray(thisArr) {
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
    while (thisArr[iterator + 3]) {

      //that was fun to write :) just one mistake.
      var result = Math.sqrt(Math.pow((thisArr[iterator + 4]-thisArr[iterator + 1]),2) + Math.pow((thisArr[iterator + 5]-thisArr[iterator + 2]) * Math.cos((thisArr[iterator + 1] * Math.PI)/180),2)) * 40075.704 / 360;
      distance += result;

      iterator += 3;
    }
    return (distance.toFixed(2) + 'km');
  }

});
