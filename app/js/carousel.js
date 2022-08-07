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

        this.navigation.appendChild(nextButton)
        this.navigation.appendChild(prevButton)
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));


    }


       

    next() {

        this.gotoItem(this.currentItem + this.options.slidesToScroll)
        console.log('next', this.gotoItem(this.currentItem - this.options.slidesToScroll))
    }

    prev() {
        this.gotoItem(this.currentItem - this.options.slidesToScroll)
        console.log('prev', this.gotoItem(this.currentItem - this.options.slidesToScroll))
    }

    /**
     * 
     * @param {number} index
     * @returns {HTMLElement}
     * @memberof Carousel
     * @method getItem
     */
    gotoItem(index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesToShow
            console.log('index', index)

        }

        let translateX = index * -100 / this.options.slidesToShow
        this.currentItem = index
        this.container.style.transform = 'translateX(' + translateX + '%)'
        this.currentItem = index;



    }

}


document.addEventListener('DOMContentLoaded', function () {
    new Carousel(document.querySelector('#Carousel'), {
        slidesToScroll: 3,
        slidesToShow: 3,
    });



});

