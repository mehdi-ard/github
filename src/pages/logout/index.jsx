import React from 'react';
import { Redirect } from 'react-router-dom';
import { state, Beep } from 'react-beep';

class Logout extends Beep(['test']) {
  render() {
    state.token = null;
    state.mobile = null;
    state.user = null;
    if (state.backUrl) {
      return <Redirect to={`/login?backUrl=/${state.backUrl}`} />;
    } else {
      return <Redirect to={`/login`} />;
    }
  }
}

export default Logout;
