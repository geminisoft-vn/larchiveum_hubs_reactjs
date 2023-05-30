import uuid from "uuid/v4";
import axios from "axios";

import jwtDecode from "jwt-decode";

export default class AuthChannel {
  constructor(store) {
    this.store = store;
    this.socket = null;
    this._signedIn = !!this.store.state.credentials.token;
  }

  setSocket = socket => {
    this.socket = socket;
  };

  get email() {
    return this.store.state.credentials.email;
  }

  get signedIn() {
    return this._signedIn;
  }

  signOut = async hubChannel => {
    if (hubChannel) {
      await hubChannel.signOut();
    }
    this.store.update({ credentials: { token: null, email: null } });
    await this.store.resetToRandomDefaultAvatar();
    this._signedIn = false;
  };

  verifyAuthentication(authTopic, authToken, authPayload) {
    const channel = this.socket.channel(authTopic);
    return new Promise((resolve, reject) => {
      channel.onError(() => {
        channel.leave();
        reject();
      });

      channel
        .join()
        .receive("ok", () => {
          channel.on(
            "auth_credentials",
            async ({ credentials: token, payload: payload }) => {
              await this.handleAuthCredentials(payload.email, token);
              let _token = authTopic.split(":")[1];
              const decodedToken = jwtDecode(_token);
              if (decodedToken) {
                const { id } = decodedToken;
                await axios({
                  method: "PUT",
                  url: `https://api.larchiveum.link/v1/users/${id}`,
                  data: {
                    token
                  },
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
              }

              resolve();
            }
          );

          channel.push("auth_verified", {
            token: authToken,
            payload: authPayload
          });
        })
        .receive("error", reject);
    });
  }

  async startAuthentication(email, hubChannel) {
    const channel = this.socket.channel(`auth:${uuid()}`);
    await new Promise((resolve, reject) =>
      channel
        .join()
        .receive("ok", resolve)
        .receive("error", reject)
    );

    const authComplete = new Promise(resolve =>
      channel.on("auth_credentials", async ({ credentials: token }) => {
        await this.handleAuthCredentials(email, token, hubChannel);
        resolve();
      })
    );

    channel.push("auth_request", { email, origin: "hubs" });

    // Returning an object with the authComplete promise since we want the caller to wait for the above await but not
    // for authComplete.
    return { authComplete };
  }

  async handleAuthCredentials(email, token, hubChannel) {
    this.store.update({ credentials: { email, token } });

    if (hubChannel) {
      await hubChannel.signIn(token);
    }

    this._signedIn = true;
  }
}
