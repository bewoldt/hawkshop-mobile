<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Product</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
	<link rel="stylesheet" href="css/p3.css">
	<?php include 'includes/google-font.php'; ?>
	<script src="js/modernizr.js"></script>
</head>
<body>
	<a id="skiplink" href="#main-content">Skip to main content</a>
	<?php include 'includes/header.php'; ?>
	<main id="main-content" tabindex="-1">
		<div class="container">
			<div class="clearfix">
				<div class="column-main">
					<?php include 'includes/breadcrumbs.php'; ?>
					<div itemscope itemtype="http://schema.org/Product" id="itemDisplay" class="item-wrapper" store="103">
						<div class="clearfix">
							<div id="itemPhoto">
								<div id="photoThumb">
									<a class="">
										<img src="images/PR0216.jpg" itemprop="image" id="attrMainImg" border="0" alt="" />
									</a>
									<a class="">
										<img src="images/CW0901.jpg" itemprop="image" id="attrMainImg" border="0" alt="" />
									</a>
								</div>
							</div>
							<div id="itemInfo" class="hasImage">
								<h1 id="itemTitle" itemprop="name"><span itemprop="brand">Champion</span> Women's Iowa Hawkeyes Vertical T-Shirt</h1>
								<div id="itemOptions">
										<div id="itemDetails" itemprop="offers" itemscope itemtype="http://schema.org/Offer" onhand="0" showcount="" limit="0" back="">
											<div id="itemPrice">$<span id="showPrice" itemprop="price">21.00</span></div>
										</div>
										<!-- Size / Color Attributes Selector -->
										<div id="attrSelector">
											<div id="otherSelector1">
												<input name="attr_code.1" wpc="1017" value="45" type="hidden" id="attrCode1" >
												<select name="attr_value.1" tabindex="1" id="otherAttr1" class="itemMenu" >
													<option value="null" >--Select One--</option>
													<option value="Sm" optid="1948747" >Sm</option>
													<option value="Med" optid="1948705" >Med</option>
													<option value="Lg" optid="1948707" >Lg</option>
													<option value="XL" optid="1948709" >XL</option>
													<option value="2X" optid="1948711" >2X</option>
												</select>
											</div>
											<div id="otherSelector2">
												<input name="attr_code.2" wpc="1017" value="86" type="hidden" id="attrCode2" >
												<select name="attr_value.2" tabindex="2" id="otherAttr2" class="itemMenu" >
													<option value="null" >--Select One--</option>
													<option value="Gold" optid="3728307" >Gold</option>
												</select>
											</div>
										</div>
										<!-- Quantity Selector -->
										<div id="itemOrder">
											<div id="orderOptions" maxqty="40" cartqty="0" class="clearfix">
												<div class="dropdown">
													<select name="qty" tabindex="1" size="1" id="itemQty" class="qtyMenu">
														<option value="1" >1</option>
														<option value="2" >2</option>
														<option value="3" >3</option>
														<option value="4" >4</option>
														<option value="5" >5</option>
														<option value="6" >6</option>
														<option value="7" >7</option>
														<option value="8" >8</option>
														<option value="9" >9</option>
														<option value="10" >10</option>
													</select>
													<span aria-hidden="true" class="icon-down-arrow"></span>
												</div>
												<div id="cartLimit"></div>
												<div id="qtyCart" class="optionLimit"></div>
												<span class="addtocart-btn">
													<span class="icon-shopping-cart"></span>
													<input name="Add Cart" value="Add to Cart" type="submit" tabindex="2" onclick="_gaq.push(['_trackEvent', 'Ecommerce', 'Add To Cart']);" id="cartAdd" border="0" alt="Add to Cart" >
												</span>
											</div>
										</div>
									</form>
								</div>

								<div id="itemDesc">
									<div id="itemText" itemprop="description">
										<h4 class="description"><span>Description</span></h4>
										<p>The Vertical Short Sleeve T-Shirt is a great way to show you school spirit at any sporting event!</p>
										<p>Features Iowa Hawkeyes printed vertically with a Tigerhawk at the bottom.</p>
										<ul>
											<li>100% cotton</li>
											<li>Champion</li>
											<li>Sizes XS, S, M, L, XL, 2XL</li>
											<li>Available in Gold or Black</li>
										</ul>
									</div>
								</div>
								<p class="item-meta"><strong>Brand:</strong> <span itemprop="brand">Champion</span></p>
								<p class="item-meta" id="itemNumber" itemprop="productID">F0694</p>
								<div class="item-meta item-social">
									<span class="item-share">Share: </span>
									<a href="#" class="js-social-share"><span class="icon-facebook"></span></a>
									<a href="https://twitter.com/intent/tweet?text=hello%20world&url=https%3A%2F%2Fjonsuh.com%2F&via=iowahawkshop" class="js-social-share"><span class="icon-twitter"></span></a>
									<a href="#" class="js-social-share"><span class="icon-pinterest"></span></a>
								</div>
								<div>
									<img src="images/why.jpg" alt="">
								</div>
							</div>
						</div>
					</div>
					<?php include 'includes/suggested-items.php'; ?>
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
		</div>
		<?php include 'includes/mission.php'; ?>
		<?php include 'includes/footer.php'; ?>
	</main>


	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="js/build/production.min.js"></script>
	<script>
      $(document).foundation();
    </script>
    <script>
    	jQuery(document).ready(function($){
    		// initialize owlcarousel
			$('#photoThumb').owlCarousel({
				responsive:{
	            0:{
	                items:1,
	            },
	            650:{
	                items:1,
	                center:true,
	                stagePadding: 150
	            },
	            769:{
	                items:1
	            }
	        }
			});
		});
    </script>
	<!--<script type="text/javascript" src="js/plugins/itemDisplay.js"></script>-->
</body>
</html>