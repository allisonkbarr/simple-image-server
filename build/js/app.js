"use strict";

var Header = React.createClass({
  displayName: "Header",

  render: function render() {
    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(
        "header",
        null,
        React.createElement(
          "div",
          { id: "flex-header" },
          React.createElement(
            "h1",
            null,
            "Simple Image Server"
          ),
          this.props.hasUser && React.createElement(
            "nav",
            null,
            React.createElement(
              "a",
              { href: "javascript:;", onClick: actions.setLoggedInPage.bind(null, "dashboard"), className: this.props.page === "dashboard" && "active" },
              "Dashboard"
            ),
            React.createElement(
              "a",
              { href: "javascript:;", onClick: actions.setLoggedInPage.bind(null, "documentation"), className: this.props.page === "documentation" && "active" },
              "Documentation"
            )
          )
        ),
        this.props.hasUser ? React.createElement(
          "a",
          { className: "btn btn-sm", href: "javascript:;", onClick: actions.server.logOut },
          "Log out"
        ) : React.createElement(
          "a",
          { className: "btn btn-sm", href: "javascript:;", onClick: actions.server.logIn },
          "Log in"
        )
      )
    );
  }
});

var KeysHeader = React.createClass({
  displayName: "KeysHeader",

  render: function render() {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "div",
        { className: "col-xs-12" },
        React.createElement(
          "h2",
          null,
          "API Keys"
        )
      )
    );
  }
});

var KeysForm = React.createClass({
  displayName: "KeysForm",

  getInitialState: function getInitialState() {
    return { pendingName: "" };
  },

  updatePendingName: function updatePendingName(e) {
    this.setState({ error: null, pendingName: e.target.value });
  },

  createKey: function createKey(name) {
    var newKey = {
      name: name,
      code: "",
      stats: {
        daily: 0,
        monthly: 0
      }
    };
    actions.server.addKey(this.props.user, newKey);
  },

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    if (!this.state.pendingName) {
      return this.setState({ error: "Please enter a name" });
    }
    this.createKey(this.state.pendingName);
    this.setState({ pendingName: "" });
  },

  render: function render() {
    return React.createElement(
      "form",
      { className: "highlight", onSubmit: this.handleSubmit },
      React.createElement(
        "label",
        { "for": "key-name" },
        "Add New Key:"
      ),
      React.createElement("input", { value: this.state.pendingName, onChange: this.updatePendingName, type: "text", id: "key-name", placeholder: "Name" }),
      this.state.error && React.createElement(
        "p",
        { id: "error" },
        this.state.error
      ),
      React.createElement(
        "button",
        { className: "btn" },
        "Generate Key"
      )
    );
  }
});

// [ 'somelongfirebasekey', 'the actual value' ]
var k = R.head;
var v = R.nth(1);

var Key = React.createClass({
  displayName: "Key",

  getInitialState: function getInitialState() {
    return { isCodeVisible: false };
  },

  toggleCodeVisibility: function toggleCodeVisibility(e) {
    e.preventDefault();
    this.setState({ isCodeVisible: !this.state.isCodeVisible });
  },

  renderCode: function renderCode(code) {
    return this.state.isCodeVisible ? code : code.replace(/./g, "*");
  },

  render: function render() {
    var key = v(this.props.data);
    return React.createElement(
      "div",
      { className: "row table-row" },
      React.createElement(
        "div",
        { className: "col-sm-2 col-xs-3 table-cols name-col" },
        key.name
      ),
      React.createElement(
        "div",
        { className: "col-sm-6 col-xs-9" },
        React.createElement(
          "div",
          { className: "key highlight" },
          React.createElement(
            "p",
            null,
            this.renderCode(this.props.data[1].code)
          ),
          React.createElement(
            "a",
            { onClick: this.toggleCodeVisibility, href: "#" },
            React.createElement("i", { className: "fa " + (this.state.isCodeVisible ? "fa-eye-slash" : "fa-eye") + " fa-md pull-right" })
          )
        )
      ),
      React.createElement(
        "div",
        { className: "col-sm-2 reqs table-cols" },
        React.createElement(
          "p",
          null,
          key.stats.daily
        )
      ),
      React.createElement(
        "div",
        { className: "col-sm-2 reqs table-cols" },
        React.createElement(
          "p",
          null,
          key.stats.monthly
        )
      )
    );
  }
});

var Keys = React.createClass({
  displayName: "Keys",

  render: function render() {

    var list = this.props.keys.map(function (key) {
      return React.createElement(Key, { key: key.code, data: key });
    });

    return React.createElement(
      "div",
      { className: "container", id: "keys-component" },
      React.createElement(
        "div",
        { className: "table" },
        React.createElement(KeysHeader, null),
        React.createElement(KeysForm, { user: this.props.user }),
        React.createElement(
          "div",
          { className: "row table-header" },
          React.createElement(
            "div",
            { className: "col-sm-2 col-xs-3 name-col name" },
            "Name"
          ),
          React.createElement(
            "div",
            { className: "col-sm-6 col-xs-9" },
            React.createElement(
              "p",
              null,
              "Key"
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-2 reqs" },
            React.createElement(
              "p",
              null,
              "Req's today"
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-2 reqs" },
            React.createElement(
              "p",
              null,
              "Req's this month"
            )
          )
        ),
        list.length ? list : React.createElement(
          "div",
          { className: "highlight no-keys-yet" },
          "No keys yet."
        )
      )
    );
  }
});

var Dashboard = React.createClass({
  displayName: "Dashboard",

  render: function render() {
    return React.createElement(
      "div",
      { id: "dashboard" },
      React.createElement(Keys, { keys: this.props.keys, user: this.props.user })
    );
  }
});

var Documentation = React.createClass({
  displayName: "Documentation",

  render: function render() {
    return React.createElement(
      "div",
      { id: "documentation", className: "container" },
      React.createElement(
        "h2",
        null,
        "Documentation"
      ),
      React.createElement(
        "div",
        { className: "highlight" },
        React.createElement(
          "p",
          null,
          "Simple Image Server uses JIMP for image manipulation. All features of JIMP are supported."
        ),
        React.createElement(
          "a",
          { href: "https://github.com/oliver-moran/jimp", target: "_blank" },
          "JIMP documentation on GitHub"
        )
      )
    );
  }
});

var Landing = React.createClass({
  displayName: "Landing",

  render: function render() {
    return React.createElement(
      "div",
      { id: "landing" },
      React.createElement(
        "div",
        { className: "jumbotron masthead" },
        React.createElement(
          "div",
          { className: "container" },
          React.createElement("i", { className: "fa fa-picture-o fa-xl", "aria-hidden": "true" }),
          React.createElement(
            "p",
            null,
            "An image server built for everyday use."
          ),
          React.createElement(
            "button",
            { onClick: actions.server.logIn, className: "btn btn-lg" },
            "Sign up with Google"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "h2",
          null,
          "Features"
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-sm-4 col-xs-12 feature" },
            React.createElement("i", { className: "fa fa-picture-o fa-lg" }),
            " ",
            React.createElement("i", { className: "fa fa-picture-o fa-md" }),
            " ",
            React.createElement("i", { className: "fa fa-picture-o fa-sm" }),
            React.createElement(
              "h4",
              null,
              "Image Resizing"
            ),
            React.createElement(
              "p",
              null,
              "Lorem ipsum dolor sit amet, pro ancillae indoctum no. Sint causae in eum, ne usu nulla reprimique."
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-4 col-xs-12 feature" },
            React.createElement("i", { className: "fa fa-fighter-jet fa-lg" }),
            React.createElement(
              "h4",
              null,
              "Fast"
            ),
            React.createElement(
              "p",
              null,
              "An quo phaedrum posidonium appellantur, eros altera cu est."
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-4 col-xs-12 feature" },
            React.createElement("i", { className: "fa fa-simplybuilt fa-lg" }),
            React.createElement(
              "h4",
              null,
              "Simple"
            ),
            React.createElement(
              "p",
              null,
              "Id est impedit vituperatoribus, ne nam dicant maiorum vulputate, eam ei mucius graeco."
            )
          )
        ),
        React.createElement(
          "h2",
          null,
          "Subscription Plans"
        ),
        React.createElement(
          "div",
          { id: "subs" },
          React.createElement(
            "div",
            { className: "gray-box" },
            React.createElement(
              "h4",
              null,
              "Tier 1:"
            ),
            React.createElement(
              "h4",
              null,
              "Hobbyist"
            ),
            React.createElement(
              "p",
              { className: "sub-desc" },
              "Id est impedit vituperatoribus, ne nam dicant maiorum vulputate, eam ei mucius graeco."
            ),
            React.createElement(
              "div",
              { className: "circle" },
              React.createElement(
                "p",
                { className: "big-text" },
                "Free"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "gray-box" },
            React.createElement(
              "h4",
              null,
              "Tier 2:"
            ),
            React.createElement(
              "h4",
              null,
              "Professional"
            ),
            React.createElement(
              "p",
              { className: "sub-desc" },
              "Id est impedit vituperatoribus, ne nam dicant maiorum vulputate, eam ei mucius graeco."
            ),
            React.createElement(
              "div",
              { className: "circle" },
              React.createElement(
                "p",
                { className: "big-text" },
                "$10"
              ),
              React.createElement(
                "p",
                { id: "permonth" },
                "per month"
              )
            )
          )
        )
      )
    );
  }
});

// APP

var App = React.createClass({
  displayName: "App",

  displayLoggedInPage: function displayLoggedInPage() {
    return this.props.view.loggedInPage === "dashboard" ? React.createElement(Dashboard, { keys: this.props.keys, user: this.props.user }) : React.createElement(Documentation, null);
  },

  render: function render() {
    return React.createElement(
      "div",
      { id: "app-component" },
      React.createElement(Header, { hasUser: this.props.user, page: this.props.view.loggedInPage }),
      this.props.user ? this.displayLoggedInPage() : React.createElement(Landing, null)
    );
  }
});

// IMPLEMENTATION

var state = {
  user: null,
  keys: [],
  view: {
    loggedInPage: "dashboard"
  }
};

var actions = {

  logIn: function logIn(user) {
    var newState = Object.assign(state, { user: user });
    render(newState);
  },
  logOut: function logOut() {
    var newState = Object.assign(state, { user: null, keys: [] });
    render(newState);
  },
  setKeys: function setKeys(keys) {
    var newState = Object.assign(state, { keys: keys });
    render(newState);
  },
  setLoggedInPage: function setLoggedInPage(loggedInPage) {
    var newViewState = Object.assign(state.view, { loggedInPage: loggedInPage });
    var newState = Object.assign(state, { view: newViewState });
    render(newState);
  },

  server: {

    logOut: function logOut() {
      fb.unauth();
    },

    addKey: function addKey(user, newKey) {
      var ref = fbKeys.child(user.uid).push(newKey);
      var code = CryptoJS.MD5(user.uid + ref.key()).toString();
      ref.update({ code: code });
      fbKeysByCode.child(code).set({ keyKey: ref.key(), userKey: user.uid });
    },

    logIn: function logIn() {
      fb.authWithOAuthPopup("google", function (e, authData) {
        return authData;
      });
    }
  }
};

var fb = new Firebase("https://simple-image-server.firebaseio.com/");
var fbUsers = fb.child("users");
var fbKeys = fb.child("keys");
var fbKeysByCode = fb.child("keysByCode");

fb.onAuth(function (authData) {
  if (authData) {
    actions.logIn(authData);
    fbUsers.child(authData.uid).once("value", function (snap) {
      if (!snap.val()) {
        fbUsers.child(authData.uid).set(authData);
      }
      fbKeys.child(authData.uid).on("value", function (snap) {
        if (!snap.val()) return;
        actions.setKeys(R.toPairs(snap.val()));
      });
    });
  } else actions.logOut();
});

function render(state) {
  console.log(state);
  React.render(React.createElement(App, state), document.getElementById("app"));
}

render(state);
//# sourceMappingURL=app.js.map