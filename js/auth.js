/**
 * Eventexo — Authentication & Identity Controller
 * Supports: Google OAuth simulation, Phone Number OTP verification, and Email/Password auth
 */

const AuthStore = {
  getUser() {
    const raw = localStorage.getItem('eventexo_auth_user');
    return raw ? JSON.parse(raw) : null;
  },

  setUser(user) {
    localStorage.setItem('eventexo_auth_user', JSON.stringify(user));
  },

  clearUser() {
    localStorage.removeItem('eventexo_auth_user');
  },

  isAuthenticated() {
    return !!this.getUser();
  },

  requireAuth() {
    if (!this.isAuthenticated()) {
      // Remember where the user was trying to go
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }
};

function quickDemoLogin() {
  completeGoogleSignIn('Shreyansh Mehta', 'shreyansh@eventexo.com', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
}

let currentOTP = null;
let otpCountdownTimer = null;

// ================= GOOGLE AUTHENTICATION =================
function handleGoogleAuth(mode = 'login') {
  const modal = document.getElementById('google-auth-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  } else {
    // Direct sign in if modal doesn't exist
    completeGoogleSignIn('Shreyansh Mehta', 'shreyansh@eventexo.com', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');
  }
}

function closeGoogleModal() {
  const modal = document.getElementById('google-auth-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function completeGoogleSignIn(name, email, avatar) {
  closeGoogleModal();
  showAuthToast("Signing in with Google...", "Verifying account credentials", "check");

  setTimeout(() => {
    AuthStore.setUser({
      name: name,
      email: email,
      phone: "+91 98200 45678",
      role: "Lead Event Producer",
      avatar: avatar,
      provider: "google",
      loginTime: new Date().toISOString()
    });

    if (window.confetti) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }

    showAuthToast("Signed in Successfully", `Welcome, ${name}! Redirecting to console...`, "check-circle");
    
    setTimeout(() => {
      window.location.href = 'app.html';
    }, 900);
  }, 600);
}

// ================= PHONE NUMBER OTP AUTHENTICATION =================
function switchAuthMethod(method) {
  const emailSection = document.getElementById('email-auth-section');
  const phoneSection = document.getElementById('phone-auth-section');
  const otpSection = document.getElementById('otp-verify-section');
  const btnPhone = document.getElementById('btn-phone-toggle');

  if (method === 'phone') {
    if (emailSection) emailSection.classList.add('hidden');
    if (phoneSection) phoneSection.classList.remove('hidden');
    if (otpSection) otpSection.classList.add('hidden');
    if (btnPhone) btnPhone.classList.add('border-white/40', 'bg-white/10');
  } else {
    if (emailSection) emailSection.classList.remove('hidden');
    if (phoneSection) phoneSection.classList.add('hidden');
    if (otpSection) otpSection.classList.add('hidden');
    if (btnPhone) btnPhone.classList.remove('border-white/40', 'bg-white/10');
  }
}

function handleSendPhoneOTP(e) {
  if (e) e.preventDefault();

  const countryCode = document.getElementById('phone-country-code')?.value || '+91';
  const phoneNumber = document.getElementById('phone-number-input')?.value.trim();

  if (!phoneNumber || phoneNumber.length < 7) {
    showAuthToast("Invalid Number", "Please enter a valid mobile phone number.", "alert-circle");
    return;
  }

  const fullPhone = `${countryCode} ${phoneNumber}`;
  // Generate random 6-digit OTP
  currentOTP = Math.floor(100000 + Math.random() * 900000).toString();

  const phoneSection = document.getElementById('phone-auth-section');
  const otpSection = document.getElementById('otp-verify-section');
  const displayPhone = document.getElementById('otp-target-phone');

  if (phoneSection) phoneSection.classList.add('hidden');
  if (otpSection) otpSection.classList.remove('hidden');
  if (displayPhone) displayPhone.innerText = fullPhone;

  // Auto focus first OTP input box
  setTimeout(() => {
    const firstInput = document.getElementById('otp-1');
    if (firstInput) firstInput.focus();
  }, 100);

  // Start 30s countdown
  startOTPCountdown();

  // Show simulated SMS notification toast with the OTP
  setTimeout(() => {
    showAuthToast(
      "SMS Verification Code",
      `Your Eventexo secure code is: ${currentOTP}`,
      "smartphone"
    );
  }, 400);
}

function startOTPCountdown() {
  let seconds = 30;
  const resendBtn = document.getElementById('btn-resend-otp');
  const timerText = document.getElementById('otp-timer-count');

  if (otpCountdownTimer) clearInterval(otpCountdownTimer);

  if (resendBtn) resendBtn.disabled = true;
  if (timerText) timerText.innerText = `(${seconds}s)`;

  otpCountdownTimer = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(otpCountdownTimer);
      if (resendBtn) {
        resendBtn.disabled = false;
        resendBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      }
      if (timerText) timerText.innerText = '';
    } else {
      if (timerText) timerText.innerText = `(${seconds}s)`;
    }
  }, 1000);
}

function handleOTPInput(e, index) {
  const val = e.target.value;
  if (val.length === 1 && index < 6) {
    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (nextInput) nextInput.focus();
  } else if (e.key === 'Backspace' && index > 1 && !val) {
    const prevInput = document.getElementById(`otp-${index - 1}`);
    if (prevInput) prevInput.focus();
  }
}

function handleVerifyOTP(e) {
  if (e) e.preventDefault();

  let enteredCode = '';
  for (let i = 1; i <= 6; i++) {
    const val = document.getElementById(`otp-${i}`)?.value || '';
    enteredCode += val;
  }

  if (enteredCode.length !== 6) {
    showAuthToast("Incomplete Code", "Please enter the complete 6-digit verification code.", "alert-circle");
    return;
  }

  // Accept generated OTP or master demo code '123456'
  if (enteredCode === currentOTP || enteredCode === '123456') {
    const countryCode = document.getElementById('phone-country-code')?.value || '+91';
    const phoneNumber = document.getElementById('phone-number-input')?.value.trim() || '98200 45678';

    AuthStore.setUser({
      name: "Verified Phone User",
      email: `user.${phoneNumber.slice(-4)}@eventexo.app`,
      phone: `${countryCode} ${phoneNumber}`,
      role: "Event Producer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      provider: "phone",
      loginTime: new Date().toISOString()
    });

    if (window.confetti) {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }

    showAuthToast("Phone Verified", "OTP verified successfully. Launching Eventexo...", "check-circle");

    setTimeout(() => {
      window.location.href = 'app.html';
    }, 800);
  } else {
    showAuthToast("Incorrect Code", "The code you entered is invalid. Please try again or check the top notification.", "alert-triangle");
  }
}

// ================= EMAIL / PASSWORD AUTHENTICATION =================
function handleEmailLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email')?.value.trim();
  const password = document.getElementById('login-password')?.value;

  if (!email || !password) {
    showAuthToast("Missing Fields", "Please enter your email and password.", "alert-circle");
    return;
  }

  // Set authenticated session
  const nameFromEmail = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  AuthStore.setUser({
    name: nameFromEmail || "Event Producer",
    email: email,
    phone: "+91 98000 00000",
    role: "Lead Event Organizer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    provider: "email",
    loginTime: new Date().toISOString()
  });

  if (window.confetti) {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  }

  showAuthToast("Welcome Back", "Authentication successful! Entering console...", "check-circle");
  setTimeout(() => {
    window.location.href = 'app.html';
  }, 750);
}

function handleEmailRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name')?.value.trim();
  const email = document.getElementById('reg-email')?.value.trim();
  const phone = document.getElementById('reg-phone')?.value.trim();
  const role = document.getElementById('reg-role')?.value || 'Event Organizer';
  const password = document.getElementById('reg-password')?.value;

  if (!name || !email || !password) {
    showAuthToast("Missing Fields", "Please complete all required fields.", "alert-circle");
    return;
  }

  AuthStore.setUser({
    name: name,
    email: email,
    phone: phone || "+91 98000 00000",
    role: role,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    provider: "email",
    loginTime: new Date().toISOString()
  });

  if (window.confetti) {
    confetti({ particleCount: 100, spread: 75, origin: { y: 0.6 } });
  }

  showAuthToast("Account Created", `Welcome to Eventexo, ${name}! Setting up workspace...`, "sparkles");
  setTimeout(() => {
    window.location.href = 'app.html';
  }, 850);
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  if (btn) {
    btn.innerHTML = isPass ? `<i data-lucide="eye-off" class="w-4 h-4"></i>` : `<i data-lucide="eye" class="w-4 h-4"></i>`;
    if (window.lucide) lucide.createIcons();
  }
}

// Toast notification helper
function showAuthToast(title, message, icon = 'check-circle') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'pointer-events-auto p-4 rounded-xl bg-[#111116] border border-white/20 shadow-2xl flex items-center gap-3 text-white transition-all duration-300 transform translate-y-4 opacity-0 max-w-sm';
  toast.innerHTML = `
    <div class="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center flex-shrink-0">
      <i data-lucide="${icon}" class="w-4 h-4"></i>
    </div>
    <div>
      <div class="text-xs font-bold text-white">${title}</div>
      <div class="text-[11px] text-zinc-400">${message}</div>
    </div>
  `;
  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
