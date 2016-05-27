<!-- Header -->
<header id="header" class="header cd-header" role="banner">
	<div class="top-wrapper">
		<div class="top-cart right">
			<a href="#" class="cart-toggler">
				<span class="icon-shopping-cart"></span><span class="my-cart"> My Cart</span> <b class="caret square" id="cart_products_number">0</b>
			</a>
		</div>
		<div class="searchcontainer">
			<form action="">
				<label for="quicksearch" class="visuallyhidden" for="search">Search</label>
				<input type="search" name="search" placeholder="Enter keyword or item #" id="search" aria-label="Search" autocomplete="off">
				<button type="submit" name="search" class="icon-search" title="Search">Search</button>
			</form>
		</div>
		<a href="tel:+18004295746" class="header-phone">1-800-429-5746, M-F: 8am-5pm</a>
		<div class="help-center">
			<button type="button" id="drop1" class="header-location" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Help <span class="caret"></span></button>
			<ul class="dropdown-menu" aria-labelledby="drop1">
				<li><a href="#">Contact</a></li>
				<li><a href="#">Shipping</a></li>
				<li><a href="#">Returns</a></li>
	  		</ul>
	  	</div>
	  	<div class="account-dropdown">
			<button type="button" id="drop2" class="header-account" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span class="caret"></span></button>
			<ul class="dropdown-menu" aria-labelledby="drop2">
				<li><a href="#">My Account</a></li>
				<li><a href="#">Order History</a></li>
				<li><a href="#">Log in</a></li>
				<li><a href="#">Gift Cards</a></li>
	  		</ul>
		</div>
	</div>
	<div class="container clearfix">
		<div class="logo-container">
			<a class="logo" href="#"><img src="images/iowahawkshop.png" alt="Iowa Hawk Shop" width="479"></a>
			<a href="#" class="cart-trigger"><span class="cd-menu-text">Cart</span><span class="icon-shopping-cart"></span></a>
			<button id="cd-menu-trigger"><span class="cd-menu-text">Menu</span><span class="cd-menu-icon"></span></button>
		</div>
	</div>
	<?php include 'includes/megamenu.php'; ?>
</header>