mport React from "react"
import Form from "/home/hanruizou/public_html/react/my-app/src/components/Form.js"


class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      isLoggedIn: this.props.isLoggedIn,
      flag:this.props.flag,
      data: null
    }
  }

  componentWillMount() {
    // login check
    window.sessionStorage.getItem("username") ?
      this.setState({username: window.sessionStorage.getItem("username"), isLoggedIn: true})
    : this.setState({username: "", isLoggedIn: false})
  }

  render() {
    return (
      <div className="navbar">
            <Form isLoggedIn={this.state.isLoggedIn} flag={this.state.flag}/>
      </div>
    )
  }
}

export default Auth

