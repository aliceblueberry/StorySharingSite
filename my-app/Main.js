mport "/home/hanruizou/public_html/react/my-app/src/components/style.css"
import React from "react"
import Header from "/home/hanruizou/public_html/react/my-app/src/components/Header.js"
import Auth from "/home/hanruizou/public_html/react/my-app/src/components/Auth.js"
import StoryCard from "/home/hanruizou/public_html/react/my-app/src/components/StoryCard.js"

class Main extends React.Component {
    constructor() {
      super()
      this.state = {
        username:"",
        isLoggedIn: false,
        data: null,
        flag:true
      }

    }

  componentWillMount() {
    console.log("main render");
    // login check
    window.sessionStorage.getItem("username") ?
      this.setState({username: window.sessionStorage.getItem("username"), isLoggedIn: true})
    : this.setState({username: "", isLoggedIn: false})

    // get the story from MongoDB
    fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/homepageStory.php', {
      method: 'GET',
      header: {'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      data.success ?  this.setState({
        data: data.stories
      }) : alert("load story failed somehow ...");
    })
    .catch(error => alert(error))
  }

  render() {
    const mapdata = this.state.data ? this.state.data.map(story =>
      <StoryCard key={story._id.$oid} info={story} isLoggedIn={this.state.isLoggedIn} />) : {}
    return (
      <div>
          <Header />
          <Auth isLoggedIn={this.state.isLoggedIn} flag={this.state.flag}/>
          {this.state.data ? mapdata : null}
      </div>
    )
  }
}

export default Main

