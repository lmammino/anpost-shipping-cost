# anpost-shipping-cost

A simple Node.js script that fetches shipping costs from the [AnPost](http://anpost.ie/) website.

I built this to scratch my own itch, so it's not a generalized solution. But, in the spirit of Open Source, feel more than welcome to take what you need here and adjust it to your own needs.


## Requirements

Requires a modern version of Node.js (v16+).


## Usage

Clone the repository and then, from your command line:

```bash
node anpost-shipping-cost.js
```

If you see the error `Unauthorized request. You need to update the \`cookie\` and the \`x-requestverificationtoken\` headers`, it means my original session has expired.

To get a new session, you need to visit [AnPost](http://anpost.ie/) to get the "authorization code" and "cookies" (after giving the cookie consent).


### Getting the authorization code

To get the authorization code, open the developer tools in your browser and search for `token`.

You should land in a `script` tag that contains a value called `appMyAccLoginAFToken`. That's your authorization code!

![How to get the authorization code from Anpost.ie](/docs/request-verification-token.png)


### Getting cookies

To get the cookies, once you have approved the cookie consent banner in your browser, open the developer tools and go to the network tab. Refresh the page, filter by "Doc" and then select the "www.anpost.com" request (generally the first one).

If you look in "Request Headers" you should see the `cookie` header. That's the value you need to copy.

![How to get the cookie from Anpost.ie](/docs/cookies.png)


### Updating the code

Once you have these two values you can update them in [`config.js`](/config.js).


### Example data

If all went well, the resulting output should look like the sample data in [`data-2022-11-11.csv`](/data-2022-11-11.csv).


## Contributing

Everyone is very welcome to contribute to this project. You can contribute just by submitting bugs or
suggesting improvements by [opening an issue on GitHub](https://github.com/lmammino/anpost-shipping-cost/issues) or [PRs](https://github.com/lmammino/anpost-shipping-cost/pulls).


## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.



