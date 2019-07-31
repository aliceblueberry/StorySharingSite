mport React from "react"
import ReactDom from "react-dom"
import ViewStory from "/home/hanruizou/public_html/react/my-app/src/components/ViewStory.js"

class CommentCard extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        title:this.props.info.title,
        cmt:this.props.info.cmt,
        cmter: this.props.info.cmter,
        newCmt: ""
      }

      this.delete = this.delete.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.edit = this.edit.bind(this)
    }

    edit() {
      // mongodb AJAXlog
      console.log(this.state.cmt);

      const data = {
        'title': this.state.title,
        'cmt': this.state.cmt,
        'cmter': window.sessionStorage.getItem('username'),
        'newCmt': this.state.newCmt
      }

      fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/editCmt.php', {
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
    delete() {
      // mongodb AJAX
      const data = {'cmt': this.props.info.cmt }
      console.log(data);

      fetch('http://ec2-18-222-232-116.us-east-2.compute.amazonaws.com/~hanruizou/react/my-app/src/deleteCmt.php', {
        method: 'POST',
        body: JSON.stringify(data),
        header: {'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
        if(data.success){

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
    render() {
      if(window.sessionStorage.getItem("username") === this.state.cmter) {
        return (
          <div className="comments">
                <ul>
                      <li>{this.props.info.cmt} _by {this.props.info.cmter}</li>
                      <input type="text" placeholder="edit" name="newCmt" onChange={this.handleChange} />
                      <button className="button" onClick={this.edit}>edit</button>
                      <button className="button" onClick={this.delete}>delete</button>

                </ul>
          </div>
        )
      }else {
        return (
          <div className="comments">
                <ul>
                      <li>{this.props.info.cmt} _by {this.props.info.cmter}</li>
                </ul>
          </div>
        )
      }

    }
}
export default CommentCard

