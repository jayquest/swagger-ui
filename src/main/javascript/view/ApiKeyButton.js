'use strict';

SwaggerUi.Views.ApiKeyButton = Backbone.View.extend({ // TODO: append this to global SwaggerUi

  events:{
    'click #apikey_button' : 'toggleApiKeyContainer',
    'click #apply_api_key' : 'applyApiKey'
  },

  initialize: function(opts){
    this.options = opts || {};
    this.router = this.options.router;
  },

  render: function(){
    var template = this.template();
    $(this.el).html(template(this.model));

    return this;
  },


  applyApiKey: function(){
    var keyAuth = new SwaggerClient.ApiKeyAuthorization(
      this.model.name,
      $('#input_apiKey_entry').val(),
      this.model.in
    );
    this.router.api.clientAuthorizations.add(this.model.name, keyAuth);
    this.router.load();
    $('#apikey_container').show();
  },

  toggleApiKeyContainer: function(event){
    event.stopPropagation();
    if ($('#apikey_container').length) {

      var elem = $('#apikey_container').first();
      var shadow = $('#shadow').first();

      if (elem.is(':visible')){
        elem.hide();
        shadow.hide();
      } else {
        jQuery('.auth_container').unbind('click');
        $('.auth_container').hide();

        elem.show();
        shadow.show();
        jQuery('.auth_container').click(this.toggleApiKeyContainer).children().click(function(e){
          e.stopPropagation();
        });
      }
    }

  },

  template: function(){
    return Handlebars.templates.apikey_button_view;
  }

});
