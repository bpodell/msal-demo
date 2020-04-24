
const msalConfig = {
    auth: {
        tenant: 'navigatorcre.onmicrosoft.com',
        clientId: '366be840-dd34-4fee-8650-3acc60eb6d7d',
        signInFlow: 'B2C_1_SuSi',
        forgotPasswordFlow: 'B2C_1_FP',
        redirectUri: 'http://localhost:4200/callback',
        b2cscopes: ['user.read'],
        authority: 'https://navigatorcre.b2clogin.com/tfp/navigatorcre.onmicrosoft.com/B2C_1_SuSi/v2.0'
    }
}

const loginRequest = {
    scopes: ['user.read'] 
}

const myMSALObj = new Msal.UserAgentApplication(msalConfig);

function signIn() {
  myMSALObj.loginPopup()
    .then(loginResponse => {
        console.log("id_token acquired at: " + new Date().toString());
        console.log(loginResponse);  
        
        if (myMSALObj.getAccount()) {
          updateUI();
        }
        
    }).catch(function (error) {
      console.log(error);
    });
}

function logout() {
  myMSALObj.logout();
}

function getTokenPopup(request) {
  return myMSALObj.acquireTokenSilent(request)
    .catch(error => {
      console.log("Silent token acquisition fails. Acquiring token using popup");
      console.log(error);
      // fallback to interaction when silent call fails
      return myMSALObj.acquireTokenPopup(request)
        .then(tokenResponse => {
          console.log("access_token acquired at: " + new Date().toString());
          return tokenResponse;
        }).catch(error => {
          console.log(error);
        });
    });
}

// Acquires and access token and then passes it to the API call
function passTokenToApi() {
  getTokenPopup(tokenRequest)
    .then(tokenResponse => {
        console.log("access_token acquired at: " + new Date().toString());
        try {
          logMessage("Request made to Web API:");
          callApiWithAccessToken(apiConfig.webApi, tokenResponse.accessToken);
        } catch(err) {
          console.log(err);
        }
    });
}