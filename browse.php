<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Browse</title>
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
		<div>
			<picture>
				<!--[if IE 9]><video style="display: none;"><![endif]-->
				<source srcset="images/amazon-banner.jpg" media="(min-width: 981px)">
				<source srcset="images/amazon-banner-md.jpg" media="(min-width: 480px)">
				<!--[if IE 9]></video><![endif]-->
				<img srcset="images/amazon-banner-sm.jpg" alt="…">
			</picture>
		</div>
		<div class="container">
			<?php include 'includes/subcats.php'; ?>
			<!-- <ul class="sub-cats clearfix">
				<li class="onbranchli"><a href="#" class="onbranch">Women's Apparel</a>
					<ul>
						<li class="onleafli"><a href="#">Tops</a></li>
						<li class="leafli"><a href="#">Sweatshirts</a></li>
						<li class="leafli"><a href="#">Business Casual</a></li>
						<li class="leafli"><a href="#">Shorts &amp; Pants</a></li>
						<li class="leafli"><a href="#">Outerwear</a></li>
						<li class="leafli"><a href="#">Hats</a></li>
						<li class="leafli"><a href="#">Scrubs</a></li>
						<li class="leafli"><a href="#">Accessories</a></li>
						<li class="leafli"><a href="#">New Arrivals</a></li>
					</ul>
				</li>
			</ul> -->
		</div>
		<div class="container">
			<?php include 'includes/breadcrumbs.php'; ?>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<section class="browse rightcolumn">
						<div class="catalogcontent">
							<h1 class="catalog-title">Tops</h1>
						</div>
						<ul class="justify product-list">
							<!-- Featured items include -->
							<?php include 'includes/browse-featured.php'; ?>

							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/DW1000-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Nike</span> Iowa Floral Burnout Dress</a>
									</h2>
									<p class="thumbnail-price"><span class="sale">$45.00</span> <span class="regular-price">$25.00</span></p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/CW0964-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Nike</span> Iowa Women's Rewind Run Game Shirt</a>
									</h2>
									<p class="thumbnail-price">$32.00</p>
									<p class="more-colors">+ more colors</p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/PR0305-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#">Iowa Women's Black and Gold T-Shirt</a>
									</h2>
									<p class="thumbnail-price">$33.00</p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/CW0988-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Nike</span> Iowa Women's Kapaa Strappy Tank</a>
									</h2>
									<p class="thumbnail-price"><span class="sale">$20.00</span> <span class="regular-price">$25.00</span></p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/CW0950-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Nike</span> Iowa Women's V-Neck Fan T-Shirt</a>
									</h2>
									<p class="thumbnail-price">$42.00</p>
									<p class="more-colors">+ more colors</p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/PR0216-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Under Armour</span> Iowa Hawkeyes Women's Cotton Performance V-Neck</a>
									</h2>
									<p class="thumbnail-price">$30.00</p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/CW0838-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Retro Brand</span> Women's Relaxed Fit Iowa Hawkeyes T-shirt in Charcoal</a>
									</h2>
									<p class="thumbnail-price">$28.00</p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/CW0901-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Retro Brand</span> Women's Iowa Hawkeyes V-Neck Long Sleeve Raglan T-Shirt</a>
									</h2>
									<p class="thumbnail-price">$34.00</p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/BW0834-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#">Iowa Hawkeyes Fleece</a>
									</h2>
									<p class="thumbnail-price">$50.00</p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/CW0968-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Under Armour</span> Iowa Hawkeyes Fleece</a>
									</h2>
									<p class="thumbnail-price"><span class="sale">$50.00</span> <span class="regular-price">$25.00</span></p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/CW0859-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Under Armour</span> Iowa Hawkeyes Fleece</a>
									</h2>
									<p class="thumbnail-price">$50.00</p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/CW0956-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Nike</span> Iowa Floral Burnout Dress</a>
									</h2>
									<p class="thumbnail-price"><span class="sale">$45.00</span> <span class="regular-price">$25.00</span></p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/CW0980-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Nike</span> Iowa Floral Burnout Dress</a>
									</h2>
									<p class="thumbnail-price">$45.00</p>
									<p class="more-colors">+ more colors</p>
								</div>
							</li>
							<li class="justify-item">
								<a class="thumbnail-link" href="#" title="">
									<img data-original="images/items/PR0351-t.jpg" alt="" class="lazy productimg" width="350" height="389" />
								</a>
								<div class="thumbnail-info">
									<h2 class="thumbnail-title">
										<a href="#"><span class="brand">Nike</span> Iowa Floral Burnout Dress</a>
									</h2>
									<p class="thumbnail-price">$45.00</p>
								</div>
							</li>
							<li class="justify-item filler"></li>
							<li class="justify-item filler"></li>
						</ul>
						<?php include 'includes/pagination.php'; ?>
					</section>
				</div><!-- end .col -->
			</div><!-- end .row -->
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