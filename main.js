(function () {

  var bv = new Bideo();
  bv.init({

    videoEl: document.querySelector('#background_video'),

    container: document.querySelector('body'),

    resize: true,

    isMobile: window.matchMedia('(max-width: 768px)').matches,

    src: [
      {
        src: 'night.mp4',
      },
    ],

    onLoad: function () {
      document.querySelector('#video_cover').style.display = 'none';
    }
  });
}());
