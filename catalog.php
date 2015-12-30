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
		<div class="cat-promo-img">
			<picture>
				<!--[if IE 9]><video style="display: none;"><![endif]-->
				<source srcset="http://placehold.it/1400x300" media="(min-width: 981px)">
				<source srcset="images/amazon-banner-md.jpg" media="(min-width: 480px)">
				<!--[if IE 9]></video><![endif]-->
				<img srcset="images/amazon-banner.jpg" alt="…">
			</picture>
		</div>
		<div class="container">
			<div class="column-main">
				<div class="row">
					<div class="col-md-12">
						<section class="catalog-page">
							<div class="catalogcontent-heading">
								<h1 class="catalog-title">Women</h1>
							</div>
							<div class="catalog-wrapper">
								<ul class="justify catalog-icons">
									<li class="justify-item">
										<h2 class="catalog-heading"><a href="#">Tops</a></h2>
										<a href="#" class="catalog-thumb">
											<img src="images/CW0609-t.jpg" alt="">
										</a>
									</li>
									<li class="justify-item">
										<h2 class="catalog-heading"><a href="#">Sweatshirts</a></h2>
										<a href="#" class="catalog-thumb">
											<img src="images/BW0502-t.jpg" alt="">
										</a>
									</li>
									<li class="justify-item">
										<h2 class="catalog-heading"><a href="#">Pants</a></h2>
										<a href="#" class="catalog-thumb">
											<img src="images/PR0331-t.jpg" alt="">
										</a>
									</li>
									<li class="justify-item">
										<h2 class="catalog-heading"><a href="#">Shorts</a></h2>
										<a href="#" class="catalog-thumb">
											<img src="images/DW0341-t.jpg" alt="">
										</a>
									</li>
									<li class="justify-item">
										<h2 class="catalog-heading"><a href="#">Outerwear</a></h2>
										<a href="#" class="catalog-thumb">
											<img src="images/N0335-t.jpg" alt="">
										</a>

									</li>
									<li class="justify-item">
										<h2 class="catalog-heading"><a href="#">Hats</a></h2>
										<a href="#" class="catalog-thumb">
											<img src="images/A0744-t.jpg" alt="">
										</a>

									</li>
									<li class="justify-item">
										<h2 class="catalog-heading"><a href="#">Accessories</a></h2>
										<a href="#" class="catalog-thumb">
											<img src="images/TB0001-t.jpg" alt="">
										</a>

									</li>
									<li class="justify-item">
										<h2 class="catalog-heading"><a href="#">New Arrivals</a></h2>
										<a href="#" class="catalog-thumb">
											<img src="images/CW0877-t.jpg" alt="">
										</a>

									</li>
									<li class="justify-item filler"></li>
									<li class="justify-item filler"></li>
								</ul>
							</div>
						</section>
						<!-- Featured Items -->
						<?php include 'includes/catalog-featured.php'; ?>
					</div>
				</div>
			</div>
		</div>
		<?php include 'includes/footer.php'; ?>
		<div class="offscreen-exit"></div>
	</main>

	<?php include 'includes/mobilenav.php'; ?>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="js/build/production.min.js"></script>
</body>
</html>