# Website Contact Form Setup

This contact form submits data to a Google Spreadsheet using Google Apps Script.

## Resources

- **Spreadsheet**: https://docs.google.com/spreadsheets/d/1rJanqryI9-bCtVuiRxZ2mOvYv-buVUdcR40gMctGv_A/edit
- **Apps Script**: https://script.google.com/home/projects/1cM25jbQUl1qVNHmfNZJzG0OlXdbev6V51cbOWPSUwCcSRXdn0D-APKhY/edit?authUser=hello@sllow.co
- **Web App URL**: https://script.google.com/a/macros/sllow.co/s/AKfycbzJhEdeAqT3lvwbOqwGL8ZumXUSsy6nO32WGvYGGKdDk4lLGMKOyFF-mCh6uvT8mKsKUw/exec

## How It Works

The form sends POST requests to the Google Apps Script web app endpoint, which:

1. Inserts new rows at row 3 of the spreadsheet (after the header) with:
   - `signed_up_date` - Formatted timestamp as YYYY-MM-DD HH:mm:ss (generated server-side)
   - `name` - User's name
   - `email` - User's email address
2. Sends an email notification to `gregory@sllow.co` with the submission details

## Column Structure

The spreadsheet has the following columns:

1. `signed_up_date` - Formatted timestamp as YYYY-MM-DD HH:mm:ss (generated server-side)
2. `name` - User's name
3. `email` - User's email address

## Apps Script Code

See [`apps-script.js`](./apps-script.js) for the complete code.

**Important:** After updating the script, you must redeploy it as a new version for the changes to take effect.

## CORS Configuration

**Critical:** Google Apps Script Web Apps cannot set custom CORS headers due to security limitations. To avoid CORS preflight issues:

- Use `Content-Type: text/plain;charset=utf-8` instead of `application/json` in the fetch request
- The body can still contain JSON (as a string), and the Apps Script can parse it with `JSON.parse()`
- This avoids the CORS preflight OPTIONS request that Google Apps Script doesn't handle

**Deployment settings:**

- Deployment is set to "Execute as: Me"
- "Who has access" is set to "Anyone" (or "Anyone with Google account")
- After updating the script, create a **new deployment** (don't just update the existing one)

## Email Notifications

When a successful submission is made, an email notification is automatically sent to `gregory@sllow.co` using MailApp. The email includes:

- Name of the person who signed up
- Email address
- Timestamp of the submission

**Authorization Required:** To enable email notifications, you need to authorize the script:

1. In the Apps Script editor, click **Run** → select any function (or create a test function)
2. Google will prompt you to authorize the script
3. Click **Review Permissions** → select your Google account
4. Click **Advanced** → **Go to [Project Name] (unsafe)** (this is safe - it's your own script)
5. Click **Allow** to grant email sending permissions

Alternatively, you can manually trigger authorization by running this test function once:

```javascript
function testEmail() {
  MailApp.sendEmail('gregory@sllow.co', 'Test', 'This is a test email')
}
```

After authorization, email notifications will work automatically. If authorization fails, form submissions will still succeed (email errors are caught and logged).
