import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import { state } from 'react-beep';
import { SHOULD_NOT_AUTH, SHOULD_AUTH } from 'configs/enums';
import { withRouter } from 'react-router-dom';

function GuradRoute(props) {
  if (props.history.location.search) {
    const splitBackUrl = props.history.location.search.split('/');
    state.backUrl = `${splitBackUrl[1]}/${splitBackUrl[2]}`;
  }
  switch (props.guard) {
    case SHOULD_NOT_AUTH: {
      if (state.token) {
        if (props.history.location.search) {
          const splitBackUrl = props.history.location.search.split('/');
          return <Redirect to={`${splitBackUrl[1]}/${splitBackUrl[2]}`} />;
        } else {
          return <Redirect to="/" />;
        }
      } else return <Route {...props} />;
    }
    case SHOULD_AUTH: {
      if (state.token) return <Route {...props} />;
      else return <Redirect to="/login" />;
    }
    default: {
      return <Route {...props} />;
    }
  }
}

function Router(props) {
  const { routes } = props;

  return (
    <Suspense fallback={<div>{/* <Loading width={80} height={80} /> */}</div>}>
      <Switch>
        {routes.map(route => (
          <GuradRoute
            key={route.path}
            exact={route.exact}
            path={route.path}
            render={() => {
              document.title = `${route.title}`;
              const Page = route.component();
              return <Page />;
            }}
            {...props}
            guard={route.guard}
          />
        ))}
      </Switch>
    </Suspense>
  );
}

export default withRouter(Router);
