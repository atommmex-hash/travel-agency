# Website Maintenance Guide

This document outlines the monthly maintenance routine, uptime monitoring, backup procedures, and SLA scope for the travel agency website.

---

## 1. Monthly Maintenance Checklist

Run this checklist at the start of each month:

- [ ] **Dependency Updates**:
  ```bash
  npm outdated
  npm update
  npm test
  npm run build
  ```
  Verify that all unit tests pass and the static build completes without schema errors.
- [ ] **Security Audit**:
  ```bash
  npm audit
  ```
  Ensure zero high or critical vulnerabilities exist.
- [ ] **Uptime & SSL Check**:
  - Verify that the domain SSL certificate is valid and auto-renewing.
  - Verify that UptimeRobot (or Cloudflare Health Check) is actively pinging the root URL every 5 minutes.
- [ ] **WhatsApp & Contact Flow Verification**:
  - Tap the header "Plan my trip" button.
  - Open a trip, change travellers in the estimator, and tap "Get the exact quote".
  - Submit a test lead through the enquiry form.
  - Confirm all messages pre-populate correctly in WhatsApp with the owner's active phone number.
- [ ] **Broken Link Check**:
  - Verify internal anchors (`#trips`, `#booking`, `#stories`, `#faq`, `#enquire`, `/privacy`).
- [ ] **Content & Image Backup**:
  - Ensure the Git repository (containing all `/src/content/` files and `/public/images/`) is backed up remotely on GitHub / GitLab.

---

## 2. Maintenance Scope

### What Is Covered
- Security updates for npm packages.
- Monitoring site uptime and alerting.
- Git repository backups.
- Bug fixes for core functionality (modal sheets, filters, pricing estimator, responsive layout).
- Content schema adjustments when adding new required fields.

### What Is Not Covered (Requires Separate Quote)
- Custom backend server development (e.g., building proprietary booking or payment engines).
- Domain registration renewals or third-party email hosting bills.
- Professional copywriting or custom on-location photography.
- Major visual rebranding outside the established design token system.
