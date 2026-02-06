function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
    const data = JSON.parse(e.postData.contents)

    // Validate required fields
    if (!data.name || !data.email) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Missing required fields' })
      ).setMimeType(ContentService.MimeType.JSON)
    }

    // Format date as YYYY-MM-DD HH:mm:ss
    const now = new Date()
    const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss')

    // Insert row at row 3 (after row 2)
    sheet.insertRowAfter(2)
    const newRow = sheet.getRange(3, 1, 1, 3)
    newRow.setValues([[formattedDate, data.name, data.email]])

    // Send email notification (wrapped in try-catch so form submission succeeds even if email fails)
    try {
      const recipient = 'hello@sllow.co'
      const subject = 'Contact Form Submission'
      const body = `A new contact form submission was received:\n\nName: ${data.name}\nEmail: ${data.email}\nDate: ${formattedDate}`
      MailApp.sendEmail(recipient, subject, body)
    } catch (emailError) {
      // Log error but don't fail the form submission
      console.error('Email notification failed:', emailError.toString())
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(
      ContentService.MimeType.JSON
    )
  }
}
