<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Offscreen</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
	<link rel="stylesheet" href="css/p3.css">
	<?php include 'includes/google-font.php'; ?>
	<script src="js/modernizr.js"></script>
</head>
<body>

	<div class="off-canvas-wrap" data-offcanvas>
	  <div class="inner-wrap">
		 <nav class="tab-bar">
			<section class="left-small">
			  <a class="left-off-canvas-toggle menu-icon" ><span></span></a>
			</section>

			<section class="middle tab-bar-section">
			  <h1 class="title">Foundation</h1>
			</section>

			<section class="right-small">
			  <a class="right-off-canvas-toggle menu-icon" ><span></span></a>
			</section>
		 </nav>

		 <aside class="left-off-canvas-menu">
			<ul class="off-canvas-list">
			  <li><label>Foundation</label></li>
			  <li class="has-submenu"><a href="#">The Psychohistorians</a>
					<ul class="left-submenu">
						 <li class="back"><a href="#">Back</a></li>
						 <li><label>Level 1</label></li>
						 <li><a href="#">Link 1</a></li>
						 <li class="has-submenu"><a href="#">Link 2 w/ submenu</a>
							  <ul class="left-submenu">
									<li class="back"><a href="#">Back</a></li>
									<li><label>Level 2</label></li>
									<li><a href="#">...</a></li>
							  </ul>
						 </li>
						 <li><a href="#">...</a></li>
					</ul>
			  </li>
			  <li><a href="#">The Encyclopedists</a></li>
			  <li><a href="#">The Mayors</a></li>
			  <li><a href="#">The Traders</a></li>
			  <li><a href="#">The Merchant Princes</a></li>
			</ul>
		 </aside>

		 <aside class="right-off-canvas-menu">
			<ul class="off-canvas-list">
			  <li><label>Users</label></li>
			  <li><a href="#">Hari Seldon</a></li>
			  <li class="has-submenu"><a href="#">R. Giskard Reventlov</a>
					<ul class="right-submenu">
						 <li class="back"><a href="#">Back</a></li>
						 <li><label>Level 1</label></li>
						 <li><a href="#">Link 1</a></li>
						 <li class="has-submenu"><a href="#">Link 2 w/ submenu</a>
							  <ul class="right-submenu">
									<li class="back"><a href="#">Back</a></li>
									<li><label>Level 2</label></li>
									<li><a href="#">...</a></li>
							  </ul>
						 </li>
						 <li><a href="#">...</a></li>
					</ul>
			  </li>
			  <li><a href="#">...</a></li>
			</ul>
		 </aside>

		 <section class="main-section">
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent <a href="http://google.com">commodo</a> cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.</p>
		 </section>

	  <a class="exit-off-canvas"></a>

	  </div>
	</div>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="js/build/production.min.js"></script>
	<script>
		$(document).foundation();
	</script>
</body>
</html>