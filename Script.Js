
function toggleNav() {
	var sidenav = document.getElementById("mySidenav"),
    main = document.getElementById("main");
    sidenav.style.width = sidenav.style.width == "100%" ? '0' : '100%';
    main.style.marginLeft = main.style.marginLeft === "250px" ? '0' : '0px';
}

function myFunction(x) {
    x.classList.toggle("change");
}


Alpine.data('settings', () => ({
    open: false, 
    lightbox: false,
    ic: 2,
    ih: 500,
    iw: 60,
    is: 'clamp(10px, 3vw, 3rem)',
    r: '0.5rem',
    vw: 640,
    tr: 150,
    gl: document.querySelectorAll('.gallery > *'),
    
    init() {
        this.checkVW(window.innerWidth);
    },
    
    get updateValues() {
        if (this.vw < 640) return;
        
        // Reset all style attributes
        this.resetAttributes();
        
        // general styling to all elements
        this.gl.forEach((item,i) => {
            // reset default css
            item.style.marginTop = '0';
            item.style.marginRight = '0';
            item.style.flexBasis = 'auto';
            // set new styling
            item.style.borderRadius = this.r;
            item.style.height = `${this.ih}px`;
            item.querySelector('img').style.height = `${this.ih}px`;
            item.style.flexBasis = `calc(${100 - this.iw}% / ${this.ic-1} - ${this.is})`;
        });
        
        // set transition speed
        document.querySelector('.gallery').style.setProperty('--tr', `${this.tr}ms`);
        
        // set margin top to elements
        document.querySelectorAll(`.gallery > *:not(:nth-child(-n + ${this.ic})`).forEach(item => {
            item.style.marginTop = this.is
        });
        
        // set margin right to elements
        document.querySelectorAll(`.gallery > *:not(:nth-child(${this.ic}n)`).forEach(item => {
             item.style.marginRight = this.is
        });
        
        // reset margin right to last element
        document.querySelector('.gallery > *:last-child').style.marginRight = '0';
        
        // calc flex-basis to elements with big images
        document.querySelectorAll(`.gallery > *:nth-child(${this.ic*2}n + 1)`).forEach(item => {
            item.style.flexBasis = `calc(${this.iw}% - ${this.is})`
        });
        
        document.querySelectorAll(`.gallery > *:nth-child(${this.ic*2}n + ${this.ic*2})`).forEach(item => {
            item.style.flexBasis = `calc(${this.iw}% - ${this.is})`
        });
    },
    
    resetAttributes() {
        this.gl.forEach(item => {
            item.removeAttribute('style')
            item.querySelector('img').removeAttribute('style')
        });
    },
    
    checkVW(width) {
        this.vw = width;
        if (this.vw < 640) this.resetAttributes();
    },
}));

Alpine.start();
