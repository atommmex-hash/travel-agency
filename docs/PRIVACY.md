# Privacy Architecture & Data Handling

This website is designed with a **privacy-first, zero-liability static architecture**.

---

## 1. What Data Is Collected and Where It Goes

### Enquiry Form & Estimator
- **Data fields**: Customer Name, Number of Guests, Target Month, and Optional Notes.
- **Where it goes**: The data **never reaches any server or third-party tracking database**.
- **How it works**: Client-side JavaScript compiles the input fields into a formatted query string and immediately opens the user's native WhatsApp application via `https://wa.me/{phone}?text=...`. Communication happens entirely end-to-end encrypted within WhatsApp between the traveller and the agency owner.

### Saved Trips (Shortlist)
- **Data fields**: An array of trip IDs (e.g. `["darjeeling-classic", "gangtok-tsomgo"]`).
- **Where it goes**: Stored exclusively on the traveller's device in standard browser `localStorage`.
- **Transmission**: It is never transmitted across the network unless the user explicitly clicks "Send shortlist on WhatsApp".

---

## 2. Third-Party Services & Trackers
- **No tracking cookies**: The site sets zero analytics cookies, advertising pixels, or cross-site fingerprinting scripts.
- **Hosted Forms (Optional Fallback)**: If configured by the owner in the future (e.g. Formspree / Web3Forms), submissions must use Cloudflare Turnstile CAPTCHA and adhere to standard GDPR compliance.
- **Fonts**: Self-hosted or privacy-respecting Google Fonts with `display=swap`.

---

## 3. Compliance
Because the website does not operate a database of customer records or process online transactions directly, it operates outside the scope of high-risk personal data storage liabilities under regional data protection frameworks (such as India's DPDP Act and GDPR).
