import { Animations as animation } from './animations.js';

const UIController = (function (animation) {
  const UISelestors = {
    mainBackground: '#mainBackground',
    burgerMobile: '#BurgerButtonMobile',
    burgerDesktop: '#burgerButtonAside',
    //slide-menu
    menu: '#slideDownMenu',
    menuMainBgLayer: '.menu__main-bg-layer',
    menuSecondaryBgLayer: '.menu__secondary-bg-layer',
    menuItems: '.menu__items',
    menuItem: '.menu__item',
    menuItemText: '.menu__item-txt',
    menuCloseButton: '#menuCloseButton',
    //
    burgerAside: '#burgerButtonAside',
    //
    //Animated Elements
    animatedElement: '[class*=animated-]',
    scrollDownArrow: '#scrollDownArrow',
    scrollUpArrow: '#scrollUpArrow',
    //section hero
    heroSection: 'home',
    sosialMedia: '#socials',
    navBar: '.hero__nav-bar',
    ctaButton: '#ctaButton',
    heroTxtContent: '.hero__text',
    //section about
    aboutSection: 'about',
    //SkillsSection
    skillsSection: 'skills',

    //section Contact
    contactSection: 'contact',
    emailContainer: 'emailContainer',
    email: 'email',
    copyToClipboard: 'copyEmail',
    copyToClipboardInfo: 'copyEmailInfo',
  };

  //Main menu
  const MainMenu = function (menu, menuMainLayer, menuSecondLayer, menuCloseButton, menuItems) {
    this.menuState = null;
    this.menu = menu;
    this.menuMainLayer = menuMainLayer;
    this.menuSecondLayer = menuSecondLayer;
    this.menuCloseButton = menuCloseButton;
    this.menuItems = menuItems;
  };

  //Create main menu instance
  function createMenuInstance(animation) {
    const menu = document.querySelector(UISelestors.menu);
    const menuMainLayer = document.querySelector(UISelestors.menuMainBgLayer);
    const menuSecondLayer = document.querySelector(UISelestors.menuSecondaryBgLayer);
    const menuCloseButton = document.querySelector(UISelestors.menuCloseButton);
    let menuItemsNodeList = document.querySelectorAll(UISelestors.menuItem);
    //convert nodeList into Array
    //const menuItems = [...menuItemsNodeList];

    // IE solution
    const menuItems = Array.prototype.slice.call(menuItemsNodeList);

    let MenuInstance = new MainMenu(
      menu,
      menuMainLayer,
      menuSecondLayer,

      menuCloseButton,
      menuItems
    );
    MenuInstance.animation = animation;

    MenuInstance.toggleMenu = function () {
      if (this.menuState === false) {
        this.menuState = true;
        this.animation.menuSlideUp(this.menu, this.menuMainLayer, this.menuSecondLayer);
      } else {
        this.menuState = false;
        this.animation.menuSlideDown(
          this.menu,
          this.menuSecondLayer,
          this.menuMainLayer,
          this.menuItems,
          this.menuCloseButton
        );
      }
    };
    return MenuInstance;
  }
  const Menu = createMenuInstance(animation);

  return {
    //Toggle burger button -mobile
    toggleMobileBurgerButton: function () {
      const button = document.querySelector('#BurgerButtonMobile');
      if (button.classList.contains('open-menu')) {
        button.classList.remove('open-menu');
      } else {
        button.classList.add('open-menu');
      }
    },
    //Toggle MENU
    toggleMenu: function () {
      return Menu.toggleMenu();
    },
    //Get Selectors
    getSelectors: function () {
      return UISelestors;
    },
    //Transition from HeroSection to AboutSection
    transitionHeroToAboutSection: function () {
      const heroSection = document.getElementById(UISelestors.heroSection);
      const contactSection = document.getElementById(UISelestors.contactSection);
      //Make an Arr
      const observedElements = [heroSection, contactSection];
      const mainBackground = document.querySelector(UISelestors.mainBackground);
      const burgerButtonAside = document.querySelector(UISelestors.burgerAside);

      animation.fadeOutHero(observedElements, mainBackground, burgerButtonAside, scrollDownArrow);
    },
    //Animated revealing av content
    fadeInContent: function () {
      const elements = document.querySelectorAll(UISelestors.animatedElement);
      //Make an array from NodeList
      // const animatedTextElementsArr = Array.from(textElements);
      // IE solution
      const animatedElementsArr = Array.prototype.slice.call(elements);
      animation.revealContent(animatedElementsArr);
    },
    //Show up HeroContent at pageloading
    showUpHeroContent: function () {
      const socials = document.querySelectorAll(`${UISelestors.sosialMedia} a`);
      const scrollDownArrow = document.querySelector(UISelestors.scrollDownArrow);
      const ctaButton = document.querySelector(UISelestors.ctaButton);
      const heroTxtContent = document.querySelectorAll(`${UISelestors.heroTxtContent} h3`);
      return animation.showUpHeroContent(heroTxtContent, ctaButton, socials, scrollDownArrow);
    },
  };
})(animation);

//App Controller
const AppController = (function (UIController, animation) {
  //eventListeners handler
  const loadEventListeners = function () {
    //Get selectors from UIController
    const UISelectors = UIController.getSelectors();

    //Toggle event - burger mobile button
    document.querySelector(UISelectors.burgerMobile).addEventListener('click', toggleMenu);

    //Menu Items Event
    document.querySelector(UISelectors.menuItems).addEventListener(
      'click',
      function (e) {
        if (
          e.target.classList.contains('menu__item-txt') ||
          e.target.parentElement.classList.contains('menu__item-txt')
        ) {
          toggleMenu();
        }
        //e.preventDefault();
      },
      false
    );

    //Menu Close button event
    document.querySelector(UISelectors.menuCloseButton).addEventListener('click', toggleMenu);

    //Aside burger button
    document.querySelector(UISelectors.burgerAside).addEventListener('click', toggleMenu);

    //Copy e-mail to clipboard Event Listener
    document.getElementById(UISelectors.copyToClipboard).addEventListener(
      'click',
      (e) => {
        e.target.style.transform = 'translateY(-150%)';
        e.target.nextElementSibling.style.transform = 'translateY(-50%)';
        copyEmailToClipboard(e.target.previousElementSibling.innerHTML);
        e.preventDefault();
      },
      false
    );

    //Event mouseover EmailContainer
    document.getElementById(UISelectors.emailContainer).addEventListener(
      'mouseenter',
      (e) => {
        e.target.firstElementChild.style.transform = 'translateY(-150%)';
        e.target.children[1].style.transform = 'translateY(-50%)';
      },
      false
    );
    //Event mouseleave EmailContainer
    document.getElementById(UISelectors.emailContainer).addEventListener(
      'mouseleave',
      (e) => {
        e.target.firstElementChild.style.transform = 'translateY(-50%)';
        e.target.children[1].style.transform = 'translateY(50%)';
        e.target.children[2].style.transform = 'translateY(150%)';
      },
      false
    );
  };

  //Toggle MENU event
  const toggleMenu = function (e) {
    UIController.toggleMobileBurgerButton();
    UIController.toggleMenu();
  };
  //Event on Burger button - desktop

  //Copy e-mail to the clipboard
  const copyEmailToClipboard = function (text) {
    if (window.clipboardData && window.clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return clipboardData.setData('Text', text);
    } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      var textarea = document.createElement('textarea');
      textarea.setAttribute('readonly', '');
      textarea.textContent = text;
      textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        return document.execCommand('copy'); // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn('Copy to clipboard failed.', ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  return {
    init: function () {
      loadEventListeners();
      //get screen-size
      const w = parseInt(window.innerWidth);
      if (w >= 768) {
        UIController.showUpHeroContent();
        UIController.transitionHeroToAboutSection();
        UIController.fadeInContent();
      }
    },
  };
})(UIController, animation);

//Animation init
AppController.init();
