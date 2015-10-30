<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Catalog</title>
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

	<main id="main-content" tabindex="-1" class="cd-main-content">
		<div>
			<picture>
				<!--[if IE 9]><video style="display: none;"><![endif]-->
				<source srcset="images/amazon-banner.jpg" media="(min-width: 981px)">
				<source srcset="images/amazon-banner-md.jpg" media="(min-width: 480px)">
				<!--[if IE 9]></video><![endif]-->
				<img srcset="images/amazon-banner.jpg" alt="…">
			</picture>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<section>
						<div class="catalogcontent">
							<h1 class="catalog-title">Women</h1>
						</div>
						<ul class="justify catalog-icons">
							<li class="justify-item">
								<h2 class="icon-title"><a href="#">Tops</a></h2>
								<a href="#" class="icon-link">
									<img data-original="images/CW0609-t.jpg" alt="" class="lazy" alt="">
								</a>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="images/BW0502-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Sweatshirts</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="images/PR0331-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Pants</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="images/DW0341-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Shorts</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="images/N0335-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Outerwear</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="images/A0744-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Hats</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="images/TB0001-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Accessories</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="images/CW0877-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">New Arrivals</a></h2>
							</li>
							<li class="justify-item filler"></li>
							<li class="justify-item filler"></li>
						</ul>
					</section>
					<!-- Featured Items -->
					<div class="catalog-list">
						<ul>
							<?php include 'includes/browse-featured.php'; ?>
						</ul>
					</div>
				</div>
			</div>
			<!-- <br />
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
			</div> -->
		</div>
		<?php include 'includes/footer.php'; ?>
	</main>

	<?php include 'includes/mobilenav.php'; ?>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="js/build/production.min.js"></script>
	<script>
      $(document).foundation();
    </script>
</body>
</html>