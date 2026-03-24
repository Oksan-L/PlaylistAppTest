export class PlaylistPage {
  constructor(page) {

    this.page = page;
    this.searchInput = page.getByLabel('Search');

    this.trackListSection = page.locator('#tracklist');
    this.trackNames = this.trackListSection.locator('.MuiGrid-grid-xs-4 p');

    this.playlistSection = page.locator('#playlist');
    this.playlistTrackNames = this.playlistSection.locator('.MuiGrid-grid-xs-4 p');

    this.totalDurationValue = page.locator('#playlist-duration');

    // Dynamic locators for tracks in the tracklist section
    this.trackRow = (name) =>
      this.trackListSection.locator('.MuiGrid-container').filter({ hasText: name });

    // Button to add a specific track to the playlist
    this.trackAddButton = (name) =>
      this.trackRow(name).getByRole('button', { name: '+' });

    // Duration label for a specific track in the playlist
    this.trackDurationLabel = (name) =>
      this.trackRow(name).locator('.MuiGrid-grid-xs-2 p');

    // Dynamic locators for tracks in the playlist section
    this.playlistRow = (name) =>
      this.playlistSection.locator('.MuiGrid-container').filter({ hasText: name });
  }

  async goto() {
    await this.page.goto('/');
  }

  async search(text) {
    await this.searchInput.fill(text);
  }

  async getVisibleTrackNames() {
    return await this.trackNames.allInnerTexts();
  }

  async addTrack(trackName) {
    await this.trackAddButton(trackName).click();
  }

  async getTrackDuration(trackName) {
    return await this.trackDurationLabel(trackName).innerText();
  }

}