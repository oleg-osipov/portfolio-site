import gsap from 'gsap';
import TweenMax from 'gsap/all';
require('intersection-observer');

export const Animations = (function (gsap) {
  const hidden_value = '';

  const fadeIn = function () {
    return gsap.from(DomElementsArr, {
      delay: 0.1,
      duration: 0.5,
      y: 50,
      opacity: 0,
      ease: 'power2.inOut',
    });
  };

  //Text animation
  const slideInUpward = function (node) {
    gsap.fromTo(
      node,
      { y: '20%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        ease: 'power2.inOut',
        duration: 1,
      }
    );
  };

  //Animate first img - Section About
  const slideInDwnImg = function (node) {
    const child1 = node.firstElementChild;
    const child2 = node.lastElementChild;

    gsap.set(child1, {
      //slide in background
      backgroundColor: 'rgb(100, 100, 100)',
    });
    gsap.to(child1, {
      duration: 0.8,
      top: 0,
      ease: 'sine.out',
    });

    gsap.to(child2, {
      delay: 0.7,
      duration: 0.1,
      opacity: 1,
    });

    gsap.to(child1, {
      delay: 0.7,
      duration: 1,
      top: '100%',
      ease: 'sine.out',
    });

    gsap.from(child2, {
      delay: 1.2,
      duration: 1,
      scaleY: 1.05,
    });
    gsap.to(node, {
      delay: 0.5,
      duration: 1,
      boxShadow: '10px 1px 30px rgba(28, 32, 28, 0.3), -10px 1px 30px rgba(28, 32, 28, 0.3)',
      ease: 'expo.out',
    });
  };
  //Animate second img - Section About
  const shrinkDwnImg = function (node) {
    //word WORK
    const node2 = node.previousElementSibling.firstElementChild;
    gsap.to(node, {
      delay: 0.2,
      duration: 1,
      scaleY: 1,
    });
    gsap.to(node2, {
      delay: 0.8,
      duration: 1,
      left: '6%',
      ease: 'sine.out',
    });

    gsap.fromTo(
      node2,
      {
        opacity: 0,
      },
      //change this to opcity:1
      {
        duration: 2,
        opacity: 1,
        ease: 'expo.out',
      }
    );
  };

  //fadeinHeroContent
  // const showUpHeroContent = function (arrOfElements) {};

  return {
    //Open menu
    menuSlideDown: function (menu, secondaryBgLayer, mainBgLayer, menuItems, closeButton) {
      gsap.to([menu, secondaryBgLayer, mainBgLayer], {
        duration: 0.6,
        height: '100%',
        stagger: 0.04,
      });

      //showUpElements
      //tweens
      const tn1 = gsap.from(menuItems, {
        delay: 0.5,
        duration: 1.2,
        y: '100%',
        opacity: 0,
        scale: 1.2,
        stagger: 0.1,
        ease: 'elastic.out(0.8, 0.5)',
      });

      const tn2 = gsap.from(closeButton, {
        duration: 0.4,
        x: '-100%',
        opacity: 0,
        ease: 'power2.inOut',
      });

      //Menu timeline
      const tlMenu = gsap.timeline();
      tlMenu.add(tn1).add(tn2, '-=0.3');
    },
    //Close menu
    menuSlideUp: function (menu, secondaryBgLayer, mainBgLayer) {
      gsap.to([menu, secondaryBgLayer, mainBgLayer], {
        duration: 0.5,
        height: 0,
        ease: 'power2.inOut',
        stagger: 0.03,
      });
    },

    //Transition fhom HERO to About Section
    fadeOutHero: function (observedElements, mainBackground, burgerButtonAside, scrollDownArrow) {
      const createIntersectionObserver = function () {
        let observer;
        //Thresholds
        function buildThresholdArray() {
          let thresholds = [];
          let numSteps = 15;

          for (let i = 1.0; i <= numSteps; i++) {
            let ratio = i / numSteps;
            thresholds.push(ratio);
          }

          thresholds.reverse();
          return thresholds;
        }
        //IntersectionObserver Handler
        function handleIntersect(entries, observer) {
          // const scrollDownArrow = document.querySelector('#scrollDownArrow');
          entries.forEach((entry) => {
            //Set default values
            scrollDownArrow.style.opacity = 1;

            if (entry.target.id === 'home' && entry.isIntersecting) {
              //Set default styles for burger-aside
              burgerButtonAside.style.display = 'none';
              burgerButtonAside.style.opacity = 0;
              //Decrease opacity of Hero Content
              entry.target.firstElementChild.children[1].style.opacity = entry.intersectionRatio;
              //Decrease opacity on main bachground
              mainBackground.style.opacity = entry.intersectionRatio * 0.9;
              if (entry.isIntersecting && entry.intersectionRatio <= 0.8) {
                entry.target.firstElementChild.children[1].style.opacity =
                  entry.intersectionRatio * 0.7;
              }
            } else if (!entry.isIntersecting && entry.target.id === 'home') {
              mainBackground.style.opacity = 0;
              burgerButtonAside.style.display = 'flex';
              burgerButtonAside.style.opacity = 1;
            } else if (entry.target.id === 'contact' && entry.isIntersecting) {
              scrollDownArrow.style.opacity = 0;
              mainBackground.style.opacity = 0;
            }
          });
        }
        //options
        let options = {
          // root: document.querySelector('body'),
          root: null,
          rootMargin: '0px 0px',
          threshold: buildThresholdArray(),
        };
        //Instanciate observer
        observer = new IntersectionObserver(handleIntersect, options);
        //Add observed elements
        for (let i = 0; i < observedElements.length; i++) {
          observer.observe(observedElements[i]);
        }
      };
      return createIntersectionObserver();
    },

    //fadeInUpContent_and_images in sections About&skills
    revealContent: function (observedTextElements) {
      let io;
      //Options
      const config = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.9,
      };
      //Callback onIntersect
      const onIntersect = function (entries, observer) {
        entries.forEach((entry) => {
          // Set opacity "0" to image_1
          if (entry.target.id === 'imageContainer') {
            entry.target.lastElementChild.style.opacity = 0;
          }

          //First img About Section
          if (entry.target.id === 'imageContainer' && entry.intersectionRatio > 0.55) {
            slideInDwnImg(entry.target);
            observer.unobserve(entry.target);
          }
          //Second img About Section
          if (entry.target.id === 'image_2' && entry.intersectionRatio > 0.1) {
            shrinkDwnImg(entry.target);
            observer.unobserve(entry.target);
          }

          entry.target.classList.add('inactive');
          //TextContent - paragraphs
          if (entry.target.classList.contains('animated-text') && entry.intersectionRatio >= 0.5) {
            slideInUpward(entry.target);
            observer.unobserve(entry.target);
          }
        });
      };
      //Instanciate IntersectionObserver
      io = new IntersectionObserver(onIntersect, config);
      //Observe elements
      for (let i = 0; i < observedTextElements.length; i++) {
        io.observe(observedTextElements[i]);
      }
    },

    //reveal Hero Content
    showUpHeroContent: function (txtElements, ctaButton, socials, scrollDownArrow) {
      //Create timeline
      const tlHero = new gsap.timeline({ delay: 0.5 });

      //Create Tweens
      //text-content
      const headingsTween = gsap.from(txtElements, {
        duration: 0.8,
        y: '45px',
        opacity: 0,
        stagger: 0.3,
      });
      //cta-button
      const ctaButtonTween = gsap.from(ctaButton, {
        duration: 0.8,
        opacity: 0,
      });
      //socials
      const socialsTween = gsap.from(socials, {
        duration: 1.2,
        stagger: 0.1,
        x: 120,
        opacity: 0,
        ease: 'elastic.out(0.8, 0.5)',
      });
      //Arrow-down sign
      const ArrowDownSign = gsap.from(scrollDownArrow, {
        duration: 1,
        y: 120,
        opacty: 0,
      });
      //Add Tweens to Timeline
      tlHero
        .add(headingsTween)
        .add(ctaButtonTween, '-=0.5')
        .add(socialsTween, '-=0.5')
        .add(ArrowDownSign, '-=1.5');
    },
  };
})(gsap, TweenMax);
