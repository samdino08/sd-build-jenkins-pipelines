(function () {
  'use strict';

  var KEY = 'carls-cart-v1';
  var PRODUCT_MAP = {};
  PRODUCTS.forEach(function (p) { PRODUCT_MAP[p.id] = p; });

  var CAT_LABEL = {};
  CATEGORIES.forEach(function (c) { CAT_LABEL[c.id] = c.label; });

  /* ---------- helpers ---------- */
  function money(n) { return SITE.CURRENCY + n.toFixed(2); }
  function $(sel) { return document.querySelector(sel); }
  function $all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
  function closest(el, sel) {
    while (el && el.nodeType === 1) {
      if ((el.matches || el.webkitMatchesSelector || el.msMatchesSelector).call(el, sel)) return el;
      el = el.parentNode;
    }
    return null;
  }

  /* ---------- cart storage (falls back to memory if storage is blocked) ---------- */
  var cart = loadCart();

  function loadCart() {
    var out = {};
    try {
      var raw = window.localStorage.getItem(KEY);
      var obj = raw ? JSON.parse(raw) : {};
      Object.keys(obj).forEach(function (id) {
        var q = parseInt(obj[id], 10);
        if (PRODUCT_MAP[id] && q > 0) out[id] = Math.min(q, 99);
      });
    } catch (e) { /* ignore */ }
    return out;
  }
  function saveCart() {
    try { window.localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ }
    updateBadge();
  }
  function cartCount() {
    return Object.keys(cart).reduce(function (n, id) { return n + cart[id]; }, 0);
  }
  function cartTotal() {
    return Object.keys(cart).reduce(function (sum, id) { return sum + PRODUCT_MAP[id].price * cart[id]; }, 0);
  }
  function addToCart(id, qty) {
    if (!PRODUCT_MAP[id]) return;
    cart[id] = Math.min((cart[id] || 0) + (qty || 1), 99);
    saveCart();
  }
  function setQty(id, qty) {
    if (qty <= 0) { delete cart[id]; } else { cart[id] = Math.min(qty, 99); }
    saveCart();
  }
  function updateBadge() {
    var n = cartCount();
    $all('.cart-count').forEach(function (el) { el.textContent = n; });
  }

  /* ---------- product art (simple drawings, no image files needed) ---------- */
  var ICONS = {
    cue: '<g transform="rotate(-25 60 45)"><rect x="4" y="40" width="112" height="9" rx="4.5" fill="#d9a35b"/><rect x="4" y="40" width="32" height="9" rx="4.5" fill="#5b3a1e"/><rect x="100" y="40" width="10" height="9" fill="#eef2f7"/><rect x="108" y="40" width="8" height="9" rx="4" fill="#4fa3d1"/></g>',
    chalk: '<rect x="36" y="22" width="48" height="48" rx="7" fill="#3aa0d8"/><rect x="36" y="22" width="48" height="16" rx="7" fill="#7cc7ee"/><ellipse cx="60" cy="52" rx="13" ry="9" fill="#2a7fb0"/>',
    ball: '<circle cx="60" cy="45" r="32" fill="#111"/><circle cx="60" cy="45" r="14" fill="#fff"/><text x="60" y="52" text-anchor="middle" font-size="20" font-weight="700" fill="#111" font-family="Arial, sans-serif">8</text><ellipse cx="46" cy="27" rx="8" ry="4" fill="#fff" fill-opacity="0.35" transform="rotate(-30 46 27)"/>',
    rack: '<polygon points="60,10 108,80 12,80" fill="none" stroke="#e0b04a" stroke-width="7" stroke-linejoin="round"/><polygon points="60,32 84,68 36,68" fill="none" stroke="#e0b04a" stroke-width="3" stroke-linejoin="round" stroke-opacity="0.6"/>',
    'case': '<rect x="8" y="32" width="104" height="28" rx="14" fill="#3a2a1f"/><rect x="8" y="42" width="104" height="8" fill="#e0b04a" fill-opacity="0.8"/><circle cx="34" cy="46" r="4" fill="#e0b04a"/><circle cx="86" cy="46" r="4" fill="#e0b04a"/>',
    glove: '<rect x="34" y="42" width="52" height="34" rx="10" fill="#eef2f7"/><rect x="34" y="14" width="11" height="36" rx="5.5" fill="#eef2f7"/><rect x="47" y="10" width="11" height="40" rx="5.5" fill="#eef2f7"/><rect x="60" y="14" width="11" height="36" rx="5.5" fill="#eef2f7"/><rect x="73" y="20" width="11" height="30" rx="5.5" fill="#eef2f7"/><rect x="22" y="44" width="11" height="26" rx="5.5" fill="#eef2f7" transform="rotate(25 27 57)"/>'
  };
  function art(icon) {
    return '<svg viewBox="0 0 120 90" role="img" aria-hidden="true">' + (ICONS[icon] || ICONS.ball) + '</svg>';
  }

  /* ---------- product cards ---------- */
  function productCard(p) {
    return '' +
      '<article class="product">' +
        '<div class="product-art">' + art(p.icon) + '</div>' +
        '<div class="product-body">' +
          '<h3>' + p.name + '</h3>' +
          '<p class="cat">' + CAT_LABEL[p.category] + '</p>' +
          '<p class="desc">' + p.desc + '</p>' +
          '<p class="price">' + money(p.price) + '</p>' +
          '<div class="buy">' +
            '<button type="button" class="btn" data-add="' + p.id + '">Add to cart</button>' +
            '<a class="btn btn-alt" href="cart.html#checkout" data-buy="' + p.id + '">Buy now</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  function renderGrid(container, list) {
    container.innerHTML = list.map(productCard).join('');
  }

  /* ---------- page: home ---------- */
  var featured = $('#featured');
  if (featured) {
    renderGrid(featured, PRODUCTS.filter(function (p) { return p.featured; }));
  }

  /* ---------- page: shop ---------- */
  var grid = $('#product-grid');
  if (grid) {
    var filters = $('#filters');
    var current = 'all';
    var buttons = [{ id: 'all', label: 'All' }].concat(CATEGORIES);
    filters.innerHTML = buttons.map(function (c) {
      return '<button type="button" class="chip" data-filter="' + c.id + '" aria-pressed="' + (c.id === 'all') + '">' + c.label + '</button>';
    }).join('');
    var draw = function () {
      var list = PRODUCTS.filter(function (p) { return current === 'all' || p.category === current; });
      renderGrid(grid, list);
      $all('.chip').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === current));
      });
    };
    filters.addEventListener('click', function (e) {
      var b = closest(e.target, '[data-filter]');
      if (!b) return;
      current = b.getAttribute('data-filter');
      draw();
    });
    draw();
  }

  /* ---------- add / buy buttons (any page) ---------- */
  document.addEventListener('click', function (e) {
    var add = closest(e.target, '[data-add]');
    if (add) {
      addToCart(add.getAttribute('data-add'), 1);
      var old = add.textContent;
      add.textContent = 'Added \u2713';
      add.disabled = true;
      setTimeout(function () { add.textContent = old; add.disabled = false; }, 1100);
      return;
    }
    var buy = closest(e.target, '[data-buy]');
    if (buy) {
      addToCart(buy.getAttribute('data-buy'), 1);   // then the link opens the cart/checkout page
    }
  });

  /* ---------- page: cart & checkout ---------- */
  var cartList = $('#cart-items');
  if (cartList) {
    var emptyBox = $('#cart-empty');
    var content = $('#cart-content');
    var totalEl = $('#cart-total');

    var drawCart = function () {
      var ids = Object.keys(cart);
      emptyBox.hidden = ids.length > 0;
      content.hidden = ids.length === 0;
      cartList.innerHTML = ids.map(function (id) {
        var p = PRODUCT_MAP[id], q = cart[id];
        return '' +
          '<li class="cart-row">' +
            '<div class="cart-art">' + art(p.icon) + '</div>' +
            '<div class="cart-info"><strong>' + p.name + '</strong><span>' + money(p.price) + ' each</span></div>' +
            '<div class="qty" role="group" aria-label="Quantity for ' + p.name + '">' +
              '<button type="button" data-dec="' + id + '" aria-label="Decrease quantity">\u2212</button>' +
              '<span>' + q + '</span>' +
              '<button type="button" data-inc="' + id + '" aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<div class="line-total">' + money(p.price * q) + '</div>' +
            '<button type="button" class="remove" data-remove="' + id + '" aria-label="Remove ' + p.name + '">Remove</button>' +
          '</li>';
      }).join('');
      totalEl.textContent = money(cartTotal());
    };

    cartList.addEventListener('click', function (e) {
      var t;
      if ((t = closest(e.target, '[data-inc]')))    { setQty(t.getAttribute('data-inc'), cart[t.getAttribute('data-inc')] + 1); }
      else if ((t = closest(e.target, '[data-dec]')))    { setQty(t.getAttribute('data-dec'), cart[t.getAttribute('data-dec')] - 1); }
      else if ((t = closest(e.target, '[data-remove]'))) { setQty(t.getAttribute('data-remove'), 0); }
      else { return; }
      drawCart();
    });

    var form = $('#order-form');
    var statusEl = $('#order-status');

    var buildOrder = function () {
      var f = form.elements;
      var lines = Object.keys(cart).map(function (id) {
        var p = PRODUCT_MAP[id], q = cart[id];
        return '- ' + q + ' x ' + p.name + ' @ ' + money(p.price) + ' = ' + money(p.price * q);
      });
      return {
        customer: {
          name: f.name.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim(),
          address: f.address.value.trim(), notes: f.notes.value.trim()
        },
        lines: lines,
        total: money(cartTotal())
      };
    };
    var orderText = function (o) {
      return 'New order request from ' + SITE.STORE_NAME + '\n\n' +
        'Name: ' + o.customer.name + '\n' +
        'Email: ' + o.customer.email + '\n' +
        'Phone: ' + o.customer.phone + '\n' +
        'Delivery address:\n' + o.customer.address + '\n\n' +
        'Items:\n' + o.lines.join('\n') + '\n\n' +
        'Subtotal: ' + o.total + ' (shipping and tax to be confirmed)\n\n' +
        'Notes: ' + (o.customer.notes || '-') + '\n';
    };
    var show = function (msg, isError) {
      statusEl.textContent = msg;
      statusEl.className = 'status ' + (isError ? 'error' : 'ok');
      statusEl.hidden = false;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!Object.keys(cart).length) { show('Your cart is empty.', true); return; }
      var order = buildOrder();
      var text = orderText(order);

      if (SITE.FORM_ENDPOINT) {
        show('Sending your order request...', false);
        fetch(SITE.FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ name: order.customer.name, email: order.customer.email, message: text })
        }).then(function (r) {
          if (!r.ok) { throw new Error('bad response'); }
          cart = {}; saveCart(); drawCart(); form.reset();
          content.hidden = true; emptyBox.hidden = true;
          show('Thank you! Your order request was sent. Carl will contact you to confirm shipping, payment and delivery.', false);
        }).catch(function () {
          show('Sorry, the order could not be sent. Please try again or email ' + SITE.ORDER_EMAIL + '.', true);
        });
      } else {
        var href = 'mailto:' + SITE.ORDER_EMAIL +
          '?subject=' + encodeURIComponent('Order request from ' + order.customer.name) +
          '&body=' + encodeURIComponent(text);
        show('Your email app should now open with the order filled in. Press Send there to submit the request.', false);
        window.location.href = href;
      }
    });

    drawCart();
  }

  /* ---------- every page ---------- */
  var year = $('#year');
  if (year) { year.textContent = new Date().getFullYear(); }
  updateBadge();
})();
