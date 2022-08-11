class Carousel {

    /**
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {number} options.slidesToScroll Nombre d'éléments a faire défiler
     * @param {number} options.slidesToShow Nombre d'éléments visibles
     */

    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({},
            {
                slidesToScroll: 1,
                slidesToShow: 1
            }, options)

        let children = [].slice.call(element.children)
        this.currentItem = 0;
        this.navigation = document.querySelector('.navigation')
        const slider = this.items;

        window.addEventListener('resize', this.setStyle.bind(this));

        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel__container')


        this.root.appendChild(this.container)

        this.element.appendChild(this.root)

        this.items = children.map(child => {
            let item = this.createDivWithClass('carousel__item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })

        this.setStyle()
        this.createNavigation()
       
        
    }

    /**
     * Applique les dimensions et la position de l'élément
     */

    setStyle() {
        window.innerWidth < 768 ? this.options.slidesToShow = 1 : this.options.slidesToShow = 3;
        let ratio = this.items.length / this.options.slidesToShow;
        this.container.style.width = (ratio * 100) + '%'
        this.items.forEach(item => item.style.width = (100 / this.options.slidesToShow) + '%')
        
    }

    /**
     * 
     * @param {string} className 
     * @returns {HTMLElement
     */
    createDivWithClass(className) {
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div;
    }

    createNavigation() {
        let nextButton = this.createDivWithClass('carousel__next');
        let prevButton = this.createDivWithClass('carousel__prev');
        let slider = this.items;

        this.navigation.appendChild(nextButton)
        this.navigation.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));

        this.items.forEach(item => {
            item.addEventListener('touchstart', this.touchStart.bind(this));
            item.addEventListener('touchmove', this.touchMove.bind(this));
            item.addEventListener('touchend', this.touchEnd.bind(this));
        }, this)
    
         
    }    
   
   // scroll to the next item white touch event
    touchStart(event) {
        this.touchStartX = event.changedTouches[0].screenX;
        this.touchStartY = event.changedTouches[0].screenY;
    }

    touchEnd(event) {
        this.touchEndX = event.changedTouches[0].screenX;
        this.touchEndY = event.changedTouches[0].screenY;
        this.swipe();
    }

    touchMove(event) {
        this.touchMoveX = event.changedTouches[0].screenX;
        this.touchMoveY = event.changedTouches[0].screenY;
    }

    swipe() {
        let swipeLength = this.touchEndX - this.touchStartX;
        let swipeLengthY = this.touchEndY - this.touchStartY;
        if (Math.abs(swipeLength) > Math.abs(swipeLengthY)) {
            if (swipeLength > 0) {
                this.prev();
            } else {
                this.next();
            }
        }
    }


   

    next() {
        this.gotoItem(this.currentItem + this.options.slidesToScroll)
    }
    prev() {
        this.gotoItem(this.currentItem + this.options.slidesToScroll)
    }

    /**
     * fix responsive
     * @param {number} index
     * @returns {HTMLElement}
     * @memberof Carousel
     * @method getItem
     */
    gotoItem(index) {

        if (index >= this.items.length) {
            index = 0;
        }

        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d(' + translateX + '%,0,0)'
        this.currentItem = index;


        if (this.currentItem === 1) {
            document.querySelector('#feature__gouvernance').classList.add("feature__gouvernance");
            document.querySelector('#feature__informatique').classList.remove("feature__informatique");
        } else {
            document.querySelector('#feature__gouvernance').classList.remove("feature__gouvernance");
            document.querySelector('#feature__informatique').classList.add("feature__informatique");
        }

        if (this.currentItem === 2) {
            document.querySelector('#feature__securite').classList.add("feature__securite");

        } else {
            document.querySelector('#feature__securite').classList.remove("feature__securite");

        }
        if (this.currentItem === 3) {
            document.querySelector('#feature__formation').classList.add("feature__formation");

        } else {
            document.querySelector('#feature__formation').classList.remove("feature__formation");

        }
        if (this.currentItem === 4) {
            document.querySelector('#feature__recrutement').classList.add("feature__recrutement");

        } else {
            document.querySelector('#feature__recrutement').classList.remove("feature__recrutement");

        }
        if (this.currentItem === 5) {
            document.querySelector('#feature__mentorat').classList.add("feature__mentorat");

        } else {
            document.querySelector('#feature__mentorat').classList.remove("feature__mentorat");

        }

    }

}
document.addEventListener('DOMContentLoaded', function () {
    new Carousel(document.querySelector('#Carousel'), {
        slidesToScroll: 1,
        slidesToShow: 3,
    });
});

