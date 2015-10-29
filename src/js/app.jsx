
var Header = React.createClass({

  render() {
    return (
      <div className="container-fluid">
        <header>
          <div id="flex-header">
            <h1>Simple Image Server</h1>
            { this.props.hasUser && <nav>
              <a href="javascript:;" onClick={actions.setLoggedInPage.bind(null, 'dashboard')} className={this.props.page === 'dashboard' && 'active'}>Dashboard</a>
              <a href="javascript:;" onClick={actions.setLoggedInPage.bind(null, 'documentation')} className={this.props.page === 'documentation' && 'active'}>Documentation</a>
            </nav> }
          </div>
          { this.props.hasUser ?
            <a className="btn btn-sm" href="javascript:;" onClick={actions.server.logOut}>Log out</a> :
            <a className="btn btn-sm" href="javascript:;" onClick={actions.server.logIn}>Log in</a>
          }
        </header>
      </div>
    )
  }
})

var KeysHeader = React.createClass({

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>API Keys</h2>
        </div>
      </div>
    )
  }
})

var KeysForm = React.createClass({

  getInitialState() {
    return { pendingName: '' }
  },

  updatePendingName(e) {
    this.setState({ error: null, pendingName: e.target.value })
  },

  createKey(name) {
    var newKey = {
      name: name,
      code: '',
      stats: {
        daily: 0,
        monthly: 0
      }
    }
    actions.server.addKey(this.props.user, newKey)
  },

  handleSubmit(e) {
    e.preventDefault()
    if (!this.state.pendingName) {
      return this.setState({ error: 'Please enter a name' })
    }
    this.createKey(this.state.pendingName)
    this.setState({ pendingName: '' })
  },

  render() {
    return (
      <form className="highlight" onSubmit={this.handleSubmit}>
        <label for="key-name">Add New Key:</label>
        <input value={this.state.pendingName} onChange={this.updatePendingName} type="text" id="key-name" placeholder="Name" />
        {this.state.error && <p id="error">{ this.state.error }</p> }
        <button className="btn">Generate Key</button>
      </form>
    )
  }
})

// [ 'somelongfirebasekey', 'the actual value' ]
var k = R.head
var v = R.nth(1)

var Key = React.createClass({

  getInitialState() {
    return { isCodeVisible: false }
  },

  toggleCodeVisibility(e) {
    e.preventDefault()
    this.setState({ isCodeVisible: !this.state.isCodeVisible })
  },

  renderCode(code) {
    return this.state.isCodeVisible ? code : code.replace(/./g, '*')
  },

  render() {
    var key = v(this.props.data)
    return (
      <div className="row table-row">
        <div className="col-sm-2 col-xs-3 table-cols name-col">
          { key.name }
        </div>
        <div className="col-sm-6 col-xs-9">
          <div className="key highlight">
            <p>{this.renderCode(this.props.data[1].code)}</p>
            <a onClick={this.toggleCodeVisibility} href="#">
              <i className={`fa ${this.state.isCodeVisible ? 'fa-eye-slash' : 'fa-eye'} fa-md pull-right`}></i>
            </a>
          </div>
        </div>
        <div className="col-sm-2 reqs table-cols">
          <p>{ key.stats.daily }</p>
        </div>
        <div className="col-sm-2 reqs table-cols">
          <p>{ key.stats.monthly }</p>
        </div>
      </div>
    )
  }
})

var Keys = React.createClass({

  render() {

    var list = this.props.keys.map(key => <Key key={key.code} data={key} />)

    return (
      <div className="container" id="keys-component">
        <div className="table">
          <KeysHeader />
          <KeysForm user={this.props.user} />
          <div className="row table-header">
            <div className="col-sm-2 col-xs-3 name-col name">
              Name
            </div>
            <div className="col-sm-6 col-xs-9">
              <p>Key</p>
            </div>
            <div className="col-sm-2 reqs">
              <p>Req's today</p>
            </div>
            <div className="col-sm-2 reqs">
              <p>Req's this month</p>
            </div>
          </div>
          { list.length ? list : <div className="highlight no-keys-yet">No keys yet.</div>}
        </div>
      </div>
    )
  }
})

var Dashboard = React.createClass({

  render() {
    return (
      <div id="dashboard">
        <Keys keys={this.props.keys} user={this.props.user} />
      </div>
    )
  }
})

var Documentation = React.createClass({

  render() {
    return (
      <div id="documentation" className="container">
        <h2>Documentation</h2>
        <div className="highlight">
          <p>Simple Image Server uses JIMP for image manipulation. All features of JIMP are supported.</p>
          <a href="https://github.com/oliver-moran/jimp" target="_blank">JIMP documentation on GitHub</a>
        </div>
      </div>
    )
  }
})

var Landing = React.createClass({

  render() {
    return (
      <div id="landing">
        <div className="jumbotron masthead">
          <div className="container">
            <i className="fa fa-picture-o fa-xl" aria-hidden="true"></i>
            <p>An image server built for everyday use.</p>
            <button onClick={actions.server.logIn} className="btn btn-lg">Sign up with Google</button>
          </div>
        </div>
        <div className="container">
          <h2>Features</h2>
          <div className="row">
            <div className="col-sm-4 col-xs-12 feature">
              <i className="fa fa-picture-o fa-lg"></i> <i className="fa fa-picture-o fa-md"></i> <i className="fa fa-picture-o fa-sm"></i>
              <h4>Image Resizing</h4>
              <p>Lorem ipsum dolor sit amet, pro ancillae indoctum no. Sint causae in eum, ne usu nulla reprimique.</p>
            </div>
            <div className="col-sm-4 col-xs-12 feature">
              <i className="fa fa-fighter-jet fa-lg"></i>
              <h4>Fast</h4>
              <p>An quo phaedrum posidonium appellantur, eros altera cu est.</p>
            </div>
            <div className="col-sm-4 col-xs-12 feature">
              <i className="fa fa-simplybuilt fa-lg"></i>
              <h4>Simple</h4>
              <p>Id est impedit vituperatoribus, ne nam dicant maiorum vulputate, eam ei mucius graeco.</p>
            </div>
          </div>
          <h2>Subscription Plans</h2>
          <div id="subs">
            <div className="gray-box">
              <h4>Tier 1:</h4>
              <h4>Hobbyist</h4>
              <p className="sub-desc">Id est impedit vituperatoribus, ne nam dicant maiorum vulputate, eam ei mucius graeco.</p>
              <div className="circle">
                <p className="big-text">Free</p>
              </div>
            </div>
            <div className="gray-box">
              <h4>Tier 2:</h4>
              <h4>Professional</h4>
              <p className="sub-desc">Id est impedit vituperatoribus, ne nam dicant maiorum vulputate, eam ei mucius graeco.</p>
              <div className="circle">
                <p className="big-text">$10</p>
                <p id="permonth">per month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})



// APP


var App = React.createClass({

  displayLoggedInPage() {
    return this.props.view.loggedInPage === 'dashboard' ?
      <Dashboard keys={this.props.keys} user={this.props.user} /> :
      <Documentation />
  },

  render() {
    return (
      <div id="app-component">
        <Header hasUser={this.props.user} page={this.props.view.loggedInPage} />
        { this.props.user ? this.displayLoggedInPage() : <Landing /> }
      </div>
    )
  }
})




// IMPLEMENTATION

var state = {
  user: null,
  keys: [],
  view: {
    loggedInPage: 'dashboard'
  }
}


var actions = {

  logIn(user) {
    var newState = Object.assign(state, { user })
    render(newState)
  },
  logOut() {
    var newState = Object.assign(state, { user: null, keys: [] })
    render(newState)
  },
  setKeys(keys) {
    var newState = Object.assign(state, { keys })
    render(newState)
  },
  setLoggedInPage(loggedInPage) {
    var newViewState = Object.assign(state.view, { loggedInPage })
    var newState = Object.assign(state, { view: newViewState })
    render(newState)
  },

  server: {

    logOut() {
      fb.unauth()
    },

    addKey(user, newKey) {
      var ref = fbKeys.child(user.uid).push(newKey)
      var code = CryptoJS.MD5(user.uid + ref.key()).toString()
      ref.update({ code })
      fbKeysByCode.child(code).set({ keyKey: ref.key(), userKey: user.uid })
    },

    logIn() {
      fb.authWithOAuthPopup('google', (e, authData) => authData)
    }
  }
}

var fb = new Firebase("https://simple-image-server.firebaseio.com/")
var fbUsers = fb.child('users')
var fbKeys = fb.child('keys')
var fbKeysByCode = fb.child('keysByCode')

fb.onAuth((authData) => {
  if (authData) {
    actions.logIn(authData)
    fbUsers.child(authData.uid).once('value', (snap) => {
      if (!snap.val()) {
        fbUsers.child(authData.uid).set(authData)
      }
      fbKeys.child(authData.uid).on('value', (snap) => {
        if (!snap.val()) return
        actions.setKeys(R.toPairs(snap.val()))
      })
    })
  }
  else actions.logOut()
})

function render(state) {
  console.log(state)
  React.render(<App {...state} />, document.getElementById('app'))
}

render(state)
