import { PublicClientApplication } from "@azure/msal-browser";
import consola from "consola";
import { config } from "../Config/AuthConfig";

export default class MsalClient {
    private publicClientApplication: PublicClientApplication;

    constructor() {
        // Initialize the MSAL application object
        this.publicClientApplication = new PublicClientApplication({
            auth: {
                clientId: config.appId,
                redirectUri: config.redirectUri,
                authority: config.authority
            },
            cache: {
                cacheLocation: "sessionStorage",
                storeAuthStateInCookie: true
            }
        });
    };

  
    public async login() {
        try {
            // Login via popup
            await this.publicClientApplication.loginPopup(
                {
                    scopes: config.scopes,
                    prompt: "select_account"
                });

            // After login, get the user's profile
            return await this.getAccessToken(config.scopes);
        }
        catch (err) {
            consola.error(err);
        }
    }

    public async logout() {
        try {
           
            const userinfo = this.publicClientApplication.getAllAccounts()[0];
            const logoutRequest = {
                account: userinfo
            }
            await this.publicClientApplication.logout(logoutRequest);
        }
        catch (err) {
            consola.error(err);
        }
    }


    public async getAccessToken(scopes: string[]): Promise<string> {
        try {
            const accounts = this.publicClientApplication
                .getAllAccounts();

            if (accounts.length <= 0) throw new Error('login_required');
            // Get the access token silently
            // If the cache contains a non-expired token, this function
            // will just return the cached token. Otherwise, it will
            // make a request to the Azure OAuth endpoint to get a token
            var silentResult = await this.publicClientApplication
                .acquireTokenSilent({
                    scopes: scopes,
                    account: accounts[0]
                });

            return silentResult.accessToken;
        } catch (err) {
            // If a silent request fails, it may be because the user needs
            // to login or grant consent to one or more of the requested scopes
            if (this.isInteractionRequired(err)) {
                var interactiveResult = await this.publicClientApplication
                    .acquireTokenPopup({
                        scopes: scopes
                    });

                return interactiveResult.accessToken;
            } else {
                throw err;
            }
        }
    }
    isInteractionRequired(error: Error): boolean {
        if (!error.message || error.message.length <= 0) {
            return false;
        }

        return (
            error.message.indexOf('consent_required') > -1 ||
            error.message.indexOf('interaction_required') > -1 ||
            error.message.indexOf('login_required') > -1 ||
            error.message.indexOf('no_account_in_silent_request') > -1
        );
    }
}