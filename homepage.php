<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Homepage</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
	<link rel="stylesheet" href="css/p3.css">
	<?php include 'includes/google-font.php'; ?>
	<script src="js/modernizr.js"></script>
	<script src="https://cdn.rawgit.com/scottjehl/picturefill/master/dist/picturefill.min.js" async></script>
	<!--[if lt IE 9]>
		<script src="js/ie/respond.min.js"></script>
	<![endif]-->
</head>
<body class="home-page">
	<a id="skiplink" href="#main-content">Skip to main content</a>
	<?php include 'includes/header.php'; ?>
	<main id="main-content" tabindex="-1" class="cd-main-content">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<div class="home-gallery">
						<div class="gallery-cell">
							<picture>
								<!--[if IE 9]><video style="display: none;"><![endif]-->
								<source srcset="images/nike-lg.jpg" media="(min-width: 667px)">
								<!--[if IE 9]></video><![endif]-->
								<img data-flickity-lazyload="images/nike-sm.jpg" alt="">
							</picture>
							<div class="caption-wrapper">
								<h3 class="caption-header">All Reppin' One Thing</h3>
								<p class="caption-subheader">Hawkeye Summer Sixteen</p>
								<a href="#" class="caption-link">Shop Women</a>
								<a href="#" class="caption-link">Shop Men</a>
							</div>
						</div>

						<div class="gallery-cell">
							<a href="#">
								<picture>
									<!--[if IE 9]><video style="display: none;"><![endif]-->
									<source srcset="images/home-slider-outerwear.jpg" media="(min-width: 667px)">
									<!--[if IE 9]></video><![endif]-->
									<img data-flickity-lazyload="images/home-slider-outerwear-sm.jpg" alt="">
								</picture>
							</a>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-12">
					<ul class="homelinks">
						<li class="home-link">
							<a href="#">Textbooks</a>
						</li>
						<li class="home-link">
							<a href="#">Men's Apparel</a>
						</li>
						<li class="home-link">
							<a href="#">Women's Apparel</a>
						</li>
						<li class="home-link">
							<a href="#">Kids's Apparel</a>
						</li>
						<li class="home-link">
							<a href="#">Home &amp; Gifts</a>
						</li>
						<li class="home-link">
							<a href="#">Sports</a>
						</li>
						<li class="home-link">
							<a href="#">Supplies</a>
						</li>
						<li class="home-link">
							<a href="#">Tech</a>
						</li>
					</ul>
				</div>
			</div>
			<br />
			<div class="row">
				<div class="col-sm-4">
					<!-- <img src="images/banner1.png"> -->
					<a href="#" class="sec-promo">
						<div class="sec-promo-img">
							<img data-original="images/newarrivals-mens.jpg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="lazy home-promo">
							<div class="sec-promo-hover">
								<span>Shop Now</span>
							</div>
						</div>
						<div class="sec-promo-txt">
							Basketball Apparel
						</div>
					</a>
				</div>
				<div class="col-sm-4">
					<a href="#" class="sec-promo">
						<div class="sec-promo-img">
							<img data-original="images/sec-promo-value.jpg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="lazy home-promo">
							<div class="sec-promo-hover">
								<span>Shop Now</span>
							</div>
						</div>
						<div class="sec-promo-txt">Value Apparel</div>
					</a>
				</div>
				<div class="col-sm-4">

					<a href="#" class="sec-promo">
						<div class="sec-promo-img">
							<img data-original="images/wearabletech.jpg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="lazy home-promo">
							<div class="sec-promo-hover">
								<span>Shop Now</span>
							</div>
						</div>
						<div class="sec-promo-txt">Fitness Accessories</div>
					</a>
				</div>
			</div><!-- end .row -->
			<br />

			<div class="row">
				<div class="col-sm-12">
					<?php include 'includes/home-featured.php'; ?>
					<br />
				</div>
			</div>
			<br /><br /><br />
			<div class="row">
				<div class="col-sm-6">
					<div class="promo-sec-2 graduation">
						<h3>Spring Grad Fair</h3>
						<h4>March 30-31, 10am - 4pm</h4>
						<p>Join us for the 2016 Spring Grad Fair in the IMU! If you are graduating this Spring, then you don’t want to miss this event.</p>
						<ul>
							<li>Purchase your cap and gown and get a free t-shirt</li>
							<li>20% off diploma frames</li>
							<li>Order announcements or a class ring</li>
							<li>Win prizes from Java House, and more!</li>
						</ul>

					</div>
					<br />
				</div>
				<div class="col-sm-6">
					<div class="promo-sec-2 apple-promo">
						<h3>Apple Service Center</h3>
						<p>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
						<p><a href="#" class="btn btn-default">Our Services</a></p>
					</div>
				</div>
			</div><!-- end .row -->
			<br />
		</div><!-- end .container -->
		<div class="hawkofthemonth">
			<div class="container">
				<div class="row">
					<div class="col-sm-12">
						<h3>#hawkofthemonth</h3>
						<p>Send us your best Hawkeye fan photo for your chance to be the Hawk of the Month! <br />The winner will win a Nike Replica Iowa Hawkeye Football.</p>
						<p><a href="mailto:hawkshopcontest@gmail.com?subject=Hawk of the month" class="btn btn-default btn-yellow">Send us your photo</a></p>
						<br />
					</div>
				</div>
			</div>
						<div class="gallery fan-gallery js-flickity" data-flickity-options='{ "freeScroll":true, "wrapAround": true, "pageDots":false, "cellAlign":"left", "autoPlay":true, "lazyLoad": 5, "prevNextButtons": false, "pauseAutoPlayOnHover": false }'>
							<div class="gallery-cell">
								<img class="gallery-cell-image" data-flickity-lazyload="images/instagram1.jpg" alt="" />
							</div>
							<div class="gallery-cell">
								<img class="gallery-cell-image" data-flickity-lazyload="images/instagram2.jpg" alt="" />
							</div>
							<div class="gallery-cell">
								<img class="gallery-cell-image" data-flickity-lazyload="images/instagram3.jpg" alt="" />
							</div>
							<div class="gallery-cell">
								<img class="gallery-cell-image" data-flickity-lazyload="images/instagram4.jpg" alt="" />
							</div>
							<div class="gallery-cell">
								<img class="gallery-cell-image" data-flickity-lazyload="images/instagram5.jpg" alt="" />
							</div>
							<div class="gallery-cell">
								<img class="gallery-cell-image" data-flickity-lazyload="images/instagram6.jpg" alt="" />
							</div>
							<div class="gallery-cell">
								<img class="gallery-cell-image" data-flickity-lazyload="images/instagram7.jpg" alt="" />
							</div>
							<div class="gallery-cell">
								<img class="gallery-cell-image" data-flickity-lazyload="images/instagram8.jpg" alt="" />
							</div>
							<div class="gallery-cell">
								<img class="gallery-cell-image" data-flickity-lazyload="images/instagram9.jpg" alt="" />
							</div>
							<div class="gallery-cell">
								<img class="gallery-cell-image" data-flickity-lazyload="images/instagram10.jpg" alt="" />
							</div>
						</div>
		</div><!-- end .hawkofthemonth -->

		<?php include 'includes/footer.php'; ?>
		<div class="offscreen-exit"></div>
	</main>

	<?php include 'includes/mobilenav.php'; ?>

	<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="js/build/production.min.js"></script>

</body>
</html>