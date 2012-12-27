beam
=====

beam is a Google Chrome extension that runs periodic backups of your [Prismatic](http://www.getprismatic.com/) activity (shared, recommended and saved articles) to an HTTP end point of your choice. It does this by POST-ing a JSON representation of your Prismatic activity to the provided end point. If you're looking for a service to consume this JSON, and say, store it in MongoDB, consider running [pscribe](http://github.com/aniv/pscribe/), a simple Node.js service designed to do just that.