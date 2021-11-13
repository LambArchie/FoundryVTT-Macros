const type = args[0]
const details = args[1]
const playlist = game.collections.getName('Playlists').getName(details)

if (!(type && details && playlist)) {
  console.log('Error setting inital variables in backend-music', args, playlist) // eslint-disable-line no-console
  ChatMessage.create({ content: "[Macro backend-music] Passed parameters not recognised or playlist doesn't exist" })
  return
}

switch (type) {
  case 'playlist-toggle':
    if (playlist.playing) {
      playlist.stopAll()
    } else {
      playlist.playAll()
    }
    break
  case 'playlist-next':
    if (playlist.playing) {
      playlist.playNext()
    }
    break
  default:
    console.log('Error using command type in backend-music', args, playlist) // eslint-disable-line no-console
    ChatMessage.create({ content: '[Macro backend-music] Passed command type not recognised' })
    break
}
