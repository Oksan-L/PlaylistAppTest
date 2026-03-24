import { test, expect } from '@playwright/test';
import { PlaylistPage } from '../pages/PlaylistPage';
import { TRACKS } from '../constants/tracks';
import { convertTimeToSeconds } from '../utils/timeConverter';

test.describe('Core Functionality', () => {
  let playlistPage;

  test.beforeEach(async ({ page }) => {
    playlistPage = new PlaylistPage(page);
    await playlistPage.goto();
  });

  test('TC-01: Verify Search Filtering', async () => {
    // Use a specific track for testing, e.g., "Summer Breeze"
    const searchTrack = TRACKS.SUMMER_BREEZE;
    const singleLetter = searchTrack.name[0];

    await test.step(`Type specific track name: "${searchTrack.name}". The written track name completely matches the expected one. "`, async () => {
      await expect(playlistPage.searchInput).toBeVisible();
      await playlistPage.search(searchTrack.name);
      await expect(playlistPage.searchInput).toHaveValue(new RegExp(searchTrack.name, 'i')); // Case-insensitive сheck
    });

    await test.step('Only tracks containing the search track name are displayed.', async () => {
      const results = await playlistPage.getVisibleTrackNames();
      expect(results.length).toBeGreaterThan(0);

      for (const name of results) {
        expect(name).toMatch(new RegExp(searchTrack.name, 'i')); // Case-insensitive check
      }
    });

    await test.step(`Clear search and type one letter: "${singleLetter}"`, async () => {
      await playlistPage.search('');
      await playlistPage.search(singleLetter);
      await expect(playlistPage.searchInput).toHaveValue(new RegExp(singleLetter, 'i')); // Case-insensitive check
    });

    await test.step('Only tracks containing the search letter are displayed.', async () => {
      const results = await playlistPage.getVisibleTrackNames();
      expect(results.length).toBeGreaterThan(0);

      for (const name of results) {
        expect(name).toMatch(new RegExp(singleLetter, 'i')); // Case-insensitive check
      }
    });
  });

  test('TC-02: Add Track via "+" Button', async () => {
    const trackToAdd = TRACKS.SPRING_DANCE;

    await test.step(`Identify a track in the main list and click the "+" button located next to track: ${trackToAdd.name}`, async () => {
      await expect(playlistPage.trackListSection).toBeVisible();
      await expect(playlistPage.trackAddButton(trackToAdd.name)).toBeVisible();
      await expect(playlistPage.trackAddButton(trackToAdd.name)).toBeEnabled();
      await playlistPage.trackAddButton(trackToAdd.name).click();
    });

    await test.step('The selected track appears in the "Your Playlist" section', async () => {
      await expect(playlistPage.playlistSection).toBeVisible();
      await expect(playlistPage.playlistTrackNames).toContainText(trackToAdd.name);
    });
  });

  test('TC-03: Verify Total Playlist Duration', async () => {
    const tracksToTest = [TRACKS.SUMMER_BREEZE, TRACKS.RAINY_MOOD];
    let expectedTotalSeconds = 0;

    await test.step(`Add two tracks to "Your Playlist" and calculate expected sum. Tracks: ${tracksToTest.map(t => t.name).join(", ")}`, async () => {
      for (const track of tracksToTest) {
        // Get the duration string from the UI for the track 
        const durationStr = await playlistPage.getTrackDuration(track.name);
        const seconds = convertTimeToSeconds(durationStr);
        expectedTotalSeconds += seconds;
        // Add the track to the playlist
        await playlistPage.addTrack(track.name);
      }
      // Verify that the correct number of tracks is added to the playlist
      const countInPlaylist = await playlistPage.playlistTrackNames.count();
      expect(countInPlaylist).toBe(tracksToTest.length);
    });

    await test.step('The UI displays the correct total sum matching the manual calculation', async () => {
      await expect(playlistPage.totalDurationValue).toBeVisible();
      const actualDurationText = await playlistPage.totalDurationValue.innerText();
      const actualTotalSeconds = parseInt(actualDurationText, 10);
      expect(actualTotalSeconds).toBe(expectedTotalSeconds);
    });
  });

});