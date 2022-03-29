# Things to do

- Create a short description based on the first line of what's written in the article
- Add a page for user posts to see all user posts paginated
- Maybe expose some login functions for soul-utils so that it can be used in `getServerSideProps`
- Add Meili search to the deployment -> consider spinning up a new instance 🤔
- Add CSS styling and some javascript into the IPFS webpages
- Adjust the font size accordingly and change the font style
  - Make scroll follow the cursor
- Add import plugin for eslint
- Add an option for folks to pin the article forever
  - Add a quota to the number of articles they can pin
- Add IPFS docker to soul-network https://dokku.com/docs~v0.23.9/deployment/methods/images/#deploying-from-a-docker-registry
- Consider using firebase to store some of the user information for this platform
- Improve the login experience, store user credentials in the cookies so we don't see the flicker
- Beautify readme

## Misc

- Add syntax highlighting to RichTextEditor
- Consider adding an email notification for when the article is available
- add tests for the react-soul-utils package
- Consider adopting this pattern for authentication https://nextjs.org/docs/authentication#authenticating-server-rendered-pages
  - We need to expose some of the methods used for authenticating here
