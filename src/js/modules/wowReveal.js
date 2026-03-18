const WowReveal = class WowReveal {
    constructor({
        wowClass = 'wow',
        animateClass = 'animate__animated'
    } = {}) {
        this.wowClass = wowClass;
        this.animateClass = animateClass;
    }

    isAvailable() {
        return typeof window !== 'undefined' && typeof window.WOW === 'function';
    }

    getElements(selector) {
        return Array.from(document.querySelectorAll(selector));
    }

    prepareGroup(selector, {
        animations = ['animate__fadeInUp'],
        duration = '0.9s',
        delayStep = 0.1,
        maxDelay = 0.3,
        offset = 100
    } = {}) {
        this.getElements(selector).forEach((element, index) => {
            const animation = Array.isArray(animations)
                ? animations[index % animations.length]
                : animations;
            const delay = Math.min(index * delayStep, maxDelay);

            element.classList.add(this.wowClass, animation);
            element.setAttribute('data-wow-offset', String(offset));
            element.setAttribute('data-wow-duration', duration);
            element.setAttribute('data-wow-delay', `${delay}s`);
        });
    }

    prepareExpertiseCards() {
        const cards = this.getElements('.expertise__card');
        const topAnimations = ['animate__slideInLeft', 'animate__fadeInUp', 'animate__slideInRight'];
        const bottomAnimations = ['animate__slideInLeft', 'animate__slideInRight'];

        cards.forEach((card, index) => {
            const isBottom = card.classList.contains('expertise__card_bottom');
            const animation = isBottom
                ? bottomAnimations[index % bottomAnimations.length]
                : topAnimations[index % topAnimations.length];
            const delay = Math.min(index * 0.08, 0.3);

            card.classList.add(this.wowClass, animation);
            card.setAttribute('data-wow-offset', '110');
            card.setAttribute('data-wow-duration', '0.95s');
            card.setAttribute('data-wow-delay', `${delay}s`);
        });
    }

    prepareBenefitCards() {
        this.prepareGroup('.business-benefits__card, .arenadata-benefits__card', {
            animations: ['animate__slideInLeft', 'animate__fadeInUp', 'animate__slideInRight'],
            duration: '0.95s',
            delayStep: 0.08,
            offset: 110
        });
    }

    preparePanelsAndLists() {
        this.prepareGroup(
            '.onec-services__item, .sap-hana-platform__item, .sap-consulting__item, .bpmsoft-automation__item, .arenadata__item, .insight-value__item, .insight-scenarios__item, .avanpost-scenarios__item, .data-management__column, .consulting-strategy__item, .analytics-data__item, .app-development__item, .ldm-control__item, .avanpost-use-cases__item, .sap-factory__item',
            {
                animations: ['animate__fadeInUp'],
                duration: '0.85s',
                delayStep: 0.06,
                offset: 90
            }
        );
    }

    prepareHeads() {
        this.prepareGroup(
            '.hero__content, .expertise__head, .sap-consulting__title, .onec-services__head, .ldm-control__top, .data-management__head, .bpmsoft-automation__top, .business-benefits__title, .insight-scenarios__top, .insight-value__hero, .arenadata__heading, .avanpost-scenarios__top, .sap-hana-platform__head, .trust-logos__head, .contact-cta__left, .contact-cta__right, .footer__inner',
            {
                animations: ['animate__fadeInUp'],
                duration: '0.8s',
                delayStep: 0.04,
                offset: 80
            }
        );
    }

    prepareExtraCards() {
        this.prepareGroup(
            '.avanpost-benefits__card, .sap-factory__card, .sap-factory__card_top',
            {
                animations: ['animate__slideInLeft', 'animate__fadeInUp', 'animate__slideInRight'],
                duration: '0.95s',
                delayStep: 0.08,
                maxDelay: 0.5,
                offset: 110
            }
        );
    }

    init() {
        this.prepareHeads();
        this.prepareExpertiseCards();
        this.prepareBenefitCards();
        this.prepareExtraCards();
        this.preparePanelsAndLists();

        if (!this.isAvailable()) return;

        const wow = new window.WOW({
            boxClass: this.wowClass,
            animateClass: this.animateClass,
            offset: 100,
            mobile: true,
            live: false
        });

        wow.init();

        window.requestAnimationFrame(() => {
            wow.sync();
        });

        window.setTimeout(() => {
            wow.sync();
        }, 250);
    }
}

export default WowReveal;
