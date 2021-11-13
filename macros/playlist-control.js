// Requires backend-music to work
let availablePlaylists = ''
let currentlyPlaying = ''
let toChange;

[...game.playlists].forEach((value, key) => {
  availablePlaylists += `
    <option value="${key}">
      ${value.name} - ${value.data?.playing ? '▶️' : '⏸️'}
    </option>`

  if (value.data?.playing) {
    let playing;
    [...value.data.sounds].forEach((v) => {
      if (v.data.playing) {
        playing = v.data?.name
      }
    })
    currentlyPlaying += `<li>${value.name} - ${playing}</li>`
  }
})

new Dialog({
  title: 'Playlist Control',
  content: `
    <form>
      <div class="form-group">
        <label>Select Playlist:</label>
        <select id="playlist-selection" name="playlist-selection">${availablePlaylists}</select>
      </div>
      ${currentlyPlaying ? `
        </br>
        <div class="currently-playing">
          Currently playing playlists & songs:
          <ul>${currentlyPlaying}</ul>
        </div>
        ` : ''}
    </form>`,
  buttons: {
    one: {
      icon: '<i class="fas fa-play"></i>',
      label: 'Toggle Playlist',
      callback: () => { toChange = 'playlist-toggle' },
    },
    two: {
      icon: '<i class="fas fa-forward"></i>',
      label: 'Next Track',
      callback: () => { toChange = 'playlist-next' },
    },
    three: {
      icon: '<i class="fas fa-times"></i>',
      label: 'Cancel',
    },
  },
  default: 'Cancel',
  close: (html) => {
    if (toChange) {
      const playlistIndex = html.find("select[name='playlist-selection']").val()
      const playlist = game.playlists.contents[playlistIndex]

      if (toChange === 'playlist-next' && playlist.playing === false) {
        ui.notifications.error('Playlist isn\'t playing.')
        return
      }

      if (playlist) {
        ChatMessage.create({ content: `/backend-music ${toChange} "${playlist.name}"` })
      } else {
        ui.notifications.error('No valid playlist selected.')
      }
    }
  },
}).render(true)
