mport React from "react"
import ReactDom from "react-dom"
import Main from "/home/hanruizou/public_html/react/my-app/src/components/Main.js"


class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      isLoggedIn: this.props.isLoggedIn,
      title:"",
      content:"",
      flag:this.props.flag,
      data: null,
      newUsername:"",
      newPwd:""
    }

    this.handleChange = this.handleChange.bind(this)
    this.logInOut = this.logInOut.bind(this)
    this.signUp = this.signUp.bind(this)
    this.newStory = this.newStory.bind(this)
    this.profile = this.profile.bind(this)
  }

  componentWillMount() {
    // login check
    window.sessionStorage.getItem("username") ?
      this.setState({username: window.sessionStorage.getItem("username"), isLoggedIn: true})
    : this.setState({username: "", isLoggedIn: false})
  }

  signUp() {
    console.log(this.state.username + " " + this.state.password)
    // mongodb AJAX
    const data = {
      'username': this.state.username,
      'password': this.state.password
    }

    fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/signUp.php', {
      method: 'POST',
      body: JSON.stringify(data),
      header: {'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      data.success ? this.setState({ isLoggedIn: true }) : alert(data.message)

    })
    .catch(error => alert(error))

  }

  logInOut() {
    if(this.state.isLoggedIn){
      //logout
      fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/logout.php', {
        method: 'GET',
        header: {'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        if(data.success){
          this.setState({username: "", isLoggedIn: false});
          window.sessionStorage.clear();
        } else{
          alert(data.message)
        }

      })
      .catch(error => alert(error))


    }else {
        // login mongodb AJAX
        const data = {
          'username': this.state.username,
          'password': this.state.password
        }

        fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/logIn.php', {
          method: 'POST',
          body: JSON.stringify(data),
          header: {'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
          if(data.success){
            this.setState({ isLoggedIn: true });
            window.sessionStorage.setItem("username", this.state.username);
          }else {
            alert(data.message)
          }

        })
        .catch(error => alert(error))

    }

  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  newStory(){
    // mongodb AJAX
    const data = {
      'username': window.sessionStorage.getItem('username'),
      'title': this.state.title,
      'content': this.state.content
    }

    fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/newStory.php', {
      method: 'POST',
      body: JSON.stringify(data),
      header: {'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      if(data.success){
        this.setState(preState=>{
          return {flag:!preState}
        });
        ReactDom.render(<Main />, document.getElementById('root'))
        console.log("added to db");
      } else {
        alert(data.message)
      }
    })
    .catch(error => alert(error))

  }

  profile(){
    console.log(this.state.newUsername);
    console.log(this.state.newPwd);
    const data = {
      'newPwd': this.state.newPwd,
      'username': window.sessionStorage.getItem('username'),
      'newUsername': this.state.newUsername
    }

    fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/profile.php', {
      method: 'POST',
      body: JSON.stringify(data),
      header: {'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      if(data.success){
        console.log("profile changed");
      } else {
        alert(data.message)
      }

    })
    .catch(error => alert(error))
  }


  render() {
    let logInOutButtonText = this.state.isLoggedIn ? "Log out" : "Log in"
    if(this.state.isLoggedIn){
        return (
              <div>
                    <p>Hi, {this.state.username}</p>
                    <input type="text" placeholder="new username" name="newUsername" onChange={this.handleChange} />
                    <input type="password" placeholder="new password" name="newPwd" onChange={this.handleChange} />
                    <button className="button" onClick={this.profile}>edit</button>
                    <button className="button" onClick={this.logInOut}>{logInOutButtonText}</button>
                    <hr/>
                    <input type="text" placeholder="Title" name="title" onChange={this.handleChange} />
                    <br/>
                    <textarea placeholder="Content" name="content" onChange={this.handleChange}/>
                    <button className="button" onClick={this.newStory}>Add New Story</button>
              </div>
        )


    }else{
      return (
            <div>
                {this.state.username ? <p>Hi, {this.state.username}</p> : <p>log in OR sign up</p>}
                <form>
                <input type="text" placeholder="username" name="username" onChange={this.handleChange} />
                <br/>
                <input type="password" placeholder="password" name="password" onChange={this.handleChange} />
                </form>

                <button className="button" onClick={this.logInOut}>{logInOutButtonText}</button>

                <button className="button" onClick={this.signUp}>Sign up</button>
            </div>
      )
    }
  }
}

export default Form

