import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;
export const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($title: String!, $description: String) {
    createPlaylist(title: $title, description: $description) {
      _id
      title
      description
      owner {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_TRACK_TO_PLAYLIST = gql`
  mutation AddTrackToPlaylist(
    $playlistId: ID!
    $title: String!
    $artist: String!
    $album: String!
    $duration: Int!
    $uri: String!
    $imageUrl: String
  ) {
    addTrackToPlaylist(
      playlistId: $playlistId
      title: $title
      artist: $artist
      album: $album
      duration: $duration
      uri: $uri
      imageUrl: $imageUrl
    ) {
      _id
      title
      artist
      album
      duration
      uri
      imageUrl
    }
  }
`;
export const ADD_COMMENT = gql`
  mutation AddComment($user: String, $content: String!, $createdAt: String!) {
    addComment(user: $user, content: $content, createdAt: $createdAt) {
      _id
      user
      content
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($commentId: ID!) {
    removeComment(commentId: $commentId) {
      _id
      user
      content
      createdAt
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat($users: ID!) {
    createChat(users: $users) {
      _id
      users {
        _id
        username
        email
      }
      messages {
        _id
        sentBy {
          _id
          username
          email
        }
        content
        createdTime
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: ID!, $sentBy: ID!, $content: String!) {
    sendMessage(chatId: $chatId, sentBy: $sentBy, content: $content) {
      _id
      sentBy {
        _id
        username
        email
      }
      chat {
        _id
        users {
          _id
          username
          email
        }
        messages {
          _id
          sentBy {
            _id
            username
            email
          }
          content
          createdTime
        }
      }
      content
      createdTime
    }
  }
`;
