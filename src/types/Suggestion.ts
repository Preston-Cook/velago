export interface Suggestion {
  placePrediction: {
    placeId: string;
    text: {
      text: string;
    };
  };
}

export interface AutoCompleteResponse {
  suggestions: Suggestion[];
}
