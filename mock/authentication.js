import axios from 'axios';
let userList = [
  {
    id: Math.random(),
    email: 'demo@laxaar.com',
    password: '12345',
    name: 'Demo User',
    phone: '9999999999',
    profileImage: null, //"https://api.adorable.io/avatars/285/laxaar.png"
  },
];
let loggedInUser = null;
const REQUEST_DELAY = 1000;
/**
 * Get a user by email
 * @param email
 */
function getUserByEmail(email) {
  return userList.filter((user) => {
    return user.email.toLowerCase() == email.toLowerCase();
  })[0];
}
/**
 * Get a socially signed in user
 * @param provider
 * @param credentials
 * @returns {*}
 */
function getSocialUser(provider, credentials) {
  provider = provider.toLowerCase();
  return userList.filter((user) => {
    if (user.socialInfo) {
      switch (provider) {
        case 'google':
          return user.socialInfo.idToken == credentials.idToken;
        case 'facebook':
          return user.socialInfo.token == credentials.token;
      }
    }
    return null;
  })[0];
}
/**
 * Creates a new user
 * @param user
 */
function createUser(user) {
  user = {
    id: Math.random(),
    ...user,
  };
  userList.push(user);
  return user;
}
/**
 * Login a user
 * @param config
 */
export function login(config) {
  const data = JSON.parse(config.data);
  const { provider, credentials } = data;
  const { email, password } = credentials;
  return new Promise(function (resolve, reject) {
    setTimeout(async () => {
      let user;
      switch ((provider || '').toLowerCase()) {
        case 'local':
          user = getUserByEmail(email);
          if (user && user.password == password) {
            loggedInUser = user;
          } else {
            loggedInUser = null;
          }
          break;
        case 'facebook':
          user = getSocialUser(provider, credentials);
          if (user) {
            loggedInUser = user;
          } else {
            try {
              const response = await axios.get(
                `https://graph.facebook.com/me?access_token=${credentials.token}`
              );
              loggedInUser = createUser({
                provider: provider,
                profileImage: `http://graph.facebook.com/${response.data.id}/picture?type=square`,
                socialInfo: {
                  ...credentials,
                },
                ...response.data,
              });
            } catch (e) {
              resolve([
                500,
                {
                  message: 'Error while signing up with facebook',
                },
              ]);
            }
          }
          break;
        case 'google':
          user = getSocialUser(provider, credentials);
          if (user) {
            loggedInUser = user;
          } else {
            loggedInUser = createUser({
              provider: provider,
              socialInfo: credentials,
              profileImage: credentials.user.photoUrl,
              ...credentials.user,
            });
          }
          break;
      }
      if (loggedInUser) {
        resolve([
          200,
          {
            token: Math.random(),
          },
        ]);
      } else {
        resolve([
          401,
          {
            message: 'Invalid Login',
          },
        ]);
      }
    }, REQUEST_DELAY);
  });
}

/**
 * Forgot Password
 * @param config
 */
export function forgotPassword(config) {
  const data = JSON.parse(config.data);
  const { email } = data;
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      const user = getUserByEmail(email);
      if (user) {
        resolve([200]);
      } else {
        resolve([500]);
      }
    }, REQUEST_DELAY);
  });
}

/**
 * Sign up
 * @param config
 */
export function signUp(config) {
  const data = JSON.parse(config.data);
  const { email, password, phone, name } = data;
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      createUser({
        provider: 'local',
        email,
        password,
        phone,
        name,
        profileImage: 'https://api.adorable.io/avatars/285/laxaar.png',
      });
      resolve([200]);
    }, REQUEST_DELAY);
  });
}

/**
 * Verify Otp
 * @param config
 */
export function verifyOtp(config) {
  const data = JSON.parse(config.data);
  const { otp } = data;
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (otp == 1234) {
        resolve([200]);
      } else {
        resolve([500]);
      }
    }, REQUEST_DELAY);
  });
}

/**
 * Reset Password
 * @param config
 */
export function resetPassword(config) {
  const data = JSON.parse(config.data);
  const { otp, password, email } = data;
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (otp == 1234) {
        var user = getUserByEmail(email);
        user.password = password;
        resolve([200]);
      } else {
        resolve([500]);
      }
    }, REQUEST_DELAY);
  });
}
/**
 * Change Password
 * @param config
 */
export function changePassword(config) {
  const data = JSON.parse(config.data);
  const { otp, password, email } = data;
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      var user = getUserByEmail(loggedInUser.email);
      user.password = password;
      resolve([200]);
    }, REQUEST_DELAY);
  });
}

/**
 * New Address
 * @param config
 */
export function newAddress(config) {
  const data = JSON.parse(config.data);
}

/**
 * Save Profile Mock
 * @param config
 */
export function saveProfile(config) {
  const data = JSON.parse(config.data);
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      loggedInUser = {
        loggedInUser,
        ...data,
      };
      resolve([200, loggedInUser]);
    }, REQUEST_DELAY);
  });
}
/**
 * get Profile mock
 * @param config
 */
export function getProfile(config) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve([200, loggedInUser]);
    }, REQUEST_DELAY);
  });
}
