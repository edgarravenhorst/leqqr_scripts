var LeqqrWidget = function(){
  return {
    buttons: document.querySelectorAll("button.leqqr"),
    slug: false,
    width:380,
    height:600,
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,

    init: function(){
      this.generate();

      for (var i = 0; i < this.buttons.length; i++) {
        var button = this.buttons[i]
        button.onclick = this.show.bind(this);
      }

      this.closeButtons = this.popup.querySelectorAll('.close');
      for (var i = 0; i < this.closeButtons.length; i++) {
        var button = this.closeButtons[i]
        button.onclick = this.hide.bind(this);
      }

      window.addEventListener("onresize", this.onresize.bind(this));
      window.onresize = this.onresize.bind(this);
    },

    show: function(e){
      document.documentElement.className += ' leqqr-disable-scroll';
      if(this.slug != e.currentTarget.dataset.name){
        this.slug = e.currentTarget.dataset.name;
        this.popup.querySelector('iframe').src = this.get_iframe_url();
      }

      this.popup.className = 'leqqr-popup visible';
    },

    hide: function(e){
      document.documentElement.className = document.documentElement.className.replace("leqqr-disable-scroll", "");
      document.body.style.overflow = 'auto';
      this.popup.className = 'leqqr-popup';
    },

    generate: function(){
      if(this.isIOS) document.documentElement.className += ' is_ios';

      this.slug = this.buttons[0].dataset.name;
      this.popup = document.createElement('section');
      this.popup.className = 'leqqr-popup';
      this.popup.innerHTML = '<div class="bg"></div>'
      + '<section class="box">'
      + '<section class="inner">'
      + '<iframe scrolling="yes" src="' + this.get_iframe_url() + '"></iframe>'
      + '</section>'
      + '<footer>'
      + '<a class="branding" target="_blank" href="http://www.leqqr.nl/">Powered by www.leqqr.nl</a>'
      + '<a class="close" href="#close">Sluiten</a>'
      + '</footer>'
      + '</section>';
      document.body.appendChild(this.popup);
      this.onresize();
    },

    onresize:function(){
      var box = this.popup.getElementsByClassName('box')[0];
      if(window.innerWidth > 420){
        box.style.top = "50%";
        box.style.left = "50%";
        box.style.marginTop = -this.get_height()/2 + 'px';
        box.style.marginLeft = -this.get_width()/2 + 'px';
        box.style.maxWidth = this.get_width() + "px";
        box.style.maxHeight = this.get_height() + "px";
      }else{
        box.style.top = 0;
        box.style.left = 0;
        box.style.margin = 0;
        box.style.maxWidth = "none";
        box.style.maxHeight = "none";
      }
    },

    get_iframe_url: function() {
      if(!this.slug) console.error('Leqqr-error: "data-name" is required on <button>')
      return "http://iframe.leqqr.nl/" + this.slug;
    },

    get_width: function() {
      var width = window.innerWidth > this.width ? this.width : window.innerWidth - 50;
      return width;
    },

    get_height: function() {
      var height = window.innerHeight > this.height ? this.height : window.innerHeight - 50;
      return height;
    }
  }
}

var leqqrWidget = new LeqqrWidget();
leqqrWidget.init();

var cssId = 'leqqr-styles';
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://scripts.leqqr.nl/v1/widget/css/leqqr.css';
    link.media = 'all';
    head.appendChild(link);
}
