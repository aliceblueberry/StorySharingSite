mport React from "react"
import ReactDom from "react-dom"
import Main from "/home/hanruizou/public_html/react/my-app/src/components/Main.js"
import ViewStory from "/home/hanruizou/public_html/react/my-app/src/components/ViewStory.js"

class GivenStory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      author: this.props.author,
      title: this.props.title,
      newTit:"",
      content: this.props.content,
      newCnt:"",
      editMode: false
    }

    this.edit = this.edit.bind(this)
    this.delete = this.delete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.editTitle = this.editTitle.bind(this)
    this.editContent = this.editContent.bind(this)
  }

    back() {
      ReactDom.render(<Main/>, document.getElementById("root"))
    }

    edit() {
      console.log("edit");
      this.setState({
        editMode:true
      })

    }

    delete() {
      // mongodb AJAX
      const data = {'title': this.state.title }
      console.log(data);

      fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/deleteStory.php', {
        method: 'POST',
        body: JSON.stringify(data),
        header: {'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        if(data.success){
          ReactDom.render(<Main  />, document.getElementById('root'))
          console.log("removed");
        } else {
          alert(data.message)
        }

      })
      .catch(error => alert(error))
    }
    handleChange(event) {
      const {name, value} = event.target
      this.setState({ [name]: value })

    }
    editTitle(){
      // mongodb AJAXlog
      console.log(this.state.cmt);

      const data = {
        'title': this.state.title,
        'newTit': this.state.newTit,
        'author': window.sessionStorage.getItem('username'),
        'content': this.state.content
      }

      fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/editTitle.php', {
        method: 'POST',
        body: JSON.stringify(data),
        header: {'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        if(data.success){
          console.log("editted");
        } else {
          alert(data.message)
        }

      })
      .catch(error => alert(error))
    }
    editContent(){
      // mongodb AJAXlog
      console.log(this.state.cmt);

      const data = {
        'title': this.state.title,
        'newCnt': this.state.newCnt,
        'author': window.sessionStorage.getItem('username'),
        'content': this.state.content
      }

      fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/editContent.php', {
        method: 'POST',
        body: JSON.stringify(data),
        header: {'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        if(data.success){
          console.log("editted");
        } else {
          alert(data.message)
        }

      })
      .catch(error => alert(error))
    }
    render() {
      if(window.sessionStorage.getItem("username") === this.state.author){
          return (
            <div className="givenStory">
                    <button className="button" onClick={this.back}>back</button>
                    <button className="button" onClick={this.delete}>delete story</button>
                    <h1>Story Title: {this.state.title}</h1>
                    <input type="text" placeholder="edit title" name="newTit" onChange={this.handleChange} />
                    <button className="button" onClick={this.editTitle}>edit</button>
                    <h2>Author: {this.state.author}</h2>
                    <h3>Content: {this.state.content}</h3>
                    <input type="text" placeholder="edit content" name="newCnt" onChange={this.handleChange} />
                    <button className="button" onClick={this.editContent}>edit</button>
                    <hr/>
            </div>
          )
      }else {
        return (
          <div className="givenStory">
          <button className="button" onClick={this.back}>back</button>
                  <h1>Story Title: {this.state.title}</h1>
                  <h2>Author: {this.state.author}</h2>
                  <h3>Content: {this.state.content}</h3>
                  <hr/>
          </div>
        )
      }
    }
}

export default GivenStory

