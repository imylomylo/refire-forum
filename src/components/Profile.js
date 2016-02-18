import React, { Component, PropTypes } from 'react'
import { styles, bindings, Link } from 'refire-app'
import { Card } from 'elemental'
import moment from 'moment'

// TODO: load from firebase settings collection
const DATE_FORMAT = "DD.MM.YYYY"

class Profile extends Component {

  render() {
    const {value: profile = {}} = this.props.profile || {}
    const {value: startedThreads = []} = this.props.profileThreadsStarted || {}
    const styles = this.props.styles

    return (
      <div className="Profile">
        <Card>
          <img className={styles.profileImage} src={profile.profileImageURL} />
          <div className={styles.profileContainer}>
            <h2>{profile.displayName}</h2>
            <div>
              <strong>Member since</strong> {moment(profile.registeredAt || moment(), "x").format(DATE_FORMAT)}
            </div>
            <div>
              <strong>Threads started</strong> {Object.keys(profile.threadsStarted || {}).length}
            </div>
            <div>
              <strong>Posts</strong> {Object.keys(profile.posts || {}).length}
            </div>
          </div>
        </Card>
        <Card>
          <h3>Latest threads started</h3>
          <div>
            {
              startedThreads.concat([]).reverse().map(({ key, value: thread}) => {
                return (
                  <Link to={`/board/${thread.boardId}/${key}`} key={key} className={styles.threadLink}>
                    {thread.title}
                  </Link>
                )
              })
            }
          </div>
        </Card>
      </div>
    )
  }
}

export default styles({
  profileImage: {
    width: "80px",
    height: "80px",
    borderRadius: "40px",
    display: "inline-block",
    verticalAlign: "top",
    marginRight: "20px"
  },
  profileContainer: {
    display: "inline-block"
  },
  threadLink: {
    display: "block"
  }
}, bindings(["profile", "profileThreadsStarted"])(Profile))
