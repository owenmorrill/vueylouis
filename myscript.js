let current_env = 'https://www.morphmarket.com/traits/traits-data.json';

let env = new Vue({
  el: '#env',
  data: {
    envs: {
      'Please select one': '',
      local: 'https://inventory.local/sites',
      dev: 'https://osr-atlas01.int.colorado.edu/sites',
      test: 'https://osr-atlas02.int.colorado.edu/sites',
      prod: 'https://osr-atlas03.int.colorado.edu/sites'
    },
    selected: '',
  }
});

// VUE GET of Sites
let vm = new Vue({
  el: '#app',
  data: {
    sites: []
  },
  methods: {
    getSites: function() {
      let that = this;
      let request = new XMLHttpRequest();
      request.open('GET', current_env, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          that.sites = JSON.parse(request.responseText);
        } else {
          // We reached our target server, but it returned an error
        }
      };

      request.send();
    }
  },
  mounted () {
    this.getSites()
  }
});

function changeEnv() {
  let selectList = document.getElementById('env');
  let selected = selectList.options[selectList.selectedIndex].value;

  console.log(selected);
}

// Click to create new site.
let myEl = document.getElementById('create-site');

myEl.addEventListener('click', function() {
  let data = JSON.stringify({
    "status": "pending"
  });

  let xhr = new XMLHttpRequest();

  xhr.open("POST", current_env);
  xhr.setRequestHeader("content-type", "application/json");
  //xhr.setRequestHeader("authorization", "Basic b3dtbzc3NzI6Qk90dGxlczEyIUA=");

  xhr.send(data);
}, false);
