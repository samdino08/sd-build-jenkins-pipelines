# Carl's site - 8 ball pool accessories

Static shop website deployed to nginx by Jenkins.

## Pages
- `index.html`: home page ("Welcome to Carl's site") with popular products
- `shop.html`: all products with category filters
- `cart.html`: cart, quantities, and the checkout (order request) form

## Files you will edit most
- `js/products.js`: products, prices, categories, Carl's order email
- `css/style.css`: colours (see the `:root` variables at the top)

## How ordering works
Customers add items to a cart (stored in their own browser), then send an
order request. There is no payment on the site; Carl confirms shipping and
payment by replying.

By default the request opens the customer's email app addressed to
`SITE.ORDER_EMAIL`. To receive orders directly without that, create a form
endpoint (e.g. Formspree) and paste its URL into `SITE.FORM_ENDPOINT`.

## Deploy
Push to `main`; Jenkins runs the `Jenkinsfile` and syncs the site to the server.
