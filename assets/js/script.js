$(document).ready(() => {

    let allowOneSectionScroll;
    let isMobile;
    let windowWidth = $(window).width();
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
        $('body').addClass('mobile');
    } else {
        isMobile = false;
        $('body').removeClass('mobile');
    }
    $(window).resize(() => {
        windowWidth = $(window).width();
    });

    // navigation
    let isMenuOpened = false;
    const navBtn = $('.nav__toggle-class-btn');
    const nav = $('.nav');
    function toggleNav() {
        navBtn.toggleClass('nav__toggle-class-btn-active');
        nav.toggleClass('nav-active');
        $('.nav-active-wrapper').toggleClass('nav-active-wrapper-active');
        isMenuOpened ? isMenuOpened = false : isMenuOpened = true;
    }
    navBtn.click(toggleNav);

    $('.nav-active-wrapper').click(event => {
        if (event.target.className === 'nav-active-wrapper nav-active-wrapper-active') {
            navBtn.removeClass('nav__toggle-class-btn-active');
            nav.removeClass('nav-active');
            $('.nav-active-wrapper').removeClass('nav-active-wrapper-active');
            isMenuOpened = false;
        }
    })

    // slider functionality

    let currSlide = 0;

    let supportsWheel = false;
    function defineScrollDirection(event) {
        windowWidth = $(window).width();
        if (!isMobile && windowWidth >= 990) {
            allowOneSectionScroll = true
        } else {
            allowOneSectionScroll = false
        }
        if (event.type == 'wheel' && allowOneSectionScroll) supportsWheel = true;
        else if (supportsWheel) return;
        let e_delta = (event.deltaY || -event.wheelDelta || event.detail);
        if (e_delta >= 15 || e_delta <= -15) {
            let delta = e_delta && ((e_delta >> 10) || 1) || 0;
            if (delta > 0) {
                slideDown();
            } else if (delta < 0) {
                slideUp();
            }
        }
    }
    document.addEventListener('wheel', defineScrollDirection);

    function slideDown() {
        if (!isMenuOpened && currSlide < $('.slide').length - 1 && allowOneSectionScroll) {
            let windowHeight = $(window).height();
            currSlide++;
            $('.main').css('transform', `translateY(-${windowHeight * currSlide}px)`);
        }
    }

    function slideUp() {
        if (!isMenuOpened && currSlide > 0) {
            let windowHeight = $(window).height();
            currSlide--;
            $('.main').css('transform', `translateY(-${windowHeight * currSlide}px)`);
        }
    }

    // 1st slide

    setTimeout(() => {
        $('.slide-1__santa-quote').addClass('slide-1__santa-quote-active')
    }, 3000);


    // 2nd slide

    const presentBtn = $('.slide-2__choose-present');
    const presentCards = $('.slide-2__present-info');

    function showPresent(event) {
        const button = event.target;
        const presentNum = $(button).attr('data-present');

        presentBtn.removeClass('slide-2__choose-present-active');
        $(button).addClass('slide-2__choose-present-active');

        presentCards.each(index => {
            const card = $(presentCards)[index];
            const cardNum = $(card).attr('data-present');

            $(card).removeClass('slide-2__present-info-active');
            if (cardNum === presentNum) {
                $(card).addClass('slide-2__present-info-active');
            }
        })
    }
    presentBtn.click(showPresent);


    // 3rd slide

    const dropdown = $('.form__control-dropdown');
    const dropdownOption = $('.form__control-dropdown-option');

    function toggleDropdown(event) {
        dropdown.toggleClass('form__control-dropdown-active');
    }
    dropdown.click(toggleDropdown);

    function chooseOption(event) {
        event.stopPropagation();
        dropdownOption.removeClass('form__control-dropdown-option-active');
        $(event.target).addClass('form__control-dropdown-option-active');
        dropdown.removeClass('form__control-dropdown-active');
    }
    dropdownOption.click(chooseOption);

    const textarea = $('.form__control-textarea');
    function resizeTextarea(event) {
        textarea.css('height', event.target.scrollHeight);
    }
    textarea.on('keydown', resizeTextarea);

})