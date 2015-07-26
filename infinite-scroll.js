Images = new Mongo.Collection('images');

if (Meteor.isClient) {
    angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);

    Meteor.startup(function() {
        angular.bootstrap(document, ['scroll-demo']);
    });
}

if (Meteor.isServer) {
    if (!Images.find().count()) {
        for (var i = 0; i < 1000; i++) {
            Images.insert({
                index: i
            });
        }
    }

    Meteor.publish('images', function(opts) {
        return Images.find({}, {
            skip: opts.skip,
            limit: opts.limit
        });
    });
}
