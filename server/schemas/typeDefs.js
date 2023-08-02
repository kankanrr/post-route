const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }


  type Comment {
    _id: ID
    user: User
    content: String
    createdAt: String
  }
  type Playlist {
    _id: ID!
    title: String!
    description: String
    owner: User!
    tracks: [Track!]!
  }

  type Track {
    _id: ID!
    title: String!
    artist: String!
    album: String!
    duration: Float!
    uri: String!
    imageUrl: String
  }
  type Message {
    _id: ID
    sentBy: User
    chat: Chat
    createdTime: String
    content: String!
  }

  type Chat {
    _id:ID
    users: [User]
    messages: [Message]
  }

 type Auth {
    token: String!
    user: User!
  }
  type Contact{
    _id:ID
    users:[User]
  }
  type Query {
    users: [User]
    user(username: String!): User
    comments(username: String!): [Comment] 
    comment(_id: ID!): Comment
    playlist(_id: ID): Playlist
    me: User
    contacts:[User]
  }

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(username: String!, password: String!): Auth! 
  postComment(userId: ID!, content: String!): Comment
  createPlaylist(title: String!, description: String): Playlist
    addTrackToPlaylist(
      playlistId: ID!
      title: String!
      artist: String!
      album: String!
      duration: Float!
      uri: String!
      imageUrl: String
    ): Track
  createChat(users: [ID]): Chat
  sendMessage(chatId: ID!, sentBy: ID!, content: String!): Message
}
  `;

module.exports = typeDefs;
