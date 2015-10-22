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
<body class="">
	<a id="skiplink" href="#main-content">Skip to main content</a>
	<?php include 'includes/header.php'; ?>
	<main id="main-content" tabindex="-1">
		<div class="owl-carousel home-hero1">
			<div>
				<img src="images/back5.jpg" alt="">
			</div>
			<div>
				<img src="images/back2.jpg" alt="">
			</div>
			<div>
				<img src="images/back3.jpg" alt="">
			</div>
			<div>
				<img src="images/back1.jpg" alt="">
			</div>
		</div>
		<br />
		<div class="container">
			<div class="row">
				<div class="col-sm-4">
					<!-- <img src="images/banner1.png"> -->
					<img src="images/callout-3.jpg">
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
		</div>

		<?php include 'includes/home-featured.php'; ?>
		<br /><br /><br />
		<div class="container">
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
			<br />
		</div><!-- end .container -->
		<?php include 'includes/footer.php'; ?>
	</main>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="js/build/production.min.js"></script>
	<script>
      $(document).foundation();
    </script>
</body>
</html>