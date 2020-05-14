import React, {Component} from "react";

class Comment extends Component {
    render() {
        return (
            <div className="chat">
                <ul className="chat__posts">
                    <li>
                        <img src="/assets/avatars/256px/1.png" alt="avatar" className="photo"/>
                        <div className="chat__posts__post__message">
                            <strong>Mildred Wilson</strong>
                            <span className="chat__posts__post__time">4 hours ago</span>
                            <p className="chat__posts__post__content">
                                Really appreciate the
                                <a
                                    className="mention"
                                    data-mention="#vegetarian"
                                    href="https://example.com/social/vegetarian">#vegetarian</a>
                                and
                                <a
                                    className="mention"
                                    data-mention="#vegan"
                                    href="https://example.com/social/vegan">#vegan</a> variations of your recipes. So thoughtful of you! 🌱
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Comment;