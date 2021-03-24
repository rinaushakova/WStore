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
	
		for (const scrollLink of scrollLinks) {
			scrollLink.addEventListener('click', (e) => {
				e.preventDefault();
				const id = scrollLink.getAttribute('href');
				document.querySelector(id).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				})
			});
		}
	}
	
	smoothScroll();

})

// goods

const more = document.querySelector('.more'),
	  navigationLink = document.querySelectorAll('.navigation-link'),
	  showAllLink = document.querySelector('.navigation-link-all'),
	  longGoodsList = document.querySelector('.long-goods-list');

const getGoods = async function() {
	const res = await fetch('db/db.json');
	if (!res.ok) {
		throw 'Ошибка, ошибище! ' + res.status
	}
	return await res.json();
};

getGoods().then(function (data) {
	console.log(data)
});

const createCards = function ({label, name, img, description, id, price}) {
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6';
	card.innerHTML = `
		<div class="goods-card">
			${label ? 
				`<span class="label">${label}</span>` : 
				''
			}
				<img src="db/${img}" alt="${name}" class="goods-image">
				<h3 class="goods-title">${name}</h3>
				<p class="goods-description">${description}/Lilac/Fuchsia/Orange</p>			
				<button class="button goods-card-btn add-to-cart" data-id="${id}">
					<span class="button-price">$${price}</span>
				</button>
		</div>
	`;
	return card;
};	

const renderCards = function(data) {
	longGoodsList.textContent = '';
	const cards = data.map(createCards);
	longGoodsList.append(...cards)
	document.body.classList.add('show-goods');
};

more.addEventListener('click', (e) => {
	e.preventDefault();
	getGoods().then(renderCards);
});




const filterCards = function(field, value) {
	getGoods()
	.then(function (data) {
		const filterGoods = data.filter(function (good) {
			return good[field] === value
		});
		return filterGoods;
	})
	.then(renderCards);
};

navigationLink.forEach(function (link) {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value);
	})
});

