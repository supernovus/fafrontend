/**
 * Article Feed Backend API
 */

Backend.prototype.getFeed = function (page, filter) {
  var url = '/articles';
  
  if (filter.user)
    url += '/user/' + filter.user;
  else if (filter.tag)
    url += '/tag/' + filter.tag;

  url += '/' + page;

  this.sendRequest('GET', url);
}

/* End of backend/feed.js */
