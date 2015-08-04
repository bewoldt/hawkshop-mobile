<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Product</title>
	<!-- CSS -->
	<link rel="stylesheet" href="css/p3.css">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:700,300,400' rel='stylesheet' type='text/css'>
</head>

<body>
	<a id="skiplink" href="#main-content">Skip to main content</a>
	<div id="content">
		<?php include 'includes/header.php'; ?>
		<div class="container">
			<div class="clearfix">
				<div class="column-main">
					<?php include 'includes/breadcrumbs.php'; ?>
					<div itemscope itemtype="http://schema.org/Product" id="itemDisplay" class="item-wrapper" store="103">
						<div class="clearfix">
							<div id="itemPhoto">
								<div class="product-items">
									<div class="gallery-cell">
										<img src="http://www.hawkshop.com/webitemimages/103/CW0838.jpg" itemprop="image" id="attrMainImg" border="0" alt="" />
									</div>
									<div class="gallery-cell">
										<img src="http://www.hawkshop.com/webitemimages/103/CW0901.jpg" itemprop="image" id="attrMainImg" border="0" alt="" />
									</div>
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
													<select name="qty" tabindex="1" size="1" id="itemQty" class="form-control qtyMenu">
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
												<input name="Add Cart" value="Add to Cart" type="submit" tabindex="2" onclick="_gaq.push(['_trackEvent', 'Ecommerce', 'Add To Cart']);" id="cartAdd" border="0" alt="Add to Cart" >
											</div>
										</div>
									</form>
								</div>
								<div id="itemDesc">
									<div id="itemText" itemprop="description">
										<h4 class="description">Description:</h4>
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
								<p class="item-meta" id="itemNumber" itemprop="productID"><strong>Item Number:</strong> F0694</p>
							</div>
						</div>
					</div>
					<?php include 'includes/suggested-items.php'; ?>
				</div>
			</div>
		</div><!-- end .container -->
		<?php include 'includes/footer.php'; ?>
	</div>

	<!-- JS -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="js/build/production.min.js"></script>

</body>
</html>