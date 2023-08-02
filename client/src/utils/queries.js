import { gql } from "@apollo/client";

export const QUERY_GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      _id
      username
      email
    }
  }
`;

// Query to get a user by Username
export const QUERY_USER_BY_USERNAME = gql`
  query GetUserByUsername($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

// Query to get a chat by its ID
export const QUERY_CHAT_BY_ID = gql`
  query getChatById($chatId: ID!) {
    getChatById(chatId: $chatId) {
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

// Query to get a message by its ID
export const QUERY_MESSAGE_BY_ID = gql`
  query getMessageById($messageId: ID!) {
    getMessageById(messageId: $messageId) {
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
      }
      content
      createdTime
    }
  }
`;
export const QUERY_COMMENTS_BY_USERNAME = gql`
  query GetCommentsByUsername($username: String!) {
    comments(username: $username) {
      _id
      user {
        _id
        username
        email
      }
      content
      createdAt
    }
  }
`;

export const QUERY_COMMENT_BY_ID = gql`
  query GetCommentById($commentId: ID!) {
    comment(_id: $commentId) {
      _id
      user {
        _id
        username
        email
      }
      content
      createdAt
    }
  }
`;

export const QUERY_ALL_PLAYLISTS = gql`
  query GetAllPlaylists {
    playlists {
      _id
      title
      description
      owner {
        _id
        username
        email
      }
      tracks {
        _id
        title
        artist
        album
        duration
        uri
        imageUrl
      }
    }
  }
`;

export const QUERY_PLAYLIST_BY_ID = gql`
  query GetPlaylistById($playlistId: ID!) {
    playlist(playlistId: $playlistId) {
      _id
      title
      description
      owner {
        _id
        username
        email
      }
      tracks {
        _id
        title
        artist
        album
        duration
        uri
        imageUrl
      }
    }
  }
`;

export const QUERY_ALL_TRACKS = gql`
  query GetAllTracks {
    tracks {
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

export const QUERY_TRACK_BY_ID = gql`
  query GetTrackById($trackId: ID!) {
    track(_id: $trackId) {
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

export const QUERY_MESSAGES_IN_CHAT = gql`
  query GetMessagesInChat($chatId: ID!) {
    chat(chatId: $chatId) {
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
