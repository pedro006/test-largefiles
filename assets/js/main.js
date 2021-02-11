// ON FIRST LOAD //
introAnimation();
window.onload = (event) => {
  //console.log('first load / refreshed')
  init();
  menuInit();
};

//

// INTRO ANIMATION //

function introAnimation() {
  //console.log('intro animation: starting')

  if (window.location.pathname === '/') {
    //console.log('intro animation: page is home')
    document.querySelector('.intro-animation').classList.remove('hidden');
    document.querySelector('.intro-animation').classList.add('active-animation');

    document.querySelector('body').classList.add('overflow-hidden');
    // LOTTIE ANIMATION //
    const anim = lottie.loadAnimation({
      container: document.querySelector('.lottie-animation'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'assets/cla_animation.json'
    });
    lottie.setSpeed(1.75);

    anim.onComplete = function (evt) {

      document.querySelector('body').classList.remove('overflow-hidden');
      document.querySelector('.intro-animation').classList.remove('active-animation');
      setTimeout(() => {
        document.querySelector('.intro-animation').classList.add('hidden');
      }, 500);
    };

  }

}

// SWUP //

var options = {
  linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
  containers: ["#swup"],
  plugins: [
    new SwupScrollPlugin({ doScrollingRightAway: false, animateScroll: false }),
    new SwupHeadPlugin()
  ],
  animateHistoryBrowsing: true
};
const swup = new Swup(options);
swup.on('pageView', init);
swup.on('willReplaceContent', unload);

// MENU //

function menuInit() {

  var menuContainer = document.querySelector('.menu-container');
  var menuModule = document.querySelector(".menu-module");
  var openmenu = document.querySelector(".open-menu")
  var closemenu = document.querySelector(".close-menu")
  var menu = document.querySelector(".menu")
  var logoShort = document.querySelector(".logo-short")
  var logo = document.querySelector(".logo")
  var logoDark = document.querySelector('.logo-dark')
  var menuLinks = document.querySelectorAll('.project-grid-link, .menu-top a, .menu a:first-of-type');
  var menuAnimEl = document.querySelectorAll('.menu-top, .menu-bottom');
  openmenu.onclick = openNav;
  closemenu.onclick = closeNav;
  for (i = 0; i < menuLinks.length; i++) {
    menuLinks[i].onclick = closeNav;
  }
  /* Open */
  function openNav() {
    menuContainer.classList.add('open-nav')
    menuModule.scrollTo(0, 0);

    document.querySelector('body').style.overflow = "hidden";

    setTimeout(function () {
      fadeMenu()
    }, 300);
  }
  /* Close */
  function closeNav() {
    fadeOutMenu()

    document.querySelector('body').style.overflow = "auto";
    setTimeout(function () {
      menuContainer.classList.remove('open-nav')
    }, 300);
  }

  function fadeMenu() {
    $(menuAnimEl).each(function (index) {
      $(this).delay(300 * index).queue(function (next) {
        $(this).css('opacity', '1');
        next();
      });
    });
  }

  function fadeOutMenu() {
    $(menuAnimEl).each(function (index) {
      $(this).css('opacity', '0');
    });
  }
  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */


  var prevScrollpos = window.pageYOffset;
  var scrolling = false;

  window.onscroll = function () {
      scrolling = true;
  };

  setInterval(function () {
      if (scrolling) {
          scrolling = false;

          var currentScrollPos = window.pageYOffset;
          var menuHeight = menu.offsetHeight + 10
          var leftColumn = document.querySelector('.project-column');
          if (prevScrollpos > currentScrollPos || prevScrollpos <= 0) {
            //console.log(prevScrollpos, currentScrollPos)
            menu.style.top = "0";
            menu.classList.add('menu-down');

            scrollFunction(menuHeight)
            if (typeof (leftColumn) != 'undefined' && leftColumn != null) {
              document.querySelector('.project-column').classList.add('menu-down');
            }

          } else {
            if (typeof (leftColumn) != 'undefined' && leftColumn != null) {
              document.querySelector('.project-column').classList.remove('menu-down')
            }
            menu.classList.remove('menu-down');
            menu.style.top = "-" + menuHeight + 'px';
          }
          prevScrollpos = currentScrollPos;

      }
  }, 200);



  /* menu bar scroll */
  // When the user scrolls down 20px from the top of the document, slide down the navbar
  // When the user scrolls to the top of the page, slide up the navbar (50px out of the top view)
  function scrollFunction(menuHeight) {
    if (document.body.scrollTop > menuHeight / 2 || document.documentElement.scrollTop > menuHeight / 2) {
      menu.style.backgroundColor = "#ffffff";
      logoDark.classList.add('hidden-logo');
      logo.style.display = "none";
      logoShort.style.display = "block";
      if (menu.classList.contains("dark-mode")) {
        var el = document.querySelectorAll('.menu .line');
        document.querySelector('.menu a').style.color = "#000000";
        for (var i = 0; i < el.length; i++) {
          el[i].style.backgroundColor = '#000000';
        }
      }
    } else {
      logoDark.classList.remove('hidden-logo');
      menu.classList.remove('menu-down');
      menu.style.backgroundColor = "transparent";
      logoShort.style.display = "none";
      logo.style.display = "block";
      if (menu.classList.contains("dark-mode")) {
        var el = document.querySelectorAll('.menu .line');
        //  document.querySelector('.menu a').style.color = "#ffffff";
        for (var i = 0; i < el.length; i++) {
          //     el[i].style.backgroundColor = '#ffffff';
        }
      }
    }
  }

}

// SWIPER: IMAGE SLIDERS //

function swiperInit() {
  document.querySelectorAll('.swiper-container').forEach(element => {
    var paginationEl = element.querySelector('.swiper-pagination');
    var nextEl = element.querySelector('.swiper-button-next');
    var prevEl = element.querySelector('.swiper-button-prev');
    var mySwiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      effect: 'fade',
      // If we need pagination
      pagination: {
        el: paginationEl,
        clickable: true
      },
      // Navigation arrows
      navigation: {
        nextEl: nextEl,
        prevEl: prevEl,
      },
    })
  })
}

// PROJECT TABS //

function initTab() {
  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tablinks.length; i++) {
    var value = tablinks[i].getAttribute('data-tab')
    tablinks[i].setAttribute("onclick", value);
  }
}

function openTab(evt, tab) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tab-content");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active-link", "");
  }
  document.querySelector('.tab-' + tab).style.display = "block";
  evt.currentTarget.className += " active-link";
}

// FADE IN SCROLL //

function fadeElements() {
  var elements;
  var windowHeight;

  function initFade() {
    elements = document.querySelectorAll('[data-fadein]');
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;
      //console.log(positionFromTop - windowHeight, -(windowHeight / 5))
      if (positionFromTop - windowHeight <= -(windowHeight / 8)/* && positionFromTop - windowHeight > - (windowHeight + (windowHeight/5)) */) {
        element.style.opacity = '1';
        // element.classList.remove('hidden');
      } else {
        element.style.opacity = '0';
      }
    }
  }
  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);
  initFade();
  checkPosition();
}

// SCROLL

function scrollAnimationBackground() {
  var $item = $(document).find('[data-scroll="background"]')
  $item.css('background-color', 'transparent');

  var observer = new IntersectionObserver(function (entries) {
    // isIntersecting is true when element and viewport are overlapping
    // isIntersecting is false when element and viewport don't overlap
    if (entries[0].isIntersecting === true) {
      $('body').css('background-color', '#cdcdcd')
    } else {
      $('body').css('background-color', 'white')
    }
  }, {
    threshold: [0.5]
  });

  observer.observe(document.querySelector('[data-scroll="background"]'))

}

function scrollAnimationProjectHeader() {

  var item = document.querySelector('[data-scroll="parallax"]');
  var $column = $(item).prev().find('.left-column').last();
  var $ghost = $column.prev();
  var mq = window.matchMedia("(max-width: 767px)");

  var observer = new IntersectionObserver(function (entries) {
    // isIntersecting is true when element and viewport are overlapping
    // isIntersecting is false when element and viewport don't overlap
    if (entries[0].isIntersecting === true) {
      //console.log('Element has just become visible in screen');
      $ghost.css('display', 'block')
      $column.css('position', 'fixed').css('z-index', 'auto');
    } else {
      $column.css('position', 'sticky').css('z-index', 'auto');
      $ghost.css('display', 'none')
    }
  }, {
    threshold: [0],
    rootMargin: "0px 0px 10% 0px"
  });

  if (mq.matches) { } else {
    observer.observe(document.querySelector("[data-scroll='parallax']"))
  }

}
var headerScroll = false;
function scrollAnimationProjectProcess() {
  var $projectInfo = $('[data-scroll="project"]')
  $projectInfo.css('background-color', 'transparent');
  $projectInfo.parent().css('background-color', 'black');
  var windowH = $(window).height();

  $(window).scroll(function () {
    headerScroll = true
  });

  setInterval(function () {
    if (headerScroll == true) {
      headerScroll = false;

      var currentScrollPos = window.pageYOffset;
      console.log(currentScrollPos, windowH)

      if ( currentScrollPos < windowH ) {
        var scrollTop = $(this).scrollTop();

        $('.project-header').css({
          opacity: function () {
            var elementHeight = $(this).height(),
              opacity = ((elementHeight - (scrollTop * 2)) / elementHeight);
            return opacity;
          }
        });
      } else {
        $('.project-header').css('opacity', '0')
      }

    }


  }, 50);

}

// IMAGE BRIGHTNESS CHECKER //

function getImageBrightness(imageSrc, callback) {
  var img = document.createElement('img'),
    colorSum = 0,
    i = 0,
    len,
    canvas,
    ctx,
    imageData,
    data,
    brightness,
    r,
    g,
    b,
    avg;

  img.src = imageSrc;
  img.style.display = 'none';

  //  document.body.appendChild(img);

  img.onload = function () {
    canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;

    ctx = canvas.getContext('2d');
    ctx.drawImage(this, 0, 0);

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    data = imageData.data;

    for (i, len = data.length; i < len; i += 4) {
      r = data[i];
      g = data[i + 1];
      b = data[i + 2];

      avg = Math.floor((r + g + b) / 3);
      colorSum += avg;
    }

    brightness = Math.floor(colorSum / (this.width * this.height));
    callback(brightness);
  };
}

function checkImageBrightness() {
  var projectHeader = document.querySelector('.project-header-image').getAttribute('src');

  getImageBrightness(projectHeader, function (brightness) {
   // console.log(brightness);
    if (brightness < 150) {
      document.querySelector('.menu').classList.add('background--dark')
      document.querySelector('.project-header h1').classList.add('background--dark')
    }
  });
}

// INITIALIZE FUNCTION //

function init() {

  if (document.body.contains(document.querySelector('.project-header'))) {
    checkImageBrightness()
  }

  faviconMode()

  if (document.querySelector('.swiper-container')) {
    swiperInit()
  }
  if (document.querySelector('[data-scroll="background"]')) {
    scrollAnimationBackground();
  }
  if (document.querySelector('[data-scroll="parallax"]')) {
    scrollAnimationProjectHeader();
  }
  if (document.querySelector('[data-scroll="project"]')) {
    scrollAnimationProjectProcess()

  }
  if (document.querySelector('form')) {

    document.querySelector('.open-menu').style.display = 'none';
    document.querySelector('.close-lightbox').style.display = 'flex';

    autosize(document.querySelectorAll('textarea'));

    if (document.querySelector('.apply-button')) {
      document.querySelector('.apply-button').addEventListener("click", function (e) {
        const id = e.target.getAttribute('data-job')
        document.querySelector('#module-' + id).style.display = 'block';
        document.querySelector('#job-' + id).style.display = 'none';
      });
    }

    $('form').on('submit', function (e) {
      e.preventDefault();
      var $form = $(this);
      $.ajax({
        url: $form.attr("action"),
        type: $form.attr('method'),
        datType: "JSON",
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function () {
          $('.success-message').show(0)
          $('form').reset();
          return false;
        }, error: function () {
          $('.error-message').show(0);
          return false;
        }
      })
    })


  } else {
    document.querySelector('.close-lightbox').style.display = 'none';
    document.querySelector('.open-menu').style.display = 'flex';
  }

  if (document.querySelector('.tab')) {
    initTab()
   // console.log('tabs')
  }

  if (document.querySelector('.about-module.dark-mode')) {
    document.querySelector('.menu').classList.add('background--dark')
  }

  fadeElements()

}

// UNLOAD //

function unload() {
  document.querySelector('.menu').classList.remove('background--dark', 'background--light');
}

// FAVICON LIGHT MODE //

function faviconMode() {
  var darkSchemeIcon = document.querySelector('#dark-favicon');
  var lightSchemeIcon = document.querySelector('#light-favicon');
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // “Fear is the path to the Dark Side" - Yoda
    if (lightSchemeIcon) {
      lightSchemeIcon.remove();
    }
    document.head.append(darkSchemeIcon);
  } else {
    if (darkSchemeIcon) {
      darkSchemeIcon.remove();
    }
    document.head.append(lightSchemeIcon);
  }
}

// NETLIFY IDENTITY //

if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}
