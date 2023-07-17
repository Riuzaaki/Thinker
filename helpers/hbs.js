// this file contains all the helpers
const moment = require('moment')

// helper for date format 
module.exports = {

formatDate: function (date , format){
    return moment(date).utc().format(format)
},

// if the story is too long , truncate it to fit in the card
truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + ' '
      new_str = str.substr(0, len)
      new_str = str.substr(0, new_str.lastIndexOf(' '))
      new_str = new_str.length > 0 ? new_str : str.substr(0, len)
      return new_str + '...'
    //   adds '...' to signify that there's more
    }
    return str
  },

  //this helper is to replace the <p> etc tags with nothing
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '')
  },

  editIcon: function (storyUser, loggedUser, storyId, floating = true) {
    if (storyUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
      } else {
        return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
      }
    } else {
      return ''
    }
  },

  // helper to select accordingly (private for private stories, public for public stories)
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp('>' + selected + '</option>'),
        ' selected="selected"$&'
      )
  },

}