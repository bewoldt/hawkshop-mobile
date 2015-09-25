<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Homepage</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
	<link rel="stylesheet" href="css/p3.css">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:700,300,400' rel='stylesheet' type='text/css'>
	<script src="js/modernizr.js"></script>
	<script src="https://cdn.rawgit.com/scottjehl/picturefill/3.0.0-rc1/dist/picturefill.min.js"></script>
</head>
<body class="">
	<a id="skiplink" href="#main-content">Skip to main content</a>
	<?php include 'includes/header.php'; ?>
	<main>
		<div class="owl-carousel home-hero1">
			<div>
				<picture>
					<!--[if IE 9]><video style="display: none;"><![endif]-->
					<source srcset="http://placehold.it/1200x300" media="(min-width: 1000px)">
					<source srcset="http://placehold.it/800x300" media="(min-width: 480px)">
					<!--[if IE 9]></video><![endif]-->
					<img srcset="http://placehold.it/480x240" alt="…">
				</picture>
			</div>
			<div>
				<picture>
					<!--[if IE 9]><video style="display: none;"><![endif]-->
					<source srcset="http://placehold.it/1200x300" media="(min-width: 1000px)">
					<source srcset="http://placehold.it/800x300" media="(min-width: 480px)">
					<!--[if IE 9]></video><![endif]-->
					<img srcset="http://placehold.it/480x240" alt="…">
				</picture>
			</div>
			<div>
				<picture>
					<!--[if IE 9]><video style="display: none;"><![endif]-->
					<source srcset="http://placehold.it/1200x300" media="(min-width: 1000px)">
					<source srcset="http://placehold.it/800x300" media="(min-width: 480px)">
					<!--[if IE 9]></video><![endif]-->
					<img srcset="http://placehold.it/480x240" alt="…">
				</picture>
			</div>
		</div>
		<br />
		<div class="container">
			<div class="row">
				<div class="col-sm-12">

				</div><!-- end .col -->
			</div><!-- end .row -->
			<br />
			<div class="row">
				<div class="col-sm-4">
					<img src="images/callout-3.jpg">
				</div>
				<div class="col-sm-4">
					<img src="images/callout-3b.jpg">
				</div>
				<div class="col-sm-4">
					<img src="images/callout-3c.jpg">
				</div>
			</div><!-- end .row -->
			<br />
			<?php include 'includes/home-featured.php'; ?>
			<br /><br />
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