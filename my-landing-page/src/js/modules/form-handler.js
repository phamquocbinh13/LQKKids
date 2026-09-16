/**
 * Form Handler Module
 * Handles size consultation form validation and async API submission placeholder.
 */

export function initFormHandler() {
  const consultationForm = document.getElementById('consultation-form');
  const formFeedback = document.getElementById('form-feedback');

  if (!consultationForm) return;

  consultationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(consultationForm);
    const data = Object.fromEntries(formData.entries());

    // Basic Validation
    if (!data.gender || !data.age || !data.weight || !data.phone) {
      showFeedback('Vui lòng điền đầy đủ các thông tin cần thiết!', 'error');
      return;
    }

    const submitBtn = consultationForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    try {
      // Set loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>ĐANG GỬI THÔNG TIN...</span>
      `;

      // Async API Endpoint placeholder (Formspree / Webhook / Backend)
      // await fetch('https://api.example.com/consultation', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });

      // Simulated network delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      showFeedback('Gửi yêu cầu tư vấn thành công! LQK Kids sẽ liên hệ lại qua Zalo/SĐT trong 15 phút.', 'success');
      consultationForm.reset();

    } catch (error) {
      console.error('Form submission error:', error);
      showFeedback('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng nhắn trực tiếp qua Zalo hoặc Hotline!', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = `p-3 rounded-2xl text-sm text-center font-medium mt-3 transition-all ${
      type === 'success' 
        ? 'bg-tertiary-fixed/40 text-on-tertiary-fixed-variant border border-tertiary-fixed' 
        : 'bg-error-container text-on-error-container border border-error/30'
    }`;
    formFeedback.classList.remove('hidden');
  }
}
