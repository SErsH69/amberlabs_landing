const Header = class Header {
    constructor({ breakpoint = 1023, openedClass = 'isMenuOpened', lockClass = 'ovh' } = {}) {
        this.breakpoint = breakpoint;
        this.openedClass = openedClass;
        this.lockClass = lockClass;
        this.header = document.querySelector('.header');
        this.toggleButton = this.header ? this.header.querySelector('[data-header-toggle]') : null;
        this.menu = this.header ? this.header.querySelector('[data-header-menu]') : null;
    }

    isMobileViewport() {
        return window.innerWidth <= this.breakpoint;
    }

    openMenu() {
        if (!this.header || !this.toggleButton || !this.menu) return;

        this.header.classList.add(this.openedClass);
        this.toggleButton.setAttribute('aria-expanded', 'true');
        document.body.classList.add(this.lockClass);
    }

    closeMenu() {
        if (!this.header || !this.toggleButton || !this.menu) return;

        this.header.classList.remove(this.openedClass);
        this.toggleButton.setAttribute('aria-expanded', 'false');
        document.body.classList.remove(this.lockClass);
    }

    toggleMenu() {
        if (!this.header) return;

        if (this.header.classList.contains(this.openedClass)) {
            this.closeMenu();
            return;
        }

        this.openMenu();
    }

    addToggleListener() {
        if (!this.toggleButton) return;

        this.toggleButton.addEventListener('click', () => {
            if (!this.isMobileViewport()) return;
            this.toggleMenu();
        });
    }

    addDocumentListener() {
        document.addEventListener('click', (event) => {
            if (!this.header || !this.isMobileViewport()) return;
            if (!this.header.classList.contains(this.openedClass)) return;
            if (event.target.closest('.header__menu') || event.target.closest('[data-header-toggle]')) return;

            this.closeMenu();
        });
    }

    addMenuLinkListener() {
        if (!this.menu) return;

        this.menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (!this.isMobileViewport()) return;
                this.closeMenu();
            });
        });
    }

    addKeyupListener() {
        document.addEventListener('keyup', (event) => {
            if (event.key !== 'Escape') return;
            this.closeMenu();
        });
    }

    addResizeListener() {
        window.addEventListener('resize', () => {
            if (!this.isMobileViewport()) {
                this.closeMenu();
            }
        });
    }

    init() {
        if (!this.header || !this.toggleButton || !this.menu) return;

        this.menu.id = 'header-menu';
        this.addToggleListener();
        this.addDocumentListener();
        this.addMenuLinkListener();
        this.addKeyupListener();
        this.addResizeListener();
    }
}

export default Header;
