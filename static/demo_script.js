const provider = "test-docdown";
let token = '';

document.querySelector('ok-to-lend').addEventListener('registered', () => waitAndRefresh());

function loadData() {

    const subject = document.getElementById('subject').value;
    console.log(subject);
    const url = 'http://localhost:4800/jwt';
    const data = {
        subject: subject
    };

    postData(url, data).then(value => {

        const ok2lend = document.querySelector('ok-to-lend');
        ok2lend.registerUser(value.token, provider, 'peter.kelly@email.com');

    }).catch(err => {
        console.error(err);
    });

}

function waitAndRefresh() {
    setTimeout(refreshToken, 2000);
}

function refreshToken() {

    console.log('REFRESH');

    const subject = document.getElementById('subject').value;
    console.log(subject);
    const url = 'http://localhost:4800/jwt';
    const data = {
        subject: subject
    };

    postData(url, data).then(value => {
        token = value.token;
        const ok2lend = document.querySelector('ok-to-lend');
        ok2lend.setAttribute('token',value.token);
        ok2lend.setAttribute('provider', provider);
        ok2lend.start(value.token);

    }).catch(err => {
        console.error(err);
    });

}

function postData(url = ``, data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
              "Content-Type": "application/json",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses response to JSON
  }

  function cancel() {
      const ok2lend = document.querySelector('ok-to-lend');
      ok2lend.cancel();
  }