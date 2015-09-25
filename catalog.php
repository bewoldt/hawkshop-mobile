<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Catalog</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
	<link rel="stylesheet" href="css/p3.css">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:700,300,400' rel='stylesheet' type='text/css'>
	<script src="js/modernizr.js"></script>
</head>
<body class="">
	<a id="skiplink" href="#main-content">Skip to main content</a>
	<?php include 'includes/header.php'; ?>

	<main>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<section>
						<div class="catalogcontent">
							<h1 class="catalog-title">Women</h1>
						</div>
						<ul class="justify catalog-icons">
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="http://www.hawkshop.com/webitemimages/103/CW0609-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Tops</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="http://www.hawkshop.com/webitemimages/103/BW0502-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Sweatshirts</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="http://www.hawkshop.com/webitemimages/103/PR0331-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Pants</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="http://www.hawkshop.com/webitemimages/103/DW0341-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Shorts</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="http://www.hawkshop.com/webitemimages/103/N0335-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Outerwear</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="http://www.hawkshop.com/webitemimages/103/A0744-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Hats</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="http://www.hawkshop.com/webitemimages/103/TB0001-t.jpg" alt="" class="lazy" alt="">
								</a>
								<h2 class="icon-title"><a href="#">Accessories</a></h2>
							</li>
							<li class="justify-item">
								<a href="#" class="icon-link">
									<img data-original="http://www.hawkshop.com/webitemimages/103/CW0877-t.jpg" alt="" class="lazy" alt="">
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

		</div>
		<br />
		<?php include 'includes/footer.php'; ?>
	</main>

	<!-- <div class="cd-overlay"></div> -->

	<?php include'includes/mobile-nav.php'; ?>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="js/build/production.min.js"></script>
	<script>
      $(document).foundation();
    </script>
</body>
</html>