# MVP

## Design

- [ ] [Add Logo](https://github.com/CodingGarden/listd/issues/5#issuecomment-1744993170)

## Features

- [x] Page Transitions with @pablopang
- [x] Add Icon Library
  - [x] Put Icons on all Action Buttons
- [x] List Create / Edit Page
  - [x] detect changes in form
  - [x] Prevent navigation if unsaved changes
  - [x] Disable update / save button if no changes 
- [x] List permissions / auth
  - [x] Private lists can only be viewed by the creator
- [ ] List Page
  - [x] Access list via slug
  - [ ] Share list / copy URL to clipboard 
  - [ ] Previous / Next Buttons
  - [ ] Infinite scroll / pagination / lazy loading
  - [ ] On video end, play next video
    - [ ] Loop back to beginning if we reach the end
  - [ ] List Sort / Filters
    * [ ] Views
    * [ ] Newest / Oldest
    * [ ] Likes
    * [ ] Random / Feeling Lucky
    * [ ] Toggle
      * [ ] Shorts
      * [ ] Videos
      * [ ] Live-streams
    * [ ] Duration
      * [ ] Min
      * [ ] Max
    * [ ] Toggle Channels in List
    * [ ] Show 1 video from each channel at a time...
  - [ ] Channel cache refresh button
  - [ ] Show last updated time / cache time for each channel
- [ ] Landing Page / Features
- [ ] Limits
  - [ ] Max number of lists per user
  - [ ] Max number of channels per list
- [ ] Users can favorite a list
- [ ] Show favorited lists on user dashboard
- [ ] Fork an existing list
- [ ] Public user profile page
  - [ ] Show public lists
- [ ] User Preferences
  - [ ] Volume
  - [ ] Video Speed
  - [ ] Autoplay
- [ ] Message Queue
  - [ ] Seperate Service that receives requests for Cacheing
    - [ ] Calls YT API, updates cache
  - [ ] SvelteKit app -> put messages into the queue requesting caching

## Architecture

- [ ] Message Queues
  * [ ] Explore:
    - Redis
      - pub / sub
      - flags

## Metrics

- [ ] Analytics Service
- [ ] Error Reporting

## Legal

- [ ] Terms of Service
- [ ] GDPR
- [ ] Privacy Policy

## Bugs

- [ ] Firefox tab navigation
- [ ] Redirect to homepage on logout