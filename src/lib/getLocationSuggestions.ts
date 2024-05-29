import { Suggestion } from '@/types/Suggestion';

const GOOGLE_MAPS_API_KEY = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

const GOOGLE_MAPS_AUTOCOMPLETE_ENDPOINT = process.env
  .NEXT_PUBLIC_GOOGLE_MAPS_AUTOCOMPLETE_ENDPOINT as string;

interface getLocationSuggestionsParams {
  lang: string;
  q: string;
}

// TODO: add refferal restrictions
export async function getLocationSuggestions({
  lang,
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
      languageCode: lang,
    }),
  });
  if (!res.ok) {
    throw Error();
  }

  const { suggestions } = await res.json();
  return suggestions;
}
