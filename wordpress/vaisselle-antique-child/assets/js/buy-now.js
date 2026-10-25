/* Vaisselle Antique — "Buy now" button.
 *
 * Blocksy's AJAX add-to-cart listens for the product form and would add the
 * item without leaving the page. For "Buy now" we submit the form natively
 * instead (form.submit() fires no submit event, so no script intercepts it),
 * to the button's formaction URL (?va_buy_now=1). WooCommerce then adds the
 * item and functions.php redirects to checkout.
 */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.va-buy-now-button').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var form = btn.closest('form');
      if (!form) { return; }
      // Let the browser show its own message for invalid options (e.g. a variation not chosen).
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) { return; }

      e.preventDefault();
      e.stopImmediatePropagation();

      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = btn.name;   // "add-to-cart"
      input.value = btn.value; // product id
      form.appendChild(input);

      form.setAttribute('action', btn.getAttribute('formaction'));
      btn.disabled = true;
      HTMLFormElement.prototype.submit.call(form);
    }, true);
  });
});
