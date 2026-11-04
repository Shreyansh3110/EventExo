/**
 * NEXUS Tech Summit 2027 - Tickets & Registration Checkout System
 */

let selectedTicketTier = 'general';
let ticketQuantity = 1;
let appliedDiscount = 0; // percentage e.g. 20 for 20% off

document.addEventListener('DOMContentLoaded', () => {
  renderTicketTiers();
  initCheckoutModal();
});

// 1. Render Ticket Tiers on Landing Page
function renderTicketTiers() {
  const container = document.getElementById('ticket-tiers-container');
  if (!container) return;

  container.innerHTML = EVENT_CONFIG.ticketTiers.map(tier => `
    <div class="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.02] ${
      tier.popular ? 'border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 bg-slate-900/80' : 'border border-white/10'
    }">
      ${tier.badge ? `
        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span class="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            tier.popular ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' : 'bg-white/10 text-slate-300 border border-white/10'
          }">
            ${tier.badge}
          </span>
        </div>
      ` : ''}

      <div>
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-xl font-bold text-white">${tier.name}</h3>
        </div>
        <p class="text-xs text-slate-400 mb-6 leading-relaxed">${tier.description}</p>

        <div class="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/10">
          <span class="text-4xl font-extrabold text-white font-heading">$${tier.price}</span>
          <span class="text-slate-500 line-through text-sm font-semibold">$${tier.originalPrice}</span>
          <span class="text-xs text-emerald-400 font-bold ml-auto">Save $${tier.originalPrice - tier.price}</span>
        </div>

        <ul class="space-y-3 mb-8">
          ${tier.features.map(f => `
            <li class="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"></i>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div>
        <button 
          onclick="openCheckoutModal('${tier.id}')"
          class="w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            tier.popular 
              ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25' 
              : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
          }"
        >
          <span>Select Pass</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
        <p class="text-center text-[11px] text-slate-400 mt-2.5">
          Only ${tier.available} passes remaining
        </p>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// 2. Checkout Modal & Registration Flow
function openCheckoutModal(tierId) {
  selectedTicketTier = tierId || 'general';
  ticketQuantity = 1;
  appliedDiscount = 0;

  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  const select = document.getElementById('modal-tier-select');
  if (select) {
    select.value = selectedTicketTier;
  }

  updateCheckoutSummary();

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
  if (window.lucide) lucide.createIcons();
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
}

function updateCheckoutSummary() {
  const tier = EVENT_CONFIG.ticketTiers.find(t => t.id === selectedTicketTier) || EVENT_CONFIG.ticketTiers[1];
  const unitPrice = tier.price;
  const subtotal = unitPrice * ticketQuantity;
  const discountAmount = Math.round(subtotal * (appliedDiscount / 100));
  const total = subtotal - discountAmount;

  const elUnitPrice = document.getElementById('summary-unit-price');
  const elQty = document.getElementById('summary-qty');
  const elSubtotal = document.getElementById('summary-subtotal');
  const elDiscountRow = document.getElementById('summary-discount-row');
  const elDiscount = document.getElementById('summary-discount');
  const elTotal = document.getElementById('summary-total');

  if (elUnitPrice) elUnitPrice.innerText = `$${unitPrice}`;
  if (elQty) elQty.innerText = ticketQuantity;
  if (elSubtotal) elSubtotal.innerText = `$${subtotal}`;
  
  if (elDiscountRow && elDiscount) {
    if (appliedDiscount > 0) {
      elDiscountRow.classList.remove('hidden');
      elDiscount.innerText = `-$${discountAmount} (${appliedDiscount}% OFF)`;
    } else {
      elDiscountRow.classList.add('hidden');
    }
  }

  if (elTotal) elTotal.innerText = `$${total}`;
}

function initCheckoutModal() {
  const modalTierSelect = document.getElementById('modal-tier-select');
  if (modalTierSelect) {
    modalTierSelect.addEventListener('change', (e) => {
      selectedTicketTier = e.target.value;
      updateCheckoutSummary();
    });
  }

  const btnMinus = document.getElementById('btn-qty-minus');
  const btnPlus = document.getElementById('btn-qty-plus');
  const qtyInput = document.getElementById('input-qty');

  if (btnMinus && btnPlus && qtyInput) {
    btnMinus.addEventListener('click', () => {
      if (ticketQuantity > 1) {
        ticketQuantity--;
        qtyInput.value = ticketQuantity;
        updateCheckoutSummary();
      }
    });

    btnPlus.addEventListener('click', () => {
      if (ticketQuantity < 10) {
        ticketQuantity++;
        qtyInput.value = ticketQuantity;
        updateCheckoutSummary();
      }
    });
  }

  // Coupon code handler (e.g. 'SUMMIT20' for 20% off)
  const applyCouponBtn = document.getElementById('btn-apply-coupon');
  const couponInput = document.getElementById('input-coupon');
  const couponFeedback = document.getElementById('coupon-feedback');

  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', () => {
      const code = couponInput.value.trim().toUpperCase();
      if (code === 'SUMMIT20' || code === 'EARLYBIRD') {
        appliedDiscount = 20;
        couponFeedback.innerText = "✓ 20% discount code applied successfully!";
        couponFeedback.className = "text-xs text-emerald-400 font-semibold mt-1";
      } else if (code === 'VIPFREE') {
        appliedDiscount = 100;
        couponFeedback.innerText = "✓ 100% VIP pass granted!";
        couponFeedback.className = "text-xs text-emerald-400 font-semibold mt-1";
      } else {
        couponFeedback.innerText = "✗ Invalid discount code. Try 'SUMMIT20'";
        couponFeedback.className = "text-xs text-rose-400 font-semibold mt-1";
      }
      updateCheckoutSummary();
    });
  }

  // Form submission
  const checkoutForm = document.getElementById('registration-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleTicketPurchase();
    });
  }
}

function handleTicketPurchase() {
  const fullName = document.getElementById('reg-fullname').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const company = document.getElementById('reg-company').value.trim() || 'Independent';
  const jobTitle = document.getElementById('reg-jobtitle').value.trim() || 'Attendee';
  const dietary = document.getElementById('reg-dietary')?.value || 'Standard';

  if (!fullName || !email) {
    alert("Please enter your name and email address.");
    return;
  }

  const tier = EVENT_CONFIG.ticketTiers.find(t => t.id === selectedTicketTier) || EVENT_CONFIG.ticketTiers[1];
  const unitPrice = tier.price;
  const subtotal = unitPrice * ticketQuantity;
  const discountAmount = Math.round(subtotal * (appliedDiscount / 100));
  const finalAmount = subtotal - discountAmount;

  // Generate Unique Ticket Reference
  const ticketId = 'NEX-' + Math.floor(100000 + Math.random() * 900000);

  const newAttendee = {
    id: ticketId,
    fullName: fullName,
    email: email,
    company: company,
    jobTitle: jobTitle,
    dietary: dietary,
    ticketTier: tier.id,
    ticketName: tier.name,
    quantity: ticketQuantity,
    amountPaid: finalAmount,
    registeredAt: new Date().toISOString(),
    checkedIn: false,
    checkedInAt: null
  };

  saveAttendee(newAttendee);

  // Trigger celebration confetti
  if (window.confetti) {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // Close checkout modal
  closeCheckoutModal();

  // Show Success Confirmation Modal with direct link to Digital Pass
  showConfirmationSuccess(newAttendee);
}

function showConfirmationSuccess(attendee) {
  const modal = document.getElementById('success-modal');
  const detailsContainer = document.getElementById('success-ticket-details');
  const passBtn = document.getElementById('btn-view-digital-pass');

  if (!modal || !detailsContainer) {
    window.location.href = `pass.html?id=${attendee.id}`;
    return;
  }

  detailsContainer.innerHTML = `
    <div class="glass-panel rounded-2xl p-4 text-left border border-white/10 mb-4 bg-slate-900/60">
      <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <span class="text-xs uppercase font-mono font-bold text-indigo-400">Reference: ${attendee.id}</span>
        <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Confirmed</span>
      </div>
      <p class="text-sm font-bold text-white">${attendee.fullName}</p>
      <p class="text-xs text-slate-300">${attendee.jobTitle} • ${attendee.company}</p>
      <p class="text-xs text-indigo-300 mt-2">${attendee.ticketName} (${attendee.quantity} Pass) • $${attendee.amountPaid}</p>
    </div>
  `;

  if (passBtn) {
    passBtn.href = `pass.html?id=${attendee.id}`;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}
