/*
  Adapted from Michael Bauer's https://github.com/mihi-tr/sphinx-glossary-js
  TODO: Support mousing from the term to the pop-up, which sometimes has links.
        Dismiss with esc-, or on triggering other terms instead of on mouseout?
*/
function Glossary() { 
  if (!(this instanceof Glossary)) { 
    return new Glossary(); }
  var instance =this;
  }

Glossary.popup=function(obj) { 
  var keyword = $(obj).data('keyword') || obj.textContent;
  var slug = '#term-'+keyword.toLowerCase().replace(/[^a-z0-9-]/,'-');
  data=Glossary.data;
  $('body').append('<div id="glossarypopup"></div>');
  $('#glossarypopup').append($(slug,data));
  $('#glossarypopup').append($(slug,data).next());
  $('#glossarypopup').css('top',obj.offsetTop+20);
  $('#glossarypopup').css('left',obj.offsetLeft);
}

Glossary.init = function (url, selector) {
  Glossary.url=url;
  $.get(url,function(data) {
    Glossary.data=data })
    
    Glossary.rescan(selector);
  }

Glossary.rescan = function (selector) {
    $(selector).off("mouseover.glossary");
    $(selector).on("mouseover.glossary", function() { Glossary.popup(this) });

    $(selector).off("mouseout.glossary");
    $(selector).on("mouseout.glossary", function() { $('#glossarypopup').remove() });
}  
