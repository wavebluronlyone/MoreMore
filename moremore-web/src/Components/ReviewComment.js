import React from "react";
import { Comment } from "semantic-ui-react";
import profile from "../Image/profile.png";

const ReviewComment = props => (
  <div>
    {props.commentList.map(commentUser => {
      return (
        <Comment>
          <Comment.Avatar src={profile} />
          <Comment.Content>
            <Comment.Author as="a">{commentUser.user}</Comment.Author>
            <Comment.Metadata>
              <div>{commentUser.dateString}</div>
            </Comment.Metadata>
            <Comment.Text>{commentUser.comment}</Comment.Text>
          </Comment.Content>
        </Comment>
      );
    })}
  </div>
);

export default ReviewComment;
