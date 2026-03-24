# Test Cases for Playlist App

This document outlines the core test cases for validating the Playlist App's UI functionality.

## Test Suite: Core Functionality

### TC-01: Verify Search Filtering
**Description:** Ensure the search input correctly filters tracks in the list.
- **Preconditions:** App is loaded; multiple tracks are visible.
- **Steps:**
  1. Locate the search input field.
  2. Type a **specific track name** (e.g., "Summer Breeze").
  3. Observe the displayed track list.
  4. Type **one letter** in the search field.
  5. Observe the displayed track list.
- **Expected Results:** 
  1. The search input field is visible.
  2. The written track name completely matches the expected one.
  3. Only tracks containing the search track name are displayed.
  4. The written letter completely matches the expected one.
  5. Only tracks containing the search letter are displayed.

---

### TC-02: Add Track via "+" Button
**Description:** Verify that clicking the "+" button moves a track to the "Your Playlist" section.
- **Preconditions:** "Your Playlist" is initially empty.
- **Steps:**
  1. Identify a track in the main list and click the "+" button located next to that track.
  2. Check the "Your Playlist" column.
- **Expected Results:** 
  1. The track list is visible, the "+" button is visible and clickable.
  2. The selected track appears in the "Your Playlist" section.

---

### TC-03: Verify Total Playlist Duration
**Description:** Validate that the total duration counter accurately sums up all added tracks in seconds.
- **Preconditions:** App is loaded.
- **Steps:**
  1. Add at least two tracks to "Your Playlist". Check the duration of each added track (e.g., "03:35", "03:15") and calculate the expected sum in seconds.
  2. Compare the calculated value with the "Total Duration" label in the UI.
- **Expected Results:** 
  1. Two tracks appeared in the "Your Playlist" section.
  2. The UI displays the correct total sum matching the manual calculation.