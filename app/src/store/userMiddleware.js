/*
 * Npm import
 */
import axios from 'axios';
import { connectUser, signUser, connectUserError, signUserError, updateNickname, profileNicknameError, resetProfile } from 'src/store/user';

/*
 * Local import
 */
const TEST_CONNECT_USER = 'TEST_CONNECT_USER';
const TEST_SIGN_USER = 'TEST_SIGN_USER';
const TEST_EDIT_NICKNAME = 'TEST_EDIT_NICKNAME';
const TEST_EDIT_PASSWORD = 'TEST_EDIT_PASSWORD';

/*
 * Code
 */
export default store => next => (action) => {
  switch (action.type) {
    case TEST_CONNECT_USER: {
      const user = {
        email: store.getState().user.inputConnectEmail,
        password: action.password,
      };
      if (!user.email || !user.password) {
        store.dispatch(connectUserError(['Field missing']));
        break;
      }

      axios
        .post('http://217.70.191.16:3000/connect', { user })
        .then((result) => {
          if (!result.data) {
            store.dispatch(connectUserError(['Incorrect email or password']));
          }
          else {
            store.dispatch(connectUser(result.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    }


    case TEST_SIGN_USER: {
      const user = {
        firstname: store.getState().user.inputSignFirstname,
        lastname: store.getState().user.inputSignLastname,
        nickname: store.getState().user.inputSignNickname,
        email: store.getState().user.inputSignEmail,
        password: action.password,
        confirmPassword: action.confirmNewPassword,
      };
      /*
       * Verification requetes NOSQL
      */
      const regex = /["/$‘<>{}]/g;
      // eslint-disable-next-line
      if (user.firstname.search(regex) !== -1 || user.lastname.search(regex) !== -1 || user.nickname.search(regex) !== -1 || user.email.search(regex) !== -1 || user.password.search(regex) !== -1) {
        store.dispatch(signUserError(['No special characters "/$‘<>{}']));
        break;
      }


      // eslint-disable-next-line
      if (!user.firstname || !user.lastname || !user.nickname || !user.email || !user.password || !user.confirmPassword) {
        store.dispatch(signUserError(['Field missing']));
        break;
      }

      if (user.password !== user.confirmPassword) {
        store.dispatch(signUserError(['Invalid password']));
        break;
      }


      const error = [];

      axios
        .post('http://217.70.191.16:3000/verif/email', { email: user.email })
        .then((email) => {
          if (!email.data) {
            error.push('Email already used');
          }
          axios
            .post('http://217.70.191.16:3000/verif/nickname', { nickname: user.nickname })
            .then((nickname) => {
              if (!nickname.data) {
                error.push('Nickname already used');
              }
              if (error[0]) {
                store.dispatch(signUserError(error));
              }
              else {
                axios
                  .post('http://217.70.191.16:3000/signUser', { user })
                  .then((signUp) => {
                    store.dispatch(signUser(signUp.data));
                  });
              }
            });
        });
    }
      break;

    case TEST_EDIT_NICKNAME: {
      const user = {
        newNickname: store.getState().user.profileInputNickname,
        nickname: store.getState().user.nickname,
      };
      const regex = /["/$‘<>{}]/g;
      // eslint-disable-next-line
      if (user.newNickname.search(regex) !== -1) {
        // TODO: afficher un message d'erreur
        store.dispatch(profileNicknameError(['No special characters in the Nickname']));
        break;
      }
      if (store.getState().user.profileInputNickname === '') {
        store.dispatch(profileNicknameError(['Empty field']));
        break;
      }


      if (user.newNickname === user.nickname) {
        store.dispatch(resetProfile());
        break;
      }

      axios
        .post('http://217.70.191.16:3000/verif/nickname', { nickname: user.newNickname })
        .then((nickname) => {
          if (!nickname.data) {
            store.dispatch(profileNicknameError(['nickname already used']));
          }
          else {
            axios
              .post('http://217.70.191.16:3000/edit/nickname', { user })
              .then((result) => {
                store.dispatch(updateNickname(result));
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      break;
    }

    case TEST_EDIT_PASSWORD: {
      const regex = /["/$‘<>{}]/g;
      // eslint-disable-next-line
        if (action.newPassword.search(regex) !== -1) {
      // TODO: afficher un message d'erreur
        store.dispatch(profileNicknameError(['No special characters in the password']));
        break;
      }
      if (action.oldPassword === '' || action.newPassword === '' || action.confirmNewPassword === '') {
        store.dispatch(profileNicknameError(['Empty field']));
        break;
      }

      if (action.newPassword === action.oldPassword) {
        store.dispatch(profileNicknameError(['New password must be different']));
        break;
      }
      if (action.newPassword !== action.confirmNewPassword) {
        store.dispatch(profileNicknameError(['Invalid password']));
        break;
      }

      const user = {
        email: store.getState().user.email,
        password: action.oldPassword,
      };

      const newUser = {
        email: store.getState().user.email,
        password: action.confirmNewPassword,
      };

      axios
        .post('http://217.70.191.16:3000/verif/password', { user })
        .then((resultPassword) => {
          if (!resultPassword.data) {
            store.dispatch(profileNicknameError(['Incorrect password']));
          }
          else {
            axios
              .post('http://217.70.191.16:3000/edit/password', { newUser })
              .then((result) => {
                store.dispatch(resetProfile());
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    }


      break;

    default:
  }

  next(action);
};

/*
 * Action Creator
 */
export const testConnectUser = password => ({
  type: TEST_CONNECT_USER,
  password,
});

export const testSignUser = (password, confirmNewPassword) => ({
  type: TEST_SIGN_USER,
  password,
  confirmNewPassword,
});

export const testEditNickname = () => ({
  type: TEST_EDIT_NICKNAME,
});

export const testEditPassword = (oldPassword, newPassword, confirmNewPassword) => ({
  type: TEST_EDIT_PASSWORD,
  oldPassword,
  newPassword,
  confirmNewPassword,
});
