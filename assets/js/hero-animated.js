(function () {
  var hero = document.querySelector(".hero-animated");
  if (!hero) return;

  // Size the hero to fill the viewport beneath the actual header height.
  function setHeaderHeight() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var h = header.getBoundingClientRect().height;
    if (h > 0) {
      hero.style.setProperty("--header-h", h + "px");
    }
  }
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Cinematic video background ----
  // No `autoplay` HTML attribute is used anywhere: playback is only
  // ever started here, and only when motion is permitted. The <video>
  // itself is `display: none` by default (see CSS) — not merely
  // paused — so a no-JS or reduced-motion visitor never gets a video
  // element at all for the browser to attach native controls to. It
  // is revealed (.hero-video-ready) only once play() has actually
  // resolved; the separate .hero-poster div underneath is the
  // complete, correct fallback for every other case — no-JS, reduced
  // motion, blocked/failed autoplay, a media error — with no extra
  // logic needed.
  var video = hero.querySelector(".hero-video");
  var videoPlaying = false;

  function startVideo() {
    if (!video || reduceMotion || videoPlaying) return;
    var playResult = video.play();
    if (playResult && typeof playResult.then === "function") {
      playResult
        .then(function () {
          videoPlaying = true;
          video.classList.add("hero-video-ready");
        })
        .catch(function () {
          // Autoplay blocked or playback failed — poster stays visible,
          // video stays display:none.
        });
    } else {
      videoPlaying = true;
      video.classList.add("hero-video-ready");
    }
  }

  function stopVideo() {
    if (!video || !videoPlaying) return;
    video.pause();
    videoPlaying = false;
  }

  if (video) {
    video.addEventListener("error", function () {
      hero.classList.add("hero-video-failed");
    });
  }

  if (reduceMotion) {
    return;
  }

  // ---- Opening sequence (logo trace/reveal, then headline/CTAs) ----
  // Starts immediately; the video loop runs independently and is not
  // gated behind the intro finishing.
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      hero.classList.add("hero-animate-start");
    });
  });

  var ambientTimer = window.setTimeout(function () {
    hero.classList.add("hero-ambient");
  }, 2400);

  // If keyboard (or any) focus lands inside the hero while the content
  // entrance is still mid-transform, jump straight to the finished
  // position so the focus ring appears on content that is fully in
  // place, not moving. The decorative scene animation is untouched.
  hero.addEventListener("focusin", function () {
    hero.classList.add("hero-animate-start", "hero-content-instant");
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        hero.classList.remove("hero-content-instant");
      });
    });
  });

  // Pause the video and all continuous CSS animations when the tab is
  // hidden or the hero scrolls out of view; resume without replaying
  // the one-time brand intro (hero-animate-start is never removed).
  function updatePaused() {
    var shouldPause = document.hidden || !heroIsVisible;
    hero.classList.toggle("hero-paused", shouldPause);
    if (shouldPause) {
      stopVideo();
    } else {
      startVideo();
    }
  }

  var heroIsVisible = true;
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        heroIsVisible = entries[entries.length - 1].isIntersecting;
        updatePaused();
      },
      { threshold: 0 }
    );
    observer.observe(hero);
  } else {
    startVideo();
  }

  document.addEventListener("visibilitychange", updatePaused);

  window.addEventListener(
    "pagehide",
    function () {
      window.clearTimeout(ambientTimer);
      stopVideo();
    },
    { once: true }
  );
})();
