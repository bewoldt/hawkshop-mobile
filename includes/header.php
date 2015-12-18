<!-- Header -->
<header id="header" class="header cd-header" role="banner">
	<div class="top-wrapper">
		<div class="top-cart right">
			<a href="#" class="cart-toggler">
				<svg class="icon icon-shopping-cart"><use xlink:href="#icon-shopping-cart"></use></svg><span class="my-cart"> My Cart</span> <b class="caret square" id="cart_products_number">0</b>
			</a>
		</div>
		<div class="searchcontainer">
			<form action="">
				<label for="quicksearch" class="visuallyhidden" for="search">Search</label>
				<input type="search" name="search" placeholder="Search" id="search" aria-label="Search" autocomplete="off">
				<button type="submit" class="icon-search" title="Search">Search</button>
			</form>
		</div>
		<a href="tel:+18004295746" class="header-phone">1-800-429-5746</a>
		<div class="help-center">
			<a data-target="#" href="#" id="drop1" class="header-location" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Help <span class="caret"></span></a>
			<ul class="dropdown-menu" aria-labelledby="drop1">
				<li><a href="#">Contact</a></li>
				<li><a href="#">Shipping</a></li>
				<li><a href="#">Returns</a></li>
	  		</ul>
	  	</div>
	  	<div class="account-dropdown">
			<a data-target="#" href="#" id="drop2" class="header-account" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span class="caret"></span></a>
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
			<a class="logo" href="#"><img src="images/iowahawkshop.png" alt="Iowa Hawk Shop"></a>
			<a href="#" class="cart-trigger"><span class="cd-menu-text">Cart</span><svg class="icon icon-shopping-cart"><use xlink:href="#icon-shopping-cart"></use></svg></a>
			<a id="cd-menu-trigger" href="#0"><span class="cd-menu-text">Menu</span><span class="cd-menu-icon"></span></a>
		</div>
	</div>
	<?php include 'includes/megamenu.php'; ?>
</header>