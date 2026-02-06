const GOOGLE_SCRIPT_URL =
  'https://script.google.com/a/macros/sllow.co/s/AKfycbzJhEdeAqT3lvwbOqwGL8ZumXUSsy6nO32WGvYGGKdDk4lLGMKOyFF-mCh6uvT8mKsKUw/exec'

type ContactFormData = {
  name: string
  email: string
}

type SubmitResponse = {
  success: boolean
  error?: string
}

export async function storeContact(data: ContactFormData): Promise<SubmitResponse> {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(data),
      redirect: 'follow',
    })

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` }
    }

    const text = await response.text()
    if (!text) {
      return { success: false, error: 'Empty response from server' }
    }

    const result = JSON.parse(text) as SubmitResponse
    return result
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
