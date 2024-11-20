import { GOOGLE_MAPS_AUTOCOMPLETE_ENDPOINT } from '@/config/apiEndpoints';
import { Locale, Suggestion } from '@/types';

const GOOGLE_MAPS_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

interface getLocationSuggestionsParams {
  locale: Locale;
  q: string;
}

export async function getLocationSuggestions({
  locale: languageCode,
  q,
}: getLocationSuggestionsParams): Promise<Suggestion[]> {
  const res = await fetch(GOOGLE_MAPS_AUTOCOMPLETE_ENDPOINT, {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
    },
    method: 'POST',
    body: JSON.stringify({
      input: q,
      languageCode,
    }),
  });
  if (!res.ok) {
    throw Error();
  }

  const { suggestions } = await res.json();
  return suggestions;
}
