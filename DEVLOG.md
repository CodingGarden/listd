# Today

* [x] Containerize tests
* [ ] More integration tests
  * [x] Run tests / containers while dev containers are still running
  * [x] Seed DB with unique users for each type of test
  * [x] TODO: make a watch specific config
    * [x] Watch for only test updates
  * [ ] Tests:
    * [x] Search for YT channels
    * [x] Add YT channel to List
    * [x] Create List
    * [-] View List
      * [ ] View individual List
    * [ ] Edit List
    * [ ] Navigating Lists
    * [ ] Update contributing guide...
      * [ ] Running tests in watch mode...
      * [ ] Debugging tests in watch mode...
      * [ ] Exporting data to be seeded for tests
    * [ ] Coverage Reports
      * [ ] Generate outside container (volume)
* [ ] Configure unit tests
* [ ] Allow "debug" mode for e2e test
  * [ ] quicker iteration without starting from scratch everytime

# Upcoming

* [ ] List edit / update page
* [ ] Update readme with tech stack
* [ ] List create UX
  * [ ] Only show channel avatar
    * [ ] Click to expand
      * [ ] Reveals channel name
      * [ ] Reveals remove button
    * [ ] Show name on hover
  * [ ] 2 column layout on desktop
## TBD

- [ ] Deploy???
  - [ ] Database???
    - Free Tier
      - Serverless / Edge Function Support...
        - Connection Pooling
      - Fly.io
      - Railway
      - Supabase
      - Render
      - ElephantSQL
    - Paid
      - Heroku
      - AWS RDS
  - [ ] App?? - Vercel

# Past

* [x] Merge PRs
* [x] Update dependencies
* [x] Testing todos:
  * [x] Fix tests on CI
    * [x] Docker / prisma test setup
  * [x] Configure e2e tests
  * [x] Seed DB
    * [x] Generate user token during test (do not do oauth flow during test...)
  * Anything else that comes up...
* [x] Update dependencies
  * [x] Minor / Patch bump
  * [x] Major bump
* [x] Review PRs and issues
* [x] Create page form styles
  * [x] Channel card styles
* [x] Update the List page styles
* [x] Update DB schema  
  * Last updated
  * More metadata
    * Include Channel Image
    * Include Channel handle
    * Number of subscribers
    * Verified badges
* [x] More robust YT API Response
* [x] Lazy load embedded video and thumbnails
* [x] Cache YT API Response
  * [x] Get ALL videos of each channel
  * [x] Get ALL video info of each video
    * [x] View Count
    * [x] Length / Duration
    * [x] Like Count
* [x] Fix YT Video order (latest by default...)
* [x] List Page Styles
  * [x] Fix video titles
* [x] Single Video Page

## 2023-03-10

- [x] Upgrade Auth.js
- [x] Upgrade Skeleton UI
- [x] Wireframe create list page
- [x] Create list page
  * [x] Set title
  * [x] Set Descriptio

## 2023-02-03

- [x] Review PRs
- [x] Eslint / Airbnb / Prettier Setup...

## 2023-01-27

- [x] Review PRs
  - [x] Tailwind bug fix
  - [x] Contributing Guide
- [x] Setup i18n
  - [x] Research options
  - [x] Install / setup
  - [x] Use dictionaries on landing page
