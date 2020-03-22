user = {
  id: null,
  email: null,
  apiKey: null,
  token: null
};

const loginReducer = function (state = user, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

// id(pin):200428
// email(pin):"testplanetexplorer+stories@gmail.com"
// apiKey(pin):"07fbf6c98b26452499d42cea15505b51"
// organizationId(pin):194751
// programId(pin):29
// token(pin):"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJwcm9ncmFtX2lkIjoyOSwidG9rZW5fdHlwZSI6ImF1dGgiLCJyb2xlX2xldmVsIjoxMDAsIm9yZ2FuaXphdGlvbl9pZCI6MTk0NzUxLCJ1c2VyX2lkIjoyMDA0MjgsInBsYW5fdGVtcGxhdGVfaWQiOm51bGwsIm1lbWJlcnNoaXBfaWQiOjE5MjUyNywib3JnYW5pemF0aW9uX25hbWUiOiJ0ZXN0cGxhbmV0ZXhwbG9yZXIrc3Rvcmllc0BnbWFpbC5jb20iLCIyZmEiOmZhbHNlLCJleHAiOjE1ODQ5MjM3NDEsImFwaV9rZXkiOiIwN2ZiZjZjOThiMjY0NTI0OTlkNDJjZWExNTUwNWI1MSIsInVzZXJfbmFtZSI6InRlc3QgZ3V5IiwiZW1haWwiOiJ0ZXN0cGxhbmV0ZXhwbG9yZXIrc3Rvcmllc0BnbWFpbC5jb20ifQ.lsxi3Rhcg_jb5iqCNwK187NSN_lYOiZJ0cGnUAXtJKL0eU6uZbUIrjloeLu1Jc5_6tKaP20V6Y68JxAOtNX_dw"
// hasEAP(pin):false
