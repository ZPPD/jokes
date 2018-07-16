document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
  const number = document.querySelector('input[type="number"]').value;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);
      //  console.log(response);

      let output = '';

      if (response.type === 'success') {
        //when API returns object with value of array, to use forEach we need to get the value first
        //response.value.forEach(function(joke){
        //  output += `<li>${joke.joke}</li>`;
        //});

        //in my case API returns object with value of object, so I use a method Object.keys to return an array, so i can loop through
        var obj = response.value;
        var arr = Object.keys(obj).map(key => obj[key]);
        console.log(arr);
        arr.forEach(function(joke) {
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output += '<li>Something went wrong</li>';
      }

      document.querySelector('.jokes').innerHTML = output;
    }
  }

  xhr.send();

  e.preventDefault();
}
