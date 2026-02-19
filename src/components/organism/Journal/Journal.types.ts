export interface JournalEntry {
  goalOne: string
  goalTwo: string
  body: string
  links: string
}

export interface StoredJournalEntries {
  [dateKey: string]: JournalEntry
}
