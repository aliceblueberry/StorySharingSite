mport React from "react"
import ReactDom from "react-dom"
import ViewStory from "/home/hanruizou/public_html/react/my-app/src/components/ViewStory.js"

class StoryCard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: this.props.isLoggedIn
    }

    this.clickStory = this.clickStory.bind(this)
  }

  clickStory(event) {
    window.sessionStorage.getItem("username") ? this.go2story(event) : alert("log in first")
  }

  go2story(event) {
    if(event.target.tagName === "DIV"){
      const author = event.target.childNodes[0].innerText.substring(8)
      const title = event.target.childNodes[1].innerText.substring(7)
      const content = event.target.childNodes[2].innerText.substring(9)

      ReactDom.render(<ViewStory
          author={author}
          title={title}
          content={content}
         />, document.getElementById('root'))
    }
  }

  render(){
      return (
              <div className="storycard" onClick={this.clickStory}>
                  <h3>Author: {this.props.info.author}</h3>
                  <h4>Title: {this.props.info.title}</h4>
                  <p>Content: {this.props.info.content}</p>
                  <hr/>
            </div>
      )
  }
}

export default StoryCard

