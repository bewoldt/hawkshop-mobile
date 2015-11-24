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
	<script src="https://cdn.rawgit.com/scottjehl/picturefill/master/dist/picturefill.min.js"></script>
</head>
<body class="home-page">
	<a id="skiplink" href="#main-content">Skip to main content</a>
	<?php include 'includes/header.php'; ?>
	<main id="main-content" tabindex="-1" class="cd-main-content">

		<div class="home-gallery">
			<div class="gallery-cell">
				<a href="#"><img src="images/back1.jpg" alt=""></a>
			</div>
			<div class="gallery-cell">
				<a href="#"><img src="images/back2.jpg" alt=""></a>
			</div>
			<div class="gallery-cell">
				<a href="#"><img src="images/back3.jpg" alt=""></a>
			</div>
			<div class="gallery-cell">
				<a href="#"><img src="images/back4.jpg" alt=""></a>
			</div>
			<div class="gallery-cell">
				<a href="#"><img src="images/back5.jpg" alt=""></a>
			</div>
		</div>
		<br /><br />
		<div class="container">
			<div class="row">
				<div class="col-sm-4">
					<!-- <img src="images/banner1.png"> -->
					<a href="#"><img src="images/callout-3.jpg"></a>
				</div>
				<div class="col-sm-4">
					<!-- <img src="images/banner2.png"> -->
					<img src="images/callout-3b.jpg">
				</div>
				<div class="col-sm-4">
					<!-- <img src="images/banner3.png"> -->
					<img src="images/callout-3c.jpg">
				</div>
			</div><!-- end .row -->
			<div class="row">
				<div class="col-sm-12">
					<?php include 'includes/home-featured.php'; ?>
					<br />
				</div>
			</div>
			<div class="row">
				<div class="col-xs-6 col-sm-3">
					<img src="images/extra-3a.jpg">
				</div>
				<div class="col-xs-6 col-sm-3">
					<img src="images/extra-3b.jpg">
				</div>
				<div class="col-xs-6 col-sm-3">
					<img src="images/extra-3c.jpg">
				</div>
				<div class="col-xs-6 col-sm-3">
					<img src="images/extra-3a.jpg">
				</div>
			</div><!-- end .row -->
		</div>



		<?php include 'includes/footer.php'; ?>
		<div class="offscreen-exit"></div>
	</main>

	<?php include 'includes/mobilenav.php'; ?>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="js/build/production.min.js"></script>

</body>
</html>