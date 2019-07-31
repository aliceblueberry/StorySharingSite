mport "/home/hanruizou/public_html/react/my-app/src/components/style.css"
import React from "react"
import ReactDom from "react-dom"
import Header from "/home/hanruizou/public_html/react/my-app/src/components/Header.js"
import Auth from "/home/hanruizou/public_html/react/my-app/src/components/Auth.js"
import GivenStory from "/home/hanruizou/public_html/react/my-app/src/components/GivenStory.js"
import CommentCard from "/home/hanruizou/public_html/react/my-app/src/components/CommentCard.js"
import LikeStory from "/home/hanruizou/public_html/react/my-app/src/components/LikeStory.js"
import {animations}from"react-animation"
import {easings}from"react-animation"

const style = {
  animation:animations.popIn
}

const style2 = {
  animation:`pop-in ${easings.easeOutExpo} 1500ms forwards`
}

class ViewStory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      author: this.props.author,
      title: this.props.title,
      content: this.props.content,
      cmt:"",
      data: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.newComment = this.newComment.bind(this)
  }



  componentWillMount() {
    // fetch one story info
    console.log(this.state.title)
    const data = {'title': this.state.title}
    fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/oneStory.php', {
      method: 'POST',
      body: JSON.stringify(data),
      header: {'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      data.success ?  this.setState({data: data.comments}) : alert("load this story failed somehow ...");
    })
    .catch(error => alert(error))
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({ [name]: value })
  }

  newComment() {
    // mongodb AJAX
    const data = {
      'title': this.state.title,
      'cmt': this.state.cmt,
      'cmter': window.sessionStorage.getItem('username')
    }

    fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/newCmt.php', {
      method: 'POST',
      body: JSON.stringify(data),
      header: {'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      if(data.success){
        this.componentWillMount()
        console.log("added to db");
      } else {
        alert(data.message)
      }

    })
    .catch(error => alert(error))
  }

  render() {
    console.log(this.state.data)
    const mapdata = this.state.data ? this.state.data.map(story =>
      <CommentCard key={story._id.$oid} info={story} callback={this.componentWillMount}/>) : {}
    return (
      <div  style={style2}>
          <Header />
          <Auth isLoggedIn={this.state.isLoggedIn} visitor={this.state.visitor}/>
          { this.state.data ?
            <GivenStory
                  data={this.state.data}
                  author={this.state.author}
                  title={this.state.title}
                  content={this.state.content}
                  /> : null}
                  <h3 style={style}>Add comment:</h3>
                  <input type="text" placeholder="new comment" name="cmt" onChange={this.handleChange} />
                  <button className="button" onClick={this.newComment}>Add</button>
            <h3>Comment: </h3>
            {this.state.data ? mapdata : null}
            <LikeStory/>
      </div>
    )
  }
}

export default ViewStory

