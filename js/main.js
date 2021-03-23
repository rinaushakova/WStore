document.addEventListener('DOMContentLoaded', function() {

	const mySwiper = new Swiper('.swiper-container', {
		loop: true,
	
		// Navigation arrows
		navigation: {
			nextEl: '.slider-button-next',
			prevEl: '.slider-button-prev',
		},
	});
	
	
	// cart 
	
	
	const buttonCart = document.querySelector('.button-cart'),
		  modalCart = document.getElementById('modal-cart'),
		  modalClose = document.querySelector('.modal-close');
	
	function openModal() {
		modalCart.classList.add('show');
	}	  
	function closeModal(e) {
		modalCart.classList.remove('show');
	}

	modalCart.addEventListener('click', (e) => {
		if (e.target === modalCart) {
			closeModal();
		}
	});
		
	buttonCart.addEventListener('click', openModal);
	modalClose.addEventListener('click', closeModal);

	
	
	// smooth scroll
	
	const smoothScroll = function() {
		
		const scrollLinks = document.querySelectorAll('a.scroll-link');
	
		for (let i = 0; i < scrollLinks.length; i++) {
			scrollLinks[i].addEventListener('click', (e) => {
				e.preventDefault();
				const id = scrollLinks[i].getAttribute('href');
				document.querySelector(id).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
			});
		}
	}
	
	smoothScroll();

})
