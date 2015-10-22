<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Formstone</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
	<link rel="stylesheet" href="css/p3.css">
	<?php include 'includes/google-font.php'; ?>
	<script src="js/modernizr.js"></script>
	<script src="https://cdn.rawgit.com/scottjehl/picturefill/master/dist/picturefill.min.js"></script>
</head>
<body class="">
	<header class="header-form">
		<a href="https://formstone.it/" class="header_logo">Formstone</a>
		<button class="header_button js-nav_handle">Menu</button>
	</header>
	<div class="wrapper">
		<div class="page js-nav_move">
			<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. <a href="http://google.com">Morbi</a> leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
			<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
			<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
			<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
		</div>
		<aside class="sidebar">
			<nav class="main_nav sidebar_content js-navigation" data-navigation-handle=".js-nav_handle" data-navigation-content=".js-nav_move">
				<ul>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
					<li><a href="#">Link goes here</a></li>
				</ul>
			</nav>
		</aside>
	</div>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="js/build/production.min.js"></script>
	<script>

    </script>
	<script>
    	$( document ).ready(function() {
	    	// Formstone navigation init
			$(".main_nav").navigation({
				type: "overlay",
				gravity: "right",
				maxWidth: "10000px"
			});
		});
	</script>
</body>
</html>