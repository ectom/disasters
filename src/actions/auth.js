const auth = require('@planet/client/api/auth');

const key = process.env.REACT_APP_API_KEY
auth.setKey(key)