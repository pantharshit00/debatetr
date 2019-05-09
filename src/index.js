import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './App';
import * as serviceWorker from './serviceWorker';

Sentry.init({
  dsn: 'https://55e5c9bbbcb644b7a146ebbcf09ad167@sentry.io/1456138',
});

class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, eventId: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    const { error, eventId } = this.state;
    const { children } = this.props;
    if (error) {
      // render fallback UI
      return (
        <button
          type="button"
          onClick={() => Sentry.showReportDialog({ eventId })}
        >
          App crashed. Please refresh. Report feedback
        </button>
      );
    }
    // when there's not an error, render children untouched
    return children;
  }
}
ReactDOM.render(
  <ErrorBoundry>
    <App />
  </ErrorBoundry>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
