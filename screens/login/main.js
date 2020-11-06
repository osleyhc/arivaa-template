import { Component } from 'react';
import ComponentView from './view';
import { createAction } from '@arivaa-react/redux';
import preProcess from '../../helpers/preprocess';
import { Toast } from '@arivaa-react-native/common';
import Spinner from '../../components/spinner';
import { LOGIN } from '../../redux/actions';
/**
 * @description Login Container
 * @type Container
 * @author Inderdeep
 */
class Main extends Component {
  /**
   * Container
   * @param props
   */
  constructor(props) {
    super(props);
    this.setValidations();
    this.login = login.bind(this);
    this.handleSocialSignIn = handleSocialSignIn.bind(this);
    this.handleSocialSignInError = handleSocialSignInError.bind(this);
  }

  /**
   * Set Validations
   */
  setValidations() {
    const { translate } = this.props;
    this.validations = {
      email: {
        rules: [
          { required: true, message: translate('common.email.error.required') },
          { type: 'email', message: translate('common.email.error.invalid') },
        ],
        initialValue: 'demo@laxaar.com',
      },
      password: {
        rules: [
          {
            required: true,
            message: translate('common.password.error.required'),
          },
          {
            min: 4,
            message: translate('common.passwordLength.error.required'),
          },
        ],
        initialValue: '12345',
      },
    };
  }

  /**
   * ComponentDidMount Hook
   */
  componentDidMount() {}

  /**
   * On Submit of form
   * @param errors
   * @param values
   */
  onSubmit(values) {
    this.login('local', values);
  }

  /**
   * Render Method
   * @returns {*}
   */
  render() {
    return ComponentView.bind(this)();
  }
}

/**
 * Bind Redux Actions
 * @param dispatch
 * @returns {{Object}}
 */
const bindAction = (dispatch) => {
  return {
    /**
     * Login Action Creator
     * @param drawerId
     */
    login: (data) => {
      return dispatch(createAction(LOGIN, data));
    },
  };
};
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};
Main.displayName = 'Login';
export default preProcess(Main, {
  connect: [mapStateToProps, bindAction],
  localize: true,
});

/**
 * Export common login methods to be
 * used in signup
 */
/**
 * Login
 * @param provider - provider type
 * @param credentials - credentials
 */
export async function login(provider, credentials) {
  const { login, navigation, translate } = this.props;
  Spinner.start();
  try {
    const { error, payload } = await login({
      provider,
      credentials,
    });
    if (error) {
      throw payload.response;
    }

    /**
     * Changed it to secured because
     * due to nested navigators, if i redirect to
     * default INITIAL_SECURED_ROUTE, it loads the
     * screen twice
     * Reference -
     * https://github.com/react-navigation/react-navigation/issues/2599
     * Comment by javidjamae
     */
    navigation.navigate('secured');

    Toast.success(translate('login.success'));
  } catch (e) {
    console.log(e);

    Toast.fail(translate('login.invalid'));
  }
  Spinner.stop();
}

/**
 * Handle Social Signin
 * @param provider - provider e.g facebook or google
 * @param result - Response
 */
export function handleSocialSignIn(provider, result) {
  this.login(provider, result);
}

/**
 * Handle Error for social signin
 * @param provider - provider e.g facebook or google
 * @param error
 */
export function handleSocialSignInError(provider, error) {
  const { translate } = this.props;
  Toast.fail(translate('login.fail') + provider);
}
