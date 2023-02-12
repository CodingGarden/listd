# LISTD Media

An app that will allow users to create, share and watch lists of YouTube channels.

## Setup

First move `.env.example` to `.env`

###  Getting Google OAuth API Credentials

1. Visit the [Google Cloud Console](https://console.developers.google.com/apis/credentials)
2. Go to the OAuth consent screen tab, fill first step leaving the rest blank and click Save. This will create a project for you
3. Now Publish your OAuth consent screen App.
4. Go to the [Credentials tab](https://console.cloud.google.com/apis/credentials) and click Create Credentials -> OAuth Client ID
   * Choose Web Application
   * Add `http://localhost:5173` to the Authorized JavaScript origins
   * Add `http://localhost:5173/auth/callback/google` to the Authorized redirect URIs.
   * Click Create.
5. Copy the Client ID and Client Secret and paste them into the `.env` file.