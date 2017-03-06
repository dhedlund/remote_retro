/* eslint-disable react/jsx-filename-extension */

import React from "react"
import ReactDOM from "react-dom"
import { AppContainer } from "react-hot-loader"

import RemoteRetro from "./components/remote_retro"
import RetroChannel from "./services/retro_channel"

const retroChannelConfiguration = {
  userToken: window.userToken,
  retroUUID: window.retroUUID,
}

const retroChannel = RetroChannel.configure(retroChannelConfiguration)
const reactRoot = document.querySelector(".react-root")

const render = component => {
  ReactDOM.render(
    <AppContainer>
      <RemoteRetro retroChannel={retroChannel} />
    </AppContainer>,
    reactRoot
  )
}

render(RemoteRetro)

if (module.hot) {
  module.hot.accept("./components/remote_retro", () => {
    render(RemoteRetro)
  })
}
