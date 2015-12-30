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
</head>
<body class="home-page">
	<a id="skiplink" href="#main-content">Skip to main content</a>
	<?php include 'includes/header.php'; ?>
	<main id="main-content" tabindex="-1" class="cd-main-content">

		<div class="home-gallery">
			<div class="gallery-cell">
				<a href="#">
					<img src="http://placehold.it/950x450/aaaaaa" alt="">
				</a>
			</div>
			<div class="gallery-cell">
				<a href="#">
					<img src="images/bonobos-1.jpg" alt="">
				</a>
			</div>
			<div class="gallery-cell">
				<a href="#">
					<img src="http://placehold.it/950x450/aaaaaa" alt="">
				</a>
			</div>
			<div class="gallery-cell">
				<a href="#">
					<img src="http://placehold.it/950x450/aaaaaa" alt="">
				</a>
			</div>
			<div class="gallery-cell">
				<a href="#">
					<img src="http://placehold.it/950x450/aaaaaa" alt="">
				</a>
			</div>
		</div>
		<br /><br />
		<div class="container">
			<div class="row">
				<div class="col-sm-4">
					<!-- <img src="images/banner1.png"> -->
					<a href="#"><img data-original="images/banner1.png" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="lazy home-promo"></a>
				</div>
				<div class="col-sm-4">
					<!-- <img src="images/banner2.png"> -->
					<img data-original="images/banner2.png" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="lazy home-promo">
				</div>
				<div class="col-sm-4">
					<!-- <img src="images/banner3.png"> -->
					<img data-original="images/banner3.png" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="lazy home-promo">
				</div>
			</div><!-- end .row -->
			<div class="row">
				<div class="col-sm-12">
					<?php include 'includes/home-featured.php'; ?>
					<br />
				</div>
			</div>
			<br /><br />
			<div class="row">
				<div class="col-sm-6">
					<!-- <img src="images/banner1.png"> -->
					<a href="#"><img src="http://placehold.it/550x350"></a>
				</div>
				<div class="col-sm-6">
					<!-- <img src="images/banner2.png"> -->
					<a href="#"><img class="lazy" data-original="images/appleservicecenter.jpg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></a>
				</div>
			</div><!-- end .row -->
		</div>

		<br /><br />

		<div class="gallery fan-gallery js-flickity" data-flickity-options='{ "freeScroll":true, "wrapAround": true, "pageDots":false, "cellAlign":"left", "cellSelector":".gallery-cell", "prevNextButtons":false, "autoPlay":true }'>
			<div class="gallery-cell">
				<img class="gallery-cell-image" src="images/instagram_1_n.jpg" alt="tulip" />
			</div>
			<div class="gallery-cell">
				<img class="gallery-cell-image" src="images/instagram_2_n.jpg" alt="tulip" />
			</div>
			<div class="gallery-cell">
				<img class="gallery-cell-image" src="images/instagram_3_n.jpg" alt="tulip" />
			</div>
			<div class="gallery-cell">
				<img class="gallery-cell-image" src="images/instagram_4_n.jpg" alt="tulip" />
			</div>
			<div class="gallery-cell">
				<img class="gallery-cell-image" src="images/instagram_5_n.jpg" alt="tulip" />
			</div>
			<div class="gallery-cell">
				<img class="gallery-cell-image" src="images/instagram_6_n.jpg" alt="tulip" />
			</div>
			<div class="gallery-cell">
				<img class="gallery-cell-image" src="images/instagram_7_n.jpg" alt="tulip" />
			</div>
			<div class="gallery-cell">
				<img class="gallery-cell-image" src="images/instagram_8_n.jpg" alt="tulip" />
			</div>
			<div class="gallery-cell">
				<img class="gallery-cell-image" src="images/instagram_9_n.jpg" alt="tulip" />
			</div>
			<div class="gallery-cell">
				<img class="gallery-cell-image" src="images/instagram_10_n.jpg" alt="tulip" />
			</div>
			<div class="hawkofthemonth">
				<h3>#hawkofthemonth</h3>
				Send us your best Hawkeye fan photo for your chance to be the Hawk of the Month! The winner will win a Nike Replica Iowa Hawkeye Football. Send a photo to <a href="#">hawkshopcontest@gmail.com</a>.
			</div>
		</div>

		<?php include 'includes/footer.php'; ?>
		<div class="offscreen-exit"></div>
	</main>

	<?php include 'includes/mobilenav.php'; ?>

	<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
	<script src="js/build/production.min.js"></script>

</body>
</html>