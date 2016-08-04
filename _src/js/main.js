var affixElement = '#gpes-menu-container';

$(affixElement).affix({
  offset: {
    // Distance of between element and top page
    top: function () {
      return (this.top = $(affixElement).offset().top)
    },
    // when start #footer 
    bottom: function () {
      return (this.bottom = $('#gpes-footer').outerHeight(true))
    }
  }
});