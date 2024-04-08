// jo bhi samajh me na aaye to chatgpt ka use kare

// function loadAnime me gsap js ki libreary ka use hua hai

function loadAnime() {
  var tl = gsap.timeline(); // timeline ka matlab gsap ka code ek ke baad ek execute hoga

  // jo loader ka hai jo sabse pehle neeche se aata hei
  tl.from(".line h1", {
    y: 150, // iska matlab y direction se jo neeche se aata hai
    duration: 0.7,
    stagger: 0.3, // ek h1 ke baad dosra h1 aayega 0.3s ke baad
    delay: 0.3,
  });

  tl.from(".line1-part, .line h2", {
    opacity: 0,

    // yeh jo 0-100 tak chalta hai uska code hai
    onstart: function () {
      // querySelector se html ke kissi bhi element ko select kar sakte hai or fir usme change kar sakte hai
      var h1Timer = document.querySelector(".line1-part h5");

      var count = 0;

      // setinterval js me inbuilt function hai jo ek function and  time parameter me leta hai
      // isme 45 milisecond ke bad count ki value badegi
      setInterval(function () {
        // count ki value jab tak 100 nhi ho jaati jab tak badegi
        // 100 hone ke baad nhi badegi 100 hi print hogi
        if (count < 100) {
          h1Timer.innerHTML = count++;
        } else {
          h1Timer.innerHTML = count;
        }
      }, 45);
    },
  });

  // gsap ka hi code hai isme line class ka h2 select kara hai
  tl.to(".line h2", {
    animationName: "anime", // css me animation banaya tha (website me aata jo loaderme)now ka
    opacity: 1,
  });

  tl.to(".loader", {
    opacity: 0,
    duration: 0.2,
    delay: 4,
  });

  // yeh page one ka hai jisse page1 neeche aata hua dikhta hai
  tl.from(".page1", {
    y: 1600,
    delay: 0.2,
    duration: 0.4,
    opacity: 0,
  });

  tl.to(".loader", {
    display: "none",
  });
  tl.from(".nav", {
    opacity: 0,
  });

  // yeh page1 ka hai neeche se aata hai text h1 ka
  tl.from(" #hero1 h1 , #hero2 h1, #hero3 h2, #hero4 h1", {
    y: 200,
    opacity: 0,
    stagger: 0.2,
    duration: 0.5,
  });
  tl.from(
    ".page2",
    {
      opacity: 0,
    },
    "-=1"
  );
}

// yeh function me js ki locomotive js ka use hua isse scorlling smooth ho jaati hai
function locoscroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "..main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function mouseover() {
  // shery js ke use se cursor wala circle ka hai
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
  });
  // navbar ke right me hai jo wo wala effect hai
  // Shery.makeMagnet(".nav-left1 .squre");
  Shery.makeMagnet(".nav-right h3");

  // yeh page2 me video wala effect hai uske liye in dono ko select kiya hai
  var videow = document.querySelector(".videow");
  var video = document.querySelector(".videow video");

  //addeventlistener dom menupulation ka part hai isski help se ham bahut kaam kar sakte hai
  // eg click hone par do image swap ho jaye ya elemet ka color change ho jaye

  // is code me mouseenter event ka use hua hai , iska matlab jab bhi videow div me cursor enter hoga jab
  videow.addEventListener("mouseenter", function () {
    // jab bhi videow div me mouse move hoga jab bhi yeh function usko dets me saari properties hai x ,y coordinate , color , etc
    videow.addEventListener("mousemove", function (dets) {
      // isse jo cursor wala circle hai vo opaciy 0 ho jayegi
      gsap.to(".mousefollower", {
        opacity: 0,
      });
      // video ke upar play ka icon hai usko move karane ke liye hai
      gsap.to(".video-cursor", {
        left: dets.x - 590,
        y: dets.y - 270,
      });
    });
  });

  // mouseleave wala event listener jab bhi mouse videow div bahar niklega jab
  videow.addEventListener("mouseleave", function () {
    // mouse leave hoga to circle wala mouse opacity 1 ho jayegi
    gsap.to(".mousefollower", {
      opacity: 1,
    });
    // jo play wala icon hai wo apni pehli wali position par pahuch jayega
    gsap.to(".video-cursor", {
      left: "70%",
      top: "0% ",
    });
  });
  // jab video play hoti hai to play wala icon hata kar pause wala icon aana or size chota hona
  var flag = 0;
  videow.addEventListener("click", function () {
    if (flag === 0) {
      video.play();
      video.style.opacity = 1;
      document.querySelector(
        ".video-cursor"
      ).innerHTML = `<i class="ri-pause-line"></i>`;
      gsap.to(".video-cursor", {
        scale: 0.5,
      });
      flag = 1;
    } else {
      video.pause();
      video.style.opacity = 0;
      document.querySelector(
        ".video-cursor"
      ).innerHTML = `<i class="ri-play-line"></i>`;
      gsap.to(".video-cursor", {
        scale: 1,
      });
      flag = 0;
    }
  });
}
// function cursor() {
//   document.addEventListener("mousemove", function (dets) {
//     gsap.to(".cursor", {
//       left: dets.x,
//       top: dets.y,
//     });
//   });
// }

// yeh fuction shery librery ka use karta us image effect ke liye
// isko gooey effect bolte hai
function sheryanime() {
  Shery.imageEffect(".images , .images-1", {
    style: 5,
    config: {
      noiseDetail: { value: 7.63, range: [0, 100] },
      distortionAmount: { value: 4.73, range: [0, 10] },
      scale: { value: 72.52, range: [0, 100] },
      speed: { value: 0.53, range: [0, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.6969567694601355 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.43, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.92, range: [0, 10] },
      metaball: { value: 0.37, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.43, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
    gooey: true,
  });
}

function flagAnimetion() {
  var page1 = document.querySelector(".page1");
  var hero3 = document.querySelector("#hero3");
  var flag = document.querySelector(".flag");
  page1.addEventListener("mousemove", function (d) {
    gsap.to(".flag", {
      x: d.x,
      y: d.y,
    });
  });
  hero3.addEventListener("mouseover", function () {
    flag.style.opacity = "1";
  });
  hero3.addEventListener("mouseleave", function () {
    flag.style.opacity = "0";
  });
}

loadAnime();
locoscroll();
flagAnimetion();
// cursor();
sheryanime();
mouseover();
