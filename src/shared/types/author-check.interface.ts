export interface AuthorCheck {
  isOfferAuthor(offerId: string, userId: string): Promise<boolean>;
}
